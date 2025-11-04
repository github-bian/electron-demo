// IPC Channel Names
export const IPC_CHANNELS = {
  WINDOW: {
    MINIMIZE: 'window:minimize',
    MAXIMIZE: 'window:maximize',
    CLOSE: 'window:close',
    RESIZE: 'window:resize',
    OPEN_SETTINGS: 'window:open-settings',
  },
  APP: {
    GET_VERSION: 'app:get-version',
    GET_PATH: 'app:get-path',
    QUIT: 'app:quit',
  },
  DIALOG: {
    SHOW_OPEN: 'dialog:show-open',
    SHOW_SAVE: 'dialog:show-save',
    SHOW_MESSAGE: 'dialog:show-message',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  WINDOW: {
    MIN_WIDTH: 800,
    MIN_HEIGHT: 600,
    DEFAULT_WIDTH: 1200,
    DEFAULT_HEIGHT: 800,
  },
} as const;
