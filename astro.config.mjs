import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	site: "https://yydas.github.io",
	server: {
		host: "0.0.0.0",
	},
	content: {
		collections: {
			post: {
				type: "content",
				directory: "src/content/post",
			},
			project: {
				type: "content",
				directory: "src/content/project",
			},
		},
	},
	vite: {
		assetsInclude: ["**/*.csv"],
	},
	markdown: {
		shikiConfig: {
			theme: "github-dark-dimmed",
			wrap: true,
		},
		remarkPlugins: [
			remarkGfm, // GitHub Flavored Markdown (表格、任务列表、删除线等)
			remarkMath, // 数学公式支持
		],
		rehypePlugins: [
			rehypeSlug, // 为标题添加 ID
			rehypeKatex, // 渲染数学公式
		],
	},
});
