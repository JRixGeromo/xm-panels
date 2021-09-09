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
        <span class="form-text-title">Product Details</span>
      </el-col>
      <el-col :span="9" :offset="3">
        <div class="grid-content bg-purple">
          <div class="demo-image__preview image-files-big">
            <el-form-item label="Display Image" prop="productImageUrl">
            <i class="el-icon-delete" @click="clearProductImg()"></i>
            <el-upload
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleProductImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="productForm.productImageUrl" :src="productForm.productImageUrl" class="image" />
              <i v-else class="el-icon-plus"></i>
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
          <div class="demo-image__preview image-files-big">
            <el-form-item label="Background Image" prop="productCoverImageUrl">
              <i class="el-icon-delete" @click="clearProductCoverImg()"></i>
              <el-upload
                action=""
                list-type="picture-card"
                :show-file-list="false"
                :on-change="handleProductCoverImg"
                :auto-upload="false"
                :accept="fileFormat"
              >
                <img v-if="productForm.productCoverImageUrl" :src="productForm.productCoverImageUrl" class="image" />
                <i v-else class="el-icon-plus"></i>
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
        <div style="margin: 15px 0px 15px 0px;">
          <label style="font-weight: bold; display:block"><span style="color:RED">*</span> Product Images </label>
          <div v-for="image in productForm.existingImages" class="demo-image__preview image-files" :key="image" :id="image" style="">
          <i class="el-icon-delete" @click="handleImagesDelete(image)"></i>
          <el-image
            :src="image"
            :alt="image"
            class="each-image"
          >
          </el-image>
          </div>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item prop="productImagesFileCheck">
          <el-upload
            drag
            :on-change="handleProductsImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :accept="fileFormat"
            :show-file-list="false"
            multiple
          >
            <i class="el-icon-plus" style="top:50%; position:absolute; left:50%"></i>
            <span v-for="(each) in productForm.productImagesUrl" :key="each">
              <img :src="each" class="square" />
            </span>
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
            :topCountry="getCountry()"
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
              :value="artist.artistId"
            >
            </el-option>
          </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="18" :offset="3">
        <div style="margin-top: 15px;">
          <el-row justify="end">
            <el-button @click="$router.push(`/allproducts`)">Discard Changes</el-button>
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
import { GET_PRODUCT,
  UPDATE_PRODUCT } from '@/store/modules/product/actions-type';
import { remove } from '@/helpers/common-helper';

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
      defaultValue: null,
      productForm: {
        productCoverImageUrl: null,
        productCoverImageFile: null,
        productImageUrl: null,
        productImageFile: null,
        productImagesUrl: null,
        productImagesFile: null,
        productImagesFileCheck: null,
        productName: '',
        productDescription: '',
        productBackground: '',
        productQuantity: 0,
        productManufactureCountry: '',
        productReleaseDate: '',
        productManufactureDate: '',
        characterId: null,
        artistIds: null,
        productStatus: 'Active',
        forDeleteImages: [],
        existingImages: [],
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
        productCoverImageUrl: [
          {
            required: true,
            message: 'Please select product background image',
          },
        ],
        productImageUrl: [
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
  computed: {
    ...mapState('product', [
      'productDetails',
      'updateProductSuccess',
      'updatingProduct',
    ]),
    ...mapState('artist', ['artistList']),
    ...mapState('character', ['characterList']),
  },
  watch: {
    productDetails() {
      this.productForm = {
        productId: this.productDetails.productId,
        productCoverImageUrl: this.productDetails.productBackgroundImage,
        oriProductCoverImageUrl: this.productDetails.productBackgroundImage,
        productImageUrl: this.productDetails.productDisplayImage,
        oriProductImageUrl: this.productDetails.productDisplayImage,
        productImagesUrl: [],
        oriProductImagesUrl: [],
        productImagesFile: [],
        productName: this.productDetails.productName,
        productDescription: this.productDetails.productDescription,
        productBackground: this.productDetails.productBackground,
        productQuantity: this.productDetails.productQuantity,
        productManufactureCountry: this.productDetails.productManufactureCountry,
        productReleaseDate: this.productDetails.productReleaseDate,
        productManufactureDate: this.productDetails.productManufactureDate,
        characterId: this.productDetails.character.characterId,
        artistIds: this.productDetails.artistIds,
        productStatus: 'Active',
        existingImages: this.productDetails.productImages,
        forDeleteImages: [],

      };
      this.defaultValue = {
        ...this.productForm,
      };
      if (this.productForm.productImagesUrl.length > 0 || this.productForm.existingImages.length > 0) {
        this.productForm.productImagesFileCheck = 'found';
      }
    },
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    this.GET_CHARACTER_LIST();
    this.GET_ARTIST_LIST();
  },
  methods: {
    ...mapActions('product', [GET_PRODUCT, UPDATE_PRODUCT]),
    handleProductImg(file) {
      this.productForm.productImageUrl = URL.createObjectURL(file.raw);
      this.productForm.productImageFile = file.raw;
    },
    handleProductCoverImg(file) {
      this.productForm.productCoverImageUrl = URL.createObjectURL(file.raw);
      this.productForm.productCoverImageFile = file.raw;
    },
    handleProductsImg(file) {
      this.productForm.productImagesUrl.push(URL.createObjectURL(file.raw));
      this.productForm.productImagesFile.push(file.raw);
      this.productForm.productImagesFileCheck = null;
      if (this.productForm.productImagesUrl.length > 0 || this.productForm.existingImages.length > 0) {
        this.productForm.productImagesFileCheck = 'found';
      }
    },
    clearProductImg() {
      this.productForm.productImageUrl = null;
      this.productForm.productImageFile = null;
    },
    clearProductsImg() {
      this.productForm.productImagesUrl = null;
      this.productForm.productImagesFile = null;
    },
    clearProductCoverImg() {
      this.productForm.productCoverImageUrl = null;
      this.productForm.productCoverImageFile = null;
    },
    getCountry() {
      if (this.productDetails.productManufactureCountry) {
        if (this.productDetails.productManufactureCountry === 'USA') {
          return 'US';
        }
      }
      return 'US';
    },
    handleImagesDelete(el) {
      remove(el);
      const index = this.productForm.existingImages.indexOf(el);
      if (index > -1) {
        this.productForm.forDeleteImages.push(el);
      }
    },

    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST]),
  },
};
</script>
<style lang="scss" scoped>
.square {
    height: 75px;
    width: 70px;
}
</style>
