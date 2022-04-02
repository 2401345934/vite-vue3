import { createStore } from "vuex";
import home from "@/store/module/home"
import userInfo from "@/store/module/userInfo"
import createPersistedstate from 'vuex-persistedstate'
const defaultState = {
};
const store = createStore({
  state() {
    return defaultState;
  },
  mutations: {
    increment() {
    },
  },
  actions: {
    double() {
    },
  },
  // modules  存储多个命名空间

  modules: {
    home,
    userInfo,
  },
  // 持久化
  plugins: [
    createPersistedstate({
      key: 'vuex',
      // paths: ['user', 'cart']
    })
  ]
});

export default store