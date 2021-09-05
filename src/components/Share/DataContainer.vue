<template>
  <div class="artwork-container">
    <img
      class="image"
      v-if="isImage"
      :src="dataDetail.artistDisplayPhotoFilePath"
      :alt="dataDetail.artistDisplayPhotoFilePath"
    />
    <!-- <video class="image" autoplay loop controls v-else>
      <source :src="detail.artFilePath" />
      Your browser does not support HTML video.
    </video> -->
  </div>
</template>

<script>
// import { IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    dataDetail: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isImage() {
      return this.dataDetail.artistDisplayPhotoFilePath;
      // return IMAGE_FORMAT.some((x) => x === this.dataDetail.artistDisplayPhotoFilePath);
    },
  },
};
</script>
