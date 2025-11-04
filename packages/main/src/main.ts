import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron';
import * as path from 'path';
import isDev from 'electron-is-dev';
import { APP_CONFIG, IPC_CHANNELS } from '@electron-react-monorepo/shared';
import { setupIpcHandlers } from './ipc';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function getIconPath(): string {
  // 根据平台返回不同的图标路径
  const iconName = process.platform === 'win32' ? 'icon.ico' : 'icon.png';
  const iconPath = path.join(__dirname, '../assets/icons', iconName);
  return iconPath;
}

function createTray(): void {
  const iconPath = getIconPath();

  // 创建托盘图标
  try {
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon.resize({ width: 16, height: 16 }));

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '显示窗口',
        click: () => {
          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
          }
        },
      },
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setToolTip('Electron App');
    tray.setContextMenu(contextMenu);

    // 点击托盘图标显示窗口
    tray.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    });
  } catch (error) {
    console.log('托盘图标创建失败，将继续运行:', error);
  }
}

function createWindow(): void {
  const iconPath = getIconPath();
  const isMac = process.platform === 'darwin';
  const isWin = process.platform === 'win32';

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: iconPath,
    show: false, // 先不显示，等内容加载完成后再显示
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    // Windows 和 macOS 的原生标题栏配置
    frame: true, // 使用原生标题栏
    titleBarStyle: isMac ? 'default' : undefined, // macOS 使用默认标题栏样式
    // 注意：transparent 与原生标题栏按钮冲突，macOS 上需要禁用
    transparent: false, // 禁用透明以显示原生按钮
    backgroundColor: '#ffffff', // 使用白色背景
    vibrancy: isMac ? 'under-window' : undefined, // macOS 使用 vibrancy 实现毛玻璃效果
    visualEffectState: isMac ? 'active' : undefined,
    hasShadow: true,
    // Windows 特定配置
    ...(isWin && {
      autoHideMenuBar: true, // Windows 自动隐藏菜单栏
    }),
  });

  // Load the app
  const devPort = process.env.RENDERER_PORT || '3000';

  let startUrl: string;
  if (isDev) {
    startUrl = `http://localhost:${devPort}`;
  } else {
    // 生产环境：extraResources 会放在 app.asar 同级目录
    const resourcesPath = process.resourcesPath;
    const rendererPath = path.join(resourcesPath, 'renderer/out/index.html');
    startUrl = `file://${rendererPath}`;
    console.log('Loading production build from:', startUrl);
    console.log('Resources path:', resourcesPath);
  }

  // Try to load the URL, if it fails, try other common ports
  const tryLoadUrl = async () => {
    if (!isDev) {
      // 生产环境直接加载打包后的文件
      try {
        await mainWindow?.loadURL(startUrl);
        console.log('Successfully loaded production build');
      } catch (error) {
        console.error('Failed to load production build:', error);
        console.error('Attempted to load from:', startUrl);
        // 即使加载失败也显示窗口，方便调试
        if (mainWindow) {
          mainWindow.show();
        }
      }
    } else {
      // 开发环境尝试多个端口
      const portsToTry = [devPort, '3000', '3001', '3002', '3003', '3004', '3005', '3006'];
      const uniquePorts = Array.from(new Set(portsToTry));

      for (const port of uniquePorts) {
        const url = `http://localhost:${port}`;
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
    }
  };

  tryLoadUrl();

  // 页面加载完成后显示窗口
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Page loaded successfully');
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // 如果加载失败，也显示窗口（避免窗口永远不显示）
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Page failed to load:');
    console.error('Error code:', errorCode);
    console.error('Error description:', errorDescription);
    console.error('URL:', validatedURL);
    if (mainWindow) {
      mainWindow.show();
    }
  });

  // 添加超时保护：5秒后如果还没显示就强制显示
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      console.log('Timeout: Forcing window to show');
      mainWindow.show();
    }
  }, 5000);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray();
  setupIpcHandlers(ipcMain);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // macOS 上保持托盘运行
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // 清理托盘
  if (tray) {
    tray.destroy();
  }
});

// Export for IPC handlers
export { mainWindow };
