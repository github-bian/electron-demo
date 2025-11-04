'use client';

import React, { Suspense } from 'react';
import { ConfigProvider, theme as antdTheme, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useRouter, usePathname } from 'next/navigation';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { I18nProvider, useI18n } from '@/contexts/I18nContext';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme: currentTheme, themeMode, opacity } = useTheme();
  const { t } = useI18n();

  // 检测操作系统平台
  const [isMac, setIsMac] = React.useState(false);
  
  React.useEffect(() => {
    // 优先使用 Electron API
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsMac(window.electronAPI.isMac);
    } else {
      // 退回方案：通过 navigator 检测
      setIsMac(navigator.platform.toLowerCase().includes('mac'));
    }
  }, []);

  // 根据透明度调整背景色
  const getBackgroundWithOpacity = (color: string) => {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    return color;
  };

  // 获取平台特定的背景样式
  const getBackgroundStyle = (color: string) => {
    if (isMac) {
      // macOS: 使用 vibrancy 效果，背景需要是半透明的
      return {
        background: getBackgroundWithOpacity(color),
      };
    } else {
      // Windows/Linux: 使用实色背景
      return {
        background: themeMode === 'dark' ? '#1f2937' : '#ffffff',
      };
    }
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: currentTheme.primary,
          borderRadius: 8,
        },
      }}
    >
      <div 
      className="h-screen flex"
      style={{
        ...getBackgroundStyle(currentTheme.background),
        borderRadius: '0px', // 原生标题栏不需要圆角
        overflow: 'hidden',
        border: 'none',
        outline: 'none'
      }}
    >
      {/* 侧边栏 */}
      <div 
        className="w-64 border-r flex flex-col"
        style={{ 
          ...(isMac 
            ? { background: getBackgroundWithOpacity(currentTheme.sidebarBg) }
            : { background: themeMode === 'dark' ? '#111827' : '#f9fafb' }
          ),
          borderRight: `1px solid ${currentTheme.border}`,
        }}
      >
        {/* Logo 区域 */}
        <div 
          className="flex items-center space-x-2 px-4 py-4 border-b"
          style={{ 
            borderBottom: `1px solid ${currentTheme.border}`,
          }}
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.primaryLight} 100%)`,
            }}
          >
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span 
            className="text-sm font-medium"
            style={{ color: currentTheme.primary }}
          >
            Electron App
          </span>
        </div>

        {/* 导航菜单 */}
        <div className="flex-1 py-4 overflow-auto">
          <Navigation />
        </div>

        {/* 底部版本信息 */}
        <div 
          className="p-4 border-t"
          style={{ borderTop: `1px solid ${currentTheme.border}` }}
        >
          <div 
            className="text-xs text-center"
            style={{ color: currentTheme.primary }}
          >
            v1.0.0
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 页面内容区域 */}
        <div className="flex-1 overflow-auto">
          <Suspense 
            fallback={
              <div className="h-full flex items-center justify-center">
                <Spin size="large" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>Electron React App</title>
        <meta name="description" content="A modern Electron desktop app" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <I18nProvider>
              <LayoutContent>{children}</LayoutContent>
            </I18nProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
