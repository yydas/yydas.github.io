# 开发规范

## 技术栈
- 框架: Astro 5.x + React 18
- 样式: Tailwind CSS + shadcn/ui
- 动画: GSAP + Framer Motion
- 语言: TypeScript
- 包管理器: pnpm

## 代码规范

### 命名约定
- 组件: PascalCase (例: `BentoGrid.tsx`)
- 工具函数: camelCase (例: `formatDate.ts`)
- 常量: UPPER_SNAKE_CASE (例: `MAX_ITEMS`)
- CSS 类: kebab-case (例: `hero-section`)

### 文件组织
```
src/
├── components/
│   ├── ui/              # shadcn/ui 组件
│   ├── portfolio/       # 作品集特定组件
│   ├── home/           # 首页组件
│   └── about/          # 关于页面组件
├── lib/
│   └── utils.ts        # 工具函数
├── styles/
│   └── globals.css     # 全局样式
└── pages/              # Astro 页面
```

### 导入顺序
```tsx
// 1. React/Astro 核心
import React from 'react'

// 2. 第三方库
import { motion } from 'framer-motion'

// 3. shadcn/ui 组件
import { Button } from "@/components/ui/button"

// 4. 本地组件
import { Hero } from '@/components/portfolio/Hero'

// 5. 工具函数
import { cn } from '@/lib/utils'

// 6. 类型定义
import type { ComponentProps } from '@/types'
```

## Git 提交规范
使用 Conventional Commits：
- `feat:` 添加新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化

## 性能优化
1. 图片优化: 使用 Astro 的 Image 组件
2. 代码分割: 使用动态导入
3. 懒加载: 对非关键组件使用懒加载
4. CSS 优化: 避免不必要的样式重复