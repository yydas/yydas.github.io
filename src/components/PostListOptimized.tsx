"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import * as React from "react";

interface PostItem {
	slug: string;
	data: {
		title: string;
		dateFormatted: string;
	};
}

interface PostListProps {
	posts: PostItem[];
	projects: PostItem[];
	currentPath: string;
	isProjectPage?: boolean;
}

export function PostListOptimized({
	posts,
	projects,
	currentPath,
	isProjectPage = false,
}: PostListProps) {
	const items = isProjectPage ? projects : posts;

	// 按日期排序
	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			if (a.data.dateFormatted && b.data.dateFormatted) {
				return (
					new Date(b.data.dateFormatted).getTime() -
					new Date(a.data.dateFormatted).getTime()
				);
			}
			return a.data.title.localeCompare(b.data.title);
		});
	}, [items]);

	// 按文件夹分组
	const groupedItems = React.useMemo(() => {
		const groups = sortedItems.reduce(
			(acc, item) => {
				const parts = item.slug.split("/");
				const folder = parts.length > 1 ? parts[0] : "其他";
				if (!acc[folder]) {
					acc[folder] = [];
				}
				acc[folder].push(item);
				return acc;
			},
			{} as Record<string, PostItem[]>,
		);

		return Object.entries(groups).sort(([a], [b]) => {
			if (a === "其他") return -1;
			if (b === "其他") return 1;
			return a.localeCompare(b);
		});
	}, [sortedItems]);

	// 规范化路径
	const normalizePath = (path: string) =>
		decodeURIComponent(path.replace(/\/$/, ""));

	// 检查是否激活
	const isActive = (itemSlug: string) => {
		const itemPath = `/${isProjectPage ? "project" : "post"}/${itemSlug}/`;
		return normalizePath(currentPath) === normalizePath(itemPath);
	};

	return (
		<nav className="space-y-1 px-2">
			{groupedItems.map(([folder, items]) => (
				<Collapsible key={folder} defaultOpen={true}>
					{folder !== "其他" && (
						<CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 text-sm font-semibold text-foreground hover:bg-accent rounded-md transition-colors group">
							<span>{folder}</span>
							<ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
						</CollapsibleTrigger>
					)}
					<CollapsibleContent className="space-y-1">
						{items.map((item) => {
							const itemPath = `/${isProjectPage ? "project" : "post"}/${
								item.slug
							}/`;
							const active = isActive(item.slug);

							return (
								<a
									key={item.slug}
									href={itemPath}
									className={cn(
										"block px-3 py-2 text-xs rounded-md transition-colors",
										"hover:bg-accent hover:text-accent-foreground",
										active
											? "bg-accent text-accent-foreground font-semibold"
											: "text-muted-foreground",
									)}
								>
									{item.data.title}
								</a>
							);
						})}
					</CollapsibleContent>
				</Collapsible>
			))}
		</nav>
	);
}
