import { defineStore } from "pinia"
export const todoStore = defineStore('todoList', {
  state: () => {
    return {
      todoList: []
    }
  },
  getters: {},
  actions: {
    changeState(params: any) {
      this.todoList = params
    }
  }
})

