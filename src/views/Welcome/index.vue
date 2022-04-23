
<template>
  <a-input></a-input>
  <a-button @click="btn">报错拦截测试</a-button>
  <a-button @click="routerLink">跳转到百度</a-button>
</template>
<script lang="ts" setup>
import { getWindow } from '@/utils/utils';
const btn = () => {
  console.log(a);
}

const routerLink = () => {
  getWindow().openUrl('https://www.baidu.com/')
}
</script>

<style scoped lang="less">
</style>
