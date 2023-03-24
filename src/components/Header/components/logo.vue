<template>
  <div class="logo">
    <a-image
      src="https://img2.baidu.com/it/u=2893048966,1288173788&fm=253&fmt=auto&app=138&f=JPEG?w=527&h=220"
    ></a-image>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
.logo {
  height: 60px;
  width: 100%;
  :deep(.ant-image) {
    height: 60px;
    width: 100%;
    .ant-image-img {
      height: 60px;
      width: 100%;
    }
  }
}
</style>
