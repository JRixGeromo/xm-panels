<template>
  <ArtistForm
    :onSubmit="onSubmit"
    :resetForm="resetForm"
    :loading="creatingUser"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ArtistForm from '@/components/Artists/ArtistForm.vue';
// import { randomPassword } from '@/helpers';
import { CREATE_USER } from '@/store/modules/user/actions-type';
import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import dayjs from 'dayjs';

export default {
  name: 'ArtistCreate',
  setup() {
    const store = useStore();
    return {
      creatingUser: computed(() => store.state.user.creatingUser),
      createUser: (userDetail) => store.dispatch(`user/${CREATE_USER}`, userDetail),
    };
  },
  methods: {
    onSubmit(form) {
      form.validate((valid) => {
        if (valid) {
          // use default profile image if user click clear img
          if (form.model.artistImageFile === null && form.model.artistImageUrl === null) {
            form.model.artistDisplayPhotoFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.artistImageFile = null;
          }

          // use default profile image if user click clear img
          if (form.model.artistCoverImageFile === null && form.model.artistCoverImageUrl === null) {
            form.model.artistDisplayBannerFilePath = DEFAULT_PROFILE_PICTURE;
            form.model.artistCoverImageFile = null;
          }
          const userDetail = {
            ...form.model,
            username: form.model.artistEmailAddress,
            firstName: form.model.artistName,
            lastName: form.model.artistName,
            emailAddress: form.model.artistEmailAddress,
            displayName: form.model.artistEmailAddress,
            secret: '123123',
            artistDob: dayjs(form.model.artistDob).format('YYYY-MM-DDT00:00:00'),
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };
          this.createUser(userDetail);
        }
      });
    },
    resetForm(form) {
      form.resetFields();
    },
  },
  components: {
    ArtistForm,
  },
};
</script>
