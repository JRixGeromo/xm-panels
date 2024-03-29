<template>
  <el-form v-if="show=='products'"
    id="inputs"
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="productForm"
    :rules="rules"
    ref="productForm"
    @keyup.enter="onSubmit($refs.productForm, 'proceed')"
  >
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="21" :offset="3" class="form-text-title-pad">
        <label class="form-label">PRODUCT DETAILS</label>
      </el-col>
      <el-col :span="9" :offset="3">
        <div class="grid-content bg-purple">
          <SingleImageUpload
            :formIsDisabled="isDisabled"
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
            :formIsDisabled="isDisabled"
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
            class="input"
            v-model="productForm.productName"
            formProps="productName"
            formLabel="Product Name"
          />
        </div>
        <div style="margin-top: 35px;">
          <TextArea
            class="input"
            v-model="productForm.productDescription"
            formProps="productDescription"
            formLabel="Product Descriptions"
          />
        </div>
        <div style="margin-top: 35px;">
          <TextArea
            class="input"
            v-model="productForm.productBackground"
            formProps="productBackground"
            formLabel="Background of Character"
          />
        </div>
        <MultipleImagesUpload
          :formIsDisabled="isDisabled"
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
            class="input"
            :disabled="isDisabled"
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
            class="input"
            :disabled="isDisabled"
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
            :disabled="isDisabled"
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
          <div style="width: 100%; text-align:right; margin-top: -20px; cursor: pointer;">
            <el-button class="link-btn"
              @click="relationships(productDetails.productId)"
            >
              <span style="text-decoration: underline">
                View character relationships
              </span>
            </el-button>
          </div>
        </div>
        <div style="margin-top: 35px;">
          <CountrySelectInput
            class="input"
            :disabled="isDisabled"
            v-model="productForm.productManufactureCountry"
            formProps="productManufactureCountry"
            formLabel="Country of Manufacture"
          >
            <country-select
              v-model="productForm.productManufactureCountry"
              :country="country"
              :topCountry="getCountry(selectedCountry)"
              :autocomplete="true"
              :removePlaceholder="true"
              :usei18n="false"
            />
          </CountrySelectInput>
        </div>
        <div style="margin-top: 35px;">
          <Datepicker
            class="input"
            v-model="productForm.productManufactureDate"
            formProps="productManufactureDate"
            formLabel="Date of Manufacture"
          />
        </div>
        <div style="margin-top: 35px;">
          <Datepicker
            class="input"
            v-model="productForm.productReleaseDate"
            formProps="productReleaseDate"
            formLabel="Release Date"
          />
        </div>
        <div style="margin-top: 35px;">
          <TextInput
            class="input"
            v-model="productForm.productQuantity"
            inputType="number"
            formProps="productQuantity"
            formLabel="Quantity"
          />
        </div>
        <div style="margin-top: 35px;">
          <MultipleSelectInput
            class="input"
            :disabled="isDisabled"
            v-model="productForm.artistIds"
            formProps="artistIds"
            formLabel="Artists"
            :formLimit="6"
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
      <el-col :span="18" :offset="3" style="text-align: right;">
        <div style="margin-top: 15px;">
            <el-button
            class="custom-btn discard-btn"
            @click="$router.push(`/allproducts`)">DISCARD</el-button>
            <el-button
            class="custom-btn save-exit-btn"
            @click="onSubmit($refs.productForm, 'exit')" :disabled="isDisabled">SAVE AND EXIT</el-button>
            <el-button
              class="custom-btn submit-btn"
              type="success"
              @click="onSubmit($refs.productForm, 'proceed')"
              :loading="loading"
              :disabled="isDisabled"
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
          <el-col :span="24">
            <div style="width: 100%; text-align:left; margin-top: -20px; margin-bottom: 20px">
              <el-button
                class="custom-btn black-custom-btn padding-small"
                @click="products()">BACK
              </el-button>
          </div>
          </el-col>
          <!-- <el-col :span="12">
            <div style="width: 100%; text-align:right; margin-top: -20px">
              <el-button
                class="custom-btn black-custom-btn padding-small"
                @click="popoutRelationship(productDetails.productId)">EDIT
              </el-button>
            </div>
          </el-col> -->
        </el-row>
        <el-row justify="space-between">
          <el-col :span="24">
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
                    <i class="el-icon-circle-close" style="color:#ff0000; font-size: 35px;" @click="deleteRelation(input, i)"></i>
                  </div>
                </el-col>
              </el-row>
              <el-row>
              <el-col :span="18" :offset="3">
                <div style="width: 100%; text-align: center; margin-top:30px">
                  <el-button type="default" @click="addForm" :disabled="!allowed"><i class="el-icon-plus"></i></el-button>
                </div>
              </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row v-if="hideButtons">
                <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
                  <el-button
                    class="custom-btn discard-btn" @click="products()">DISCARD</el-button>
                </el-col>
                <el-col :span="8" :offset="1" style="padding: 23px">
                  <el-button  class="custom-btn submit-btn"
                    @click="saveRelations()" :disabled="!allowSave">SAVE</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <el-dialog
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
          <i class="el-icon-circle-close" style="color:#ff0000; font-size: 35px;" @click="deleteRelation(input, i)"></i>
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
      <el-row v-if="hideButtons">
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
    </el-dialog> -->
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
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_LICENSOR_LIST } from '@/store/modules/licensor/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
import { GET_PRODUCT,
  UPDATE_PRODUCT,
  GET_RELATED_PRODUCT_LIST,
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
import { GET_CHARACTER_LIST } from '@/store/modules/character/actions-type';
import {
  GET_RELATIONSHIP,
  GET_RELATIONSHIP_LIST,
  CREATE_RELATIONSHIP,
  UPDATE_RELATIONSHIP,
  DEFAULT_RELATIONSHIP,
} from '@/store/modules/relationship/actions-type';
import { SET_LINKS } from '@/store/modules/linkstoggle/actions-type';
import router from '@/router';
// import { ElMessage } from 'element-plus';

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
      allowed: true,
      toggle: {
        susLink: true,
        artLink: true,
        serLink: true,
        productName: '',
      },
      isDisabled: false,
      relationshipDialog: false,
      confirmationDialog: false,
      selectedRelation: null,
      selectedProduct: null,
      selectedIndex: null,
      show: 'products',
      hideButtons: false,
      allowSave: false,
      country: '',
      region: '',
      middle: true,
      above: false,
      createSeriesDialog: false,
      focused: [],
      fileFormat: IMAGE_FORMAT.join(','),
      defaultValue: null,
      selectedCountry: '',
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
        oriLicenseId: '',
        oriProductSeries: '',
      },
      relationshipForm: {
        productId: null,
        relationship: 'product',
        inputs: [],
      },
      productOptions: [],
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
    ...mapState('linkstoggle', ['linksToggled']),
    ...mapState('product', [
      'productDetails',
      'updateProductSuccess',
      'updatingProduct',
      'productSeriesList',
    ]),
    ...mapState('product', ['relatedProductList', 'updateResult']),
    ...mapState('artist', ['artistList']),
    ...mapState('licensor', ['licensorList']),
    ...mapState('character', ['characterList']),
    ...mapState('relation', ['relationshipDetails', 'updatingDefault']),
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    this.GET_ARTIST_LIST(false);
    this.GET_LICENSOR_LIST(false);
    // this.GET_PRODUCT_SERIES_LIST();
    this.focused.productSeries = true;
  },
  methods: {
    ...mapActions('linkstoggle', [SET_LINKS]),
    ...mapActions('product', [GET_PRODUCT, UPDATE_PRODUCT, GET_RELATED_PRODUCT_LIST, GET_PRODUCT_SERIES_LIST]),
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('licensor', [GET_LICENSOR_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST]),
    ...mapActions('relation', [
      GET_RELATIONSHIP,
      GET_RELATIONSHIP_LIST,
      CREATE_RELATIONSHIP,
      UPDATE_RELATIONSHIP,
      DEFAULT_RELATIONSHIP,
    ]),
    products() {
      this.show = 'products';
    },
    relationships(productId) {
      this.show = 'relationships';
      this.popoutRelationship(productId);
    },
    async saveRelations() {
      this.relationshipDialog = false;
      await this.CREATE_RELATIONSHIP(this.relationshipForm);
    },
    async popoutRelationship(pid) {
      this.selectedProduct = pid;
      this.relationshipDialog = !this.relationshipDialog;
      const criteria = {
        id: pid,
        relation: 'product',
        licensor_uuid: this.productDetails.character.license.licenseId,
        product_series: this.productDetails.productSeries,
      };
      await this.GET_RELATED_PRODUCT_LIST(criteria);
      await this.GET_RELATIONSHIP(criteria);
    },
    deleteRelation(selectedRelation, i) {
      this.selectedIndex = i;
      if (selectedRelation.relatedProduct === '') {
        this.relationshipForm.inputs.splice(i, 1);
      } else {
        this.selectedRelation = selectedRelation;
        this.confirmationDialog = true;
      }
    },
    async executeDelete() {
      this.confirmationDialog = false;
      const criteria = {
        relation_uuid: this.selectedRelation.productRelationId,
        relation: 'product',
      };
      await this.UPDATE_RELATIONSHIP(criteria);
      this.relationshipForm.inputs.splice(this.selectedIndex, 1);
    },
    async executeDefault(producId) {
      await this.DEFAULT_RELATIONSHIP(producId);
      // router.push(`/product/${producId}/details`);
    },
    discard() {
      this.relationshipDialog = false;
      // this.newCharacterDialog = false;
    },
    addForm() {
      this.relationshipForm.inputs.push({
        productRelationId: null,
        relatedProduct: '',
        relation: '',
      });
    },
    refreshRelation() {
      this.relationshipForm.productId = this.selectedProduct;
      if (this.relationshipDetails.length > 0) {
        for (let i = 0; i < this.relationshipDetails.length; i++) {
          this.relationshipForm.inputs.push({
            productRelationId: this.relationshipDetails[i].productRelationId,
            relatedProduct: this.relationshipDetails[i].relatedProduct.productId,
            relation: this.relationshipDetails[i].relation,
          });
        }
      } else {
        this.relationshipForm.inputs.push({
          productRelationId: null,
          relatedProduct: '',
          relation: '',
        });
      }
    },
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
      this.GET_PRODUCT_SERIES_LIST(this.productForm.licenseId);
    },
    disallowEdit() {
      const inputElems = document.getElementById('inputs').getElementsByClassName('el-input__inner');
      for (let i = 0; i < inputElems.length; i++) {
        inputElems[i].disabled = true;
      }
      const textAreaElems = document.getElementById('inputs').getElementsByClassName('el-textarea__inner');
      for (let i = 0; i < textAreaElems.length; i++) {
        textAreaElems[i].disabled = true;
      }
      this.isDisabled = true;
    },
    effectLinks() {
      if (this.productDetails.productName) {
        this.toggle.susLink = true;
      } else {
        this.toggle.susLink = false;
      }
      if (this.productDetails.sustainabilityReport) {
        this.toggle.artLink = true;
      } else {
        this.toggle.artLink = false;
      }
      if (this.productDetails.sustainabilityReport && this.productDetails.designs.length > 0) {
        this.toggle.serLink = true;
      } else {
        this.toggle.serLink = false;
      }
      this.toggle.productName = this.productDetails.productName;
      this.SET_LINKS(this.toggle);
    },
  },
  watch: {
    productDetails() {
      this.effectLinks();
      this.selectedCountry = this.productDetails.productManufactureCountry;
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
        oriLicenseId: this.productDetails.character.license.licenseId,
        oriProductSeries: this.productDetails.artistIds,
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
      this.GET_PRODUCT_SERIES_LIST(this.productForm.licenseId);
      if (this.productDetails.productSerialNumbers.length > 0) {
        this.disallowEdit();
      }
    },
    licensorList() {
    },
    relatedProductList() {
      this.productOptions = this.relatedProductList.filter((x) => x.productId !== this.selectedProduct);
    },
    relationshipDetails() {
      this.relationshipForm.inputs = [];
      this.refreshRelation();
    },
    updateResult() {
      if (this.updateResult[0].defaultRelationship) {
        this.executeDefault(this.productDetails.productId);
      }
      if (this.updateResult[0].next === 'exit') {
        router.push('/allproducts');
      } else {
        router.push(`/product/${this.productDetails.productId}/sustainability`);
      }
    },
    relationshipForm: {
      handler(val) {
        const i = val.inputs.length;
        if (val.inputs.length > 0) {
          if ((val.inputs[0].relatedProduct.length > 0) && (val.inputs[0].relation.length > 0)) {
            this.allowSave = true;
          } else {
            this.allowSave = false;
          }
          this.hideButtons = true;
          if ((val.inputs[i - 1].relatedProduct.length > 0) && (val.inputs[i - 1].relation.length > 0)) {
            this.allowed = true;
          } else {
            this.allowed = false;
          }
        } else {
          this.allowSave = false;
          this.hideButtons = false;
          this.allowed = true;
        }
      },
      deep: true,
    },
  },
};
</script>
