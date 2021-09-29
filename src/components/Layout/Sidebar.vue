<template>
  <el-scrollbar class="custom-scrollbar" @mouseover="handleSidebarShow(false)" @mouseleave="handleSidebarShow(true)">
    <div class="wrap-sidebar" @click="redirectHome">
      <!-- <div v-if="sidebarShow" class="logo-max"> -->
      <div v-if="sidebarShow" class="logo-max">
        <div>XM-Studios<br>Admin</div>
      </div>
      <div v-else class="logo-min">
      <!-- <div v-else class="logo-min"> -->
        <div>XM</div>
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
  methods: {
    redirectHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-sidebar {
  display:block;
  min-height: 50px;
  font-family: 'gotham';
  text-transform: uppercase;
}

// .custom-scrollbar {
//   border-right: 1px solid #dcdfe6;
// }

.custom-side-menu {
  border-right: unset;
  user-select: none;
}

// .custom-side-menu:not(.el-menu--collapse) {
//   width: 200px;
// }

.logo-min,
.logo-max {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon {
  font-size: 25px;

  &.is-collapse {
    transform: rotate(180deg) !important;
  }
}
</style>
