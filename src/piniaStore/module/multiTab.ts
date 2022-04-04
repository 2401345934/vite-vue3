import { ca } from "element-plus/es/locale"
import { defineStore } from "pinia"
export type RouterListType = {
  path: string,
  name: string,
  componentName: string,

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
    removeRouter(path: string, callback?: Function | null | undefined) {
      const { routerList } = this.$state
      const index = routerList.findIndex((d: RouterListType) => d.path === path)
      routerList.splice(index, 1)
      if (routerList.length === 0) {
        routerList.push({
          path: "/welcome",
          name: "首页",
          componentName: "Welcome",
        })
      }
      if (callback) {
        callback(index)
      }
    },
    replaceRouterList(arr: RouterListType[], callback?: Function | null | undefined) {
      this.$state.routerList = arr
      if (callback) {
        callback(this.$state.routerList)
      }
    },
    updateActiveKey(k: string) {
      this.$state.activeKey = k
    }
  }
})

