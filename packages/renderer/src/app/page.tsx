'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { 
  SendOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/contexts/I18nContext';

const { TextArea } = Input;

export default function HomePage() {
  const [message, setMessage] = React.useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useI18n();

  return (
    <div className="h-full flex flex-col">
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 max-w-2xl"
        >
          {/* Logo */}
          <div className="mb-6">
            <div 
              className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`
              }}
            >
              <span className="text-white font-bold text-3xl">E</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-3" style={{ color: theme.primary }}>
            {t('welcome')}
          </h1>
          <p className="text-lg mb-8" style={{ color: theme.textSecondary }}>
            {t('subtitle')}
          </p>

          {/* 快捷功能卡片 */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/chat')}
              className="p-4 rounded-xl cursor-pointer text-left"
              style={{
                background: `${theme.primary}10`,
                border: `1px solid ${theme.border}`
              }}
            >
              <div className="text-2xl mb-2">💬</div>
              <div className="text-sm font-medium" style={{ color: theme.text }}>{t('startChat')}</div>
              <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>{t('startChatDesc')}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl cursor-pointer text-left"
              style={{
                background: `${theme.primary}10`,
                border: `1px solid ${theme.border}`
              }}
            >
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-medium" style={{ color: theme.text }}>{t('techStack')}</div>
              <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>{t('techStackDesc')}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/docs')}
              className="p-4 rounded-xl cursor-pointer text-left"
              style={{
                background: `${theme.primary}10`,
                border: `1px solid ${theme.border}`
              }}
            >
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm font-medium" style={{ color: theme.text }}>{t('viewDocs')}</div>
              <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>{t('viewDocsDesc')}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/settings')}
              className="p-4 rounded-xl cursor-pointer text-left"
              style={{
                background: `${theme.primary}10`,
                border: `1px solid ${theme.border}`
              }}
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium" style={{ color: theme.text }}>{t('personalSettings')}</div>
              <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>{t('personalSettingsDesc')}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 底部输入框 */}
      <div className="p-4" style={{ borderTop: `1px solid ${theme.border}` }}>
        <div 
          className="flex items-end space-x-2 p-3 rounded-xl"
          style={{
            background: `${theme.primary}08`,
            border: `1px solid ${theme.border}`
          }}
        >
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('inputPlaceholder')}
            autoSize={{ minRows: 1, maxRows: 4 }}
            variant="borderless"
            className="flex-1"
            style={{ background: 'transparent', color: theme.text }}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />}
            disabled={!message.trim()}
            className="mb-1"
            style={{
              background: message.trim() ? theme.primary : undefined,
              border: 'none'
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="text-xs" style={{ color: theme.textSecondary }}>
            {t('poweredBy')}
          </div>
          <Button 
            type="link" 
            size="small" 
            icon={<GithubOutlined />}
            style={{ color: theme.textSecondary }}
          >
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
