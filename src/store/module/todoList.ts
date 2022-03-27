const state = {
  todoList: []
};
const store = {
  // 是否开启命名空间
  namespaced: true,
  // 空间名字
  namespace: 'todo',
  // 数据维护
  state() {
    return state;
  },
  // commit 触发的 方法 可以入参
  mutations: {
    setState(state: any, params: any,) {
      const tmpArr = [...params]
      state.todoList = tmpArr
    },
  },
  // dispatch 触发的 方法 可以入参
  actions: {
    set(content: any, params: any) {
      content.commit('setState', params)
    },
  },
  // getters 对象的属性 可以做数据层面处理

  getters: {
    get: (state: any) => {
      return state
    }
  }

};

export default store