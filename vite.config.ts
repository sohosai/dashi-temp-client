import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'jsys',
      project: 'dashi-client',
    }),
  ],
  build: {
    sourcemap: true,
  },
});
