
<template name="contentWarp">
  <div class="contentWarp">
    <el-page-header title=" "
                    icon=""
                    :content="detailTitle()">
    </el-page-header>
    <div class="main">
      <slot name="main"></slot>
    </div>

  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import router from "@/router/index.js";
// @ts-ignore
const routers = useRouter();

defineProps(["detailTitle"]);
// @ts-ignore
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);
</script>
<style scoped lang="less">
.main {
  margin-top: 30px;
}
</style>
