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
import dayjs from 'dayjs';

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
          console.log(form.model);
          const userDetail = {
            ...form.model,
            username: form.model.artistEmailAddress,
            firstName: form.model.artistName,
            lastName: form.model.artistName,
            emailAddress: form.model.artistEmailAddress,
            displayName: form.model.artistEmailAddress,
            artistDob: dayjs(form.model.artistDob).format('YYYY-MM-DDT00:00:00'),
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
