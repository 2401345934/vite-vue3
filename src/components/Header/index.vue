
<template name="header">
  <div class="header">
    <div></div>
    <div class="change_theme">
      <el-button type="primary" style="margin-left: 16px" @click="drawer = true">切换主题</el-button>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false">
    <span>主题色</span>
    <el-color-picker v-model="themeCorlo" />
  </el-drawer>
</template>
<script setup lang="ts">
import { theme } from "@/piniaStore/module/theme"
const store = theme()
const themeCorlo = ref(document.documentElement.style.getPropertyPriority("--el-color-primary"))
const drawer = ref(false)
watch(themeCorlo, (v: string) => {
  store.changeState(v)
  store.updateTheme()
})


</script>
<style scoped lang="less">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .change_theme {
    margin-right: 30px;
  }
}
</style>
