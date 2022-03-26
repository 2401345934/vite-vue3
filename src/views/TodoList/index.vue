
<template>
  <el-space>
    <el-tag>当前共 {{ state.list.length || 0 }} 项</el-tag>
    <el-tag>当前已完成 {{ successLegnth }} 项</el-tag>
    <el-tag>当前未完成 {{ notLenthg }} 项</el-tag>
  </el-space>
  <div class="inp_warp">
    <el-input ref="inp" v-model="state.value" @keydown.enter="handleKeyDown" />
    <el-button @click="add">click</el-button>
  </div>
  <ul>
    <TodoInfoVue
      v-bind:key="index"
      v-for="(item, index) in state.list"
      :item="item"
      id="todolist"
      @remove="remove"
      :index="index"
      @resetLocalStorage="resetLocalStorage"
    ></TodoInfoVue>
    <!-- <li v-bind:key="index"
        v-for="(item,index) in state.list">
      <div>
        <el-checkbox @change="() => {resetLocalStorage()}"
                     v-model="item.checked"
                     :checked="item.checked" />
        {{item.text}}
        <el-button @click="remove(item,index)">remove</el-button>
      </div>
    </li>-->
  </ul>
</template>
<script lang="ts" setup>
import TodoInfoVue from "./TodoInfo.vue";
const props = defineProps({
  parentValue: String,
});

// 2、beforeMount 挂载之前    改名  onBeforeMount

const inp = ref();
// 3、mounted 挂载之后    改名  onMounted

onMounted(() => {
  inp.value.focus();
  state.list = JSON.parse(localStorage.getItem("list") || "[]");
});

const successLegnth = computed(() => {
  return state.list.filter((item: any) => item.checked).length || 0;
});

const notLenthg = computed(() => {
  return state.list.filter((item: any) => !item.checked).length || 0;
});

// 4、beforeUpdate 数据更新之前    改名  onBeforeUpdate

// 5、updated 数据更新之后    改名  onUpdated

// 6、beforeDestroy 销毁前    改名  onBeforeUnmount

// 7、destoryed 销毁后    改名  onUnmounted

// 8、errorCaptured 报错    改名  onErrorCaptured
const state: any = reactive({
  value: "",
  list: [],
});

const add = () => {
  if (state.value) {
    state.list.unshift({
      text: state.value,
      checked: false,
    });
    state.value = "";
  }
  resetLocalStorage();
};

const remove = (item, index) => {
  state.list = state.list.filter((_, i) => i !== index);
  resetLocalStorage();
};

const children = (item, index) => {
  // state.list = state.list.filter((_, i) => i !== index)
  return state.list;
};

defineExpose({
  children,
});
const resetLocalStorage = () => {
  localStorage.setItem("list", JSON.stringify(state.list));
};

const handleKeyDown = (e: any) => {
  add();
};

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style scoped>
.inp_warp {
  display: flex;
}
</style>
