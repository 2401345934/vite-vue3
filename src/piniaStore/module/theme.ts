import { changeTheme } from '@/utils/utils';
import { defineStore } from "pinia"
export const theme = defineStore('theme', {
  state: () => {
    return {
      // element-plus 主题色
      '--el-color-primary': '#409EFF',
      // header 主题色
      '--el-header-bg': '#303133',
      // menu 主题色
      '--el-menu-bg': '#67C23A',
    }
  },
  getters: {},
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

