// / <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    define: {
      global: {}
    },
    envDir: "./env",
    server: {
      host: '0.0.0.0',
      port: 2020,
    },
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './test.setup.ts',
      coverage: {
        reporter: ['text', 'json', 'html'],
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            headlessui: ['@headlessui-float/react', '@headlessui/react'],
            query: ['@tanstack/react-query']
          }
        },
      },
    },
  };
});
