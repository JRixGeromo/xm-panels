<template>
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '/allartists' }">
      All Artists
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      John Doe
    </el-breadcrumb-item>
  </el-breadcrumb>
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
