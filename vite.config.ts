import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    modulePreload: false,
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@root': '/src',
      '@lib': '/src/lib',
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@services': '/src/services',
    },
  },
})
