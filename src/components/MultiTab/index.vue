<template>
  <div class="multi_tab">
    <a-tabs @change="routerChange" :activeKey="$state.activeKey">
      <a-tab-pane v-for="route in routerList" :key="route.path" :tab="`${route.name}`">
        <keep-alive include="cart">
          <slot></slot>
        </keep-alive>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang='ts'>
import { multiTab } from "@/piniaStore/module/multiTab"
const multiTabStore = multiTab()
const { $state, updateActiveKey, addRouter } = multiTabStore
const { routerList } = $state

const routers = useRouter();
const routerChange = (key: string) => {
  routers.push(key)
  updateActiveKey(key)
}

watch(() => routers.currentRoute.value.fullPath, (v) => {
  const to = routers.currentRoute.value
  if (to.fullPath === '/404' || to.fullPath === '/login') {
    return
  }
  if (routerList.find(d => d.path === to.fullPath)) {
    updateActiveKey(to.fullPath)
  } else {
    updateActiveKey(to.fullPath)
    addRouter({
      path: to.fullPath,
      name: to.meta.title as string
    })
  }
})

onMounted(() => {
  const path = routers.currentRoute.value.fullPath
  if (routerList.find(d => d.path === path)) {
    updateActiveKey(path)
    routers.push(path)
  } else {
    addRouter({
      path: routers.currentRoute.value.fullPath,
      name: routers.currentRoute.value.meta.title as string,
    })
    updateActiveKey(routers.currentRoute.value.fullPath)

  }

})

</script>
<style scoped lang='less'>
.multi_tab {
  overflow-x: auto;
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
}
</style>
