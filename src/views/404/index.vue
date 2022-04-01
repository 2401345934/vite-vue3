
<template name="error">
  <el-result icon="error" title="抱歉，出错了" :sub-title="`您当前访问页面不存在 ${time} 秒后帮您返回 首页 或者您可以手动点击返回首页`">
    <template #extra>
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </template>
  </el-result>
</template>
<script setup>
import { useRouter, } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from "vue"
const router = useRouter()
const time = ref(5)
let timeEnd = null

onMounted(() => {
  timeEnd = setInterval(() => {
    time.value -= 1
  }, 1000)

  setTimeout(() => {
    goBack()
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timeEnd)
})


const goBack = () => {
  router.push("/")
}
</script>
<style scoped>
</style>
