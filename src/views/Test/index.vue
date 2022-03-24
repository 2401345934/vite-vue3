<template>
  <div>
    <el-button @click="handClick('wx')">微信</el-button>
    <el-button @click="handClick('Zfb')">支付宝</el-button>
    <el-button @click="name++">修改name</el-button>
    <component :is="currentElementComponent"></component>
  </div>
</template>

<script setup lang='ts'>
import Wx from "./components/Wx.vue"
import Zfb from "./components/Zfb.vue"

const t = ref("wx")
const handClick = (type: string) => {
  t.value = type
}
const name = ref(1)
const name2 = ref(10)
provide('xmh', name)//两个参数第一个是自定义名字，第二个是要传递的参数
provide('xmh2', name2)//两个参数第一个是自定义名字，第二个是要传递的参数
watch(() => name.value, () => {
  name2.value += name.value
})
const currentElementComponent = computed(() => {
  const map = new Map([
    ['wx', Wx],
    ['Zfb', Zfb],
  ])
  return map.get(t.value)
})

</script>
<style scoped lang='less'>
</style>