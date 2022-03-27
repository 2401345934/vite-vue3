import { createStore } from "vuex";
import home from "@/store/module/home"
import todoList from "@/store/module/todoList"
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
    todo: todoList
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