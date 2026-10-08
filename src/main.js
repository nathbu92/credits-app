const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

app.setPath('userData', path.join(app.getPath('appData'), 'CreditsAdmin'));

let splashWindow = null;
let mainWindow   = null;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 480, height: 300,
    frame: false, transparent: true, alwaysOnTop: true,
    resizable: false, center: true, skipTaskbar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true },
  });
  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
}

function createMain() {
  mainWindow = new BrowserWindow({
    width: 1100, height: 800,
    minWidth: 800, minHeight: 600,
    frame: true,                 // ← BARRE NATIVE (Windows : réduire/agrandir/fermer)
    show: false,
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,        // ← nécessaire pour fetch vers Tailscale depuis file://
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'admin.html'));

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      if (splashWindow && !splashWindow.isDestroyed()) splashWindow.destroy();
      mainWindow.show();
      mainWindow.focus();
    }, 2800);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

// IPC conservés par compatibilité (utiles si un jour on remet un frame custom)
ipcMain.on('window-minimize', () => mainWindow && mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (!mainWindow) return;
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow && mainWindow.close());

app.whenReady().then(() => {
  createSplash();
  createMain();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});