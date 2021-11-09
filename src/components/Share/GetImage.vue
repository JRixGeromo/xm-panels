<template>
  <img
      class="image"
      :src="img"
    />
</template>

<script>
import { onMounted, ref } from 'vue';
import productService from '@/services/product-service';

export default {
  props: {
    productId: String,
  },

  setup(props) {
    const img = ref('loading');
    onMounted(() => {
      if (props.productId) {
        productService.getProduct(props.productId).then((data) => {
          img.value = data.productDisplayImage;
        });
      }
    });
    /*
    onUpdated(() => {
      productService.getProduct(props.productId).then((data) => {
        img.value = data[0].productDisplayImage;
      });
    });
    */
    return {
      img,
    };
  },
};
</script>
