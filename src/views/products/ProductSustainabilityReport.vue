<template>
  <ProductSustainabilityReportForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingSustainabilityReport"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ProductSustainabilityReportForm from '@/components/Products/ProductSustainabilityReportForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_SUSTAINABILITY_REPORT } from '@/store/modules/product/actions-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';

export default {
  name: 'SustainabilityReportCreate',
  setup() {
    const store = useStore();
    return {
      creatingSustainabilityReport: computed(() => store.state.product.creatingSustainabilityReport),
      createSustainabilityReport: (sustainabilityReportDetail) => store.dispatch(`product/${CREATE_SUSTAINABILITY_REPORT}`,
        sustainabilityReportDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          // if (form.model.designImageFile === null && form.model.designImageUrl === null) {
          //   form.model.designFilePath = DEFAULT_PROFILE_PICTURE;
          //   form.model.designImageFile = null;
          // }
          const sustainabilityReportDetail = {
            ...form.model,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.createSustainabilityReport(sustainabilityReportDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ProductSustainabilityReportForm,
  },
};
</script>
