<template>
  <el-menu
    :default-active="activeMenu"
    :router="true"
    class="custom-side-menu"
    :collapse="!sidebarShow"
    :unique-opened="true"
  >
    <template v-for="item in navMenu" :key="item.name">
      <template v-if="!item.child">
          <router-link :to="item.route">
            <el-menu-item :index="item.route" @click="closeNavbar">
                <i :class="item.icon"></i>
                <template #title>{{ item.name }}</template>
            </el-menu-item>
          </router-link>
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
              @click="closeNavbar"
            >
              <span>{{ nav.name }}</span>
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
  methods: {
    closeNavbar() {
      this.handleSidebarShow(false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.el-menu {
  background-color: $--color-primary;
  font-weight: bold;
  font-size: 16px;
}
</style>
