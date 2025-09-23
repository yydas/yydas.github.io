"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Drawer = ({ 
  isOpen, 
  onClose, 
  children, 
  title = "抽屉", 
  position = "left",
  className = "" 
}) => {
  const drawerRef = useRef(null);

  // 处理 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 点击外部关闭
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 滑动手势支持
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      // 只允许向左滑动关闭（从左侧抽屉）
      if (position === 'left' && deltaX < -50) {
        onClose();
        isDragging = false;
      }
      // 只允许向右滑动关闭（从右侧抽屉）
      else if (position === 'right' && deltaX > 50) {
        onClose();
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const drawer = drawerRef.current;
    drawer.addEventListener('touchstart', handleTouchStart, { passive: true });
    drawer.addEventListener('touchmove', handleTouchMove, { passive: true });
    drawer.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      drawer.removeEventListener('touchstart', handleTouchStart);
      drawer.removeEventListener('touchmove', handleTouchMove);
      drawer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onClose, position]);

  // 动画配置
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: {
      x: position === 'left' ? '-100%' : '100%',
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    visible: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* 遮罩层 */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleBackdropClick}
          />
          
          {/* 抽屉内容 */}
          <motion.div
            ref={drawerRef}
            className={`
              relative bg-white dark:bg-neutral-900 shadow-2xl
              ${position === 'left' ? 'mr-auto' : 'ml-auto'}
              w-80 max-w-[85vw] h-full flex flex-col
              ${className}
            `}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* 抽屉头部 */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="关闭抽屉"
              >
                <svg 
                  className="w-5 h-5 text-neutral-500 dark:text-neutral-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* 抽屉内容区域 */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* 滑动提示 */}
            <div className="p-2 text-center">
              <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto"></div>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                向{position === 'left' ? '左' : '右'}滑动关闭
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;