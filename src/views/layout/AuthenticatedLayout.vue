<template>
  <el-container direction="vertical">
    <Header
      v-if="isMobileView"
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
        <div class="app-body">
          <router-view />
        </div>
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
@import "@/assets/styles/_variables.scss";

.app-body {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px 20px 80px 20px;
}

.main-container {
  height: calc(100vh - 60px);
}

.sidebar-aside {
  width: unset !important;
  height: 100%;
  position: absolute;
  z-index: 101;
}

.body-scrollbar {
  width: 100%;
  padding-left: 68px;
}

.sidebar-aside,
.el-container.is-vertical {
  background-color: $--color-primary;
}
</style>
