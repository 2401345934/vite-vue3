
<template>
  <a-input></a-input>
  <a-button @click="btn">报错拦截测试</a-button>
</template>
<script lang="ts" setup>

const btn = () => {
  console.log(a);

}
</script>

<style scoped lang="less">
</style>
