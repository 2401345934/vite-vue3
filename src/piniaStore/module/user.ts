import { defineStore } from 'pinia'
export const useUserInfo: any = defineStore({
  id: 'user',
  state: () => {
    return {}
  },
  getters: {},
  persist: true, // Note that we are using a persisted state here
  actions: {
    updateUserInfo(params: any, cb: any) {
      this.$state = params
      cb && cb()
    },
    outLogin() {
      this.$state = {}
      window.location.href = '/#/login'
    }
  }
})
