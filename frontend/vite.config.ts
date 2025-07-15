// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  root: './',
  publicDir: 'public',
=======
  root: './', 
  publicDir: 'public', 
>>>>>>> f8b1905 (FE, BE All Clear, Back log : Devops + CSS)
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
<<<<<<< HEAD
    port: 3000,
    host: true,
=======
    port: 5173,
>>>>>>> f8b1905 (FE, BE All Clear, Back log : Devops + CSS)
  },
});
