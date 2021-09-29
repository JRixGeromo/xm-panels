<template>
  <el-row :gutter="20" class="form-bg-color">
    <el-col :span="21" :offset="3" class="form-text-title-pad">
      <span class="form-text-title">Create New Product</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <div class="demo-image__preview image-max-height">
          <span class="form-custom">Display Image</span>
          <el-image :src="src"></el-image>
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple">
        <div class="demo-image__preview image-max-height">
          <span class="form-custom">Background Image</span>
          <el-image :src="src"></el-image>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <span class="form-custom">Product Name</span>
        <el-input
          placeholder="Please input"
          v-model="input"
          >
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">Product Description</span>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Please input"
          v-model="textarea">
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">License</span>
        <el-select v-model="select" placeholder="Select">
          <el-option label="Restaurant" value="1"></el-option>
          <el-option label="Order No." value="2"></el-option>
          <el-option label="Tel" value="3"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">Country of Manufacture</span>
        <el-input
          placeholder="Please input"
          v-model="input"
          clearable>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">Date Manufacture</span>
        <el-input
          placeholder="Please input"
          v-model="input"
          clearable>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">Quantity</span>
        <el-input
          placeholder="Please input"
          v-model="input"
          clearable>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <span class="form-custom">Image Files</span>
        <div class="block">
          <el-image :src="src" class="image-files"></el-image>

          <el-image :src="src" class="image-files"></el-image>

          <el-image :src="src" class="image-files"></el-image>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </div>
      <div style="margin-top: 15px;">
        <el-row justify="end">
          <el-button>Discard Changes</el-button>
          <el-button type="success">Save</el-button>
        </el-row>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      textarea: ref(''),
      input: ref(''),
      select: ref(''),
    };
  },
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
