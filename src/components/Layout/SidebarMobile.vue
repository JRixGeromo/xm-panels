<template>
  <el-drawer
    v-model="drawer"
    :with-header="false"
    :before-close="drawerBeforeClose"
    modal-class="mobile-nav-drawer"
    direction="ltr"
    size="70%"
     >
    <!-- <div class="wrap-sidebar">
      <div v-if="sidebarShow" @click="handleSidebarShow" class="logo-max">
        XM-Studios<br>Admin
      </div>
      <div v-else @click="handleSidebarShow" class="logo-min">
        XM
      </div>
    </div> -->
    <div class="wrap-sidebar">
      <SidebarNavMenu :sidebarShow="sidebarShow" :handleSidebarShow="handleSidebarShow" />
    </div>
  </el-drawer>
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
  data() {
    return {
      drawer: this.sidebarShow,
    };
  },
  watch: {
    sidebarShow(newSidebarShow) {
      this.drawer = newSidebarShow;
    },
  },
  methods: {
    drawerBeforeClose() {
      this.handleSidebarShow(false);
    },
  },
};
</script>

<style lang="scss">
.el-drawer__body {
  overflow: auto;
  top:60px;
}
</style>
