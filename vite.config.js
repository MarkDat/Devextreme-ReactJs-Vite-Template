import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import path from "path";

const customAlias = (alias, rawPath) => {
  return {
    find: alias,
    replacement: path.resolve(__dirname, rawPath)
  }
}

const getAlias = () => {
  return [
    //https://supportcenter.devexpress.com/ticket/details/t1054272/vue3-react-vite-rollup-devextreme-fails-in-production-because-some-modules-do-not-pass
    {find: "devextreme/ui", replacement: 'devextreme/esm/ui'},
    customAlias('@components', 'src/components'),
    customAlias('@contexts', 'src/contexts'),
    customAlias('@utils', 'src/utils'),
  ];
}

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
      }
      }
    }
  },
  resolve: {
    alias: getAlias()
  },
  plugins: [
    react(),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: true
    })],
});
