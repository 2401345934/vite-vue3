<template>
  <div>
    <a-button @click="btn(11111)">绑定1</a-button>
    <a-button @click="btn(2222)">绑定2</a-button>
    <a-button @click="eventBus.emit('demo', '肖明辉', '音波')">触发</a-button>
  </div>
</template>

<script setup lang='ts'>
class EventEmitter {
  handleMap: any;
  constructor() {
    // 单例模式
    if (!EventEmitter.instance) {
      EventEmitter.instance = this
      this.handleMap = {}
    }
    //map结构，用于储存事件与其对应的回调
    return EventEmitter.instance
  }

  //事件订阅，需要接收订阅事件名和对应的回调函数
  on(eventName, callback) {
    this.handleMap[eventName] = this.handleMap[eventName] ?? []
    this.handleMap[eventName].push(callback)
  }

  //事件发布，需要接收发布事件名和对应的参数
  emit(eventName, ...args) {
    if (this.handleMap[eventName]) {
      //这里需要浅拷贝一下handleMap[eventName],因为在once添加订阅时会修改this.handleMap,若once绑定在前就会导致后一个监听被移除
      const handlers = [...this.handleMap[eventName]]
      handlers.forEach(callback => callback(...args))
    }
  }

  //移除订阅，需要移除的订阅事件名及指定的回调函数
  remove(eventName, callback) {
    const callBacks = this.handleMap[eventName]
    const index = callBacks.indexOf(callback)
    if (index !== -1) {
      callBacks.splice(index, 1)
    }
  }

  //添加单次订阅，触发一次订阅事件后取消订阅，需要添加的订阅事件名及指定的回调函数
  once(eventName, callback) {
    const warpper = (...args) => {
      callback(...args)
      this.remove(eventName, warpper)
    }
    this.on(eventName, warpper)
  }
}
const eventBus = ref(new EventEmitter())

const btn = (a) => {
  eventBus.value.on("demo", () => {
    console.log(a);

  })
}

//基础测试
onMounted(() => {
})

</script>
<style scoped lang='less'>
</style>