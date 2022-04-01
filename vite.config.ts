import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 增加 gzip 打包配置
import viteCompression from 'vite-plugin-compression'
const { resolve } = require('path') //必须要引入resolve 
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import server from "./config/propx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      dts: "types/auto-import.d.ts"
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    //   viteImagemin({
    //     gifsicle: {
    //         optimizationLevel: 7,
    //         interlaced: false,
    //     },
    //     optipng: {
    //         optimizationLevel: 7,
    //     },
    //     mozjpeg: {
    //         quality: 50,
    //     },
    //     pngquant: {
    //         quality: [0.8, 0.9],
    //         speed: 4,
    //     },
    //     svgo: {
    //         plugins: [
    //             {
    //                 name: 'removeViewBox',
    //             },
    //             {
    //                 name: 'removeEmptyAttrs',
    //                 active: false,
    //             },
    //         ],
    //     },
    // }),
    //   import viteImagemin from 'vite-plugin-imagemin'
    // import importToCDN from 'vite-plugin-cdn-import'
    // 配置CDN
    //    importToCDN({
    //     modules: [
    //         {
    //             name: 'vue',
    //             var: 'Vue',
    //             path: 'https://unpkg.com/vue@next',
    //         },
    //         {
    //             name: 'element-plus',
    //             var: 'ElementPlus',
    //             path: `https://unpkg.com/element-plus`,
    //             css: 'https://unpkg.com/element-plus/dist/index.css',
    //         },
    //     ],
    // }),

  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': resolve(__dirname, 'src') //把src改为@
    },
  },
  // 打包配置
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },   //去除 console debugger
  },

  // 请求代理
  server,

})