import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '@electron-react-monorepo/shared';

// 获取平台信息
const platform = process.platform;

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform info
  platform: platform,
  isMac: platform === 'darwin',
  isWindows: platform === 'win32',
  isLinux: platform === 'linux',

  // Window controls
  minimizeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW.MINIMIZE),
  maximizeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW.MAXIMIZE),
  closeWindow: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW.CLOSE),
  openSettings: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW.OPEN_SETTINGS),

  // App info
  getVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP.GET_VERSION),
  getPath: (name: string) => ipcRenderer.invoke(IPC_CHANNELS.APP.GET_PATH, name),
  quit: () => ipcRenderer.invoke(IPC_CHANNELS.APP.QUIT),

  // Dialog
  showOpenDialog: (options: any) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG.SHOW_OPEN, options),
  showSaveDialog: (options: any) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG.SHOW_SAVE, options),
  showMessageBox: (options: any) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG.SHOW_MESSAGE, options),
});

// Type definitions for TypeScript
export interface ElectronAPI {
  platform: string;
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  openSettings: () => Promise<void>;
  getVersion: () => Promise<string>;
  getPath: (name: string) => Promise<string>;
  quit: () => Promise<void>;
  showOpenDialog: (options: any) => Promise<any>;
  showSaveDialog: (options: any) => Promise<any>;
  showMessageBox: (options: any) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
