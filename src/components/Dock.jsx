import React, { useState, useRef, useEffect } from 'react';

const Dock = ({ 
  items = [], 
  className = "", 
  distance = 100, 
  panelHeight = 68, 
  baseItemSize = 48, 
  dockHeight = 256, 
  magnification = 48 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // 检查暗色模式状态
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // 检查滚动位置
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // 检查是否为详情页面
    const checkDetailPage = () => {
      const path = window.location.pathname;
      const isDetail = path.includes('/post/') && path !== '/post' && path !== '/post/' ||
                      path.includes('/project/') && path !== '/project' && path !== '/project/';
      setIsDetailPage(isDetail);
    };

    const dock = dockRef.current;
    if (dock) {
      dock.addEventListener('mousemove', handleMouseMove);
      dock.addEventListener('mouseenter', handleMouseEnter);
      dock.addEventListener('mouseleave', handleMouseLeave);
    }

    // 初始化检查
    checkDarkMode();
    checkDetailPage();
    handleScroll();

    // 添加事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 监听暗色模式变化
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      if (dock) {
        dock.removeEventListener('mousemove', handleMouseMove);
        dock.removeEventListener('mouseenter', handleMouseEnter);
        dock.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const calculateItemSize = (itemIndex, itemsLength) => {
    if (!isHovering) return baseItemSize;

    const itemWidth = dockRef.current ? dockRef.current.offsetWidth / itemsLength : baseItemSize;
    const itemCenter = itemIndex * itemWidth + itemWidth / 2;
    const distanceFromMouse = Math.abs(mousePosition.x - itemCenter);
    
    if (distanceFromMouse < distance) {
      const scale = 1 + (1 - distanceFromMouse / distance) * (magnification - baseItemSize) / baseItemSize;
      return Math.min(baseItemSize * scale, magnification);
    }
    
    return baseItemSize;
  };

  // 功能函数
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.add("duration-300");
    
    if (html.classList.contains('dark')) {
      localStorage.removeItem("dark_mode");
      // 调用原有的 showDay 函数
      if (typeof window.showDay === 'function') {
        window.showDay(true);
      } else {
        html.classList.remove('dark');
      }
    } else {
      localStorage.setItem("dark_mode", true);
      // 调用原有的 showNight 函数
      if (typeof window.showNight === 'function') {
        window.showNight(true);
      } else {
        html.classList.add('dark');
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // 如果没有历史记录，根据当前路径返回到相应的列表页
      const path = window.location.pathname;
      if (path.includes('/post/')) {
        window.location.href = '/post';
      } else if (path.includes('/project/')) {
        window.location.href = '/project';
      } else {
        window.location.href = '/';
      }
    }
  };

  const defaultItems = [
    // 返回按钮（仅在详情页显示）
    ...(isDetailPage ? [{
      id: 'back',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      ),
      label: '返回',
      onClick: goBack,
      className: 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
    }] : []),
    
    {
      id: 'home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: '首页',
      href: '/'
    },
    
    // 暗色模式切换
    {
      id: 'theme',
      icon: (
        <div className="relative flex items-center justify-center w-6 h-6">
          <svg
            className={`absolute w-6 h-6 transition duration-700 transform ease ${isDarkMode ? 'hidden' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg
            className={`absolute w-6 h-6 transition duration-700 transform ease ${!isDarkMode ? 'hidden' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </div>
      ),
      label: isDarkMode ? '亮色模式' : '暗色模式',
      onClick: toggleDarkMode,
      className: 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300'
    },
    
    // 回到顶部（仅在有滚动时显示）
    ...(showScrollTop ? [{
      id: 'scroll-top',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      label: '回到顶部',
      onClick: scrollToTop,
      className: 'text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300'
    }] : []),
    
    {
      id: 'links',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      label: '链接',
      href: '/links'
    }
  ];

  const itemsToRender = items.length > 0 ? items : defaultItems;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div 
        ref={dockRef}
        className="flex items-end justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        style={{ height: `${panelHeight}px` }}
      >
        {itemsToRender.map((item, index) => {
          const size = calculateItemSize(index, itemsToRender.length);
          
          const ItemContent = () => (
            <div
              className={`
                flex items-center justify-center rounded-xl transition-all duration-200 ease-out cursor-pointer
                hover:bg-gray-100 dark:hover:bg-gray-700 relative group
                ${item.className || 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
              `}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                fontSize: typeof item.icon === 'string' ? `${size * 0.6}px` : 'inherit'
              }}
              onClick={item.onClick}
            >
              {typeof item.icon === 'string' ? (
                <span>{item.icon}</span>
              ) : (
                item.icon
              )}
              
              {/* 工具提示 */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
              </div>
            </div>
          );

          return (
            <div key={item.id || index} className="flex items-end">
              {item.href ? (
                <a href={item.href}>
                  <ItemContent />
                </a>
              ) : (
                <ItemContent />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;