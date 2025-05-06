const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Detectar si estamos en modo desarrollo o producción
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    // En modo desarrollo, cargar el servidor de Vite
    win.loadURL('http://localhost:3000')
      .catch(err => {
        win.loadURL(`data:text/html;charset=utf-8,Error al cargar el servidor de desarrollo: ${err.message}<br>Verifica que Vite esté corriendo (npm run dev)`)
      })
  } else {
    // En modo producción, cargar los archivos compilados
    win.loadFile(path.join(__dirname, '../renderer/dist/index.html'))
      .catch(err => {
        win.loadURL(`data:text/html;charset=utf-8,Error: index.html no encontrado en src/renderer/dist<br>Ejecuta npm run build para generar los archivos compilados`)
      })
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})