const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/erp';
let client;

async function initializeDB() {
  if (client) return client;

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log('Conectado a MongoDB desde el main process');
    return client;
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    throw err;
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    win.loadURL('http://localhost:3000')
      .catch(err => {
        win.loadURL(`data:text/html;charset=utf-8,Error al cargar el servidor de desarrollo: ${err.message}<br>Verifica que Vite esté corriendo (npm run dev)`);
      });
  } else {
    win.loadFile(path.join(__dirname, '../renderer/dist/index.html'))
      .catch(err => {
        win.loadURL(`data:text/html;charset=utf-8,Error: index.html no encontrado en src/renderer/dist<br>Ejecuta npm run build para generar los archivos compilados`);
      });
  }
}

app.whenReady().then(() => {
  ipcMain.handle('connect-to-db', async () => {
    try {
      await initializeDB();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('close-db', async () => {
    await closeDB();
    return { success: true };
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  closeDB().then(() => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});