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
        <label class="form-label">PRODUCT DETAILS</label>
      </el-col>
      <el-col :span="9" :offset="3">
        <div class="grid-content bg-purple">
          <label class="img-label">DISPLAY IMAGE</label>
          <div class="demo-image__preview">
            <el-form-item prop="productImageUrl">
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
          <label class="img-label">BACKGROUND IMAGE</label>
          <div class="demo-image__preview">
            <el-form-item prop="productCoverImageUrl">
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
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productName">
          <el-input
            placeholder="Please input product name"
            v-model="productForm.productName"
            @focus="focused.productName = true"
            @blur="setLostFocused('productName')"
            >
          </el-input>
          <label class="label_middle "
            :class="{label_above:productForm.productName.length > 0 || focused.productName }">PRODUCT NAME</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productDescription">
          <el-input
            type="textarea"
            :rows="5"
            @focus="focused.productDescription = true"
            @blur="setLostFocused('productDescription')"
            v-model="productForm.productDescription">
          </el-input>
          <label class="label_middle "
              :class="{label_above:productForm.productDescription.length > 0 || focused.productDescription }">PRODUCT DESCRIPTION</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productBackground">
          <el-input
            type="textarea"
            :rows="5"
            @blur="setLostFocused('productBackground')"
            @focus="focused.productBackground = true"
            v-model="productForm.productBackground">
            </el-input>
          <label class="label_middle "
            :class="{label_above:productForm.productBackground.length > 0 || focused.productBackground }">BACKGROUND OF CHARACTER</label>
          </el-form-item>
        </div>
        <div style="margin: 15px 0px 15px 0px;">
          <label style="font-weight: bold; display:block" class="img-label">PRODUCT IMAGES</label>
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
        <div style="margin-top: 15px; width: 100%">
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
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="licenseId">
            <el-select v-model="productForm.licenseId" @change="getCharacters()" required>
              <el-option
                v-for="license in licensorList"
                :key="license.licenseId"
                :label="license.licenseName"
                :value="license.licenseId"
                @focus="focused.licenseId = true"
                @blur="setLostFocused('licenseId')"
              >
              </el-option>
            </el-select>
            <label class="label_middle "
            :class="{label_above:productForm.licenseId.length > 0 || focused.licenseId }">LICENSE</label>
          </el-form-item>
        </div>
        <div style="margin-top: 35px; width: 100%" class="label_bound">
          <el-form-item prop="characterId">
          <el-select v-model="productForm.characterId" >
            <el-option
              v-for="character in characterList"
              :key="character.characterId"
              :label="character.characterName"
              :value="character.characterId"
              @focus="focused.characterId = true"
              @blur="setLostFocused('characterId')"
            >
            </el-option>
          </el-select>
          <label class="label_middle "
          :class="{label_above:productForm.characterId.length > 0 || focused.characterId }">CHARACTER</label>
          </el-form-item>
        </div>
        <div style="margin-top: 35px; width: 100%" class="label_bound">
          <el-form-item
            prop="productSeries"
            >
            <el-select
            @click="focused.productSeries = true"
            @blur="setLostFocused('productSeries')"
            @change="createNew($event)"
            v-model="productForm.productSeries"
            default-first-option
            placeholder=""
            >
            <el-option
              v-for="series in productSeriesList.series"
              :key="series"
              :label="series"
              :value="series"
            >
            </el-option>
            <el-option value=" ">
              + Create New
            </el-option>
          </el-select>
          <label class="label_middle "
          :class="{label_above:productForm.productSeries.length > 0 || focused.productSeries }">SERIES</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productManufactureCountry">
            <country-select
            v-model="productForm.productManufactureCountry"
            :country="country"
            :topCountry="getCountry()"
            :autocomplete=true
            :removePlaceholder=true
            />
            <label class="label_middle "
            :class="{label_above:productForm.productManufactureCountry.length > 0 || focused.productManufactureCountry }">
            COUNTRY OF MANUFACTURE</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productManufactureDate">
          <el-date-picker
            v-model="productForm.productManufactureDate"
            type="date"
            @focus="focused.productManufactureDate = true"
            @blur="setLostFocused('productManufactureDate')"
            placeholder="Pick a day">
          </el-date-picker>
          <label class="label_middle "
          :class="{label_above:productForm.productManufactureDate.length > 0 || focused.productManufactureDate }">DATE MANUFACTURE</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productReleaseDate">
          <el-date-picker
            v-model="productForm.productReleaseDate"
            type="date"
            @focus="focused.productReleaseDate = true"
            @blur="setLostFocused('productReleaseDate')"
            placeholder="Pick a day">
          </el-date-picker>
          <label class="label_middle "
          :class="{label_above:productForm.productReleaseDate.length > 0 || focused.productReleaseDate }">RELEASE DATE</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="productQuantity">
          <el-input
            v-model="productForm.productQuantity"
            @focus="focused.productQuantity = true"
            @blur="setLostFocused('productQuantity')"
            >
          </el-input>
          <label class="label_middle "
          :class="{label_above:productForm.productQuantity > 0 || focused.productQuantity }">QUANTITY</label>
          </el-form-item>
        </div>
        <div style="margin-top: 15px; width: 100%" class="label_bound">
          <el-form-item prop="artistIds">
          <el-select v-model="productForm.artistIds" multiple placeholder=" " @focus="focused.artistIds = true"
            @blur="setLostFocused('artistIds')">
            <el-option
              v-for="artist in artistList"
              :key="artist.artistId"
              :label="artist.artistName"
              :value="artist.artistId">
            </el-option>
          </el-select>
          <label class="label_middle " :class="{label_above:productForm.artistIds.length > 0 || focused.artistIds }">ARTISTS</label>
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
  <el-dialog
    custom-class="custom-dialog"
    title="NAME OF SERIES"
    v-model="createSeriesDialog"
    :destroy-on-close="true"
  >
  <el-form-item>
    <el-input
    v-model="productForm.productSeries"
    >
    </el-input>
  </el-form-item>
  <el-form-item class="button-wrapper">
      <el-button @click="discardProductSeries()">DISCARD</el-button>
      <el-button @click="createSeriesDialog = false">
        SAVE
      </el-button>
    </el-form-item>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_CHARACTER_LIST } from '@/store/modules/character/actions-type';
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_LICENSOR_LIST } from '@/store/modules/licensor/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
import { GET_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_SERIES_LIST } from '@/store/modules/product/actions-type';
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
      middle: true,
      above: false,
      createSeriesDialog: false,
      focused: [],
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
        productQuantity: '',
        productManufactureCountry: '',
        productReleaseDate: '',
        productManufactureDate: '',
        characterId: '',
        artistIds: [],
        licenseId: '',
        productSeries: '',
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
        licenseId: [
          {
            required: true,
            message: 'Please select character',
          },
        ],
        productSeries: [
          {
            required: true,
            message: 'Please select/create series',
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
      'productSeriesList',
    ]),
    ...mapState('artist', ['artistList']),
    ...mapState('character', ['characterList']),
    ...mapState('licensor', ['licensorList']),
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    this.GET_ARTIST_LIST();
    this.GET_LICENSOR_LIST();
    this.GET_PRODUCT_SERIES_LIST();
    this.focused.productSeries = true;
  },
  methods: {
    ...mapActions('product', [GET_PRODUCT, UPDATE_PRODUCT, GET_PRODUCT_SERIES_LIST]),
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST]),
    ...mapActions('licensor', [GET_LICENSOR_LIST]),

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
    getCharacters() {
      this.GET_CHARACTER_LIST(this.productForm.licenseId);
    },
    setLostFocused(el) {
      if (this.productForm[el].length === 0) {
        this.focused[el] = false;
      }
    },
    createNew(e) {
      if (e === ' ') {
        this.productForm.productSeries = '';
        this.createSeriesDialog = !this.createSeriesDialog;
      }
    },
    discardProductSeries() {
      this.productForm.productSeries = '';
      this.createSeriesDialog = false;
    },
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
        licenseId: this.productDetails.character.license.licenseId,
        artistIds: this.productDetails.artistIds,
        productSeries: this.productDetails.productSeries,
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
    licensorList() {
      console.log(this.licensorList);
    },
  },
};
</script>
<style lang="scss" scoped>
.square {
    height: 75px;
    width: 70px;
}
</style>
