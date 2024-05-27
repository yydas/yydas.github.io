// 1. 从 `astro:content` 导入适当的工具。
import { z, defineCollection } from 'astro:content';

// 2. 定义要用 schema 验证的每个集合。
const postCollection = defineCollection({
  type: 'content', // v2.5.0 及之后
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.date()
  }),
});

// 3. 导出一个 `collections` 对象来注册你的集合。
export const collections = {
  'post': postCollection,
};