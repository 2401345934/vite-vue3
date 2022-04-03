
<template name="cart">
  商品数量 --- {{ counts }}
  <a-button type="primary" @click="addCard">添加商品</a-button>
  <a-button type="primary" @click="descCard($event)" :class="[xmh]">减少商品</a-button>
  <div>
    <a-button @click="sortType = 'price'" :class="{ r: sortType === 'price' }">价格排序</a-button>
    <a-button @click="sortType = 'num'" :class="{ r: sortType === 'num' }">数量排序</a-button>
    <a-button @click="sort = 'acs'" :class="{ r: sort === 'acs' }">升序</a-button>
    <a-button @click="sort = 'desc'" :class="{ r: sort === 'desc' }">降序</a-button>
  </div>
  <el-scrollbar max-height="400px">
    <p
      v-for="(item, index) in cardListcomputed"
      :key="index"
      class="scrollbar-demo-item"
    >{{ item.name }} ---- 价格 {{ item.price }} ---- 数量 {{ item.num }}</p>
  </el-scrollbar>
</template>
<script lang="ts" name="cart" setup>
const data = reactive({
  count: 0,
  sortType: "price",
  sort: "desc",
});
const { count, sortType, sort } = toRefs(data)

watch(
  () => count.value,
  (newValue: number, oldValue: number) => {
  }
);
onMounted(() => {
  count.value += 1
  console.log('我是购物车被处罚了 ', count.value);
})

const counts = computed(() => {
  if (count.value < 0) {
    count.value = 0;
    return 0;
  }
  if (count.value > 10) {
    count.value = 10;
    return 10;
  }
  return count.value;
});
const addCard = () => {
  count.value++;
};
const descCard = (e: Event) => {
  count.value--;
};

const cardListcomputed = computed(() => {
  return cardList.sort((a, b) => {
    return sort.value !== "desc"
      ? a[sortType.value] - b[sortType.value]
      : b[sortType.value] - a[sortType.value];
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
// @ts-nocheck
</script>
<style scoped>
.r {
  color: red;
}
</style>
