<template>
  {{ role }}
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import accessService from '@/services/access-service';

export default {
  props: {
    userId: String,
  },
  setup(props) {
    const role = ref('loading');
    onMounted(() => {
      if (props.userId) {
        accessService.getUserAuthorization(props.userId).then(
          (data) => {
            role.value = data.roles[0].roleName;
          },
          () => {
            role.value = '-';
          },
        );
      }
    });

    onUpdated(() => {
      accessService.getUserAuthorization(props.userId).then(
        (data) => {
          role.value = data.roles[0].roleName;
        },
        () => {
          role.value = '-';
        },
      );
    });

    return {
      role,
    };
  },
};
</script>
