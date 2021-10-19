<template>
  <ProductSerialNumbersForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingSerialNumber"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductSerialNumbersForm from '@/components/Products/ProductSerialNumbersForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_SERIAL_NUMBER } from '@/store/modules/product/actions-type';

export default {
  name: 'SerialNumberCreate',
  setup() {
    const store = useStore();
    return {
      creatingSerialNumber: computed(() => store.state.product.creatingSerialNumber),
      createSerialNumber: (serialNumberDetail) => store.dispatch(`product/${CREATE_SERIAL_NUMBER}`, serialNumberDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          const serialNumberDetail = {
            ...form.model,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.createSerialNumber(serialNumberDetail);
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
