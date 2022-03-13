
<template>
  <h1>todoList</h1>
  <el-input ref="inp"
            v-model="state.value" />
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
        <el-button @click="$emit('updateParaentValue',item.text)">改变父组件传参</el-button>
      </div>
    </li>
  </ul>
  <div v-bind:key="index"
       v-for="(value,name,index) in state.object">
    <div>value --- {{value}}</div>
    <div>name --- {{name}}</div>
    <div>index --- {{index}}</div>
  </div>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue'
const props = defineProps({
  parentValue: String
})
defineEmits(['updateParaentValue'])



// 2、beforeMount 挂载之前    改名  onBeforeMount

const inp = ref()
// 3、mounted 挂载之后    改名  onMounted
const a = ref(1)

onMounted(() => {
  inp.value.focus()
  state.list = JSON.parse(localStorage.getItem("list") || '[]')
})

// 4、beforeUpdate 数据更新之前    改名  onBeforeUpdate

// 5、updated 数据更新之后    改名  onUpdated

// 6、beforeDestroy 销毁前    改名  onBeforeUnmount

// 7、destoryed 销毁后    改名  onUnmounted

// 8、errorCaptured 报错    改名  onErrorCaptured
const state = reactive({
  value: '',
  list: [],
  object: {
    name: "张三",
    age: 18
  }
})

const add = () => {
  // if (state.value) {
  //   state.list.unshift({
  //     text: state.value,
  //     checked: false
  //   })
  //   state.value = ''
  // }
  // resetLocalStorage()
  a.value += 1
}

const remove = (item, index) => {
  state.list = state.list.filter((_, i) => i !== index)
  resetLocalStorage()
}

const children = (item, index) => {
  // state.list = state.list.filter((_, i) => i !== index)
  return state.list
}

defineExpose({
  children,
  a: 111
})
const resetLocalStorage = () => {
  localStorage.setItem("list", JSON.stringify(state.list))

}

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style>
</style>
