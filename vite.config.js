import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',          // relative paths → works on any host (Netlify, Vercel, cPanel, etc.)
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Predictable asset filenames: assets/images/01-harsh-pranjal/filename.[hash].jpg
        assetFileNames(assetInfo) {
          const name = assetInfo.name || '';
          if (/\.(jpe?g|png|gif|webp|svg)$/i.test(name)) {
            return 'assets/images/[name].[hash][extname]';
          }
          if (/\.css$/i.test(name)) {
            return 'assets/css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      },
    },
  },
})
