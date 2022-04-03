import { defineStore } from "pinia"
type RouterListType = {
  path: string,
  name: string,
}

const routerList: RouterListType[] = []
const activeKey: string = ''

export const multiTab = defineStore('multiTab', {
  state: () => {
    return {
      routerList,
      activeKey
    }
  },
  getters: {},
  actions: {
    addRouter(obj: RouterListType) {
      this.$state.routerList.push(obj)
    },
    updateActiveKey(k: string) {
      this.$state.activeKey = k
    }
  }
})

