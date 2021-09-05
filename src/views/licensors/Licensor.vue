<template>
  <el-affix :offset="10">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/alllicensors' }">
        All Licensors
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        Licensor
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-affix>
  <!-- <el-menu v-if="this.$route.params.id"
    :default-active="activeMenu"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#2a2a2a"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true">
    <el-menu-item :index="productDetails">Product Details</el-menu-item>
    <el-menu-item :index="artistDetails">Artist Details</el-menu-item>
    <el-menu-item :index="serialNumbers">Serial Numbers</el-menu-item>
  </el-menu>
  <el-menu v-else
    :default-active="activeMenu"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#2a2a2a"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true">
    <el-menu-item :index="createProduct">Product Details</el-menu-item>
    <el-menu-item :index="productartistdetails">Artist Details</el-menu-item>
    <el-menu-item :index="productserialnumbers">Serial Numbers</el-menu-item>
  </el-menu> -->
  <router-view></router-view>
</template>

<script>
export default {
  computed: {
    licensorDetails() {
      // return `/product/${this.$route.params.id}`;
      return `/licensor/${this.$route.params.id}/details`;
    },
    createLicensor() {
      // return `/userprofile/${this.$route.params.id}/createdart`;
      return '/create/licensor';
    },
  },
  data() {
    return {
      // tempId: 1,
      activeMenu: 'licensorDetails',
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
