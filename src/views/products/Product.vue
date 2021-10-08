<template>
  <!-- <el-affix :offset="10"> -->
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/allproducts' }">
        All Products
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.query.name">
        {{productName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        Create
      </el-breadcrumb-item>
    </el-breadcrumb>
  <!-- </el-affix> -->
  <el-container>
    <el-main v-if="this.$route.params.id" :router="true" style="text-align: center; padding:2px">
      <div class="breadcrumb flat">
        <a  @click="$router.push(`/product/${this.$route.params.id}/details?name=${productName}`)"
        :class="{ active:selectedMenu.includes('details') }">Product Detail</a>
        <a @click="$router.push(`/product/${this.$route.params.id}/sustainability`)"
        :class="{ active:selectedMenu.includes('sustainability') }">Sustainability Report</a>
        <a @click="$router.push({path:`/product/${this.$route.params.id}/designs`})"
        :class="{ active:selectedMenu.includes('designs') }">Artist Details</a>
        <a @click="$router.push(`/product/${this.$route.params.id}/serialnumbers`)"
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
export default {
  computed: {
  },
  data() {
    return {
      productName: this.$route.query.name,
      activeMenu: 'details',
      selectedMenu: 'details',
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
    this.selectedMenu = this.$router.currentRoute.value.fullPath.split('/').pop();
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
      this.selectedMenu = window.location.pathname.split('/').pop();
    },
  },
};
// [
//   {
//     "productName": "Test1",
//     "productDescription": "Test1",
//     "productQuantity": 2,
//     "productManufactureCountry": "Phil",
//     "productReleaseDate": "2021-08-25T05:55:08.072Z",
//     "productManufactureDate": "2021-08-25T05:55:08.072Z",
//     "productDisplayImage": "Test only",
//     "productBackgroundImage": "Test only",
//     "productStatus": "Active",
//     "licenseId": "25e622ae-abed-4a80-0eb9-08d9643e9f4d",
//     "productImages": [
//       "Test only"
//     ],
//     "artistIds": [
//       "d52995d0-3b19-4fce-b564-08d962ce6f42"
//     ]
//   }
// ]
</script>
