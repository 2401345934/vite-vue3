
<template name="Home">
  <div class="warp">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content_warp">
      <div class="slide">
        <el-menu v-for="item in route"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :default-active="pathname"
                 :key="item.path"
                 class="el-menu-vertical-demo"
                 router>
          <el-menu-item :index="item.path">
            <span>{{item.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
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
import router from "@/router/index.js";
// @ts-ignore
import Header from "@/components/Header/index.vue";
import ComponentWarp from "@/components/ComponentWarp/index.vue";
const routers = useRouter();
// @ts-ignore
const route: any = router.options.routes[0].children;
const pathname = ref(routers.currentRoute.value.fullPath);
const detailTitle: any = () => {
  return route.find((item: any) => item.path === pathname.value).meta.title;
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
<style  lang="less">
.warp {
  min-height: 100vh;
  width: 100%;

  .slide {
    width: 20%;
    height: 100%;
    margin-right: 30px;
  }

  .header {
    height: 60px;
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    border: 1px solid rebeccapurple;
  }

  .content_warp {
    display: flex;
    padding-top: 71px;
    height: calc(100vh - 71px);
    width: 100%;
  }

  .content {
    flex: 1;
  }

  .content_div {
    margin-top: 30px;
  }
}
</style>
