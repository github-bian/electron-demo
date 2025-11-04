import { IpcMain, app, dialog, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from '@electron-react-monorepo/shared';
import * as path from 'path';
import isDev from 'electron-is-dev';

let settingsWindow: BrowserWindow | null = null;

export function setupIpcHandlers(ipcMain: IpcMain): void {
  // Window controls
  ipcMain.handle(IPC_CHANNELS.WINDOW.MINIMIZE, (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window?.minimize();
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW.MAXIMIZE, (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window?.isMaximized()) {
      window.unmaximize();
    } else {
      window?.maximize();
    }
  });

  ipcMain.handle(IPC_CHANNELS.WINDOW.CLOSE, (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window?.close();
  });

  // 打开设置窗口
  ipcMain.handle(IPC_CHANNELS.WINDOW.OPEN_SETTINGS, () => {
    if (settingsWindow) {
      settingsWindow.focus();
      return;
    }

    const isMac = process.platform === 'darwin';

    settingsWindow = new BrowserWindow({
      width: 700,
      height: 600,
      minWidth: 600,
      minHeight: 500,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      frame: true,
      titleBarStyle: isMac ? 'default' : undefined,
      transparent: false,
      backgroundColor: '#ffffff',
      vibrancy: isMac ? 'under-window' : undefined,
      visualEffectState: isMac ? 'active' : undefined,
      hasShadow: true,
      title: '设置',
      parent: BrowserWindow.getFocusedWindow() || undefined,
    });

    const devPort = process.env.RENDERER_PORT || '3000';
    const settingsUrl = isDev
      ? `http://localhost:${devPort}/settings`
      : `file://${path.join(process.resourcesPath, 'renderer/out/settings.html')}`;

    settingsWindow.loadURL(settingsUrl);

    settingsWindow.once('ready-to-show', () => {
      settingsWindow?.show();
    });

    settingsWindow.on('closed', () => {
      settingsWindow = null;
    });
  });

  // App info
  ipcMain.handle(IPC_CHANNELS.APP.GET_VERSION, () => {
    return app.getVersion();
  });

  ipcMain.handle(IPC_CHANNELS.APP.GET_PATH, (_, name: string) => {
    return app.getPath(name as any);
  });

  ipcMain.handle(IPC_CHANNELS.APP.QUIT, () => {
    app.quit();
  });

  // Dialog
  ipcMain.handle(IPC_CHANNELS.DIALOG.SHOW_OPEN, async (event, options) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;
    return dialog.showOpenDialog(window, options);
  });

  ipcMain.handle(IPC_CHANNELS.DIALOG.SHOW_SAVE, async (event, options) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;
    return dialog.showSaveDialog(window, options);
  });

  ipcMain.handle(IPC_CHANNELS.DIALOG.SHOW_MESSAGE, async (event, options) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return null;
    return dialog.showMessageBox(window, options);
  });
}
