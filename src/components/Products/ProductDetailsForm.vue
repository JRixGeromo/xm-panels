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
          <SingleImageUpload
            v-model:imgUrl="productForm.productImageUrl"
            v-model:imgFile="productForm.productImageFile"
            formProps="productImageUrl"
            formLabel="Display Image"
          />
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <SingleImageUpload
            v-model:imgUrl="productForm.productCoverImageUrl"
            v-model:imgFile="productForm.productCoverImageFile"
            formProps="productCoverImageUrl"
            formLabel="Background Image"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
      <el-col :span="9" :offset="3">
        <div>
          <TextInput
            v-model="productForm.productName"
            formProps="productName"
            formLabel="Product Name"
          />
        </div>
        <div style="margin-top: 35px;">
          <TextArea
            v-model="productForm.productDescription"
            formProps="productDescription"
            formLabel="Product Descriptions"
          />
        </div>
        <div style="margin-top: 35px;">
          <TextArea
            v-model="productForm.productBackground"
            formProps="productBackground"
            formLabel="Background of Character"
          />
        </div>
        <MultipleImagesUpload
          v-model:imgUrls="productForm.productImagesUrl"
          v-model:imgFiles="productForm.productImagesFile"
          v-model:existingImgUrls="productForm.existingImages"
          v-model:fileCheck="productForm.productImagesFileCheck"
          formProps="productImagesFileCheck"
          formLabel="Product Images"
          :isEdit="true"
        />
      </el-col>

      <el-col :span="9">
        <div style="width: 100%">
          <SelectInput
            v-model="productForm.licenseId"
            formProps="licenseId"
            formLabel="License"
            :onChangeFunc="getCharacters"
          >
            <el-option
              v-for="license in licensorList"
              :key="license.licenseId"
              :label="license.licenseName"
              :value="license.licenseId"
            >
            </el-option>
          </SelectInput>
        </div>
        <div style="margin-top: 35px;">
          <SelectInput
            v-model="productForm.characterId"
            formProps="characterId"
            formLabel="Character"
          >
            <el-option
              v-for="character in characterList"
              :key="character.characterId"
              :label="character.characterName"
              :value="character.characterId"
            >
            </el-option>
          </SelectInput>
        </div>
        <div style="margin-top: 35px;">
          <CreateNewSelectInput
            v-model="productForm.productSeries"
            formProps="productSeries"
            formLabel="Series"
            modalTitle="New Series"
            modalInputLabel="Series"
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
          </CreateNewSelectInput>
        </div>
        <div style="margin-top: 35px;">
          <CountrySelectInput
            v-model="productForm.productManufactureCountry"
            formProps="productManufactureCountry"
            formLabel="Country of Manufacture"
          >
            <country-select
              v-model="productForm.productManufactureCountry"
              :country="country"
              :topCountry="getCountry(productForm.productManufactureCountry)"
              :autocomplete="true"
              :removePlaceholder="true"
            />
          </CountrySelectInput>
        </div>
        <div style="margin-top: 15px;">
          <Datepicker
            v-model="productForm.productManufactureDate"
            formProps="productManufactureDate"
            formLabel="Date of Manufacture"
          />
        </div>
        <div style="margin-top: 15px;">
          <Datepicker
            v-model="productForm.productReleaseDate"
            formProps="productReleaseDate"
            formLabel="Release Date"
          />
        </div>
        <div style="margin-top: 15px;">
          <TextInput
            v-model="productForm.productQuantity"
            inputType="number"
            formProps="productQuantity"
            formLabel="Quantity"
          />
        </div>
        <div style="margin-top: 35px;">
          <MultipleSelectInput
            v-model="productForm.artistIds"
            formProps="artistIds"
            formLabel="Artists"
          >
            <el-option
              v-for="artist in artistList"
              :key="artist.artistId"
              :label="artist.artistName"
              :value="artist.artistId">
            </el-option>
          </MultipleSelectInput>
        </div>
      </el-col>
      <el-col :span="18" :offset="3">
        <div style="margin-top: 15px;">
          <el-row justify="end">
            <el-button
            class="custom-btn discard-btn"
            @click="$router.push(`/allproducts`)">DISCARD</el-button>
            <el-button
            class="custom-btn save-exit-btn"
            @click="onSubmit($refs.productForm)">SAVE AND EXIT</el-button>
            <el-button
              class="custom-btn submit-btn"
              type="success"
              @click="onSubmit($refs.productForm)"
              :loading="loading"
            >
              SAVE AND PROCEED
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
import { GET_LICENSOR_LIST } from '@/store/modules/licensor/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
import { GET_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_SERIES_LIST } from '@/store/modules/product/actions-type';
import MultipleImagesUpload from '@/components/Share/MultipleImagesUpload.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import TextArea from '@/components/Share/TextArea.vue';
import Datepicker from '@/components/Share/DateInput.vue';
import TextInput from '@/components/Share/TextInput.vue';
import SelectInput from '@/components/Share/SelectInput.vue';
import dayjs from 'dayjs';
import MultipleSelectInput from '@/components/Share/MultipleSelectInput.vue';
import CountrySelectInput from '@/components/Share/CountrySelectInput.vue';
import CreateNewSelectInput from '@/components/Share/CreateNewSelectInput.vue';

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
  components: {
    MultipleImagesUpload,
    SingleImageUpload,
    TextArea,
    TextInput,
    Datepicker,
    SelectInput,
    MultipleSelectInput,
    CountrySelectInput,
    CreateNewSelectInput,
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
        productImagesUrl: [],
        productImagesFile: [],
        productImagesFileCheck: '',
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
    getCountry(country) {
      let c = 'US';
      if (country) {
        if (country === 'USA') {
          c = 'US';
        } else {
          c = country;
        }
      }
      return c;
    },
    getCharacters() {
      this.productForm.characterId = '';
      this.GET_CHARACTER_LIST(this.productForm.licenseId);
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
        productImagesFile: [],
        productName: this.productDetails.productName,
        productDescription: this.productDetails.productDescription,
        productBackground: this.productDetails.productBackground,
        productQuantity: this.productDetails.productQuantity.toString(),
        productManufactureCountry: this.productDetails.productManufactureCountry,
        productReleaseDate: dayjs(this.productDetails.productReleaseDate).format('YYYY-MM-DDT00:00:00'),
        productManufactureDate: dayjs(this.productDetails.productManufactureDate).format('YYYY-MM-DDT00:00:00'),
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
      this.GET_CHARACTER_LIST(this.productForm.licenseId);
    },
    licensorList() {
      console.log(this.licensorList);
    },
  },
};
</script>
