
<template>
<div>{{ title }}</div> 
</template>
<script setup lang='ts'>
import request from "@/axios"
const title = ref('hello world')
const list = ref([])
onMounted(() => {
 request({
  url:"XXX/XXX/XX",
  isToast:false;
  converter: ({data}) => {
   list.value = data
  }
})
  console.log('3.-组件挂载到页面之后执行-------onMounted')
})

</script>
<style scoped lang='sass'>
</style>