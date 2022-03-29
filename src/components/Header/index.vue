
<template name="header">
  <div class="header">
    <div class="change_theme">
      切换主题背景色
      <el-color-picker v-model="themeCorlo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { theme } from "@/piniaStore/module/theme"
const store = theme()
const themeCorlo = ref(document.documentElement.style.getPropertyPriority("--el-color-primary"))
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

watch(themeCorlo, (v: string) => {
  store.changeState(v)
  store.updateTheme()

})

</script>
<style scoped lang="less">
.header {
  display: flex;
  justify-content: flex-end;

  .change_theme {
    margin-right: 30px;
  }
}
</style>
