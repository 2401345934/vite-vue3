class Middleware {
  constructor(
    private $cache: any = [],
    private $middlewares: any = [],
    public $events: any = []
  ) {
    this.$cache = []
    this.$middlewares = []
  }

  // 注册中间件
  use(...rest) {
    [...rest].forEach(item => {
      if (typeof item === 'function') {
        this.$cache.push(item)
      }
    })
    return this
  }

  /**
   * 注册事件
   * @param {String} name 事件名称
   * @param {Function (params)} callback 回调函数
   */
  on(name, callback) {
    if (typeof callback === 'function') {
      this.$events[name] = callback
    } else {
      throw '事件回调必须为函数'
    }
  }

  /**
   * 发射(触发)事件
   * @param {String} name 事件名称
   * @param {Any} params 回调参数
   */
  emit(name, params) {
    if (this.$events[name]) {
      const callback = this.$events[name]
      callback.call(this, params)
    } else {
      throw '没有注册这个事件'
    }
  }
  /**
   * 每个中间件只有两个形参 第一是传进来的参数 第二个是调用下一个中间件的函数
   * 中间件的执行顺序是根据你注册中间件的顺序来去调用的
   */
  next(params) {
    while (this.$middlewares.length) {
      const ware: any = this.$middlewares.shift()
      const resultStatus = ware.call(this, params, this.next.bind(this))
      if (!resultStatus) return
    }
  }

  execute(params) {
    this.$middlewares = this.$cache.map(fn => {
      // 复制一份
      return fn
    })
    this.next(params)
  }

  executeFc(params) {
    return new Promise((resolve, reject) => {
      params.promise = { resolve, reject }
      this.execute(params)
    })
  }
}
export default Middleware
