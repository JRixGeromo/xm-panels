<template>
  <div class="design-container">
    <img
      class="image"
      v-if="isImgageArtwork"
      :src="designDetails.productAutographProofUrl"
      :alt="designDetails.productAutographProofUrl"
    />
    <video class="image" autoplay loop controls v-else muted>
      <source :src="designDetails.productAutographProofUrl" />
      Your browser does not support HTML video.
    </video>
  </div>
</template>

<script>
import { IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    designDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isImgageArtwork() {
      return IMAGE_FORMAT.some((x) => x === this.designDetails.productAutographProofType);
    },
  },
};
</script>
