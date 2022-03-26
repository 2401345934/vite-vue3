<template>
  <div>Zfb</div>
  <el-input v-model="zfbValue"></el-input>
</template>

<script setup lang='ts'>
onMounted(() => {
  console.log('3.-组件挂载到页面之后执行-------onMounted')
})
const zfbValue = ref('')

</script>
<style scoped lang='less'>
</style>