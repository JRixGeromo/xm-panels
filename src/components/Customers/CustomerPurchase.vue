<template>
  <el-row style="padding-bottom: 20px;">
    <el-col :span="12">
      <div class="portrait" v-loading="!productImg">
        <img class="image" :src="productImg" v-if="productImg" />
      </div>
    </el-col>
    <el-col :span="12" style="position: relative; padding-left: 10px">
      <div class="listing-top highlight-text">
        INVOICE# {{ purchaseDetails.invoiceNo }}
        <br />
        ${{ purchaseDetails.price }}
        <br />
        <span
          class="normal-text"
          style="font-weight:100; font-family: 'Helvetica Neue' !important;"
        >Purchased On: {{ getDate(purchaseDetails.invoiceDate) }}</span>
      </div>
      <div class="listing-bottom normal-text">
        <div>{{ productName }}</div>
        <div>{{ licensor }}</div>
        <div>{{ character }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { onMounted, ref } from 'vue';
import productService from '@/services/product-service';
import * as dayjs from 'dayjs';

export default {
  props: {
    purchaseDetails: Object,
  },
  setup(props) {
    const productImg = ref(null);
    const productName = ref('Loading');
    const licensor = ref('Loading');
    const character = ref('Loading');

    onMounted(() => {
      productService.getProduct(props.purchaseDetails.productId).then((data) => {
        productImg.value = data.productDisplayImage;
        productName.value = data.productName ? data.productName : '-';
        licensor.value = data.character ? data.character.license.licenseName : '-';
        character.value = data.character ? data.character.characterName : '-';
      });
    });

    const getDate = (cusdt) => {
      const dt = new Date(cusdt);
      return dayjs(dt).format('DD/MM/YYYY');
    };

    return {
      productImg,
      productName,
      licensor,
      character,
      getDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  border-radius: 0px;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.portrait {
  height: 400px;
  width: 100%;
}
</style>
