<template>
  <main>
    <div>肖明辉</div>
  </main>
</template>
<script>
</script>
<style scoped lang='less'>
main {
  perspective: 800px;
}
div {
  padding: 20px;
  margin-bottom: 20px;
  background-color: var(--el-color-primary);
  transition: 1s;
  display: inline-block;
  border-radius: 0.9rem;
  &:hover {
    background-color: red;
    color: #fff;
  }
}
</style>