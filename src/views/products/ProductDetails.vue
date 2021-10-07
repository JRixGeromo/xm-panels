<template>
  <ProductDetailsForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="updatingProduct"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductDetailsForm from '@/components/Products/ProductDetailsForm.vue';
// import { randomPassword } from '@/helpers';
import { UPDATE_PRODUCT } from '@/store/modules/product/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import dayjs from 'dayjs';

export default {
  name: 'ProductCreate',
  setup() {
    const store = useStore();
    return {
      updatingProduct: computed(() => store.state.product.updatingProduct),
      updateProduct: (productDetail) => store.dispatch(`product/${UPDATE_PRODUCT}`, productDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          if (form.model.productImageFile === null && form.model.productImageUrl === null) {
            form.model.productDisplayPhotoFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.productImageFile = null;
          }
          const productImages = [];
          productImages.push(form.model.productImagesUrl);
          const productDetail = {
            ...form.model,
            productManufactureDate: dayjs(form.model.productManufactureDate).format('YYYY-MM-DDT00:00:00'),
            productReleaseDate: dayjs(form.model.productReleaseDate).format('YYYY-MM-DDT00:00:00'),
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
            productImages,
          };
          this.updateProduct(productDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ProductDetailsForm,
  },
};
</script>
