const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Aquí expondremos APIs seguras más adelante si es necesario
});