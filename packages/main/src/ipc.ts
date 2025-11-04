import { IpcMain, app, dialog, BrowserWindow } from 'electron';
import { IPC_CHANNELS } from '@electron-react-monorepo/shared';

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
