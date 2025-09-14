import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/dist/',
  build: {
    outDir: '../../web/dist',
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, './src')
    }
  }
})
