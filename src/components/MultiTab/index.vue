<template>
  <div class="multi_tab" :class="menuStore.$state.collapsed && 'multi_tab_w'">
    <keep-alive>
      <a-tabs
        hide-add
        @change="routerChange"
        type="editable-card"
        @edit="onEdit"
        :activeKey="$state.activeKey"
      >
        <a-tab-pane
          v-for="route in $state.routerList"
          :key="route.path"
          :closable="true"
          :tab="`${route.name}`"
        ></a-tab-pane>
        <template #rightExtra>
          <div class="multi_tab_r">
            <a-space>
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  多页签操作
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu @click="handleMenuClick">
                    <a-menu-item key="0">
                      <a>关闭当前页签</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a>关闭左侧页签</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a>关闭右侧页签</a>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a>关闭所有页签</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </div>
        </template>
      </a-tabs>
    </keep-alive>
  </div>
</template>

<script setup lang='ts'>
import { multiTab, RouterListType } from "@/piniaStore/module/multiTab"
import { DownOutlined } from '@ant-design/icons-vue';
import { menu } from "@/piniaStore/module/menu"
import { MenuInfo } from "ant-design-vue/es/menu/src/interface";
const menuStore = menu()
const multiTabStore = multiTab()
const { $state, updateActiveKey, addRouter, removeRouter, replaceRouterList } = multiTabStore

const routers = useRouter();
const routerChange = (key: string) => {
  routers.push(key)
  updateActiveKey(key)
}

// 标签操作
const handleMenuClick = (info: MenuInfo) => {
  const { key } = info
  const index = $state.routerList.findIndex((d: RouterListType) => d.path === $state.activeKey)
  switch (key) {
    case '0':
      return onEdit(routers.currentRoute.value.fullPath)
    case '1':
      replaceRouterList($state.routerList.filter((d: RouterListType, i: number) => i > ((index - 1) || 0)));
      return
    case '2':
      replaceRouterList($state.routerList.filter((d: RouterListType, i: number) => i < ((index + 1))));
      return
    case '3':
      replaceRouterList([{
        path: "/welcome",
        name: "首页",
        componentName: "Welcome",
      }], () => {
        updateActiveKey('/welcome');
        routers.push('/welcome')
      });
      return
    default:
      return
  }
}

const onEdit = (path: string | number) => {
  removeRouter(path as string, (index: number) => {
    const i = (index - 1) < 0 ? 0 : index - 1
    updateActiveKey($state.routerList[i]?.path || '/welcome')
    routers.push($state.activeKey)
  })
}

watch(() => routers.currentRoute.value.fullPath, (v) => {
  const to = routers.currentRoute.value
  if (to.fullPath === '/404' || to.fullPath === '/login') {
    return
  }
  if ($state.routerList.find(d => d.path === to.fullPath)) {
    updateActiveKey(to.fullPath)
  } else {
    updateActiveKey(to.fullPath)
    addRouter({
      path: to.fullPath,
      name: to.meta.title as string,
      componentName: to.name as string,
    })
  }
})

onMounted(() => {
  const path = routers.currentRoute.value.fullPath
  const to = routers.currentRoute.value

  if ($state.routerList.find(d => d.path === path)) {
    updateActiveKey(path)
    routers.push(path)
  } else {
    addRouter({
      path: to.fullPath,
      name: to.meta.title as string,
      componentName: to.name as string,

    })
    updateActiveKey(path)

  }

})

</script>
<style scoped lang='less'>
.multi_tab {
  overflow-x: auto;
  position: absolute;
  width: calc(100vw - 208px);
  height: 50px;
  left: 208px;
  // transition: var(--menu_transition);
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
}
.multi_tab_w {
  left: 80px;
  width: calc(100vw - 80px);
  // transition: var(--menu_transition);
}
</style>
