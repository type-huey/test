import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), tsConfigPaths(), nodePolyfills()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/redmine/': {
        target: 'https://projects.rsupport.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/redmine\//, ''),
        secure: true,
      },
      '/api': {
        target: 'https://ai.rsup.io',
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
