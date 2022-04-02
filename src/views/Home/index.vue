
<template name="Home">
  <div class="warp">
    <div class="header">
      <Header></Header>
    </div>
    <div class="slide">
      <a-menu @click="changeMenuKey" mode="inline" :selectedKeys="selectedKeys" :openKeys="openKey">
        <template v-for="item in route" :key="item.path">
          <a-sub-menu :key="item.path" v-if="item.children">
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
            <template v-for="childrenRouter in item.children" :key="childrenRouter.path">
              <a-menu-item :title="childrenRouter.meta.title" :index="childrenRouter.path">
                <span>{{ childrenRouter.meta.title }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :title="item.meta.title" :key="(item.path)" v-else>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
    <div class="content_warp">
      <div class="content">
        <ComponentWarp :detailTitle="detailTitle">
          <template #main>
            <router-view></router-view>
          </template>
        </ComponentWarp>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router, { RouterType } from "@/router/index";
import Header from "@/components/Header/index.vue";
import ComponentWarp from "@/components/ComponentWarp/index.vue";
import { theme } from "@/piniaStore/module/theme"
import { MenuInfo } from "ant-design-vue/es/menu/src/interface";

const routers = useRouter();
const store = theme()
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);
const selectedKeys = ref<string[]>([]);
const openKey = ref<string[]>([]);
const routerFlat = ref<RouterType[]>([])
const changeMenuKey = (i: MenuInfo) => {
  selectedKeys.value = i.keyPath as string[]
  if (i.key) {
    router.push(i.key as any)
  } else {
    router.push('/404')
  }
}

onMounted(() => {
  const keysArr = routers.currentRoute.value.matched.map(d => d.path)
  keysArr.splice(0, 1)
  selectedKeys.value = keysArr
  openKey.value = keysArr
  store.updateTheme()
  deepRouter(route)
})

// 递归打平
const deepRouter = (routers: RouterType[]) => {
  if (routers && Array.isArray(routers)) {
    routers.forEach((d: RouterType) => {
      if (d.children) {
        deepRouter(d.children)
      } else {
        routerFlat.value.push(d)
      }
    })
  }
}

const detailTitle: any = () => {
  return routerFlat.value.find((item: any) => item.path === pathname.value)?.meta?.title;
};


const goBack = () => {
  routers.back();
};
// @ts-ignore
routers.afterEach((to, from) => {
  if (pathname.value === to.fullPath) return;
  pathname.value = to.fullPath;
});
</script>
<style scoped lang="less">
.warp {
  min-height: 100vh;
  width: 100%;

  .slide {
    width: 208px;
    height: 100vh;
    min-width: 208px;
    overflow-y: auto;
    z-index: 20;
    overflow-x: hidden;
    position: fixed;
    border: none;
    padding-top: 60px;
    background-color: var(--a-menu-bg);
    :deep(.ant-menu) {
      background-color: var(--a-menu-bg) !important;
    }
  }

  .header {
    height: 60px;
    display: flex;
    z-index: 30;
    position: fixed;
    width: 100%;
    align-items: center;
    background-color: var(--a-header-bg);
  }

  .content_warp {
    display: flex;
    padding-top: 60px;
    height: calc(100vh - 71px);
    width: 100%;
  }

  .content {
    flex: 1;
    margin-left: 208px;
    width: calc(100vw - 23% - 30px);
    max-width: calc(100vw - 20% - 30px);
    min-width: calc(100vw - 20% - 30px);
  }

  .content_div {
    margin-top: 30px;
  }

  .a-menu-item.is-active {
    color: inherit;
  }
}
</style>
