# 项目开发规范

本项目使用 **Astro 5.x + React 18 + shadcn/ui** 构建。

详细规范已拆分到 `rules/` 目录：

- **development-standards.md** - 代码规范、文件组织、Git 提交规范
- **theme-generation-guide.md** - shadcn/ui 主题、颜色、间距、响应式规范
- **component-patterns.md** - 组件开发模式、shadcn/ui 使用示例
- **best-practices.md** - 最佳实践、开发流程、常用命令

## 快速参考

### 核心原则
1. 使用 shadcn/ui 组件库统一样式
2. 优先使用语义化颜色（`bg-background`, `text-foreground`）
3. 使用 `cn()` 函数合并类名
4. 所有组件支持暗色模式
5. 遵循 TypeScript 类型定义
6. 总结内容精简，禁止生成无意义的文件！

### 常用命令
```bash
pnpm dev      # 开发服务器
pnpm build    # 构建生产版本
pnpm check    # 代码检查
```

---
最后更新: 2026-01-10
