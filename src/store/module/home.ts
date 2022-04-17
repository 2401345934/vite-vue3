const state = {
  count: 0,
};
const store = {
  // 是否开启命名空间
  namespaced: true,
  // 空间名字
  namespace: 'home',
  // 数据维护
  state() {
    return state;
  },
  // commit 触发的 方法 可以入参
  mutations: {
    increment(state: any, value?: number) {

      state.count += value || 1
    },
  },
  // dispatch 触发的 方法 可以入参
  actions: {
    double(content: any) {
      content.commit('increment', 1000)
    },
  },
  // getters 对象的属性 可以做数据层面处理

  getters: {
    getStateCountDouble: (state: any) => {
      return state.count * 2
    }
  }

};

export default store