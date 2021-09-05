<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/userlisting' }">
      User Listing
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    :router="true"
  >
  </el-menu>
  <router-view></router-view>
</template>

<script>
export default {
  computed: {
    editUserRoute() {
      return `/userprofile/${this.$route.params.id}`;
    },
  },
  data() {
    return {
      activeMenu: null,
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
    },
  },
};
</script>
