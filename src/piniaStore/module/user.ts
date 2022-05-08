import { defineStore } from "pinia"
export const user: any = defineStore({
  id: "user",
  state: () => {
    return {
    }
  },
  getters: {},
  actions: {
    updateUserInfo(params: any, cb: any) {
      this.$state = params
      cb && cb()
    },
    outLogin() {
      this.$state = {}
      window.location.href = '/#/login'
    },
  }
})

