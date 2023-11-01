import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    watch: true,
    outDir: 'build',
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [
            legacy({
              targets:['defaults','not IE 11']
            }),
            vue()
          ]
})
