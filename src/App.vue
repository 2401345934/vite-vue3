<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const routers = useRouter()

onMounted(() => {
  window.addEventListener('openUrl', function (e: any) {
    const { goUrl, goUrlFlag } = e
    // 是自己的网站
    if (goUrlFlag) {
      window.open(goUrl)
    } else {
      routers.push(`/intercept?redirceUrl=${goUrl}`)
    }
  })
})

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<style></style>
