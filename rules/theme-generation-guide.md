# shadcn/ui 主题规范

## 颜色系统

### 语义化颜色（优先使用）
- 背景: `bg-background`
- 卡片: `bg-card`
- 主要文本: `text-foreground`
- 次要文本: `text-muted-foreground`
- 边框: `border`
- 主要按钮: `bg-primary`
- 次要背景: `bg-secondary`

### Tailwind 原生颜色（特殊场景）
- 强调色: `bg-orange-500` `text-orange-500`
- 成功: `bg-green-500`
- 警告: `bg-yellow-500`
- 错误: `bg-red-500`

## 间距规范
- 组件内边距: `p-4` 或 `p-6`
- 组件间距: `gap-4` 或 `gap-6`
- 区块间距: `space-y-8` 或 `space-y-12`

## 圆角规范
- 小圆角: `rounded-lg` - 按钮、徽章
- 中圆角: `rounded-xl` - 卡片
- 大圆角: `rounded-2xl` - 图片容器
- 完全圆角: `rounded-full` - 头像、指示器

## 阴影规范
- 轻微: `shadow-sm`
- 标准: `shadow-md`
- 强调: `shadow-lg`
- 超大: `shadow-2xl`

## 响应式断点
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 暗色模式
所有组件必须支持暗色模式，优先使用语义化颜色自动适配。
特殊情况使用 `dark:` 前缀：
```tsx
<div className="bg-white dark:bg-neutral-900">
  内容
</div>
```