<template name="contentWarp">
  <div class="contentWarp">
    <a-page-header :title="detailTitle()">
      <div class="main">
        <slot name="main"></slot>
      </div>
    </a-page-header>
  </div>
</template>
<script lang="ts" setup>
defineProps(['detailTitle'])
</script>
<style scoped lang="less">
.contentWarp {
  width: 100%;
}

.main {
  margin-top: 30px;
}
</style>
