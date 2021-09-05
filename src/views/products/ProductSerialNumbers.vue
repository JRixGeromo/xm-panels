<template>
  <ProductSerialNumbersForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingProduct"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductSerialNumbersForm from '@/components/Products/ProductSerialNumbersForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_DESIGN } from '@/store/modules/product/actions-type';

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
          this.createSerialNumber(form.model);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ProductSerialNumbersForm,
  },
};
</script>
