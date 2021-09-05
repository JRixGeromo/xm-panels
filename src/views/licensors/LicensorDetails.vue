<template>
  <LicensorDetailsForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="updatingLicensor"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import LicensorDetailsForm from '@/components/Licensors/LicensorDetailsForm.vue';
// import { randomPassword } from '@/helpers';
import { UPDATE_LICENSOR } from '@/store/modules/licensor/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';

export default {
  name: 'LicensorDetails',
  setup() {
    const store = useStore();
    return {
      updatingLicensor: computed(() => store.state.licensor.updatingLicensor),
      updateLicensor: (licensorDetail) => store.dispatch(`licensor/${UPDATE_LICENSOR}`, licensorDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          if (form.model.licenseImageFile === null && form.model.licenseImageUrl === null) {
            form.model.licenseDisplayPhotoFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.licenseImageFile = null;
          }

          const licensorDetail = {
            ...form.model,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.updateLicensor(licensorDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    LicensorDetailsForm,
  },
};
</script>
