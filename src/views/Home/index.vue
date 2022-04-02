
<template name="Home">
  <div class="warp">
    <div class="header">
      <Header></Header>
    </div>
    <div class="slide">
      <el-menu router text-color="#fff" :default-active="pathname" class="el-menu-home-class">
        <template v-for="item in route" :key="item.path">
          <el-sub-menu class="el-menu-home-class" :index="item.path" v-if="item.children">
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
            <template v-for="childrenRouter in item.children" :key="childrenRouter.path">
              <el-menu-item :index="childrenRouter.path">
                <span>{{ childrenRouter.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item :index="item.path" v-else>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <!-- <el-menu
          v-for="item in route"
          text-color="#fff"
          :default-active="pathname"
          :key="item.path"
          class="el-menu-home-class"
          router
        >
          <el-menu-item :index="item.path" v-if="item.component">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
      </el-menu>-->
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
// @ts-nocheck
import router, { RouterType } from "@/router/index";
// @ts-ignore
import Header from "@/components/Header/index.vue";
import ComponentWarp from "@/components/ComponentWarp/index.vue";
const routers = useRouter();
import { theme } from "@/piniaStore/module/theme"
const store = theme()
// @ts-ignore
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);


const routerFlat = ref([])

onMounted(() => {
  store.updateTheme()
  deepRouter(route)
})

// 递归打平
const deepRouter = (routers: RouterType[]) => {
  if (routers && Array.isArray(routers)) {
    routers.forEach(d => {
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
    width: 20%;
    height: 100%;
    min-width: 20%;
    margin-right: 30px;
    z-index: 20;
    position: fixed;
    padding-top: 60px;

    /deep/ .el-menu {
      background-color: var(--el-menu-bg) !important;
      color: var(--el-menu_active_color);
      &:hover {
        --el-menu-hover-bg-color: var(--el-menu_bg_color) !important;
      }
    }
  }

  .header {
    height: 60px;
    display: flex;
    z-index: 30;
    position: fixed;
    width: 100%;
    align-items: center;
    background-color: var(--el-header-bg);
  }

  .content_warp {
    display: flex;
    padding-top: 60px;
    height: calc(100vh - 71px);
    width: 100%;
  }

  .content {
    flex: 1;
    margin-left: 21%;
    width: calc(100vw - 23% - 30px);
    max-width: calc(100vw - 20% - 30px);
    min-width: calc(100vw - 20% - 30px);
  }

  .content_div {
    margin-top: 30px;
  }

  .el-menu-item.is-active {
    color: inherit;
  }
}
</style>
