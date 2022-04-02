
<script  setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<template>
  <a-config-provider>
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </a-config-provider>
</template>

<style>
</style>
