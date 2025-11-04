'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HomeOutlined, 
  MessageOutlined, 
  SettingOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/contexts/I18nContext';

export default function Navigation() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { t } = useI18n();

  const navItems = [
    { path: '/', icon: HomeOutlined, labelKey: 'home' as const },
    { path: '/chat', icon: MessageOutlined, labelKey: 'chat' as const },
    { path: '/docs', icon: FileTextOutlined, labelKey: 'docs' as const },
    { path: '/settings', icon: SettingOutlined, labelKey: 'settings' as const },
  ];

  return (
    <nav className="flex flex-col space-y-1 p-3">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        
        return (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={item.path}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? `${theme.primary}15` : 'transparent',
                  color: isActive ? theme.primary : theme.textSecondary,
                }}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{t(item.labelKey)}</span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
