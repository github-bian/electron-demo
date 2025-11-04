'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Button } from 'antd';
import { 
  SettingOutlined,
  MinusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider as StyledThemeProvider } from '@/providers/ThemeProvider';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { I18nProvider, useI18n } from '@/contexts/I18nContext';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme: currentTheme, opacity } = useTheme();
  const { t } = useI18n();

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      window.close();
    }
  };

  const handleMinimize = () => {
    // 需要在 IPC 中实现最小化功能
  };

  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return t('home');
      case '/chat':
        return t('chat');
      case '/docs':
        return t('docs');
      case '/settings':
        return t('settings');
      default:
        return 'Electron App';
    }
  };

  // 根据透明度调整背景色
  const getBackgroundWithOpacity = (color: string) => {
    const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    return color;
  };

  return (
    <div 
      className="h-screen flex"
      style={{
        background: getBackgroundWithOpacity(currentTheme.background),
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: 'none',
        outline: 'none'
      }}
    >
      {/* 侧边栏 */}
      <div 
        className="w-64 border-r flex flex-col"
        style={{ 
          background: getBackgroundWithOpacity(currentTheme.sidebarBg),
          borderRight: `1px solid ${currentTheme.border}`,
        }}
      >
        {/* Logo 区域 - 可拖动 */}
        <div 
          className="flex items-center space-x-2 px-4 py-4 border-b"
          style={{ 
            WebkitAppRegion: 'drag',
            borderBottom: `1px solid ${currentTheme.border}`,
          } as any}
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
        {/* 自定义标题栏 - 可拖动 */}
        <div 
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ 
            WebkitAppRegion: 'drag',
            borderBottom: `1px solid ${currentTheme.border}`,
          } as any}
        >
          <div className="flex items-center space-x-2">
            <span 
              className="text-sm font-medium"
              style={{ color: currentTheme.primary }}
            >
              {getPageTitle()}
            </span>
          </div>
          
          <div className="flex items-center space-x-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
            <Button 
              type="text" 
              size="small" 
              icon={<SettingOutlined />}
              onClick={() => router.push('/settings')}
              style={{ color: currentTheme.textSecondary }}
            />
            <Button 
              type="text" 
              size="small" 
              icon={<MinusOutlined />}
              onClick={handleMinimize}
              style={{ color: currentTheme.textSecondary }}
            />
            <Button 
              type="text" 
              size="small" 
              icon={<CloseOutlined />}
              onClick={handleClose}
              style={{ color: currentTheme.textSecondary }}
              className="hover:text-red-500"
            />
          </div>
        </div>

        {/* 页面内容区域 */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
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
          <StyledThemeProvider>
            <ThemeProvider>
              <I18nProvider>
                <LayoutContent>{children}</LayoutContent>
              </I18nProvider>
            </ThemeProvider>
          </StyledThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
