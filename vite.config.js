import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import html from '@rollup/plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    minify: false,
    watch: true,
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.js',
      output: {
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      }
    }
  },
  plugins: [
            legacy({
              targets:['defaults','not IE 11']
            }),
            vue(),
            html({
              fileName: 'index.html', // 生成的 HTML 文件名
              title: 'My App', // HTML 文件的标题
              template : ()=>{
                return `
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/assets/style.css">
      <title>Document</title>
  </head>
  <body>
      <div id="xm-airplane"></div>

      <script src="/assets/polyfills-legacy.js"></script>
      <script src="/system.js"></script>
      <script src="/assets/main-legacy.js"></script>
  </body>
</html>
                        `
              }
            })
          ]
})
