import { defineStore } from 'pinia'
export const menu: any = defineStore({
  id: 'menu',
  state: () => {
    return {
      collapsed: false
    }
  },
  getters: {},
  persist: true, // Note that we are using a persisted state here
  actions: {
    changeStateMenu(collapsed: boolean) {
      this.$state.collapsed = collapsed
    }
  }
})
