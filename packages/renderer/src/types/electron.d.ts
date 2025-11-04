declare global {
  interface Window {
    electronAPI?: {
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
    };
  }
}

export { };
