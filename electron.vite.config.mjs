import { defineConfig } from 'electron-vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: true }
      },
      outDir: 'dist/main'
    }
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    }
  },
  renderer: {
    root: './src/renderer',
    publicDir: './public',
    build: {
      outDir: './src/renderer/dist',
      emptyOutDir: true
    },
    server: {
      port: 5173
    },
    plugins: [preact()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer'),
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
      }
    }
  }
});