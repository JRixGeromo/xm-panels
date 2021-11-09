<template>
  <el-breadcrumb separator="/">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item> -->
    <el-breadcrumb-item :to="{ path: '/allcustomers' }">All Customers</el-breadcrumb-item>
    <el-breadcrumb-item>Customer</el-breadcrumb-item>
  </el-breadcrumb>
  <router-view></router-view>
</template>

<script>
export default {
  computed: {
    customerDetails() {
      // return `/product/${this.$route.params.id}`;
      return `/customer/${this.$route.params.id}/details`;
    },
    createCustomer() {
      // return `/userprofile/${this.$route.params.id}/createdart`;
      return '/create/customer';
    },
  },
  data() {
    return {
      // tempId: 1,
      activeMenu: 'customerDetails',
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
