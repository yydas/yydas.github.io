"use client";

import React, { useState, useEffect } from "react";

// PostList 组件的 React 版本，专门用于抽屉
export default function PostListDrawer({ onItemClick }) {
  const [items, setItems] = useState([]);
  const [isProjectPage, setIsProjectPage] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentPath(path);
    setIsProjectPage(path.startsWith('/project/'));
    
    // 获取文章和项目数据
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // 尝试从页面中获取数据
      // 首先检查是否有全局数据
      if (window.__ASTRO_CONTENT__) {
        const content = window.__ASTRO_CONTENT__;
        const contentItems = isProjectPage ? content.projects : content.posts;
        setItems(contentItems || []);
      } else {
        // 如果没有全局数据，尝试从DOM中提取
        const postListElement = document.querySelector('.post-list');
        if (postListElement) {
          const links = postListElement.querySelectorAll('a[href*="/post/"], a[href*="/project/"]');
          const extractedItems = Array.from(links).map(link => {
            const href = link.getAttribute('href');
            const title = link.textContent.trim();
            const slug = href.replace(/^\/(post|project)\//, '').replace(/\/$/, '');
            
            return {
              slug,
              data: {
                title,
                dateFormatted: new Date().toISOString() // 默认日期
              }
            };
          });
          
          setItems(extractedItems);
        } else {
          // 最后的备用方案：使用模拟数据
          const mockItems = isProjectPage ? [
            {
              slug: 'example-project-1',
              data: {
                title: '示例项目 1',
                dateFormatted: '2024-01-20'
              }
            }
          ] : [
            {
              slug: 'example-post-1',
              data: {
                title: '示例文章 1',
                dateFormatted: '2024-01-15'
              }
            },
            {
              slug: 'example-post-2', 
              data: {
                title: '示例文章 2',
                dateFormatted: '2024-01-10'
              }
            }
          ];
          
          setItems(mockItems);
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 按日期排序
  const sortedItems = items.sort((a, b) => {
    if (a.data.dateFormatted && b.data.dateFormatted) {
      return new Date(b.data.dateFormatted).getTime() - new Date(a.data.dateFormatted).getTime();
    }
    return a.data.title.localeCompare(b.data.title);
  });

  // 获取当前路径，如果是首页则使用第一条内容的路径
  const effectivePath = currentPath === '/' ? `/${isProjectPage ? 'project' : 'post'}/${sortedItems[0]?.slug}/` : currentPath;

  // 将内容按文件夹分组
  const groupedItems = sortedItems.reduce((groups, item) => {
    const parts = item.slug.split('/');
    const folder = parts.length > 1 ? parts[0] : '其他';
    if (!groups[folder]) {
      groups[folder] = [];
    }
    groups[folder].push(item);
    return groups;
  }, {});

  // 对分组进行排序
  const sortedGroups = Object.entries(groupedItems).sort(([a], [b]) => {
    if (a === '其他') return -1;
    if (b === '其他') return 1;
    return a.localeCompare(b);
  });

  // 规范化路径，移除末尾的斜杠并解码 URL
  const normalizePath = (path) => decodeURIComponent(path.replace(/\/$/, ''));

  // 检查路径是否匹配
  const isPathMatch = (current, target) => {
    const normalizedCurrent = normalizePath(current);
    const normalizedTarget = normalizePath(target);
    return normalizedCurrent === normalizedTarget;
  };

  // 处理项目点击
  const handleItemClick = (itemPath) => {
    if (onItemClick) {
      onItemClick();
    }
    // 导航到目标页面
    window.location.href = itemPath;
  };

  // 获取列表标题
  const listTitle = isProjectPage ? '项目列表' : '文章列表';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (sortedItems.length === 0) {
    return (
      <div className="post-list-drawer">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          暂无内容
        </div>
      </div>
    );
  }

  return (
    <div className="post-list-drawer p-3">
      
      <nav className="post-list">
        <ul>
          {sortedGroups.map(([folder, items]) => (
            <React.Fragment key={folder}>
              {folder !== '其他' && (
                <li className="py-2 px-3">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
                    {folder}
                  </h3>
                </li>
              )}
              {items.map((item) => {
                const itemPath = `/${isProjectPage ? 'project' : 'post'}/${item.slug}/`;
                const isActive = isPathMatch(effectivePath, itemPath);
                
                return (
                  <li
                    key={item.slug}
                    className={`border-l-2 ${
                      isActive
                        ? 'border-neutral-950 dark:border-neutral-50'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <button
                      onClick={() => handleItemClick(itemPath)}
                      className={`w-full text-left block py-2 px-3 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-neutral-500 ${
                        isActive
                          ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 font-semibold'
                          : 'text-neutral-500'
                      }`}
                    >
                      {item.data.title}
                    </button>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}