import { defineConfig } from 'electron-vite'
import preact from '@preact/preset-vite'
import path from 'path'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main'
    }
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    }
  },
  renderer: {
    root: 'src/renderer',
    build: {
      outDir: 'src/renderer/dist'
    },
    plugins: [preact()],
    server: {
      port: 3000
    }
  }
})