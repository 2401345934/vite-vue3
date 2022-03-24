
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import store from "@/store/index"
import 'element-plus/dist/index.css'
import "./styles/global.less"
import QueryTable from "./components/BusinessComponent/QueryTable/index.vue"

const app = createApp(App);
app.component("QueryTable", QueryTable)
app
  .use(router)
  .use(store)
  .mount('#app')

