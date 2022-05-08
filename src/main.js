
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import 'ant-design-vue/dist/antd.variable.min.css';
import "./styles/global.less"
import QueryTable from "./components/BusinessComponent/QueryTable/index.vue"
import { createPinia } from "pinia"
import Antd from 'ant-design-vue';
import piniaPlugin from "./piniaStore/plugins/index" //这是今天的主角，我将它提到一个文件中

const pinia = createPinia()
pinia.use(
  piniaPlugin({
    // key: "pinia", // 这是给缓存到本地时，加一个特殊的前缀，以免造成污染到其他缓存数据
    needKeepIds: ["theme", "menu", "user"], // 对于特定store进行持久化，空或者不传，则对所有的store进行缓存到本地
  }),
)
const app = createApp({ ...App });
app.component("QueryTable", QueryTable)
app
  .use(router)
  .use(Antd)
  .use(pinia)
  .directive('auth', (el, bid) => {
    // 封装 资源权限 指令
    const arr = ['a', 'b', 'c']
    // const parent = document.querySelector("#uuid").parentElement
    // console.log(parent);
    if (!arr.includes(bid.arg)) {
      el.remove()
      // el.style.display = 'none'
    }

  })
  .mount('#app')
