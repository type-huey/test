import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), tsConfigPaths(), nodePolyfills()],
  server: {
    open: true,
    port: 3000,
    
  },
});
