<template>
  <el-row :gutter="20" class="form-bg-color">
    <el-col :span="21" :offset="3" class="form-text-title-pad">
      <span class="form-text-title">Create New Product</span>
      <a href="#sec-3" v-smooth-scroll>Section 3</a>
      <section id="sec-3"></section>
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

  <div class="sections-menu" style="z-index:1000">
    <span class="menu-point"></span>
    <span class="menu-point"></span>
    <span class="menu-point active"></span>
    <span class="menu-point"></span>
  </div>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <span class="form-custom">Product Name</span>
        <a href="#sec-4" v-smooth-scroll>Section 3</a>
        <section id="sec-4"></section>
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
import { inject, ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const myEl = ref(null);
    const smoothScroll = inject('smoothScroll');
    const scrollToMyEl = () => {
      smoothScroll({
        scrollTo: myEl.value,
      });
    };
    return {
      scrollToMyEl,
    };
  },
};
</script>

<style lang="scss" scoped>
.sections-menu {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.sections-menu .menu-point {
  width: 10px;
  height: 10px;
  background-color: rgb(255, 0, 0);
  display: block;
  margin: 1rem 0;
  opacity: .6;
  transition: .4s ease all;
  cursor: pointer;
}

.sections-menu .menu-point.active {
  opacity: 1;
  transform: scale(1.5);
}

@media screen and (max-width: 1200px) {
  h1 {
    font-size: 2.5em;
  }
}
</style>
