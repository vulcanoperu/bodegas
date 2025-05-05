const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    console.log('Modo desarrollo - Cargando Vite dev server:', process.env.VITE_DEV_SERVER_URL);
    win.loadURL(process.env.VITE_DEV_SERVER_URL).catch(err => {
      console.error('Error al cargar Vite dev server:', err);
      win.loadURL('data:text/html,<h1>Error al conectar con el servidor de Vite</h1><p>Revisa la consola para más detalles.</p>');
    });
  } else {
    const filePath = path.join(__dirname, '../renderer/dist/index.html');
    console.log('Modo producción - Intentando cargar archivo:', filePath);
    if (fs.existsSync(filePath)) {
      win.loadFile(filePath).catch(err => {
        console.error('Error al cargar index.html:', err);
        win.loadURL('data:text/html,<h1>Error al cargar index.html</h1><p>Revisa la consola para más detalles.</p>');
      });
    } else {
      console.error('Archivo no encontrado:', filePath);
      win.loadURL('data:text/html,<h1>Error: index.html no encontrado en src/renderer/dist</h1><p>Ejecuta npm run build para generar los archivos compilados.</p>');
    }
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});