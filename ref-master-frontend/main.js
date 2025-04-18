const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'dist/ref-master-frontend/assets/icon.png'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false
    }
  });

  win.loadFile(path.join(__dirname, 'dist', 'ref-master-frontend', 'index.html'));
  win.webContents.openDevTools();
  win.removeMenu();
}

app.whenReady().then(createWindow);
app.on('error', (error) => {
  console.error('Electron Error:', error);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
