'use client';

import React from 'react';
import { ConfigProvider, theme } from 'antd';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/providers/ThemeProvider';
import '@/styles/globals.css';

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
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
