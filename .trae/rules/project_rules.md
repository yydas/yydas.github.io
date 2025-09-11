# 项目规则文档

## 项目概述

这是一个基于 Astro 框架构建的个人博客和作品展示网站，名为"咻设计"。项目使用现代化的前端技术栈，支持博客文章、项目展示、链接收藏等功能。

## 技术栈

### 核心框架
- **Astro 5.5.5**: 静态站点生成器，支持多种前端框架集成
- **React 18.3.1**: 用于交互式组件
- **TypeScript**: 类型安全的 JavaScript 超集
- **Tailwind CSS 3.4.17**: 实用优先的 CSS 框架

### 主要依赖
- **Framer Motion**: 动画库
- **GSAP**: 高性能动画库
- **Fuse.js**: 模糊搜索库
- **Typed.js**: 打字机效果库
- **Swiper**: 轮播组件库
- **CSV Parser**: CSV 文件解析

### 开发工具
- **Biome**: 代码格式化和 linting 工具
- **pnpm**: 包管理器
- **GitHub Actions**: CI/CD 部署

## 项目结构

```
├── .astro/                 # Astro 生成的配置文件
├── .github/workflows/      # GitHub Actions 部署配置
├── public/                 # 静态资源
│   ├── assets/images/      # 图片资源
│   ├── favicon.ico         # 网站图标
│   └── robots.txt          # 搜索引擎爬虫配置
├── src/
│   ├── assets/             # 源码资源
│   │   ├── css/            # 样式文件
│   │   └── js/             # JavaScript 文件
│   ├── collections/        # 数据配置文件
│   │   ├── menu.json       # 导航菜单配置
│   │   ├── projects.json   # 项目展示配置
│   │   └── experiences.json # 经历配置
│   ├── components/         # 组件库
│   │   ├── home/           # 首页组件
│   │   ├── about/          # 关于页面组件
│   │   ├── TiltedCard/     # 倾斜卡片组件
│   │   ├── Search.jsx      # 搜索组件
│   │   ├── TypedText.jsx   # 打字机效果组件
│   │   └── *.astro         # 各种 Astro 组件
│   ├── content/            # 内容管理
│   │   ├── config.ts       # 内容集合配置
│   │   ├── post/           # 博客文章
│   │   └── project/        # 项目文档
│   ├── data/               # 数据文件
│   │   └── links.csv       # 链接收藏数据
│   ├── layouts/            # 布局模板
│   │   ├── main.astro      # 主布局
│   │   └── post.astro      # 文章布局
│   ├── pages/              # 页面路由
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   ├── portfolio.astro # 作品集页面
│   │   ├── post/           # 博客页面
│   │   └── project/        # 项目页面
│   └── utils/              # 工具函数
├── astro.config.mjs        # Astro 配置
├── tailwind.config.mjs     # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
├── biome.json              # Biome 配置
└── package.json            # 项目依赖配置
```

## 开发规范

### 代码风格
1. **使用 Biome 进行代码格式化和 linting**
   - 运行 `pnpm check` 进行代码检查和自动修复
   - 遵循 Biome 推荐的代码规范

2. **TypeScript 严格模式**
   - 继承 `astro/tsconfigs/strict` 配置
   - 使用路径别名 `@/*` 指向 `src/*`

3. **组件命名规范**
   - Astro 组件使用 PascalCase，文件扩展名 `.astro`
   - React 组件使用 PascalCase，文件扩展名 `.jsx`
   - 普通文件使用 kebab-case

### 文件组织
1. **组件分类**
   - 页面特定组件放在对应的子目录中（如 `home/`, `about/`）
   - 通用组件直接放在 `components/` 根目录
   - 复杂组件可以创建专门的文件夹（如 `TiltedCard/`）

2. **内容管理**
   - 博客文章放在 `src/content/post/`
   - 项目文档放在 `src/content/project/`
   - 使用 Markdown 格式，包含 frontmatter 元数据

3. **静态资源**
   - 图片资源放在 `public/assets/images/`
   - 使用相对路径引用：`/assets/images/filename.ext`

### 内容规范

#### 博客文章格式
```markdown
---
title: "文章标题"
description: "文章描述"
dateFormatted: "YYYY-MM-DD"
tags: ["标签1", "标签2"]
---

文章内容...
```

#### 项目文档格式
```markdown
---
title: "项目标题"
description: "项目描述"
dateFormatted: "YYYY-MM-DD"
image: "/assets/images/projects/project-image.jpg"
tags: ["标签1", "标签2"]
---

项目内容...
```

### 样式规范
1. **使用 Tailwind CSS**
   - 优先使用 Tailwind 实用类
   - 启用暗色模式支持 (`darkMode: "class"`)
   - 使用 `@tailwindcss/typography` 插件处理文章内容

2. **响应式设计**
   - 移动优先设计原则
   - 使用 Tailwind 响应式前缀：`sm:`, `md:`, `lg:`, `xl:`

3. **暗色模式**
   - 使用 `dark:` 前缀定义暗色模式样式
   - 在 `main.astro` 中通过 localStorage 控制暗色模式

## 功能特性

### 核心功能
1. **博客系统**
   - 支持 Markdown 文章
   - 标签分类
   - 分页显示
   - 全文搜索（使用 Fuse.js）

2. **项目展示**
   - 项目卡片展示
   - 项目详情页面
   - 图片展示支持

3. **链接收藏**
   - CSV 格式数据存储
   - 分类管理
   - 标签系统

4. **交互特效**
   - 打字机效果（Typed.js）
   - 动画效果（Framer Motion, GSAP）
   - 轮播组件（Swiper）

### 导航结构
- **Home**: 首页
- **博客**: 博客文章列表
- **项目**: 项目展示列表
- **作品**: 作品集页面
- **关于我**: 个人介绍页面

## 部署配置

### GitHub Pages 部署
- 使用 GitHub Actions 自动部署
- 触发条件：推送到 `main` 分支
- 构建工具：`withastro/action@v2`
- 部署目标：GitHub Pages

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查和格式化
pnpm check
```

## 配置说明

### Astro 配置 (astro.config.mjs)
- 集成 Tailwind CSS 和 React
- 配置站点 URL: `https://yydas.github.io`
- 支持 CSV 文件作为资源
- Markdown 语法高亮：`github-dark-dimmed` 主题

### 内容集合配置 (src/content/config.ts)
- `post` 集合：博客文章
- `project` 集合：项目文档
- 使用 Zod 进行数据验证

## 注意事项

1. **语言设置**
   - 网站主要语言为中文 (`lang="zh-CN"`)
   - 支持中英文混合内容

2. **SEO 优化**
   - 配置了 `robots.txt`
   - 使用语义化的 HTML 结构
   - 支持自定义页面标题和描述

3. **性能优化**
   - 使用 Astro 的静态生成特性
   - 图片资源优化
   - CSS 和 JS 代码分割

4. **可访问性**
   - 使用语义化标签
   - 支持键盘导航
   - 适当的颜色对比度

## 扩展建议

1. **内容管理**
   - 可以考虑集成 CMS 系统
   - 添加评论系统
   - 实现文章阅读统计

2. **功能增强**
   - 添加 RSS 订阅
   - 实现全站搜索
   - 添加多语言支持

3. **性能优化**
   - 图片懒加载
   - 服务端渲染优化
   - CDN 加速

---

*此文档基于项目当前状态生成，随着项目发展可能需要更新。*