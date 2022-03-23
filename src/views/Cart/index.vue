
<template name="card">
  商品数量 --- {{count}}
  <el-button type="primary"
             @click="addCard">添加商品</el-button>
  <el-button type="primary"
             @click="descCard">减少商品</el-button>
  <el-scrollbar max-height="400px">
    <p v-for="(item,index) in cardList"
       :key="index"
       class="scrollbar-demo-item">
      {{ item.desc }}
    </p>
  </el-scrollbar>
</template>
<script lang="ts" setup>
const data = reactive({
  count: 0,
});

watch(
  () => data.count,
  (newValue: number, oldValue: number) => {
    console.log("新的", newValue, "老的", oldValue, "改变");
  }
);

const count = computed(() => {
  if (data.count < 0) {
    data.count = 0;
    return 0;
  }
  if (data.count > 10) {
    data.count = 10;
    return 10;
  }
  return data.count;
});
const addCard = () => {
  data.count++;
};
const descCard = () => {
  data.count--;
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
<style scoped>
</style>
