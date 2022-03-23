
<template name="card">
  商品数量 --- {{count}}
  <el-button type="primary"
             @click="addCard">添加商品</el-button>
  <el-button type="primary"
             @click="descCard($event)"
             :class="[xmh]">减少商品</el-button>
  <el-input @keyup.backspace="keyup"></el-input>
  <div>
    <el-button @click="data.sortType = 'price'"
               :class="{r:data.sortType === 'price'}">价格排序</el-button>
    <el-button @click="data.sortType = 'num'"
               :class="{r:data.sortType === 'num'}">数量排序</el-button>
    <el-button @click="data.sort = 'acs'"
               :class="{r:data.sort === 'acs'}">升序</el-button>
    <el-button @click="data.sort = 'desc'"
               :class="{r:data.sort === 'desc'}">降序</el-button>
  </div>
  <el-scrollbar max-height="400px">
    <p v-for="(item,index) in cardListcomputed"
       :key="index"
       class="scrollbar-demo-item">
      {{ item.name }} ---- 价格 {{item.price}} ---- 数量 {{item.num}}
    </p>
  </el-scrollbar>
</template>
<script lang="ts" setup>
const data = reactive({
  count: 0,
  sortType: "price",
  sort: "desc",
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
const descCard = (e: Event) => {
  console.log(e);

  data.count--;
};

const cardListcomputed = computed(() => {
  return cardList.sort((a, b) => {
    return data.sort !== "desc"
      ? a[data.sortType] - b[data.sortType]
      : b[data.sortType] - a[data.sortType];
  });
});
const cardList = [
  {
    name: "玩具1",
    price: 133.11,
    num: 3331,
    desc: "这个一个品牌",
  },
  {
    name: "玩具2",
    price: 1233.11,
    num: 333,
    desc: "这个一个品牌",
  },
  {
    name: "玩具3",
    price: 12.11,
    num: 199999,
    desc: "这个一个品牌",
  },
];
const xmh = "aaa";

const keyup = () => {
  console.log("我触发了");
};
// @ts-nocheck
</script>
<style scoped>
.aaa {
  color: red;
}

.r {
  color: red;
}
</style>
