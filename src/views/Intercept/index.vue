
<template >
  <div class="warp">
    <a-result status="warning" title="您要前往的地址不是本网站地址请注意诈骗" :sub-title="url">
      <template #extra>
        <a-button key="console" type="primary" @click="back">返回</a-button>
        <a-button key="console" type="primary" @click="go">确认前往</a-button>
      </template>
    </a-result>
  </div>
</template>
<script lang="ts" setup>
const routers = useRouter();
const url = ref(routers?.currentRoute?.value?.query?.redirceUrl || '')
onMounted(() => {
  if (!url) {
    routers.push('/')
  }
})
const go = () => {
  window.open(url.value)
}
const back = () => {
  routers.back()
}
</script>
<style scoped lang="less">
.warp {
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
