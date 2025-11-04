import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import isDev from 'electron-is-dev';
import { APP_CONFIG, IPC_CHANNELS } from '@electron-react-monorepo/shared';
import { setupIpcHandlers } from './ipc';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 400,
    minWidth: 800,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    transparent: true,
    frame: false,
    backgroundColor: '#00000000',
    hasShadow: true,
    roundedCorners: true,
  });

  // Load the app
  const devPort = process.env.RENDERER_PORT || '3000';
  const startUrl = isDev
    ? `http://localhost:${devPort}`
    : `file://${path.join(__dirname, '../../renderer/out/index.html')}`;

  // Try to load the URL, if it fails, try other common ports
  const tryLoadUrl = async () => {
    const portsToTry = [devPort, '3000', '3001', '3002', '3003', '3004', '3005', '3006'];
    const uniquePorts = Array.from(new Set(portsToTry));

    for (const port of uniquePorts) {
      const url = isDev ? `http://localhost:${port}` : startUrl;
      try {
        await mainWindow?.loadURL(url);
        console.log(`Successfully loaded from port ${port}`);
        break;
      } catch (error) {
        console.log(`Failed to load from port ${port}, trying next...`);
        if (port === uniquePorts[uniquePorts.length - 1]) {
          console.error('Failed to load from all ports');
        }
      }
    }
  };

  tryLoadUrl();

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  setupIpcHandlers(ipcMain);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Export for IPC handlers
export { mainWindow };
