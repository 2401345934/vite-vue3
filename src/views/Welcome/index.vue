
<template>
  <h1>欢迎</h1>
  <h2> 我是vuex ------- {{state.home.count}}</h2>
  <el-button type="primary"
             @click="handleDispatch">dispatch</el-button>
  <el-button type="primary"
             @click="handleCommit">commit</el-button>
  <el-button type="primary"
             @click="getGetters">getters</el-button>

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

</script>
<style scoped>
</style>
