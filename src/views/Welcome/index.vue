
<template>
  <a-input></a-input>
  <a-button @click="btn">报错拦截测试</a-button>
  <a-button @click="routerLink">跳转到百度</a-button>
  <a-button @click="go">责任链</a-button>
</template>
<script lang="ts" setup>
import { Middleware } from '@/hooks/index';
import { getWindow } from '@/utils/utils';
const btn = () => {
  console.log(a);
}

const a = (options?: any, next?: any) => {
  console.log('a完成了', options);
  next(options)
}


const b = (options?: any, next?: any) => {
  console.log('b完成了', options);
  next(options)
}


const c = (options?: any, next?: any) => {
  console.log('c完成了', options);
  next()
}

const d = () => {
  alert("交易成功")
}

const go = () => {
  const handle = new Middleware()
  handle
    .use(a)
    .use(b)
    .use(c)
    .use(d)
  handle.execute({ a: 1 })

}

const routerLink = () => {
  getWindow().openUrl('https://www.baidu.com/')
}
</script>

<style scoped lang="less">
</style>
