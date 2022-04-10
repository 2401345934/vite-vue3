<template>
  <div v-for="item in arr" :key="item.id">
    <a-space>
      <span>{{ item.checker }}</span>
      <span>{{ item.id }}</span>
    </a-space>
  </div>
</template>

<script setup lang='ts'>
import { mapTest } from './mapTest';
import { fetchList } from './servers';
type arrType = {
  checker: string,
  id: string
}
const arr = ref<arrType[]>([])
//基础测试
onMounted(async () => {
  const data = await fetchList()
  arr.value = mapTest(data)
})


</script>
<style scoped lang='less'>
</style>