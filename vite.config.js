import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
const { resolve } = require('path') //必须要引入resolve 
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
  ],
  alias: {
    '@': resolve(__dirname, 'src') //把src改为@
  }
})
