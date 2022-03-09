
<template>
  <h1>todoList</h1>
  <el-input v-model="state.value" />
  <el-button @click="add">click</el-button>
  <ul>
    <li v-bind:key="index"
        v-for="(item,index) in state.list">
      <div>
        <el-checkbox @change="() => {resetLocalStorage()}"
                     v-model="item.checked"
                     :checked="item.checked" />
        {{item.text}}
        <el-button @click="remove(item,index)">remove</el-button>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { reactive } from 'vue'

const state = reactive({
  value: '',
  list: JSON.parse(localStorage.getItem("list") || '[]') || []
})

const add = () => {
  if (state.value) {
    state.list.unshift({
      text: state.value,
      checked: false
    })
    state.value = ''
  }
  resetLocalStorage()
}

const remove = (item, index) => {
  state.list = state.list.filter((_, i) => i !== index)
  resetLocalStorage()
}

const resetLocalStorage = () => {
  localStorage.setItem("list", JSON.stringify(state.list))

}

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style>
</style>
