
<template>
  <h1>欢迎</h1>
  <h2>我是vuex ------- {{ state.home.count }}</h2>
  <el-button type="primary" @click="handleDispatch">dispatch</el-button>
  <el-button type="primary" @click="handleCommit">commit</el-button>
  <el-button type="primary" @click="getGetters">getters</el-button>
  <el-button type="primary" @click="changeTheme">切换主题</el-button>
  <div></div>
</template>
<script setup>
import { useStore } from "vuex"
const { state, dispatch, commit, getters } = useStore()
const handleDispatch = () => {
  dispatch('home/double', 'xiaominghui')
}
const getGetters = () => {
  const v = getters['home/getStateCountDouble']
}
const handleCommit = () => {
  commit('home/increment', 10000)
}
const changeTheme = () => {
  // document.documentElement 是全局变量时
  document.documentElement.style.setProperty("--el-color-primary", "#409EFF");
}

</script>
<style scoped lang="less">
div {
  width: 200px;
  height: 200px;
  background-color: var(--el-color-primary);
}
</style>
