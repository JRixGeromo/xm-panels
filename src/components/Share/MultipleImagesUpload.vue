<template>
  <div>
    <label class="img-label">{{ formLabel }}</label>
    <div style="display: flex; flex-flow: column;">
      <div v-if="existingImgUrls.length > 0">
        <div style="color: #FFFFFF; opacity: 0.8; font-size: 14px;">Existing Images</div>
        <div>
          <div
            v-for="image in existingImgUrls"
            class="demo-image__preview image-files"
            :key="image"
            :id="image"
          >
            <i class="el-icon-delete" @click="clearExistingImg(image)"></i>
            <el-image :src="image" :alt="image" class="each-image"> </el-image>
          </div>
        </div>
      </div>
      <div v-if="imgUrls.length > 0">
        <div style="color: #FFFFFF; opacity: 0.8; font-size: 14px;">Selected Images</div>
        <div>
          <div
            v-for="image in imgUrls"
            class="demo-image__preview image-files"
            :key="image"
            :id="image"
          >
            <i class="el-icon-delete" @click="clearImg(image)"></i>
            <el-image :src="image" :alt="image" class="each-image"> </el-image>
          </div>
        </div>
      </div>
    </div>
    <el-form-item :prop="formProps" ref="formitem" class="upload-container">
      <el-upload
        drag
        action=""
        list-type="picture-card"
        :on-change="handleImg"
        :auto-upload="false"
        :accept="fileFormat"
        :show-file-list="false"
        multiple
        :disabled="formIsDisabled"
      >
        <div>
          <i class="el-icon-upload"></i>
          <div>Drop file here or <em>click to upload</em></div>
        </div>
        <template #tip>
          <div class="el-upload__tip"></div>
        </template>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { ref } from 'vue';
import { IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    imgUrls: {
      type: Array,
      default() {
        return [];
      },
    },
    imgFiles: Array,
    fileCheck: String,
    existingImgUrls: {
      type: Array,
      default() {
        return [];
      },
    },
    formLabel: {
      type: String,
      required: true,
    },
    formProps: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    formIsDisabled: {
      type: Boolean,
    },
  },
  emits: ['update:imgUrls', 'update:imgFiles', 'update:existingImgUrls', 'update:fileCheck'],
  setup(props, context) {
    const formitem = ref(null);

    const checkFile = () => {
      context.emit('update:fileCheck', '');
      setTimeout(() => {
        if (props.isEdit) {
          if (props.imgUrls.length > 0 || props.existingImgUrls.length > 0) {
            context.emit('update:fileCheck', 'found');
            formitem.value.elForm.validateField(props.formProps);
          }
        }
      }, 1);
    };

    const handleImg = (file) => {
      setTimeout(() => {
        const newImageUrls = [...props.imgUrls, URL.createObjectURL(file.raw)];
        const newImageFiles = [...props.imgFiles, file.raw];
        context.emit('update:imgUrls', newImageUrls);
        context.emit('update:imgFiles', newImageFiles);
        checkFile();
        formitem.value.elForm.validateField(props.formProps);
      }, 1);
    };

    const clearImg = (file) => {
      const selectedImgIndex = props.imgUrls.indexOf(file);
      const imageUrls = [...props.imgUrls];
      imageUrls.splice(selectedImgIndex, 1);
      const imgFiles = [...props.imgFiles];
      imgFiles.splice(selectedImgIndex, 1);
      context.emit('update:imgUrls', imageUrls);
      context.emit('update:imgFiles', imgFiles);
      checkFile();
      formitem.value.elForm.validateField(props.formProps);
    };

    const clearExistingImg = (file) => {
      const selectedImgIndex = props.existingImgUrls.indexOf(file);
      const imageUrls = [...props.existingImgUrls];
      imageUrls.splice(selectedImgIndex, 1);
      context.emit('update:existingImgUrls', imageUrls);
      checkFile();
      formitem.value.elForm.validateField(props.formProps);
    };

    return {
      formitem,
      fileFormat: IMAGE_FORMAT.join(','),
      handleImg,
      clearImg,
      clearExistingImg,
    };
  },
};
</script>
