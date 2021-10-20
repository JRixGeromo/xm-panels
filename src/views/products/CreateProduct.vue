<template>
  <ProductForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :next="next"
    :loading="creatingProduct"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductForm from '@/components/Products/ProductForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_PRODUCT } from '@/store/modules/product/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import dayjs from 'dayjs';

export default {
  name: 'ProductCreate',
  setup() {
    const store = useStore();
    return {
      creatingProduct: computed(() => store.state.product.creatingProduct),
      createProduct: (productDetail) => store.dispatch(`product/${CREATE_PRODUCT}`, productDetail),
    };
  },
  methods: {
    onSubmit(form, next) {
      this.next = next;
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          if (form.model.productImageFile === null && form.model.productImageUrl === null) {
            form.model.productDisplayPhotoFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.productImageFile = null;
          }
          let productImages = [];
          productImages = form.model.productImagesUrl;
          const productDetail = {
            ...form.model,
            productManufactureDate: dayjs(form.model.productManufactureDate).format('YYYY-MM-DDT00:00:00'),
            productReleaseDate: dayjs(form.model.productReleaseDate).format('YYYY-MM-DDT00:00:00'),
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
            productImages,
          };
          this.createProduct(productDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ProductForm,
  },
};
</script>
