export type Language = 'zh-CN' | 'en-US' | 'ja-JP';

export const translations = {
    'zh-CN': {
        // 通用
        home: '首页',
        chat: '对话',
        docs: '文档',
        settings: '设置',
        version: '版本号',

        // 首页
        welcome: '你好,我是 Electron 助手',
        subtitle: '基于 React 19 + Next.js 构建的现代化桌面应用',
        startChat: '开始对话',
        startChatDesc: '体验智能对话功能',
        techStack: '技术栈',
        techStackDesc: 'React 19 + TypeScript',
        viewDocs: '文档',
        viewDocsDesc: '查看使用指南',
        personalSettings: '设置',
        personalSettingsDesc: '个性化配置',
        inputPlaceholder: '输入消息...',
        poweredBy: 'Powered by Electron + React 19',

        // 设置页面
        settingsTitle: '设置',
        appearance: '外观',
        themeColor: '主题颜色',
        darkMode: '深色模式',
        darkModeDesc: '切换浅色/深色主题',
        windowOpacity: '窗口透明度',
        windowOpacityDesc: '调整窗口背景透明度',
        language: '语言',
        displayLanguage: '显示语言',
        displayLanguageDesc: '选择界面显示语言',
        about: '关于',
        appName: '应用名称',
        versionNumber: '版本号',
        technology: '技术栈',
        checkUpdate: '检查更新',

        // 文档页面
        documentation: '使用文档',
        docSubtitle: '快速了解如何使用这个 Electron 桌面应用',
        quickStart: '快速开始',
        quickStartDesc: '本项目基于 Electron + React 19 + Next.js 构建，采用 Monorepo 架构管理。',
        techStackTitle: '技术栈',
        projectStructure: '项目结构',
        coreFeatures: '核心特性',

        // 对话页面
        chatTitle: '智能对话',
        chatPlaceholder: '输入您的消息...',
        send: '发送',

        // 颜色
        blue: '蓝色',
        purple: '紫色',
        green: '绿色',
        red: '红色',
    },
    'en-US': {
        // Common
        home: 'Home',
        chat: 'Chat',
        docs: 'Docs',
        settings: 'Settings',
        version: 'Version',

        // Home
        welcome: 'Hello, I am Electron Assistant',
        subtitle: 'Modern desktop app built with React 19 + Next.js',
        startChat: 'Start Chat',
        startChatDesc: 'Experience intelligent conversation',
        techStack: 'Tech Stack',
        techStackDesc: 'React 19 + TypeScript',
        viewDocs: 'Documentation',
        viewDocsDesc: 'View user guide',
        personalSettings: 'Settings',
        personalSettingsDesc: 'Personalize configuration',
        inputPlaceholder: 'Type a message...',
        poweredBy: 'Powered by Electron + React 19',

        // Settings
        settingsTitle: 'Settings',
        appearance: 'Appearance',
        themeColor: 'Theme Color',
        darkMode: 'Dark Mode',
        darkModeDesc: 'Toggle light/dark theme',
        windowOpacity: 'Window Opacity',
        windowOpacityDesc: 'Adjust window background opacity',
        language: 'Language',
        displayLanguage: 'Display Language',
        displayLanguageDesc: 'Select interface display language',
        about: 'About',
        appName: 'Application Name',
        versionNumber: 'Version',
        technology: 'Technology',
        checkUpdate: 'Check for Updates',

        // Docs
        documentation: 'Documentation',
        docSubtitle: 'Quick guide to using this Electron desktop app',
        quickStart: 'Quick Start',
        quickStartDesc: 'This project is built with Electron + React 19 + Next.js using Monorepo architecture.',
        techStackTitle: 'Tech Stack',
        projectStructure: 'Project Structure',
        coreFeatures: 'Core Features',

        // Chat
        chatTitle: 'Intelligent Chat',
        chatPlaceholder: 'Type your message...',
        send: 'Send',

        // Colors
        blue: 'Blue',
        purple: 'Purple',
        green: 'Green',
        red: 'Red',
    },
    'ja-JP': {
        // 共通
        home: 'ホーム',
        chat: 'チャット',
        docs: 'ドキュメント',
        settings: '設定',
        version: 'バージョン',

        // ホーム
        welcome: 'こんにちは、Electron アシスタントです',
        subtitle: 'React 19 + Next.js で構築された最新のデスクトップアプリ',
        startChat: 'チャット開始',
        startChatDesc: 'インテリジェント会話を体験',
        techStack: '技術スタック',
        techStackDesc: 'React 19 + TypeScript',
        viewDocs: 'ドキュメント',
        viewDocsDesc: '使用ガイドを見る',
        personalSettings: '設定',
        personalSettingsDesc: 'パーソナライズ設定',
        inputPlaceholder: 'メッセージを入力...',
        poweredBy: 'Powered by Electron + React 19',

        // 設定
        settingsTitle: '設定',
        appearance: '外観',
        themeColor: 'テーマカラー',
        darkMode: 'ダークモード',
        darkModeDesc: 'ライト/ダークテーマの切り替え',
        windowOpacity: 'ウィンドウの透明度',
        windowOpacityDesc: 'ウィンドウ背景の透明度を調整',
        language: '言語',
        displayLanguage: '表示言語',
        displayLanguageDesc: 'インターフェース表示言語を選択',
        about: 'について',
        appName: 'アプリケーション名',
        versionNumber: 'バージョン',
        technology: '技術',
        checkUpdate: 'アップデートを確認',

        // ドキュメント
        documentation: 'ドキュメント',
        docSubtitle: 'この Electron デスクトップアプリの使い方を素早く理解',
        quickStart: 'クイックスタート',
        quickStartDesc: 'このプロジェクトは Electron + React 19 + Next.js で構築され、Monorepo アーキテクチャを採用しています。',
        techStackTitle: '技術スタック',
        projectStructure: 'プロジェクト構造',
        coreFeatures: 'コア機能',

        // チャット
        chatTitle: 'インテリジェントチャット',
        chatPlaceholder: 'メッセージを入力...',
        send: '送信',

        // 色
        blue: '青',
        purple: '紫',
        green: '緑',
        red: '赤',
    },
};

export function getTranslation(lang: Language, key: keyof typeof translations['zh-CN']): string {
    return translations[lang][key] || translations['zh-CN'][key] || key;
}
