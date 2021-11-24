<template>
  <el-main :router="true" style="text-align: center; padding:2px">
    <div class="breadcrumb flat">
      <a :class="{ active:isActive('product') }"
        @click="$router.push(`/product/${recentProd.productId}/details`)">Product Detail</a>

      <a :class="{ active:isActive('sustainability') }"
        @click="$router.push(`/product/${recentProd.productId}/sustainability`)">Sustainability Report</a>

      <a :class="{ active:isActive('designs') }"
        @click="$router.push(`/product/${recentProd.productId}/designs`)">Artist Details</a>

      <a :class="{ active:isActive('serialnumbers') }"
        @click="$router.push(`/product/${recentProd.productId}/serialnumbers`)">Serial Numbers</a>
    </div>
  </el-main>
</template>
<script>

export default {
  props: {
    recentProd: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isActive(item) {
      console.log(item);
      let progress = '';
      if (this.recentProd.productSerialNumbers > 0) {
        progress = 'serialnumbers';
      } else if (this.recentProd.designs.length > 0) {
        progress = 'designs';
      } else if (this.recentProd.sustainabilityReport) {
        progress = 'sustainability';
      } else if (this.recentProd.productId) {
        progress = 'product';
      }
      // if (item === 'sustainability') {
      //   progress = true;
      // }
      return progress === item;
    },
  },
};
</script>
