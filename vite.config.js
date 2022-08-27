import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/sass/variables";
          @import "./src/sass/global";
          @import "./src/sass/mixins";
        `,
      },
    },
  },
});
