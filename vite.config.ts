// / <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
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
            icons: ['tabler-icons-react'],
            calender: ['@natscale/react-calendar'],
            headlessui: ['@headlessui-float/react', '@headlessui/react'],
            query: ['@tanstack/react-query']
          }
        },
        plugins: [
          mode === 'analyze' &&
          visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  };
});
