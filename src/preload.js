const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  connectToDB: () => ipcRenderer.invoke('connect-to-db'),
  closeDB: () => ipcRenderer.invoke('close-db')
});