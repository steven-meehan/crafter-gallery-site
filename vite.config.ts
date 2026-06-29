import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'content',
  server: {
    port: parseInt(process.env.PORT ?? '3000'),
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
