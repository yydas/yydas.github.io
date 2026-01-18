"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface Heading {
	depth: number;
	slug: string;
	text: string;
}

interface TableOfContentsProps {
	headings: Heading[];
}

export function TableOfContentsOptimized({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = React.useState<string>("");

	// 计算相对缩进
	const headingsWithRelativeDepth = React.useMemo(() => {
		if (headings.length === 0) return [];

		const minDepth = Math.min(...headings.map((h) => h.depth));

		return headings.map((heading) => ({
			...heading,
			relativeDepth: heading.depth - minDepth,
		}));
	}, [headings]);

	// IntersectionObserver 监听标题
	React.useEffect(() => {
		const headingElements = Array.from(
			document.querySelectorAll<HTMLElement>(
				"h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
			),
		);

		const observer = new IntersectionObserver(
			(entries) => {
				// 收集所有可见的标题
				const visibleHeadings = entries
					.filter((entry) => entry.isIntersecting)
					.map((entry) => ({
						id: entry.target.id,
						top: entry.boundingClientRect.top,
					}))
					.sort((a, b) => a.top - b.top);

				// 如果有可见标题，选择最靠近顶部的
				if (visibleHeadings.length > 0) {
					setActiveId(visibleHeadings[0].id);
				} else {
					// 如果没有可见标题，找到最接近视口顶部的标题
					const allHeadings = headingElements.map((el) => ({
						id: el.id,
						top: el.getBoundingClientRect().top,
					}));

					// 找到第一个在视口上方的标题（向上滚动的情况）
					const aboveViewport = allHeadings
						.filter((h) => h.top < 100)
						.sort((a, b) => b.top - a.top);

					if (aboveViewport.length > 0) {
						setActiveId(aboveViewport[0].id);
					}
				}
			},
			{
				rootMargin: "-96px 0px -80% 0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			},
		);

		headingElements.forEach((element) => observer.observe(element));

		return () => {
			headingElements.forEach((element) => observer.unobserve(element));
		};
	}, []);

	// 平滑滚动到标题
	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		slug: string,
	) => {
		e.preventDefault();
		const element = document.getElementById(slug);
		if (element) {
			// 获取 Lenis 实例
			const lenis = (window as any).lenis;
			
			if (lenis) {
				// 使用 Lenis 的 scrollTo 方法，考虑 header 高度偏移
				const headerOffset = 96; // 调整偏移量以适应新布局
				const elementPosition = element.getBoundingClientRect().top + window.scrollY;
				const offsetPosition = elementPosition - headerOffset;
				
				lenis.scrollTo(offsetPosition, {
					duration: 0.8,
					easing: (t: number) => 1 - Math.pow(1 - t, 3),
				});
			} else {
				// 降级方案：使用原生滚动
				element.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
			
			// 更新 URL
			window.history.pushState(null, "", `#${slug}`);
		}
	};

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav className="space-y-2 pr-2">
			{headingsWithRelativeDepth.map((heading) => {
				const isActive = activeId === heading.slug;

				return (
					<a
						key={heading.slug}
						href={`#${heading.slug}`}
						onClick={(e) => handleClick(e, heading.slug)}
						className={cn(
							"block text-xs transition-colors hover:text-foreground",
							isActive
								? "text-foreground font-semibold"
								: "text-muted-foreground",
							heading.relativeDepth === 1 && "ml-3",
							heading.relativeDepth === 2 && "ml-6",
							heading.relativeDepth === 3 && "ml-9",
							heading.relativeDepth === 4 && "ml-12",
							heading.relativeDepth === 5 && "ml-15",
						)}
					>
						{heading.text}
					</a>
				);
			})}
		</nav>
	);
}
