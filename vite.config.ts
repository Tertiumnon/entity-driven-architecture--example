import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'ES2020',
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
