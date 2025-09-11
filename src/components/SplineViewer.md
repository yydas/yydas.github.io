# SplineViewer 组件使用指南

## 概述

`SplineViewer` 是一个基于 `@splinetool/react-spline` 的 React 组件，用于在 Astro 项目中集成 3D Spline 场景。

## 安装依赖

```bash
pnpm add @splinetool/react-spline @splinetool/runtime
```

## 基本使用

### 在 Astro 组件中使用

```astro
---
import SplineViewer from "../SplineViewer.jsx";
---

<div class="w-full h-96">
  <SplineViewer 
    client:load
    scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
    className="w-full h-full rounded-lg"
  />
</div>
```

### 组件属性

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `scene` | string | 是 | Spline 场景的 URL |
| `className` | string | 否 | 自定义 CSS 类名 |
| `onLoad` | function | 否 | 场景加载完成的回调函数 |
| `...props` | object | 否 | 其他传递给 Spline 组件的属性 |

## 高级用法

### 事件处理

```astro
<SplineViewer 
  client:load
  scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
  onLoad={(spline) => {
    console.log('Spline scene loaded:', spline);
    // 可以在这里设置场景交互
  }}
  onMouseDown={(e) => {
    console.log('Mouse down on 3D object:', e.target.name);
  }}
/>
```

### 响应式设计

```astro
<div class="w-full h-64 md:h-96 lg:h-[500px]">
  <SplineViewer 
    client:load
    scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
    className="w-full h-full rounded-lg shadow-lg"
  />
</div>
```

## 获取 Spline 场景 URL

1. 在 [Spline](https://spline.design/) 中创建或编辑你的 3D 场景
2. 点击右上角的 "Export" 按钮
3. 选择 "Code" 选项
4. 选择 "React" 框架
5. 复制提供的场景 URL

## 性能优化建议

1. **懒加载**: 使用 `client:visible` 或 `client:idle` 指令来延迟加载组件
2. **预加载**: 对于重要的 3D 场景，可以使用 `client:load` 立即加载
3. **尺寸控制**: 合理设置容器尺寸，避免过大的 3D 场景影响性能

## 故障排除

### 常见问题

1. **场景不显示**
   - 检查场景 URL 是否正确
   - 确保网络连接正常
   - 检查浏览器控制台是否有错误信息

2. **加载缓慢**
   - 3D 场景文件可能较大，考虑优化场景复杂度
   - 使用加载指示器提升用户体验

3. **移动端兼容性**
   - 某些复杂的 3D 场景在移动设备上可能性能不佳
   - 考虑为移动端提供简化版本或静态图片替代

## 示例场景

以下是一些可以用于测试的公开 Spline 场景：

- 简单几何体: `https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode`
- 交互式模型: `https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode`

## 更多资源

- [Spline 官方文档](https://docs.spline.design/)
- [@splinetool/react-spline 文档](https://github.com/splinetool/react-spline)
- [Spline 社区示例](https://spline.design/community)