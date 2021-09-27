<template>
  <div>
    <label class="img-label">{{ formLabel }}</label>
    <el-form-item :prop="formProps" ref="formitem" class="upload-container">
      <el-upload
        action=""
        list-type="picture-card"
        :show-file-list="false"
        :on-change="handleImg"
        :auto-upload="false"
        :accept="fileFormat"
        drag
      >
        <img v-if="imgUrl" :src="imgUrl" class="image" />
        <div v-else>
          <i class="el-icon-upload"></i>
          <div>Drop file here or <em>click to upload</em></div>
        </div>
      </el-upload>
      <i
        v-if="imgUrl"
        class="el-icon-delete clear-img-icon"
        @click="clearImg"
      ></i>
    </el-form-item>
  </div>
</template>

<script>
import { ref } from 'vue';
import { IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    imgUrl: String,
    imgFile: File,
    formLabel: {
      type: String,
      required: true,
    },
    formProps: {
      type: String,
      required: true,
    },
  },
  emits: ['update:imgUrl', 'update:imgFile'],
  setup(props, context) {
    const formitem = ref(null);

    const handleImg = (file) => {
      context.emit('update:imgUrl', URL.createObjectURL(file.raw));
      context.emit('update:imgFile', file.raw);
      formitem.value.elForm.validateField(props.formProps);
    };

    const clearImg = () => {
      context.emit('update:imgUrl', null);
      context.emit('update:imgFile', null);
      formitem.value.elForm.validateField(props.formProps);
    };

    return {
      formitem,
      fileFormat: IMAGE_FORMAT.join(','),
      handleImg,
      clearImg,
    };
  },
};
</script>
