<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="licensorForm"
    :rules="rules"
    ref="licensorForm"
    @keyup.enter="onSubmit($refs.licensorForm)"
  >
  <el-row :gutter="20" class="form-bg-color">
    <el-col :span="21" :offset="3" class="form-text-title-pad" style="margin-bottom:50px">
      <span class="form-label">Create New Licensor</span>
    </el-col>
    <!-- <el-col :span="21" :offset="3" style="margin-bottom:50px">
    <el-menu
      :default-active="activeIndexSub"
      class="el-menu-category sub-menu-product"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" class="mf-size" @click="licensorDetails()">LICENSOR DETAILS</el-menu-item>
      <el-menu-item index="1" class="mf-size" @click="characters()">CHARACTERS</el-menu-item>
    </el-menu>
    </el-col> -->
  </el-row>
  <el-row :gutter="20" class="form-bg-color pt-3" style="padding:20px 0" v-if="show=='licensor-details'">
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <SingleImageUpload
          v-model:imgUrl="licensorForm.licenseImageUrl"
          v-model:imgFile="licensorForm.licenseImageFile"
          formProps="licenseImageUrl"
          formLabel="Display Image"
        />
      </div>
    </el-col>
    <el-col :span="18" :offset="3">
      <TextInput
        v-model="licensorForm.licenseName"
        formProps="licenseName"
        formLabel="License Name"
      />
    </el-col>
    <el-col :span="18" :offset="3">
      <TextArea
        v-model="licensorForm.licenseDescription"
        formProps="licenseDescription"
        formLabel="Descriptions"
      />
    </el-col>
    <el-col :span="18" :offset="3">
      <el-row>
        <el-col style="text-align: right;">
          <el-button
            class="custom-btn discard-btn"
            @click="resetFormOnClick"
          >
            Discard
          </el-button>
          <el-button
            type="success"
            @click="onSubmit($refs.licensorForm)"
            :loading="loading"
            class="custom-btn submit-btn"
          >
            Submit
          </el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="form-bg-color pt-3" style="padding:20px 0" v-else>
    <!-- <div>
      <div> -->
        <el-col :span="18" :offset="3">
          <div class="show-character">
            XXX
          </div>
          <div class="add-character">
            <el-button class="custom-btn add-btn-new"
              @click="addCharacter()"
            >
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-col>
      <!-- </div>
    </div> -->
  </el-row>
  </el-form>
  <!-- <el-dialog
    title="CREATE NEW CHARACTER"
    custom-class="custom-dialog"
    v-model="newCharacterDialog"
    :destroy-on-close="true"
  >
  <el-form-item>
  <el-row>
    <el-col :span="15" :offset="4" style="text-align: center;">
      <TextInput
        v-model="characterForm.characterName"
        formProps="characterName"
        formLabel="NAME OF CHARACTER"
      />
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
          @click="saveCharacter()">SAVE</el-button>
      </el-col>
    </el-row>
    </el-form-item>
  </el-dialog>
  <el-dialog
    title="EDIT CHARACTER"
    custom-class="custom-dialog"
    v-model="editCharacterDialog"
    :destroy-on-close="true"
  >
  <el-form-item>
  <el-row>
    <el-col :span="15" :offset="4" style="text-align: center;">
      <TextInput
        v-model="characterForm.characterName"
        formProps="characterName"
        formLabel="NAME OF CHARACTER"
      />
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
          @click="save()">SAVE</el-button>
      </el-col>
    </el-row>
    </el-form-item>
  </el-dialog> -->
</template>

<script>
import { IMAGE_FORMAT } from '@/common/constants';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
/*
import { mapActions, mapState } from 'vuex';
import { GET_CHARACTER_LIST, CREATE_CHARACTER } from '@/store/modules/character/actions-type';
*/

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
      show: 'licensor-details',
      fileFormat: IMAGE_FORMAT.join(','),
      newCharacterDialog: false,
      editCharacterDialog: false,
      licensorForm: {
        licenseName: '',
        licenseDescription: '',
        licenseImageUrl: null,
        licenseImageFile: null,
      },
      characterForm: {
        characterName: '',
      },
      rules: {
        licenseName: [
          {
            required: true,
            message: 'Please enter licensor name',
          },
        ],
        licenseDescription: [
          {
            required: true,
            message: 'Please enter description',
          },
        ],
        licenseImageUrl: [
          {
            required: true,
            message: 'Please upload licensor image',
          },
        ],
      },
    };
  },
  computed: {
    // ...mapState('character', ['characterList', 'characterDetails']),
  },
  mounted() {
    // this.GET_CHARACTER_LIST(this.$route.params.id);
  },
  methods: {
    // ...mapActions('character', [GET_CHARACTER_LIST, CREATE_CHARACTER]),
    resetFormOnClick() {
      this.licensorForm.licenseImageUrl = null;
      this.licensorForm.licenseImageFile = null;
      this.resetForm(this.$refs.licensorForm);
    },
    /*
    licensorDetails() {
      this.show = 'licensor-details';
    },
    characters() {
      this.show = 'characters';
    },
    addCharacter() {
      this.newCharacterDialog = !this.newCharacterDialog;
    },
    async saveCharacter() {
      this.newCharacterDialog = false;
      await this.CREATE_CHARACTER(this.licensorForm);
      this.GET_CHARACTER_LIST();
    },
    */
  },
  components: {
    TextArea,
    TextInput,
    SingleImageUpload,
  },
};
</script>
