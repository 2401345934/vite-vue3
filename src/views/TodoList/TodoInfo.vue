<template>
  <li>
    <div>
      <el-checkbox @change="() => {$emit('resetLocalStorage')}"
                   v-model="item.checked"
                   :checked="item.checked" />
      {{item.text}}
      <el-button @click="$emit('remove',item,index) ">删除</el-button>
    </div>
  </li>
</template>

<script setup lang='ts'>
defineProps(["item", "index"]);
defineEmits(["resetLocalStorage", "remove"]);
</script>
<style scoped lang='less'>
li {
  display: block;
  padding: 10px;
  margin: 10px;
}
</style>