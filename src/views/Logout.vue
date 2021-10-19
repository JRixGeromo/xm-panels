<template>
    <div>HERE</div>
</template>

<script>
import { SIGN_OUT } from '@/store/modules/auth/actions-type';
import { mapActions } from 'vuex';

export default {
  name: 'Logout',
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions('auth', [SIGN_OUT]),
    logout() {
      this.SIGN_OUT();
    },
  },
};
</script>
