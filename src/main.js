
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import store from "@/store/index"
import 'element-plus/dist/index.css'
import "@/default.css"
createApp(App)
  .use(router)
  .use(store)
  .mount('#app')