'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeColor, ThemeMode, getTheme } from '@/lib/theme';

interface ThemeContextType {
  themeColor: ThemeColor;
  themeMode: ThemeMode;
  opacity: number;
  setThemeColor: (color: ThemeColor) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setOpacity: (opacity: number) => void;
  theme: ReturnType<typeof getTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>('blue');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [opacity, setOpacityState] = useState<number>(85);

  // 从 localStorage 读取主题设置
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    const savedOpacity = localStorage.getItem('opacity');
    
    if (savedColor) setThemeColorState(savedColor);
    if (savedMode) setThemeModeState(savedMode);
    if (savedOpacity) setOpacityState(Number(savedOpacity));
  }, []);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem('themeColor', color);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
  };

  const setOpacity = (value: number) => {
    setOpacityState(value);
    localStorage.setItem('opacity', value.toString());
  };

  const theme = getTheme(themeColor, themeMode);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        themeMode,
        opacity,
        setThemeColor,
        setThemeMode,
        setOpacity,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
