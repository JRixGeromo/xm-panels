<template>
  <LicensorForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingLicensor"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import LicensorForm from '@/components/Licensors/LicensorForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_LICENSOR } from '@/store/modules/licensor/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';

export default {
  name: 'LicensorCreate',
  setup() {
    const store = useStore();
    return {
      creatingLicensor: computed(() => store.state.licensor.creatingLicensor),
      createLicensor: (licensorDetail) => store.dispatch(`licensor/${CREATE_LICENSOR}`, licensorDetail),
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
          this.createLicensor(licensorDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    LicensorForm,
  },
};
</script>
