<template>
  {{ name }}
</template>

<script>
import { onMounted, onUpdated, ref } from 'vue';
import artistService from '@/services/artist-service';

export default {
  props: {
    artistId: String,
  },
  setup(props) {
    const name = ref('loading');
    onMounted(() => {
      if (props.artistId) {
        artistService.getArtist(props.artistId).then((data) => {
          name.value = data[0].artistDisplayName;
        });
      }
    });

    onUpdated(() => {
      artistService.getArtist(props.artistId).then((data) => {
        name.value = data[0].artistDisplayName;
      });
    });

    return {
      name,
    };
  },
};
</script>
