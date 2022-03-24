<template>
  <div>chilren vue</div>
  {{ xmh }}
  {{ xmh2 }}
</template>

<script setup lang='ts'>
type InjectType = {
  value: number,
  [key: string]: any
}
const xmh: InjectType | undefined = inject('xmh')//参数为provide自定义的名称
const xmh2: InjectType | undefined = inject('xmh2')//参数为provide自定义的名称
console.log('xmh', (xmh as InjectType).value)//张三
console.log('xmh2', (xmh2 as InjectType).value)//张三


</script>
<style scoped lang='less'>
</style>