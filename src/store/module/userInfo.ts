const state = {
  userName: "",
  passWord: "",
};
const store = {
  // 是否开启命名空间
  namespaced: true,
  // 空间名字
  namespace: 'userInfo',
  // 数据维护
  state() {
    return state;
  },
  // commit 触发的 方法 可以入参
  mutations: {
    setState(state: any, params: any,) {
      state.userName = params.userName
      state.passWord = params.passWord
      if (params.cb) params.cb()
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