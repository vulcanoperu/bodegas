"use strict";
const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  // Aquí añadirás tus APIs seguras más adelante
});
