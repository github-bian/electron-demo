// 主题颜色配置
export const themeColors = {
    blue: {
        light: {
            primary: '#3b82f6',
            primaryLight: '#60a5fa',
            primaryDark: '#2563eb',
            background: 'rgba(255, 255, 255, 0.85)',
            sidebarBg: 'rgba(249, 250, 251, 0.7)',
            text: '#1f2937',
            textSecondary: '#6b7280',
            border: 'rgba(229, 231, 235, 0.5)',
        },
        dark: {
            primary: '#60a5fa',
            primaryLight: '#93c5fd',
            primaryDark: '#3b82f6',
            background: 'rgba(17, 24, 39, 0.85)',
            sidebarBg: 'rgba(31, 41, 55, 0.7)',
            text: '#f9fafb',
            textSecondary: '#9ca3af',
            border: 'rgba(75, 85, 99, 0.5)',
        },
    },
    purple: {
        light: {
            primary: '#9333ea',
            primaryLight: '#a855f7',
            primaryDark: '#7e22ce',
            background: 'rgba(255, 255, 255, 0.85)',
            sidebarBg: 'rgba(249, 250, 251, 0.7)',
            text: '#1f2937',
            textSecondary: '#6b7280',
            border: 'rgba(229, 231, 235, 0.5)',
        },
        dark: {
            primary: '#a855f7',
            primaryLight: '#c084fc',
            primaryDark: '#9333ea',
            background: 'rgba(17, 24, 39, 0.85)',
            sidebarBg: 'rgba(31, 41, 55, 0.7)',
            text: '#f9fafb',
            textSecondary: '#9ca3af',
            border: 'rgba(75, 85, 99, 0.5)',
        },
    },
    green: {
        light: {
            primary: '#10b981',
            primaryLight: '#34d399',
            primaryDark: '#059669',
            background: 'rgba(255, 255, 255, 0.85)',
            sidebarBg: 'rgba(249, 250, 251, 0.7)',
            text: '#1f2937',
            textSecondary: '#6b7280',
            border: 'rgba(229, 231, 235, 0.5)',
        },
        dark: {
            primary: '#34d399',
            primaryLight: '#6ee7b7',
            primaryDark: '#10b981',
            background: 'rgba(17, 24, 39, 0.85)',
            sidebarBg: 'rgba(31, 41, 55, 0.7)',
            text: '#f9fafb',
            textSecondary: '#9ca3af',
            border: 'rgba(75, 85, 99, 0.5)',
        },
    },
    red: {
        light: {
            primary: '#ef4444',
            primaryLight: '#f87171',
            primaryDark: '#dc2626',
            background: 'rgba(255, 255, 255, 0.85)',
            sidebarBg: 'rgba(249, 250, 251, 0.7)',
            text: '#1f2937',
            textSecondary: '#6b7280',
            border: 'rgba(229, 231, 235, 0.5)',
        },
        dark: {
            primary: '#f87171',
            primaryLight: '#fca5a5',
            primaryDark: '#ef4444',
            background: 'rgba(17, 24, 39, 0.85)',
            sidebarBg: 'rgba(31, 41, 55, 0.7)',
            text: '#f9fafb',
            textSecondary: '#9ca3af',
            border: 'rgba(75, 85, 99, 0.5)',
        },
    },
};

export type ThemeColor = keyof typeof themeColors;
export type ThemeMode = 'light' | 'dark';

export function getTheme(color: ThemeColor, mode: ThemeMode) {
    return themeColors[color][mode];
}
