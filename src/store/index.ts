import { createStore } from "vuex";
import home from "@/store/module/home"

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
    home
  }
});

export default store