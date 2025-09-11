/**
 * Infinite Grid Component for Astro
 * 移植自原始项目，适配Astro框架
 * 保持所有原有功能：无限滚动、拖拽、视差效果、动画等
 */

// 简化版本，移除GSAP依赖以便快速测试
class InfiniteGrid {
  constructor({ el, sources, data, originalSize }) {
    // 确保在客户端环境中运行
    if (typeof window === 'undefined') {
      console.warn('InfiniteGrid: 只能在客户端环境中运行');
      return;
    }

    this.$container = el;
    this.sources = sources;
    this.data = data;
    this.originalSize = originalSize;

    // 滚动状态管理
    this.scroll = {
      ease: 0.06,
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      last: { x: 0, y: 0 },
      delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } }
    };

    // 拖拽状态管理
    this.isDragging = false;
    this.drag = { startX: 0, startY: 0, scrollX: 0, scrollY: 0 };

    // 鼠标状态管理
    this.mouse = {
      x: { t: 0.5, c: 0.5 },
      y: { t: 0.5, c: 0.5 },
      press: { t: 0, c: 0 },
    };

    this.items = [];
    this.isDestroyed = false;

    // 绑定事件处理函数
    this.onResize = this.onResize.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.render = this.render.bind(this);

    // 添加事件监听器
    this.addEventListeners();

    // 创建Intersection Observer用于文字动画
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    });

    // 初始化
    this.init();
  }

  /**
   * 添加事件监听器
   */
  addEventListeners() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('mousemove', this.onMouseMove);
    this.$container.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  /**
   * 移除事件监听器
   */
  removeEventListeners() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.$container.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  /**
   * 初始化网格
   */
  init() {
    this.onResize();
    this.render();
    
    // 延迟执行入场动画，确保DOM已渲染
    requestAnimationFrame(() => {
      this.initIntro();
      this.intro();
    });
  }

  /**
   * 初始化入场动画
   */
  initIntro() {
    this.introItems = [...this.$container.querySelectorAll('.item-wrapper')].filter((item) => {
      const rect = item.getBoundingClientRect();
      return (
        rect.x > -rect.width &&
        rect.x < window.innerWidth + rect.width &&
        rect.y > -rect.height &&
        rect.y < window.innerHeight + rect.height
      );
    });
    
    this.introItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const x = -rect.x + window.innerWidth * 0.5 - rect.width * 0.5;
      const y = -rect.y + window.innerHeight * 0.5 - rect.height * 0.5;
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  /**
   * 执行入场动画
   */
  intro() {
    if (this.introItems && this.introItems.length > 0) {
      this.introItems.reverse().forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = 'transform 2s cubic-bezier(0.19, 1, 0.22, 1)';
          item.style.transform = 'translate3d(0, 0, 0)';
        }, index * 50);
      });
    }
  }

  /**
   * 窗口大小改变处理
   */
  onResize() {
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;

    // 计算瓦片尺寸
    this.tileSize = {
      w: this.winW,
      h: (this.winW) * (this.originalSize.h / this.originalSize.w),
    };

    // 重置滚动状态
    this.scroll.current = { x: 0, y: 0 };
    this.scroll.target = { x: 0, y: 0 };
    this.scroll.last = { x: 0, y: 0 };

    // 清空容器并重新生成网格
    this.$container.innerHTML = '';
    this.generateGrid();
  }

  /**
   * 生成网格项目
   */
  generateGrid() {
    // 计算基础项目数据
    const baseItems = this.data.map((d, i) => {
      const scaleX = this.tileSize.w / this.originalSize.w;
      const scaleY = this.tileSize.h / this.originalSize.h;
      const source = this.sources[i % this.sources.length];
      return {
        src: source.src,
        caption: source.caption,
        x: d.x * scaleX,
        y: d.y * scaleY,
        w: d.w * scaleX,
        h: d.h * scaleY
      };
    });

    this.items = [];
    const repsX = [0, this.tileSize.w];
    const repsY = [0, this.tileSize.h];

    // 生成重复的网格项目以实现无限滚动
    baseItems.forEach(base => {
      repsX.forEach(offsetX => {
        repsY.forEach(offsetY => {
          this.createGridItem(base, offsetX, offsetY);
        });
      });
    });

    // 扩大瓦片尺寸用于无限滚动计算
    this.tileSize.w *= 2;
    this.tileSize.h *= 2;

    // 设置初始滚动位置
    this.scroll.current.x = this.scroll.target.x = this.scroll.last.x = -this.winW * 0.1;
    this.scroll.current.y = this.scroll.target.y = this.scroll.last.y = -this.winH * 0.1;
  }

  /**
   * 创建单个网格项目
   */
  createGridItem(base, offsetX, offsetY) {
    // 创建主容器
    const el = document.createElement('div');
    el.classList.add('item');
    el.style.width = `${base.w}px`;

    // 创建包装器
    const wrapper = document.createElement('div');
    wrapper.classList.add('item-wrapper');
    el.appendChild(wrapper);

    // 创建图片容器
    const itemImage = document.createElement('div');
    itemImage.classList.add('item-image');
    itemImage.style.width = `${base.w}px`;
    itemImage.style.height = `${base.h}px`;
    wrapper.appendChild(itemImage);

    // 创建图片元素
    const img = new Image();
    // 如果src已经是完整路径则直接使用，否则添加/images/前缀
    img.src = base.src.startsWith('/') ? base.src : `/images/${base.src}`;
    img.alt = 'Grid item';
    itemImage.appendChild(img);

    // 创建说明文字
    const caption = document.createElement('small');
    caption.innerHTML = base.caption;
    
    // 使用SplitText创建文字动画
    if (typeof SplitText !== 'undefined') {
      const split = new SplitText(caption, { 
        type: 'lines', 
        mask: 'lines', 
        linesClass: 'line' 
      });
      split.lines.forEach((line, i) => {
        line.style.transitionDelay = `${i * 0.15}s`;
        line.parentElement.style.transitionDelay = `${i * 0.15}s`;
      });
    }
    
    wrapper.appendChild(caption);
    this.$container.appendChild(el);
    this.observer.observe(caption);

    // 添加到项目数组
    this.items.push({
      el,
      container: itemImage,
      wrapper,
      img,
      x: base.x + offsetX,
      y: base.y + offsetY,
      w: base.w,
      h: base.h,
      extraX: 0,
      extraY: 0,
      rect: el.getBoundingClientRect(),
      ease: Math.random() * 0.5 + 0.5,
    });
  }

  /**
   * 鼠标滚轮事件处理
   */
  onWheel(e) {
    e.preventDefault();
    const factor = 0.4;
    this.scroll.target.x -= e.deltaX * factor;
    this.scroll.target.y -= e.deltaY * factor;
  }

  /**
   * 鼠标按下事件处理
   */
  onMouseDown(e) {
    e.preventDefault();
    this.isDragging = true;
    document.documentElement.classList.add('dragging');
    this.mouse.press.t = 1;
    this.drag.startX = e.clientX;
    this.drag.startY = e.clientY;
    this.drag.scrollX = this.scroll.target.x;
    this.drag.scrollY = this.scroll.target.y;
  }

  /**
   * 鼠标释放事件处理
   */
  onMouseUp() {
    this.isDragging = false;
    document.documentElement.classList.remove('dragging');
    this.mouse.press.t = 0;
  }

  /**
   * 鼠标移动事件处理
   */
  onMouseMove(e) {
    this.mouse.x.t = e.clientX / this.winW;
    this.mouse.y.t = e.clientY / this.winH;

    if (this.isDragging) {
      const dx = e.clientX - this.drag.startX;
      const dy = e.clientY - this.drag.startY;
      this.scroll.target.x = this.drag.scrollX + dx;
      this.scroll.target.y = this.drag.scrollY + dy;
    }
  }

  /**
   * 渲染循环
   */
  render() {
    if (this.isDestroyed) return;

    // 更新滚动位置
    this.scroll.current.x += (this.scroll.target.x - this.scroll.current.x) * this.scroll.ease;
    this.scroll.current.y += (this.scroll.target.y - this.scroll.current.y) * this.scroll.ease;

    // 计算滚动增量
    this.scroll.delta.x.t = this.scroll.current.x - this.scroll.last.x;
    this.scroll.delta.y.t = this.scroll.current.y - this.scroll.last.y;
    this.scroll.delta.x.c += (this.scroll.delta.x.t - this.scroll.delta.x.c) * 0.04;
    this.scroll.delta.y.c += (this.scroll.delta.y.t - this.scroll.delta.y.c) * 0.04;
    
    // 更新鼠标位置
    this.mouse.x.c += (this.mouse.x.t - this.mouse.x.c) * 0.04;
    this.mouse.y.c += (this.mouse.y.t - this.mouse.y.c) * 0.04;
    this.mouse.press.c += (this.mouse.press.t - this.mouse.press.c) * 0.04;

    // 确定滚动方向
    const dirX = this.scroll.current.x > this.scroll.last.x ? 'right' : 'left';
    const dirY = this.scroll.current.y > this.scroll.last.y ? 'down' : 'up';

    // 更新每个网格项目的位置
    this.items.forEach(item => {
      // 计算视差效果
      const newX = 5 * this.scroll.delta.x.c * item.ease + (this.mouse.x.c - 0.5) * item.rect.width * 0.6;
      const newY = 5 * this.scroll.delta.y.c * item.ease + (this.mouse.y.c - 0.5) * item.rect.height * 0.6;
      
      const scrollX = this.scroll.current.x;
      const scrollY = this.scroll.current.y;
      const posX = item.x + scrollX + item.extraX + newX;
      const posY = item.y + scrollY + item.extraY + newY;

      // 无限滚动逻辑 - X轴
      const beforeX = posX > this.winW;
      const afterX = posX + item.rect.width < 0;
      if (dirX === 'right' && beforeX) item.extraX -= this.tileSize.w;
      if (dirX === 'left' && afterX) item.extraX += this.tileSize.w;

      // 无限滚动逻辑 - Y轴
      const beforeY = posY > this.winH;
      const afterY = posY + item.rect.height < 0;
      if (dirY === 'down' && beforeY) item.extraY -= this.tileSize.h;
      if (dirY === 'up' && afterY) item.extraY += this.tileSize.h;

      // 应用最终位置
      const fx = item.x + scrollX + item.extraX + newX;
      const fy = item.y + scrollY + item.extraY + newY;
      item.el.style.transform = `translate(${fx}px, ${fy}px)`;
      
      // 应用图片的缩放和视差效果
      const scale = 1.2 + 0.2 * this.mouse.press.c * item.ease;
      const translateX = -this.mouse.x.c * item.ease * 10;
      const translateY = -this.mouse.y.c * item.ease * 10;
      item.img.style.transform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;
    });

    // 更新上一帧的滚动位置
    this.scroll.last.x = this.scroll.current.x;
    this.scroll.last.y = this.scroll.current.y;

    // 继续渲染循环
    requestAnimationFrame(this.render);
  }

  /**
   * 销毁组件
   */
  destroy() {
    this.isDestroyed = true;
    this.removeEventListeners();
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.$container) {
      this.$container.innerHTML = '';
    }
  }
}

// 将InfiniteGrid暴露为全局变量
window.InfiniteGrid = InfiniteGrid;

/**
 * Astro组件初始化函数
 * 在Astro组件中调用此函数来初始化网格
 */
function initInfiniteGrid(options) {
  // 确保在客户端环境中运行
  if (typeof window === 'undefined') {
    console.warn('initInfiniteGrid: 只能在客户端环境中运行');
    return null;
  }

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(new InfiniteGrid(options));
      });
    });
  } else {
    return new InfiniteGrid(options);
  }
}

/**
 * 默认配置
 */
const defaultConfig = {
  originalSize: { w: 1522, h: 1238 },
  sources: [
    { src: 'image-1.jpg', caption: '30 knots <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2021' },
    { src: 'image-2.jpg', caption: 'Sad Mis-Step <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024' },
    { src: 'image-3.jpg', caption: 'Mini Orange <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2014' },
    { src: 'image-4.jpg', caption: 'After Storm <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022' },
    { src: 'image-5.jpg', caption: 'Untitled <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2016' },
    { src: 'image-6.jpg', caption: 'Toilet Paper <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022' },
    { src: 'image-7.jpg', caption: 'Cocoa Eggplant Tomato <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2025' },
    { src: 'image-8.jpg', caption: 'Toilet Paper <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2022' },
    { src: 'image-9.jpg', caption: 'Production Fun Fact (Eggs) <br>12 x 16 inch C type hand print <br>Edition of 1 Plus an additional artist Proof <br>2024' },
  ],
  data: [
    { x: 71, y: 58, w: 400, h: 270 },
    { x: 211, y: 255, w: 540, h: 360 },
    { x: 631, y: 158, w: 400, h: 270 },
    { x: 1191, y: 245, w: 260, h: 195 },
    { x: 351, y: 687, w: 260, h: 290 },
    { x: 751, y: 824, w: 205, h: 154 },
    { x: 911, y: 540, w: 260, h: 350 },
    { x: 1051, y: 803, w: 400, h: 300 },
    { x: 71, y: 922, w: 350, h: 260 },
  ]
};