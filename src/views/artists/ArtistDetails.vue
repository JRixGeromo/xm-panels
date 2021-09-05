<template>
  <ArtistDetailsForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="updatingUser"
  />
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ArtistDetailsForm from '@/components/Artists/ArtistDetailsForm.vue';
// import { randomPassword } from '@/helpers';
import { UPDATE_USER } from '@/store/modules/user/actions-type';

export default {
  name: 'ArtistDetails',
  setup() {
    const store = useStore();
    return {
      updatingUser: computed(() => store.state.user.updatingUser),
      updateUser: (userDetail) => store.dispatch(`user/${UPDATE_USER}`, userDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          const userDetail = {
            ...form.model,
            username: form.model.artistEmailAddress,
            firstName: form.model.artistName,
            lastName: form.model.artistName,
            emailAddress: form.model.artistEmailAddress,
            displayName: form.model.artistEmailAddress,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.updateUser(userDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ArtistDetailsForm,
  },
};
</script>
