
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import store from "@/store/index"
import 'element-plus/dist/index.css'
import "./styles/global.less"
import { createPersistedState } from 'pinia-persistedstate-plugin'

import QueryTable from "./components/BusinessComponent/QueryTable/index.vue"

import { createPinia } from "pinia"

const pinia = createPinia()
pinia.use(createPersistedState())

// 测试push 同时推送2个仓库
const app = createApp(App);
app.component("QueryTable", QueryTable)
app
  .use(router)
  .use(store)
  .use(pinia)
  .mount('#app')

