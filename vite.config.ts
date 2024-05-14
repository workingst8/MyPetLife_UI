import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MyPetLife_UI/', // GitHub Pages 경로에 맞춰 설정
  plugins: [react()],
});
