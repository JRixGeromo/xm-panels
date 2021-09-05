<template>
  <el-scrollbar class="custom-scrollbar" @mouseover="handleSidebarShow(false)" @mouseleave="handleSidebarShow(true)">
    <div class="wrap-sidebar">
      <!-- <div v-if="sidebarShow" class="logo-max"> -->
      <div v-if="sidebarShow" class="logo-max">
        XM-Studios<br>Admin
      </div>
      <div v-else class="logo-min">
      <!-- <div v-else class="logo-min"> -->
        XM
      </div>
    </div>
    <div class="wrap-sidebar">
      <SidebarNavMenu :sidebarShow="sidebarShow" />
    </div>
  </el-scrollbar>
</template>

<script>
import SidebarNavMenu from './SidebarNavMenu.vue';

export default {
  props: {
    sidebarShow: Boolean,
    handleSidebarShow: Function,
  },
  components: {
    SidebarNavMenu,
  },
};
</script>

<style lang="scss" scoped>
.wrap-sidebar {
  display:block;
  min-height: 50px;
}

.custom-scrollbar {
  border-right: 1px solid #dcdfe6;
}

.custom-side-menu {
  border-right: unset;
  user-select: none;
}

.custom-side-menu:not(.el-menu--collapse) {
  width: 200px;
}

.icon {
  font-size: 25px;

  &.is-collapse {
    transform: rotate(180deg) !important;
  }
}
</style>
