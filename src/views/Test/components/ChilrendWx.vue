<template>
  <div>chilren vue</div>
  {{ xmh.name }}
  {{ xmh.name2 }}
</template>

<script setup lang='ts'>
type InjectType = {
  [key: string]: any
}
const xmh: any = inject('xmh')//参数为provide自定义的名称
console.log('xmh', (xmh as InjectType).name.value)//张三


</script>
<style scoped lang='less'>
</style>