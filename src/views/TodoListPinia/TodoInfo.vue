<template>
  <li>
    <div>
      <el-checkbox
        @change="() => { $emit('resetLocalStorage') }"
        v-model="item.checked"
        :checked="item.checked"
      />
      <span @dblclick="data.show = true" v-show="!data.show">名称: {{ item.text }}</span>
      <el-input
        focus
        @keydown.enter="data.show = false"
        @blur="data.show = false"
        v-show="data.show"
        :class="['w']"
        v-model="item.text"
        @change="() => { $emit('resetLocalStorage') }"
      ></el-input>
      <a-button :style="{ marginLeft: '8px' }" @click="del(item, index)">删除</a-button>
    </div>
  </li>
</template>


<script setup lang='ts'>
const props = defineProps(["item", "index"]);
const emits = defineEmits({
  resetLocalStorage: null,
  remove: null
});
const data = reactive({
  show: false
})
const del = (item: any, index: number) => {
  emits('remove', item, index)
}
</script>

<script lang='ts'>
export default {
  inheritAttrs: false
} 
</script>

<style scoped lang='less'>
li {
  display: block;
  padding: 10px;
  margin: 10px;
}
.w {
  width: 50%;
}
</style>