import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  // 确保在客户端环境
  if (typeof window === 'undefined') return null

  // 创建 Lenis 实例
  const lenis = new Lenis({
    duration: 0.8,            // 缩短滚动持续时间，减少拖沓感
    easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic，更轻快的缓动
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1,                // 线性插值系数，值越大响应越快
  })

  // 同步 Lenis 和 GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // 使用 GSAP ticker 驱动 Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // 启用延迟平滑，在帧率波动时提供更平滑的体验
  gsap.ticker.lagSmoothing(500, 33)

  return lenis
}
