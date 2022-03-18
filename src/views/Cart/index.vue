
<template name="card">
  <h1>card</h1>
  <el-button type="primary"
             @click="addCard">添加商品</el-button>
  <el-scrollbar max-height="400px">
    <p v-for="(item,index) in cardList"
       :key="index"
       class="scrollbar-demo-item">
      {{ item }}
    </p>
  </el-scrollbar>
</template>
<script lang="ts" setup>
const addCard = () => {
  console.log(12313);
};

const cardList = [
  {
    name: "玩具",
    price: 133.11,
    num: 333,
    desc: "这个一个品牌",
  },
];
// @ts-nocheck
</script>
<style>
</style>
