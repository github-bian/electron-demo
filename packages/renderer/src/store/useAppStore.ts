import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
}

interface AppState {
    // 消息相关
    messages: Message[];
    addMessage: (content: string, role: 'user' | 'assistant') => void;
    clearMessages: () => void;

    // 设置相关
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;

    // 侧边栏状态
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;

    // 当前路由
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            // 初始状态
            messages: [],
            theme: 'light',
            sidebarCollapsed: false,
            currentPage: 'home',

            // Actions
            addMessage: (content, role) =>
                set((state) => ({
                    messages: [
                        ...state.messages,
                        {
                            id: Date.now().toString(),
                            content,
                            role,
                            timestamp: Date.now(),
                        },
                    ],
                })),

            clearMessages: () => set({ messages: [] }),

            setTheme: (theme) => set({ theme }),

            toggleSidebar: () =>
                set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

            setCurrentPage: (page) => set({ currentPage: page }),
        }),
        {
            name: 'electron-app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
