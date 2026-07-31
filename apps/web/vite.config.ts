import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/M.NexusPhase1/', // Explicit GitHub Pages repository path
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@nexus/shared-types': path.resolve(__dirname, '../../packages/shared-types/src/index.ts'),
      '@nexus/validation': path.resolve(__dirname, '../../packages/validation/src/index.ts'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: core React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Vendor: UI / animation
          'vendor-ui': ['framer-motion', 'lucide-react'],
          // Vendor: data fetching
          'vendor-query': ['@tanstack/react-query'],
          // Vendor: forms
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Vendor: charts
          'vendor-charts': ['recharts'],
        },
      },
    },
  },
});
