import { changeTheme } from '@/utils/utils'
import { defineStore } from 'pinia'
export const theme = defineStore({
  id: 'theme',
  state: () => {
    return {
      // header 主题色
      '--a-header-bg': '#303133',
      // menu 主题色
      '--a-menu-bg': '#67C23A',
      primaryColor: '#1890ff',
      errorColor: '#ff4d4f',
      warningColor: '#faad14',
      successColor: '#52c41a',
      infoColor: '#1890ff'
    }
  },
  getters: {},
  persist: true, // Note that we are using a persisted state here
  actions: {
    changeStateTheme(params: any) {
      this.$state = {
        ...this.$state,
        ...params
      }
    },
    updateTheme() {
      changeTheme(this.$state)
    }
  }
})
