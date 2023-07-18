const path = require('path');
import vue from '@vitejs/plugin-vue'
import { defineConfig } from "vite";
import {resolve} from 'path'

export default defineConfig({
    resolve:{
        alias :{

              }
    },
    plugins : [
      vue()
    ],
    server: {
                // 配置服务器
                hmr: {
                  overlay: false
                }
            },
    build: {
              lib: {
                entry: path.resolve(__dirname, 'airplane.js'),
                name: 'XMAirplane'
              },
              sourcemap: true
    }
})