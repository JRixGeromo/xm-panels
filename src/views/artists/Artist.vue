<template>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/allartists' }">
        All Artists
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        John Doe
      </el-breadcrumb-item>
    </el-breadcrumb>
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
  <!-- a simple div with some links -->
  <el-container>
    <el-main style="text-align: center; padding:2px">
      <div class="breadcrumb flat">
        <router-link class="active" :to="{ path: '/allartists' }">Item1</router-link>
        <a href="#">Item2</a>
      </div>
    </el-main>
  </el-container>
  <router-view></router-view>
</template>

<script>
export default {
  computed: {
    productDetails() {
      // return `/product/${this.$route.params.id}`;
      return `/artists/${this.$route.params.id}/details`;
    },
    createArtist() {
      // return `/userprofile/${this.$route.params.id}/createdart`;
      return '/create/artist';
    },
  },
  data() {
    return {
      // tempId: 1,
      activeMenu: 'artist',
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
<style lang="scss" scoped>
</style>
