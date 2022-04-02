
<template>
  <h1>欢迎</h1>
  <h2>我是vuex ------- {{ state.home.count }}</h2>
  <a-button type="primary">Primary Button</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button>
  <div></div>
</template>
<script setup>
import { ConfigProvider } from "ant-design-vue";
import { useStore } from "vuex"
const { state, dispatch, commit, getters } = useStore()
const handleDispatch = () => {
  dispatch('home/double', 'xiaominghui')
}
onMounted(() => {
})
const getGetters = () => {
  const v = getters['home/getStateCountDouble']
}
const handleCommit = () => {
  commit('home/increment', 10000)
}

</script>
<style scoped lang="less">
</style>
