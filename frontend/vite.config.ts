// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './', // 프로젝트 루트
  publicDir: 'public', // 기본 설정이라 보통 그대로 둬도 됨
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173, // 혹은 다른 포트
  },
});
