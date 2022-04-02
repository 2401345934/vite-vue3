
<template name="header">
  <div class="header">
    <div></div>
    <div class="change_theme">
      <a-button type="primary" style="margin-left: 16px" @click="drawer = true">切换主题</a-button>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false">
    <div>
      <span>element-plus 主题色</span>
      <el-color-picker v-model="themeParams['--el-color-primary']" />
    </div>
    <div>
      <span>headers 主题色</span>
      <el-color-picker v-model="themeParams['--el-header-bg']" />
    </div>
    <div>
      <span>menus 主题色</span>
      <el-color-picker v-model="themeParams['--el-menu-bg']" />
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { theme } from "@/piniaStore/module/theme"
const store = theme()
const themeParams = reactive({
  '--el-color-primary': store.$state["--el-color-primary"],
  '--el-menu-bg': store.$state["--el-menu-bg"],
  '--el-header-bg': store.$state["--el-header-bg"],
})
const drawer = ref(false)
onMounted(() => {
  console.log(store);


})

watch(themeParams, (params: any) => {
  const obj = {}
  for (const k in params) {
    if (params[k]) {
      obj[k] = params[k]
    }
  }
  store.changeStateTheme(obj)
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
