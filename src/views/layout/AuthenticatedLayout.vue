<template>
  <el-container direction="vertical">
    <Header v-if="isMobileView"
      :handleSidebarShow="handleSidebarShow"
      :isMobileView="isMobileView"
    />
    <el-container class="main-container">
      <el-aside class="sidebar-aside">
        <SidebarContainer
          :isMobileView="isMobileView"
          :sidebarShow="sidebarShow"
          :handleSidebarShow="handleSidebarShow"
        />
      </el-aside>
      <el-scrollbar class="body-scrollbar" height="100%">
        <el-main>
          <div class="line"></div>
          <div class="app-body">
            <router-view />
          </div>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Layout/Header.vue';
import SidebarContainer from '@/components/Layout/SidebarContainer.vue';

export default {
  components: {
    Header,
    SidebarContainer,
  },
  data() {
    return {
      sidebarShow: true,
      isMobileView: false,
      windowWidth: 0,
    };
  },
  methods: {
    handleSidebarShow(show) {
      if (show === 'click') {
        this.sidebarShow = !this.sidebarShow;
      } else {
        this.sidebarShow = show;
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    windowWidth(newWindowWidth) {
      if (newWindowWidth <= '992') {
        this.isMobileView = true;
      } else {
        this.isMobileView = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  height: calc(100vh - 60px);
}

.sidebar-aside {
  width: unset !important;
}

.body-scrollbar {
  width: 100%;
}
.el-container.is-vertical {
  background-color: #2a2a2a;
}
</style>
