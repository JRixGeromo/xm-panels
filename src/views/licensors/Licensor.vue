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
