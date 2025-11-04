'use client';

import React from 'react';
import { Card, Switch, Select, Button, Divider, Space, Radio, Slider } from 'antd';
import { 
  MoonOutlined, 
  SunOutlined,
  BgColorsOutlined,
  GlobalOutlined 
} from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/contexts/I18nContext';
import type { ThemeColor } from '@/lib/theme';
import type { Language } from '@/lib/i18n';

export default function SettingsPage() {
  const { themeColor, themeMode, opacity, setThemeColor, setThemeMode, setOpacity, theme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const themeOptions = [
    { label: t('blue'), value: 'blue' as ThemeColor },
    { label: t('purple'), value: 'purple' as ThemeColor },
    { label: t('green'), value: 'green' as ThemeColor },
    { label: t('red'), value: 'red' as ThemeColor },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-6" style={{ color: theme.primary }}>
          {t('settingsTitle')}
        </h1>

        {/* 外观设置 */}
        <Card title={<><BgColorsOutlined className="mr-2" style={{ color: theme.primary }} /><span style={{ color: theme.text }}>{t('appearance')}</span></>}>
          <div className="space-y-4">
            {/* 主题颜色 */}
            <div>
              <div className="font-medium mb-2" style={{ color: theme.text }}>{t('themeColor')}</div>
              <Radio.Group 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                optionType="button"
                buttonStyle="solid"
              >
                {themeOptions.map(option => (
                  <Radio.Button key={option.value} value={option.value}>
                    {option.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <Divider />

            {/* 深色模式 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium" style={{ color: theme.text }}>{t('darkMode')}</div>
                <div className="text-sm" style={{ color: theme.textSecondary }}>
                  {t('darkModeDesc')}
                </div>
              </div>
              <Space>
                <SunOutlined style={{ color: themeMode === 'light' ? theme.primary : theme.textSecondary }} />
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
                />
                <MoonOutlined style={{ color: themeMode === 'dark' ? theme.primary : theme.textSecondary }} />
              </Space>
            </div>

            <Divider />

            {/* 窗口透明度 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium" style={{ color: theme.text }}>{t('windowOpacity')}</div>
                  <div className="text-sm" style={{ color: theme.textSecondary }}>
                    {t('windowOpacityDesc')}
                  </div>
                </div>
                <span className="font-medium" style={{ color: theme.primary }}>{opacity}%</span>
              </div>
              <Slider
                min={60}
                max={100}
                value={opacity}
                onChange={setOpacity}
                tooltip={{ formatter: (value) => `${value}%` }}
              />
            </div>
          </div>
        </Card>

        {/* 语言设置 */}
        <Card title={<><GlobalOutlined className="mr-2" style={{ color: theme.primary }} /><span style={{ color: theme.text }}>{t('language')}</span></>}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium" style={{ color: theme.text }}>{t('displayLanguage')}</div>
              <div className="text-sm" style={{ color: theme.textSecondary }}>
                {t('displayLanguageDesc')}
              </div>
            </div>
            <Select
              value={language}
              onChange={(value: Language) => setLanguage(value)}
              style={{ width: 150 }}
              options={[
                { value: 'zh-CN', label: '简体中文' },
                { value: 'en-US', label: 'English' },
                { value: 'ja-JP', label: '日本語' },
              ]}
            />
          </div>
        </Card>

        {/* 关于 */}
        <Card title={<span style={{ color: theme.text }}>{t('about')}</span>}>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: theme.textSecondary }}>{t('appName')}</span>
              <span className="font-medium" style={{ color: theme.text }}>Electron Assistant</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.textSecondary }}>{t('versionNumber')}</span>
              <span className="font-medium" style={{ color: theme.text }}>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.textSecondary }}>{t('technology')}</span>
              <span className="font-medium" style={{ color: theme.text }}>React 19 + Next.js + Electron</span>
            </div>
            <Divider />
            <Button type="link" className="p-0 h-auto" style={{ color: theme.primary }}>
              {t('checkUpdate')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
