<template>
  <el-menu
    :default-active="activeMenu"
    :router="true"
    class="custom-side-menu"
    :collapse="!sidebarShow"
  >
    <template v-for="item in navMenu" :key="item.name">
      <template v-if="!item.child">
        <el-menu-item :index="item.route">
          <i :class="item.icon"></i>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-submenu :index="item.name">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="nav in item.subNav"
              :key="nav.name"
              :index="nav.route"
            >
              <span class="black-text">{{ nav.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { NAV_MENU } from '@/common/constants';

export default {
  props: {
    sidebarShow: Boolean,
    handleSidebarShow: Function,
  },
  data() {
    return {
      currentRoute: this.$router.currentRoute.value.fullPath,
      activeMenu: null,
      navMenu: NAV_MENU,
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
    this.currentRoute = this.$router.currentRoute.value.fullPath;
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
      this.currentRoute = this.$router.currentRoute.value.fullPath;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  background-color: #0e0e0e;
}
</style>
