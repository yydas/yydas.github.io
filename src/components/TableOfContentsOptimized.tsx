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
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-10% 0px -85% 0px",
				threshold: 0,
			},
		);

		const headingElements = document.querySelectorAll<HTMLElement>(
			"h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
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
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
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
