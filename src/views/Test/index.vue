<template>
  <transition
    appear
    mode="out-in"
    enter-active-class="animate__animated animate__lightSpeedInRight"
    leave-active-class="animate__animated animate__lightSpeedOutRight"
  >
    <test-components v-show="flag">肖明辉</test-components>
  </transition>
  <el-button @click="flag = !flag">切换</el-button>
</template>
<script setup lang='ts'>
import TestComponents from "./TestComponents.vue";

const flag = ref(false);
</script>