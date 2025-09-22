"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../utils/cn";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export const Dock = React.forwardRef(({
  className,
  children,
  direction = "middle",
  iconSize = 40,
  iconMagnification = DEFAULT_MAGNIFICATION,
  iconDistance = DEFAULT_DISTANCE,
  ...props
}, ref) => {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          mouseX: mouseX,
          magnification: iconMagnification,
          distance: iconDistance,
          size: iconSize,
        });
      }
      return child;
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      {...props}
      className={cn(
        "mx-auto flex h-[58px] w-max gap-2 rounded-2xl border p-2 backdrop-blur-md",
        "bg-white/10 border-white/20 dark:bg-black/10 dark:border-white/10",
        "supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-black/10",
        className
      )}
    >
      {renderChildren()}
    </motion.div>
  );
});

Dock.displayName = "Dock";

export const DockIcon = React.forwardRef(({
  size = DEFAULT_MAGNIFICATION,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}, ref) => {
  const innerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
  }, []);

  const distanceCalc = useTransform(mouseX || useMotionValue(Infinity), (val) => {
    const bounds = innerRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    // 在移动端禁用放大效果，始终保持原始尺寸
    isMobile ? [size, size, size] : [size, magnification, size]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={innerRef}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        "bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50",
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
});

DockIcon.displayName = "DockIcon";

// 默认的 Dock 组件
export default function DefaultDock({ items, className, ...props }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDetailPage, setIsDetailPage] = useState(false);

  useEffect(() => {
    // 检查当前主题
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // 检查是否为详情页面 - 支持多级路径，排除分页导航
    const checkDetailPage = () => {
      const path = window.location.pathname;
      // 匹配 /post/xxx 或 /project/xxx 格式的路径，支持多级目录
      // 但排除列表页和分页导航页（如 /post/page/1, /project/page/2）
      const isDetail = /^\/(post|project)\//.test(path) && 
                      path !== '/post/' && 
                      path !== '/project/' &&
                      !/^\/(post|project)\/page\/\d+\/?$/.test(path);
      setIsDetailPage(isDetail);
    };

    // 检查滚动位置
    const checkScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;
      setShowScrollTop(scrollTop > 100 && hasScrollbar);
    };

    // 初始检查
    checkTheme();
    checkDetailPage();
    checkScroll();

    // 监听主题变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // 监听滚动
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // 监听路由变化
    const handleRouteChange = () => {
      checkDetailPage();
      checkScroll();
    };
    
    // 监听 popstate 事件（浏览器前进后退）
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // 默认的 Dock 项目配置
  const defaultItems = [
    // 返回按钮 - 只在详情页显示
    ...(isDetailPage ? [{
      id: 'back',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      ),
      label: '返回',
      action: () => window.history.back()
    }] : []),
    {
      id: 'home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: '首页',
      action: () => window.location.href = '/'
    },
    {
      id: 'theme',
      icon: isDarkMode ? (
        // 暗色模式 - 显示太阳图标
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // 亮色模式 - 显示月亮图标
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      label: isDarkMode ? '切换到亮色模式' : '切换到暗色模式',
      action: () => {
        // 使用 main.js 中的主题切换逻辑
        document.documentElement.classList.add("duration-300");
        
        if (document.documentElement.classList.contains("dark")) {
          localStorage.removeItem("dark_mode");
          // 调用 main.js 中的 showDay 函数
          if (window.showDay) {
            window.showDay(true);
          } else {
            // 备用方案
            document.documentElement.classList.remove("dark");
          }
        } else {
          localStorage.setItem("dark_mode", true);
          // 调用 main.js 中的 showNight 函数
          if (window.showNight) {
            window.showNight(true);
          } else {
            // 备用方案
            document.documentElement.classList.add("dark");
          }
        }
      }
    },
    // 回到顶部按钮 - 只在有滚动条且滚动时显示
    ...(showScrollTop ? [{
      id: 'top',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      label: '回到顶部',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    }] : [])
  ];

  const finalItems = items || defaultItems;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Dock className={className} {...props}>
        {finalItems.map((item) => (
          <DockIcon
            key={item.id}
            className="text-gray-700 dark:text-gray-300"
            onClick={item.action}
            title={item.label}
          >
            {item.icon}
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}