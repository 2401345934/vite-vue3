<template>
  <div class="menuChange">
    <MenuUnfoldOutlined @click="toggleCollapsed" v-if="state.collapsed" />
    <MenuFoldOutlined @click="toggleCollapsed" v-else />
  </div>
</template>

<script setup lang='ts'>
import { menu } from "@/piniaStore/module/menu"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
const menuStore = menu()

const state = reactive({
  collapsed: menuStore.$state.collapsed,
});

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  menuStore.changeStateMenu(!menuStore.$state.collapsed)
};
</script>
<style scoped lang='less'>
.menuChange {
  color: #fff;
  margin-left: 10px;
}
</style>