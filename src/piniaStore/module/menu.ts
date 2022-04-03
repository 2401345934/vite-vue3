import { defineStore } from "pinia"
export const menu = defineStore('menu', {
  state: () => {
    return {
      collapsed: false
    }
  },
  getters: {},
  actions: {
    changeStateMenu(collapsed: boolean) {
      this.$state.collapsed = collapsed
    },
  }
})

