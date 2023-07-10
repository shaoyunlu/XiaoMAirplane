const path = require('path');
import { defineConfig } from "vite";
import {resolve} from 'path'

export default defineConfig({
    resolve:{
        alias :{

              }
    },

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