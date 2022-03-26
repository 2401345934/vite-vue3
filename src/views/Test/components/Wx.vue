<template>
  <h1>wx</h1>
  <el-input v-model="wxValue"></el-input>
  <ChilrendWxVue></ChilrendWxVue>
</template>

<script setup lang='ts'>
import ChilrendWxVue from './ChilrendWx.vue';
const wxValue = ref('')

</script>
<style scoped lang='less'>
h1 {
  font-size: 40px;
  margin-bottom: 30px;
}
</style>