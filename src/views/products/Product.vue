<template>
  <!-- <el-affix :offset="10"> -->
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/allproducts' }">
        All Products
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.name">
        {{this.$route.query.name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        Create
      </el-breadcrumb-item>
    </el-breadcrumb>
  <!-- </el-affix> -->
  <el-container>
    <el-main v-if="this.$route.params.id" :router="true" style="text-align: center; padding:2px">
      <div class="breadcrumb flat">
        <a  @click="$router.push(`/product/${this.$route.params.id}/details?name=${this.$route.query.name}`)"
        :class="{ active:selectedMenu.includes('details') }">Product Detail</a>
        <a @click="$router.push(`/product/${this.$route.params.id}/sustainability?name=${this.$route.query.name}`)"
        :class="{ active:selectedMenu.includes('sustainability') }">Sustainability Report</a>
        <a @click="$router.push(`/product/${this.$route.params.id}/designs?name=${this.$route.query.name}`)"
        :class="{ active:selectedMenu.includes('designs') }">Artist Details</a>
        <a @click="$router.push(`/product/${this.$route.params.id}/serialnumbers?name=${this.$route.query.name}`)"
        :class="{ active:selectedMenu.includes('serialnumbers') }">Serial Numbers</a>
      </div>
    </el-main>
    <el-main v-else :router="true" style="text-align: center; padding:2px">
      <div class="breadcrumb flat" :router="true">
        <router-link to="/create/product">Product Detail</router-link>
      </div>
    </el-main>
  </el-container>
  <!-- <el-menu v-if="this.$route.params.id"
    :default-active="activeMenu"
    class="breadcrumb flat"
    mode="horizontal"
    :router="true">
    <el-menu-item :index="productDetails"><a>Product Details</a></el-menu-item>
    <el-menu-item :index="artistDetails"><a>Artist Details</a></el-menu-item>
    <el-menu-item :index="serialNumbers"><a>Serial Numbers</a></el-menu-item>
  </el-menu>
  <el-menu v-else
    :default-active="activeMenu"
    class="breadcrumb flat"
    mode="horizontal"
    :router="true">
    <el-menu-item :index="createProduct"><a>Product Details</a></el-menu-item>
    <el-menu-item :index="productartistdetails"><a>Artist Details</a></el-menu-item>
    <el-menu-item :index="productserialnumbers"><a>Serial Numbers</a></el-menu-item>
  </el-menu> -->
  <router-view></router-view>
</template>

<script>
// import { useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus';
// import { GET_PRODUCT } from '@/store/modules/product/actions-type';
// import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      activeMenu: 'details',
      selectedMenu: 'details',
      product: null,
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
    this.selectedMenu = this.$router.currentRoute.value.fullPath.split('/').pop();
    // this.GET_PRODUCT(this.$route.params.id);
  },
  computed: {
    // ...mapState('product', ['productDetails']),
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
      this.selectedMenu = window.location.pathname.split('/').pop();
    },
    // productDetails() {
    //   this.product = this.productDetails;
    // },
  },
  methods: {
    /*
    ...mapActions('product', [GET_PRODUCT]),
    checkDesignOk() {
      if (this.product.sustainabilityReport) {
        this.$router.push(`/product/${this.$route.params.id}/designs?name=${this.product.productName}`);
      } else {
        ElMessage.error({
          showClose: true,
          message: 'Please enter sustainability report first',
        });
      }
    },
    checkSerialOk() {
      if (this.product.sustainabilityReport && this.product.designs.length > 0) {
        this.$router.push(`/product/${this.$route.params.id}/serialnumbers?name=${this.product.productName}`);
      } else {
        ElMessage.error({
          showClose: true,
          message: 'Please enter sustainability report and design first',
        });
      }
    },
    */
  },
};
</script>
