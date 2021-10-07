<template>
  <el-form v-if="show=='products'"
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
        <label class="form-label">CREATE NEW PRODUCT</label>
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
          formProps="productImagesUrl"
          formLabel="Product Images"
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
            :onChangeFunc="setRelationship()"
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
          <div style="width: 100%; text-align:right; margin-top: -20px">
            <el-button class="link-btn"
              :disabled="preventClick"
              @click="relationships()">
              <span style="text-decoration: underline"
              >View character relationships</span></el-button>
          </div>
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
              topCountry="US"
              :autocomplete="true"
              :removePlaceholder="true"
            />
          </CountrySelectInput>
        </div>
        <div style="margin-top: 35px;">
          <Datepicker
            v-model="productForm.productManufactureDate"
            formProps="productManufactureDate"
            formLabel="Date of Manufacture"
          />
        </div>
        <div style="margin-top: 35px;">
          <Datepicker
            v-model="productForm.productReleaseDate"
            formProps="productReleaseDate"
            formLabel="Release Date"
          />
        </div>
        <div style="margin-top: 35px; width: 100%">
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
            formLimit="6"
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
      <el-col :span="18" :offset="3" style="text-align:right">
        <div style="margin-top: 35px; width: 100%">
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
        </div>
      </el-col>
    </el-row>
  </el-form>
  <el-form v-else>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row justify="space-between">
          <el-col :span="24" style="margin-top: 50px; margin-bottom: 50px">
            <div style="width: 100%; text-align:left">
              <span class="form-label"> {{ productForm.productName }}: RELATIONSHIPS </span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="width: 100%; text-align:left; margin-top: -20px">
              <el-button
                class="custom-btn black-custom-btn padding-small"
                @click="products()">BACK
              </el-button>
          </div>
          </el-col>
          <el-col :span="12">
            <div style="width: 100%; text-align:right; margin-top: -20px">
              <el-button
                class="custom-btn black-custom-btn padding-small"
                @click="popoutRelationship()">EDIT
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="RELATIONSHIP"
      custom-class="custom-dialog"
      v-model="relationshipDialog"
      :destroy-on-close="true"
      width = 55%
    >
    <el-form-item>
    <el-row  v-for="(input, i) in relationshipForm.inputs" :key="i" >
      <el-col :span="10" :offset="1" style="text-align: center;">
        <SelectInput
          v-model="input.relatedProduct"
          formProps="productName"
          formLabel="Product"
        >
          <el-option
            v-for="product in productOptions"
            :key="product.productId"
            :label="product.productName"
            :value="product.productId"
          >
          </el-option>
        </SelectInput>
      </el-col>
      <el-col :span="10" :offset="1" style="text-align: center;">
        <TextInput
          v-model="input.relation"
          formProps="relationship"
          formLabel="RELATIONSHP"
        />
      </el-col>
      <el-col :span="1" :offset="1" style="text-align: center;">
        <div style="width: 100%; text-align: center; margin-top: 27px">
          <i class="el-icon-circle-close" style="color:#ff0000; font-size: 35px;" @click="deleteRelation(i)"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
    <el-col :span="18" :offset="3">
      <div style="width: 100%; text-align: center; margin-top:30px">
        <el-button type="default" @click="addForm"><i class="el-icon-plus"></i></el-button>
      </div>
    </el-col>
    </el-row>
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
          <el-button
            class="custom-btn discard-btn" @click="discard()">DISCARD</el-button>
        </el-col>
        <el-col :span="8" :offset="1" style="padding: 23px">
          <el-button  class="custom-btn submit-btn"
            @click="saveRelations()" :disabled="!allowSave">SAVE</el-button>
        </el-col>
      </el-row>
      </el-form-item>
    </el-dialog>
    <el-dialog
      title="DELETE?"
      custom-class="custom-dialog"
      v-model="confirmationDialog"
      :destroy-on-close="true"
      width = 55%
    >
    <!-- <el-form-item>
    </el-form-item> -->
    <el-form-item>
      <el-row>
        <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
          <el-button
            class="custom-btn discard-btn" @click="confirmationDialog = false">CANCEL</el-button>
        </el-col>
        <el-col :span="8" :offset="1" style="padding: 23px">
          <el-button  class="custom-btn submit-btn"
            @click="executeDelete()">DELETE</el-button>
        </el-col>
      </el-row>
      </el-form-item>
    </el-dialog>

  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_LICENSOR_LIST } from '@/store/modules/licensor/actions-type';
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_PRODUCT_SERIES_LIST, GET_RELATED_PRODUCT_LIST } from '@/store/modules/product/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
import MultipleImagesUpload from '@/components/Share/MultipleImagesUpload.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';
import Datepicker from '@/components/Share/DateInput.vue';
import SelectInput from '@/components/Share/SelectInput.vue';
import MultipleSelectInput from '@/components/Share/MultipleSelectInput.vue';
import CountrySelectInput from '@/components/Share/CountrySelectInput.vue';
import CreateNewSelectInput from '@/components/Share/CreateNewSelectInput.vue';
import { GET_CHARACTER_LIST } from '@/store/modules/character/actions-type';
import {
  GET_RELATIONSHIP,
  GET_RELATIONSHIP_LIST,
  CREATE_RELATIONSHIP,
  UPDATE_RELATIONSHIP,
  DEFAULT_RELATIONSHIP,
} from '@/store/modules/relationship/actions-type';
import router from '@/router';

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
    CountrySelectInput,
    MultipleSelectInput,
    CreateNewSelectInput,
  },
  data() {
    return {
      memorySaved: false,
      preventClick: true,
      relationshipDialog: false,
      confirmationDialog: false,
      selectedRelation: null,
      selectedCharacter: null,
      selectedIndex: null,
      allowSave: false,
      country: '',
      region: '',
      middle: true,
      above: false,
      show: 'products',
      createSeriesDialog: false,
      focused: [],
      fileFormat: IMAGE_FORMAT.join(','),
      productForm: {
        productCoverImageUrl: null,
        productCoverImageFile: null,
        productImageUrl: null,
        productImageFile: null,
        productImagesUrl: [],
        productImagesFile: [],
        productName: '',
        productDescription: '',
        productBackground: '',
        productQuantity: '',
        productManufactureCountry: 'US',
        productReleaseDate: '',
        productManufactureDate: '',
        characterId: '',
        artistIds: [],
        licenseId: '',
        productSeries: '',
        productStatus: 'Active',
      },
      relationshipForm: {
        productId: null,
        relationship: 'product',
        inputs: [],
      },
      characterOptions: [],
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
            message: 'Please enter product background',
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
        licenseId: [
          {
            required: true,
            message: 'Please select license',
          },
        ],
        productSeries: [
          {
            required: true,
            message: 'Please select/create series',
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
        productImagesUrl: [
          {
            required: true,
            message: 'Please select at least one product images',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('artist', ['artistList']),
    ...mapState('licensor', ['licensorList']),
    ...mapState('product', ['productSeriesList', 'relatedProductList', 'newProductId']),
    ...mapState('character', ['characterList']),
    ...mapState('relation', ['relationshipDetails', 'updatingDefault']),
  },
  mounted() {
    this.GET_ARTIST_LIST();
    this.GET_LICENSOR_LIST();
    this.GET_PRODUCT_SERIES_LIST();
    this.focused.productSeries = true;
  },
  methods: {
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('licensor', [GET_LICENSOR_LIST]),
    ...mapActions('product', [GET_PRODUCT_SERIES_LIST, GET_RELATED_PRODUCT_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST]),
    ...mapActions('relation', [GET_RELATIONSHIP, GET_RELATIONSHIP_LIST, CREATE_RELATIONSHIP, UPDATE_RELATIONSHIP, DEFAULT_RELATIONSHIP]),
    getCharacters() {
      this.productForm.characterId = '';
      this.setRelationship();
      this.GET_CHARACTER_LIST(this.productForm.licenseId);
    },
    products() {
      this.show = 'products';
    },
    relationships() {
      this.show = 'relationships';
    },
    setRelationship() {
      // this.relationshipForm.inputs = [];
    },
    saveRelations() {
      this.relationshipDialog = false;
      this.memorySaved = true;
    },
    async popoutRelationship() {
      this.selectedProduct = '';
      this.relationshipDialog = !this.relationshipDialog;
      const criteria = {
        id: '',
        relation: 'product',
        licensor_uuid: this.productForm.licenseId,
        product_series: this.productForm.productSeries,
      };
      await this.GET_RELATED_PRODUCT_LIST(criteria);
    },
    deleteRelation(i) {
      this.selectedIndex = i;
      this.relationshipForm.inputs.splice(i, 1);
    },
    async executeDelete() {
      this.confirmationDialog = false;
      this.relationshipForm.inputs.splice(this.selectedIndex, 1);
    },
    async executeSave() {
      await this.CREATE_RELATIONSHIP(this.relationshipForm);
      router.push('/allproducts');
    },
    discard() {
      this.relationshipDialog = false;
      this.memorySaved = false;
    },
    addForm() {
      this.relationshipForm.inputs.push({
        productRelationId: '',
        relatedProduct: '',
        relation: '',
      });
    },
    refreshRelation() {
      if (!this.relationshipForm.inputs.length > 0) {
        this.relationshipForm.inputs.push({
          productRelationId: '',
          relatedProduct: '',
          relation: '',
        });
      }
    },
  },
  watch: {
    newProductId() {
      if (this.memorySaved === true) {
        this.relationshipForm.productId = this.newProductId;
        this.executeSave();
      } else {
        this.DEFAULT_RELATIONSHIP(this.newProductId);
      }
    },
    productSeriesList() {
      console.log(this.productSeriesList);
    },
    licensorList() {
      console.log(this.licensorList);
    },
    relatedProductList() {
      this.productOptions = this.relatedProductList;
      this.refreshRelation();
    },
    relationshipDetails() {
      // this.relationshipForm.inputs = [];
      this.refreshRelation();
    },
    productForm: {
      handler(val) {
        if ((val.productSeries.length > 0) && (val.licenseId.length > 0) && (val.productName.length > 0)) {
          this.preventClick = false;
        } else {
          this.preventClick = true;
        }
      },
      deep: true,
    },
    relationshipForm: {
      handler(val) {
        if (val.inputs.length > 0) {
          if ((val.inputs[0].relatedProduct.length > 0) && (val.inputs[0].relation.length > 0)) {
            this.allowSave = true;
          } else {
            this.allowSave = false;
          }
        } else {
          this.allowSave = false;
        }
      },
      deep: true,
    },
  },
};
</script>
