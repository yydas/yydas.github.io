/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Lenis 平滑滚动全局类型定义
interface Window {
  lenis?: import('lenis').default
  togglePostListDrawer?: () => void
  dockPostListToggle?: () => void
  __ASTRO_POSTS__?: any[]
  __ASTRO_PROJECTS__?: any[]
}
