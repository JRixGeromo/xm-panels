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
            <span style="text-decoration: underline" @click="relationships()">View character relatipnships</span>
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
        <div style="margin-top: 35px; width: 100%">
          <el-row justify="end">
            <!-- <el-button>Discard Changes</el-button>
            <el-button
              type="success"
              @click="onSubmit($refs.productForm)"
              :loading="loading"
            >
              Submit
            </el-button> -->
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
  <el-form v-else>
    <el-row justify="space-between">
      <el-col :span="2">
        <div style="width: 100%; text-align:center; margin-top: -20px">
        <span style="text-decoration: underline" @click="products()">back</span>
      </div>
      </el-col>
      <el-col :span="2">
        <div style="width: 100%; text-align:center; margin-top: -20px">
          <span style="text-decoration: underline" @click="popoutRelationship()">edit</span>
        </div>
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
          v-model="input.relatedCharacter"
          formProps="characterName"
          formLabel="Character"
        >
          <el-option
            v-for="character in characterOptions"
            :key="character.characterId"
            :label="character.characterName"
            :value="character.characterId"
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
    <el-col :span="23" :offset="1">
      <div style="width: 100%; text-align: center">
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
import { GET_PRODUCT_SERIES_LIST } from '@/store/modules/product/actions-type';
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
import { GET_CHARACTER_LIST, CREATE_CHARACTER, UPDATE_CHARACTER } from '@/store/modules/character/actions-type';
import { GET_RELATIONSHIP, GET_RELATIONSHIP_LIST, CREATE_RELATIONSHIP, UPDATE_RELATIONSHIP } from '@/store/modules/relationship/actions-type';
// import relationship from '@/store/modules/relationship';

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
        characterName: '',
        relationship: null,
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
    ...mapState('product', ['productSeriesList']),
    ...mapState('character', ['characterList', 'characterDetails', 'newCharacterId', 'deleteSuccess']),
    ...mapState('relation', ['relationshipDetails']),
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
    ...mapActions('product', [GET_PRODUCT_SERIES_LIST]),
    ...mapActions('character', [GET_CHARACTER_LIST, CREATE_CHARACTER, UPDATE_CHARACTER]),
    ...mapActions('relation', [GET_RELATIONSHIP, GET_RELATIONSHIP_LIST, CREATE_RELATIONSHIP, UPDATE_RELATIONSHIP]),
    getCharacters() {
      this.productForm.characterId = '';
      this.GET_CHARACTER_LIST(this.productForm.licenseId);
    },
    products() {
      this.show = 'products';
    },
    relationships() {
      this.show = 'relationships';
    },
    async saveRelations() {
      this.relationshipDialog = false;
      await this.CREATE_RELATIONSHIP(this.relationshipForm);
    },
    async popoutRelationship(cid) {
      this.characterOptions = this.characterData.inputs.filter((x) => x.characterId !== cid);
      this.selectedCharacter = cid;
      this.relationshipDialog = !this.relationshipDialog;
      await this.GET_RELATIONSHIP(cid);
      this.refreshRelation();
    },
    deleteCharacter(selectedCharacter, i) {
      this.confirm = 'character';
      this.selectedIndex = i;
      this.selectedCharacter = selectedCharacter;
      this.confirmationDialog = true;
      // this.action = '';
    },
    deleteRelation(selectedRelation, i) {
      this.confirm = 'relation';
      this.selectedIndex = i;
      if (selectedRelation.relatedCharacter === '') {
        this.relationshipForm.inputs.splice(i, 1);
      } else {
        this.selectedRelation = selectedRelation;
        this.confirmationDialog = true;
      }
    },
    async executeDelete() {
      this.confirmationDialog = false;
      if (this.confirm === 'relation') {
        await this.UPDATE_RELATIONSHIP(this.selectedRelation);
        this.relationshipForm.inputs.splice(this.selectedIndex, 1);
      } else {
        await this.UPDATE_CHARACTER(this.selectedCharacter);
        this.characterData.inputs.splice(this.selectedIndex, 1);
      }
    },
    discard() {
      this.relationshipDialog = false;
      this.newCharacterDialog = false;
    },
    addForm() {
      this.relationshipForm.inputs.push({
        characterRelationId: this.selectedCharacter,
        relatedCharacter: '',
        relation: '',
      });
    },
    refreshRelation() {
      this.relationshipForm.characterId = this.selectedCharacter;
      if (this.relationshipDetails.length > 0) {
        for (let i = 0; i < this.relationshipDetails.length; i++) {
          this.relationshipForm.inputs.push({
            characterRelationId: this.relationshipDetails[i].characterRelationId,
            relatedCharacter: this.relationshipDetails[i].relatedCharacter.characterId,
            relation: this.relationshipDetails[i].relation,
          });
        }
      } else {
        this.relationshipForm.inputs.push({
          characterRelationId: this.selectedCharacter,
          relatedCharacter: '',
          relation: '',
        });
      }
      console.log(JSON.stringify(this.relationshipDetails));
    },
  },
  watch: {
    productSeriesList() {
      console.log(this.productSeriesList);
    },
    licensorList() {
      console.log(this.licensorList);
    },
  },
};
</script>
