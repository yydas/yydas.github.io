import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  // 确保在客户端环境
  if (typeof window === 'undefined') return null

  // 创建 Lenis 实例
  const lenis = new Lenis({
    duration: 0.8,            // 适中的持续时间，平衡流畅度和响应性
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo，更自然的缓动曲线
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.2,     // 提高滚轮灵敏度
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.12,               // 提高插值系数，响应更快
  })

  // 同步 Lenis 和 GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // 使用 GSAP ticker 驱动 Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // 优化延迟平滑参数，减少卡顿感
  gsap.ticker.lagSmoothing(0, 0)  // 禁用延迟平滑，避免在低帧率时产生额外延迟

  // 将 Lenis 实例挂载到 window 对象，供其他组件使用
  ;(window as any).lenis = lenis

  return lenis
}
