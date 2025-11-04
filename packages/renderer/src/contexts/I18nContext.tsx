'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation, translations } from '@/lib/i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['zh-CN']) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh-CN');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) setLanguageState(savedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: keyof typeof translations['zh-CN']) => {
    return getTranslation(language, key);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
