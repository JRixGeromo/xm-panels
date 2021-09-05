<template>
  <ProductDesignsForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingProduct"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductDesignsForm from '@/components/Products/ProductDesignsForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_DESIGN } from '@/store/modules/product/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';

export default {
  name: 'DesignCreate',
  setup() {
    const store = useStore();
    return {
      creatingDesign: computed(() => store.state.product.creatingDesign),
      createDesign: (designDetail) => store.dispatch(`product/${CREATE_DESIGN}`, designDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        console.log(form.model);
        if (valid) {
          // use default profile image if user click clear img
          if (form.model.designImageFile === null && form.model.designImageUrl === null) {
            form.model.designFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.designImageFile = null;
          }
          const designDetail = {
            ...form.model,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.createDesign(designDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ProductDesignsForm,
  },
};
</script>
