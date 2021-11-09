<template>
    {{ productName }}<br>
    {{ licensor  }}<br>
    {{ character }}
</template>

<script>
import { onMounted, ref } from 'vue';
import productService from '@/services/product-service';

export default {
  props: {
    productId: String,
  },
  setup(props) {
    const productName = ref('Loading');
    const licensor = ref('Loading');
    const character = ref('Loading');
    onMounted(() => {
      if (props.productId) {
        productService.getProduct(props.productId).then((data) => {
          productName.value = data.productName ? data.productName : '-';
          licensor.value = data.character ? data.character.license.licenseName : '-';
          character.value = data.character ? data.character.characterName : '-';
        });
      }
    });
    return {
      productName,
      licensor,
      character,
    };
  },
};
</script>
