
<template name="contentWarp">
  <div class="contentWarp">
    <el-page-header title=" "
                    icon=""
                    :content="$emit('detailTitle')">
    </el-page-header>
    <slot name="main"></slot>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import router from "@/router/index.js";
// @ts-ignore
const routers = useRouter();

defineEmits(["detailTitle"]);
// @ts-ignore
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);
</script>
<style >
</style>
