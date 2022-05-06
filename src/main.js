
import { createApp } from 'vue'
import router from './router/index'
import App from '@/App.vue'
import store from "@/store/index"
import 'ant-design-vue/dist/antd.variable.min.css';
import "./styles/global.less"
import { createPersistedState } from 'pinia-persistedstate-plugin'
import QueryTable from "./components/BusinessComponent/QueryTable/index.vue"
import { createPinia } from "pinia"
import Antd from 'ant-design-vue';

const pinia = createPinia()
pinia.use(createPersistedState())
// 测试push 同时推送2个仓库
const app = createApp({ ...App });
app.component("QueryTable", QueryTable)
app
  .use(router)
  .use(Antd)
  .use(store)
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

/**
 * @description: localStorage.setItem 重写 拓展功能实现 监听
 * @param {*} key  string
 * @param {*} newValue  string
 * @return {*}
 * @author: alan
 */
const setErrorItem = function (key, newValue) {
  localStorage.setItem(key, newValue)
  const setItemEvent = new Event("setItemEvent");
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent);
}

/**
 * @description:
 * @param {*} 代替 window.open
 * @return {*} key: url
 * @author: alan
 */
window.openUrl = function (key) {
  if (!key) {
    return
  }
  const openUrl = new Event("openUrl");
  openUrl.goUrl = key;
  const myUrlList = ['localhost:4000', 'localhost:3000', 'vite-vue3-xmh']
  openUrl.goUrlFlag = myUrlList.some(d => key.indexOf(d) !== -1)

  window.dispatchEvent(openUrl);
}
/**
 * @description window.onerror 全局捕获错误
 * @param event 错误信息，如果是
 * @param source 错误源文件URL
 * @param lineno 行号
 * @param colno 列号
 * @param error Error对象
 */
window.onerror = function (event, source, lineno, colno, error) {
  const errorList = JSON.parse(localStorage.getItem("errorList") || '[]')

  if (errorList.length === 500) {
    errorList.pop();
  }
  errorList.unshift({
    event,
    source,
    lineno,
    colno,
    error,
    time: new Date()
  })
  setErrorItem("errorList", JSON.stringify(errorList))

  // 上报错误
  // 如果不想在控制台抛出错误，只需返回 true 即可
  console.log(error);
  // console.log(event, source, lineno, colno, error);
  // 做一个页面内部报错 缓存到本地 做一个数据处理 展示到 header right  当数据达到 500 条 就开始 pop 最旧的数据 unshift 最新的数据  防止内存数据过大
  // 先读取 errorlist  判断长度  不够 500 直接 shift 然后 直接在存到 里面
  // error List 组件监听 localStorage 监听 errorlist 属性的变化 同步的 pinia
  // error List 展示 提供清空 删除单条的功能
  // 一旦 error List 监听到有新数据插入 直接全局提示 报错
};
