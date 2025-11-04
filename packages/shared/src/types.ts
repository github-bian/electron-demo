// Window State
export interface WindowState {
  width: number;
  height: number;
  x?: number;
  y?: number;
  isMaximized: boolean;
  isFullScreen: boolean;
}

// App Info
export interface AppInfo {
  name: string;
  version: string;
  platform: string;
  arch: string;
}

// IPC Response
export interface IPCResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
}
