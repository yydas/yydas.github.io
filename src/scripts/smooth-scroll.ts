import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  // 确保在客户端环境
  if (typeof window === 'undefined') return null

  // 创建 Lenis 实例
  const lenis = new Lenis({
    duration: 1.2,            // 滚动持续时间
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',  // 垂直滚动
    gestureOrientation: 'vertical',
    smoothWheel: true,        // 平滑鼠标滚轮
    wheelMultiplier: 1,       // 滚轮速度倍数
    smoothTouch: false,       // 移动端建议关闭以保持原生体验
    touchMultiplier: 2,
    infinite: false,
  })

  // 同步 Lenis 和 GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // 使用 GSAP ticker 驱动 Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}
