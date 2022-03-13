
<template name="contentWarp">
  <div class="contentWarp">
    <el-page-header title="返回上一个页面"
                    :content="detailTitle()"
                    @back="goBack()">
    </el-page-header>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import router from "@/router/index.js";
// @ts-ignore
import { useRouter } from "vue-router";
import { ref, useSlots, useAttrs } from "vue";
const routers = useRouter();
defineProps({
  detailTitle: Function,
  goBack: Function,
});
const slots = useSlots();
const attrs = useAttrs();

// @ts-ignore
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);
</script>
<style >
</style>
