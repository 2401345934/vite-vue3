
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
                 @select="routerChange"
                 router>
          <el-menu-item :index="item.path">
            <span>{{item.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router/index.js"
import Header from "@/components/Header/index.vue"
import { useRouter, } from 'vue-router'
import { ref } from 'vue'
const routers = useRouter()
const route = router.options.routes[0].children
const pathname = ref(routers.currentRoute.value.fullPath)
const routerChange = (path) => {
  pathname.value = path
}

</script>
<style >
@import "@/default.css";
.warp {
  min-height: 100vh;
  width: 100%;
}
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
</style>
