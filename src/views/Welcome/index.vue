
<template>
  <a-input></a-input>
  <a-button @click="btn">报错拦截测试</a-button>
  <a-button @click="routerLink">跳转到百度</a-button>
  <a-button @click="go">责任链</a-button>
  <a-button @click="suo">测试锁</a-button>
</template>
<script lang="ts" setup>
import { useMiddleware, useLook } from '@/hooks/index';
import { getWindow } from '@/utils/utils';
const btn = () => {
  console.log(a);
}

const suo = () => {
  useLook(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(11111);
        reject(1)
      }, 3000)
    })
  })
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
  options.promise.resolve()
}

const d = () => {
  alert("交易成功")
}

const go = () => {
  const handle = new useMiddleware()
  handle
    .use(a)
    .use(b)
    .use(c)
  handle.executeFc({ a: 1 }).then(() => {
    d()
  })


}

const routerLink = () => {
  getWindow().openUrl('https://www.baidu.com/')
}
</script>

<style scoped lang="less">
</style>
