<template>
  <AuthenticatedLayout v-if="checkIsLogin" />
  <NonAuthenticatedPublicLayout v-else />
</template>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>

<script>
// @ is an alias to /src
import AuthenticatedLayout from '@/views/layout/AuthenticatedLayout.vue';
import NonAuthenticatedPublicLayout from '@/views/layout/NonAuthenticatedPublicLayout.vue';
import { isLoggin } from '@/helpers';

export default {
  name: 'App',
  components: {
    AuthenticatedLayout,
    NonAuthenticatedPublicLayout,
  },
  computed: {
    checkIsLogin() {
      return isLoggin();
    },
  },
};
</script>
