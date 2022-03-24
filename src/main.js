
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import store from "@/store/index"
import 'element-plus/dist/index.css'
import "./styles/global.less"

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

  // .component("xmh", {
  //   template: `<h2>{{aaaa}}<h2/>`,
  //   data () {
  //     return {
  //       aaaa: '肖明辉'
  //     }
  //   }
  // })