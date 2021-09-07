<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="productForm"
    :rules="rules"
    ref="productForm"
    @keyup.enter="onSubmit($refs.productForm)"
  >
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="21" :offset="3" class="form-text-title-pad">
        <span class="form-text-title">Create New Product</span>
      </el-col>
      <el-col :span="9" :offset="3">
        <div class="grid-content bg-purple" style="max-width:60%;min-width:200px;">
          <div class="demo-image__preview">
            <el-form-item label="Display Image" prop="productImageFile">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleProductImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="productForm.productImageUrl" :src="productForm.productImageUrl" class="image" />
              <i v-else class="el-icon-plus" style="padding-top:70px"></i>
            </el-upload>
            <i
              v-if="productImageUrl"
              class="el-icon-error clear-img-icon"
              @click="clearProductImg"
            ></i>
            </el-form-item>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <!-- <span class="form-custom">Background Image</span> -->
          <div class="demo-image__preview" style="max-width:60%; min-width:200px;">
            <el-form-item label="Background Image" prop="productCoverImageFile">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleProductCoverImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="productForm.productCoverImageUrl" :src="productForm.productCoverImageUrl" class="image" />
              <i v-else class="el-icon-plus" style="padding-top:70px"></i>
            </el-upload>
            <i
              v-if="productImageUrl"
              class="el-icon-error clear-img-icon"
              @click="clearProductCoverImg"
            ></i>
            </el-form-item>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
      <el-col :span="9" :offset="3">
        <div style="margin-top: 15px;">
          <el-form-item label="Product Name" prop="productName">
          <el-input
            placeholder="Please input product name"
            v-model="productForm.productName"
            >
          </el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Product Description" prop="productDescription">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Please input description"
            v-model="productForm.productDescription">
          </el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Background" prop="productBackground">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Please input background"
            v-model="productForm.productBackground">
          </el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Product Images" prop="productImagesFileCheck">
          <el-upload
            drag
            :on-change="handleProductsImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :accept="fileFormat"
            :show-file-list="true"
            multiple
          >
            <i class="el-icon-plus" style="padding-top:70px"></i>
            <template #tip>
              <div class="el-upload__tip">
              </div>
            </template>
          </el-upload>
          </el-form-item>
        </div>
      </el-col>

      <el-col :span="9">
        <div style="margin-top: 15px;">
          <el-form-item label="Series" prop="characterId">
          <el-select v-model="productForm.characterId" placeholder="Select">
            <el-option
              v-for="character in characterList"
              :key="character.characterId"
              :label="character.characterName"
              :value="character.characterId"
            >
            </el-option>
          </el-select>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Country of Manufacture" prop="productManufactureCountry">
          <country-select
            v-model="productForm.productManufactureCountry"
            :country="country"
            topCountry="US"
            className="el-input__inner"
            :autocomplete=true
            :removePlaceholder=true
            />
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Date Manufacture" prop="productManufactureDate">
          <el-date-picker
            v-model="productForm.productManufactureDate"
            type="date"
            placeholder="Pick a day">
          </el-date-picker>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Release Date" prop="productReleaseDate">
          <el-date-picker
            v-model="productForm.productReleaseDate"
            type="date"
            placeholder="Pick a day">
          </el-date-picker>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Quantity" prop="productQuantity">
          <el-input
            placeholder="Please input Name"
            v-model="productForm.productQuantity"
            >
          </el-input>
          </el-form-item>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Artists" prop="artistIds">
          <el-select v-model="productForm.artistIds" multiple placeholder="Select">
            <el-option
              v-for="artist in artistList"
              :key="artist.artistId"
              :label="artist.artistName"
              :value="artist.artistId">
            </el-option>
          </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="18" :offset="3">
        <div style="margin-top: 15px;">
          <el-row justify="end">
            <el-button>Discard Changes</el-button>
            <el-button
              type="success"
              @click="onSubmit($refs.productForm)"
              :loading="loading"
            >
              Submit
            </el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_CHARACTER_LIST } from '@/store/modules/character/actions-type';
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';

export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    resetForm: {
      type: Function,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      country: '',
      region: '',
      fileFormat: IMAGE_FORMAT.join(','),
      productForm: {
        productCoverImageUrl: null,
        productCoverImageFile: null,
        productImageUrl: null,
        productImageFile: null,
        productImagesUrl: [],
        productImagesFile: [],
        productImagesFileCheck: null,
        productName: '',
        productDescription: '',
        productBackground: '',
        productQuantity: 1,
        productManufactureCountry: 'US',
        productReleaseDate: '',
        productManufactureDate: '',
        characterId: null,
        artistIds: null,
        productStatus: 'Active',
      },
      rules: {
        productName: [
          {
            required: true,
            message: 'Please enter product name',
          },
        ],
        productDescription: [
          {
            required: true,
            message: 'Please enter description',
          },
        ],
        productBackground: [
          {
            required: true,
            message: 'Please enter description',
          },
        ],
        productQuantity: [
          {
            required: true,
            message: 'Please enter quantity',
          },
        ],
        productManufactureCountry: [
          {
            required: true,
            message: 'Please enter manufacture country',
          },
        ],
        productReleaseDate: [
          {
            required: true,
            message: 'Please enter ReleaseDate',
          },
        ],
        productManufactureDate: [
          {
            required: true,
            message: 'Please enter manufacture date',
          },
        ],
        characterId: [
          {
            required: true,
            message: 'Please select character',
          },
        ],
        artistIds: [
          {
            required: true,
            message: 'Please select artist',
          },
        ],
        productCoverImageFile: [
          {
            required: true,
            message: 'Please select product background image',
          },
        ],
        productImageFile: [
          {
            required: true,
            message: 'Please select product image',
          },
        ],
        productImagesFileCheck: [
          {
            required: true,
            message: 'Please select at least product images',
          },
        ],
      },
    };
  },
  methods: {
    handleProductImg(file) {
      this.productForm.productImageUrl = URL.createObjectURL(file.raw);
      this.productForm.productImageFile = file.raw;
    },
    handleProductCoverImg(file) {
      this.productForm.productCoverImageUrl = URL.createObjectURL(file.raw);
      this.productForm.productCoverImageFile = file.raw;
    },
    clearProductImg() {
      this.productForm.productImageUrl = null;
      this.productForm.productImageFile = null;
    },
    clearProductCoverImg() {
      this.productForm.productCoverImageUrl = null;
      this.productForm.productCoverImageFile = null;
    },
    handleProductsImg(file) {
      this.productForm.productImagesUrl.push(URL.createObjectURL(file.raw));
      this.productForm.productImagesFile.push(file.raw);
      this.productForm.productImagesFileCheck = this.productForm.productImagesUrl.length > 0 ? 'found' : null;
    },
    clearProductsImg() {
      this.productForm.productImagesUrl = null;
      this.productForm.productImagesFile = null;
    },
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST]),
  },
  computed: {
    ...mapState('artist', ['artistList']),
    ...mapState('character', ['characterList']),
  },
  mounted() {
    this.GET_CHARACTER_LIST();
    this.GET_ARTIST_LIST();
  },
};
</script>
