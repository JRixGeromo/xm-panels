<template>
  <!-- <el-affix :offset="10"> -->
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/allproducts' }">
        All Products
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="linksToggled.productName">
        {{linksToggled.productName}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else>
        Create
      </el-breadcrumb-item>
    </el-breadcrumb>
  <!-- </el-affix> -->
  <el-container>
    <el-main v-if="this.$route.params.id" :router="true" style="text-align: center; padding:2px">
      <div class="breadcrumb flat">

        <a @click="$router.push(`/product/${this.$route.params.id}/details`)"
        :class="{ active:selectedMenu.includes('details') }">Product Detail</a>

        <a v-show="linksToggled.susLink" @click="$router.push(`/product/${this.$route.params.id}/sustainability`)"
        :class="{ active:selectedMenu.includes('sustainability') }">Sustainability Report</a>
        <a class="isDisabled" v-show="!linksToggled.susLink" :class="{ active:selectedMenu.includes('sustainability') }">Sustainability Report</a>

        <a v-show="linksToggled.artLink" @click="$router.push(`/product/${this.$route.params.id}/designs`)"
        :class="{ active:selectedMenu.includes('designs') }">Artist Details</a>
        <a class="isDisabled" v-show="!linksToggled.artLink" :class="{ active:selectedMenu.includes('designs') }">Artist Details</a>

        <a v-show="linksToggled.serLink" @click="$router.push(`/product/${this.$route.params.id}/serialnumbers`)"
        :class="{ active:selectedMenu.includes('serialnumbers') }">Serial Numbers</a>
        <a class="isDisabled" v-show="!linksToggled.serLink" :class="{ active:selectedMenu.includes('serialnumbers') }">Serial Numbers</a>

      </div>
    </el-main>
    <el-main v-else :router="true" style="text-align: center; padding:2px">
      <div class="breadcrumb flat" :router="true">
        <router-link to="/create/product">Product Detail</router-link>
        <a class="isDisabled">Sustainability Report</a>
        <a class="isDisabled">Artist Details</a>
        <a class="isDisabled">Serial Numbers</a>
      </div>
    </el-main>
  </el-container>
  <router-view></router-view>
</template>

<script>
// import { useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus';
// import { GET_PRODUCT } from '@/store/modules/product/actions-type';
import { SET_LINKS } from '@/store/modules/linkstoggle/actions-type';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      activeMenu: 'details',
      selectedMenu: 'details',
      product: null,
      toggle: {
        susLink: true,
        artLink: true,
        serLink: true,
        productName: '',
      },
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
    this.selectedMenu = this.$router.currentRoute.value.fullPath.split('/').pop();
    // this.GET_PRODUCT(this.$route.params.id);
  },
  computed: {
    ...mapState('linkstoggle', ['linksToggled']),
    ...mapState('product', ['productDetails']),
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
      this.selectedMenu = window.location.pathname.split('/').pop();
    },
    productDetails() {
      this.effectLinks();
    },
    /*
    linksToggled() {
      this.toggle.susLink = this.linksToggled.susLink;
      this.toggle.artLink = this.linksToggled.artLink;
      this.toggle.serLink = this.linksToggled.serLink;
    },
    */
  },
  methods: {
    ...mapActions('linkstoggle', [SET_LINKS]),
    // ...mapActions('product', [GET_PRODUCT]),
    effectLinks() {
      if (this.productDetails.productName) {
        this.toggle.susLink = true;
      } else {
        this.toggle.susLink = false;
      }
      if (this.productDetails.sustainabilityReport) {
        this.toggle.artLink = true;
      } else {
        this.toggle.artLink = false;
      }
      if (this.productDetails.sustainabilityReport && this.productDetails.designs.length > 0) {
        this.toggle.serLink = true;
      } else {
        this.toggle.serLink = false;
      }
      this.toggle.productName = this.productDetails.productName;
      this.SET_LINKS(this.toggle);
    },
  },
};
</script>
<style>
.isDisabled {
  color: currentColor !important;
  cursor: not-allowed !important;
  opacity: 0.5 !important;
  text-decoration: none !important;
}
</style>
