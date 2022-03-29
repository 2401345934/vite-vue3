import { changeTheme } from '@/utils/utils';
import { defineStore } from "pinia"
export const theme = defineStore('theme', {
  state: () => {
    return {
      '--el-color-primary': '#409EFF'
    }
  },
  getters: {},
  actions: {
    changeState(params: any) {
      this['--el-color-primary'] = params
    },
    updateTheme() {
      changeTheme(this['--el-color-primary'])
    }
  }
})

