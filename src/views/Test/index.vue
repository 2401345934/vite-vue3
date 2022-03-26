<template>
  <transition name="xmh">
    <test-components v-show="flag">肖明辉</test-components>
  </transition>
  <transition name="xmh2">
    <test-components v-show="flag">小垃圾</test-components>
  </transition>
  <el-button @click="flag = !flag">切换</el-button>
</template>
<script setup lang='ts'>
import TestComponents from "./components/TestComponents.vue";

const flag = ref(false);
</script>
<style scoped lang='less'>
.xmh-enter-from,
.xmh2-enter-from,
.xmh-leave-to,
.xmh2-leave-to {
  opacity: 0;
}
.xmh-enter-active,
.xmh-leave-active,
.xmh2-enter-active,
.xmh2-leave-active {
  transition: 2s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>