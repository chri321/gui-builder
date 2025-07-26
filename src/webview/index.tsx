import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 扩展 Window 接口
declare global {
  interface Window {
    hideLoading?: () => void;
  }
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  
  // 渲染应用
  root.render(<App />);
  
  // 应用加载完成后隐藏加载动画
  setTimeout(() => {
    if (window.hideLoading) {
      window.hideLoading();
    }
  }, 100); // 短暂延迟确保 React 已经渲染完成
} 