import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
        output: {
          manualChunks(id) {
            // Split third-party vendor dependencies
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react-core';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('cropperjs')) {
                return 'vendor-cropper';
              }
              return 'vendor-utils';
            }
            // Split heavy local JSON/encyclopedia data
            if (id.includes('src/data.ts') || id.includes('src/data') || id.includes('data.ts')) {
              return 'encyclopedia-data';
            }
            if (id.includes('src/translations.ts') || id.includes('translations.ts')) {
              return 'encyclopedia-translations';
            }
            // Split heavy component pages out of initial index/vendor bundle
            if (id.includes('src/components/ArticlesPage')) {
              return 'component-articles';
            }
            if (id.includes('src/components/BackgroundRemoverPage')) {
              return 'component-bg-remover';
            }
            if (id.includes('src/components/SvgConverterPage')) {
              return 'component-svg-converter';
            }
            if (id.includes('src/components/CropperPage')) {
              return 'component-cropper';
            }
            if (id.includes('src/components/VeoVideoPage')) {
              return 'component-veovideo';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
