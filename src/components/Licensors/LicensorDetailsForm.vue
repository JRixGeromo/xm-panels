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
    <el-col :span="21" :offset="3" class="form-text-title-pad">
      <span class="form-label">Licensor Details</span>
    </el-col>
    <el-col :span="21" :offset="3" style="margin-bottom:50px">
    <el-menu
      :default-active="activeIndexSub"
      class="el-menu-category sub-menu-product"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" class="mf-size" @click="showLicensors()">LICENSOR DETAILS</el-menu-item>
      <el-menu-item index="1" class="mf-size" @click="showCharacters()">CHARACTERS</el-menu-item>
    </el-menu>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px" v-if="show=='licensor-details'">
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
      <div style="margin-top: 15px;">
        <TextArea
          v-model="licensorForm.licenseDescription"
          formProps="licenseDescription"
          formLabel="Descriptions"
        />
      </div>
    </el-col>
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <el-row justify="end">
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
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="form-bg-color pt-3" style="padding:20px 0" v-else>
    <el-col :span="18" :offset="3">
      <div class="show-character" v-for="(each) in data" :key="each.characterId">
        <span class="remove-char" @click="deleteCharacter(each.characterId)"><i class="el-icon-circle-close"></i></span>
        <div style="width: 100%"  @click="updateRelationship(each.characterId)">
        {{ each.characterName }}
        </div>
      </div>
      <div class="add-character">
        <el-button class="custom-btn add-btn-new"
          @click="addCharacter()"
        >
          <i class="el-icon-plus"></i>
        </el-button>
      </div>
    </el-col>
  </el-row>
  </el-form>
  <el-dialog
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
        <i class="el-icon-circle-close" style="color:#ff0000; font-size: 35px;" @click="deleteForm(input, i)"></i>
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
          @click="deleteRelation(relationCurrent)">DELETE</el-button>
      </el-col>
    </el-row>
    </el-form-item>
  </el-dialog>

</template>

<script>
import { mapActions, mapState } from 'vuex';
import { IMAGE_FORMAT } from '@/common/constants';
import { GET_LICENSOR,
  UPDATE_LICENSOR } from '@/store/modules/licensor/actions-type';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import SelectInput from '@/components/Share/SelectInput.vue';
import { GET_CHARACTER_LIST, CREATE_CHARACTER } from '@/store/modules/character/actions-type';
import { GET_RELATIONSHIP, GET_RELATIONSHIP_LIST, CREATE_RELATIONSHIP, UPDATE_RELATIONSHIP } from '@/store/modules/relationship/actions-type';

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
      newCharacterDialog: false,
      relationshipDialog: false,
      confirmationDialog: false,
      fileFormat: IMAGE_FORMAT.join(','),
      defaultValue: null,
      characterCurrent: null,
      selectedRelation: null,
      allowSave: false,
      licensorForm: {
        licenseName: '',
        licenseDescription: '',
        licenseImageUrl: null,
        licenseImageFile: null,
        oriLicenseDisplayImage: null,
      },
      characterForm: {
        license_uuid: null,
        characterName: null,
      },
      relationshipForm: {
        characterName: 'Select Another Character',
        relationship: null,
        inputs: [],
      },
      characterOptions: [],
      data: [],
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
    ...mapState('licensor', [
      'licensorDetails',
      'updateLicensorSuccess',
      'updatingLicensor',
    ]),
    ...mapState('character', ['characterList', 'characterDetails']),
    ...mapState('relation', ['relationshipDetails']),
  },
  methods: {
    ...mapActions('licensor', [GET_LICENSOR, UPDATE_LICENSOR]),
    ...mapActions('character', [GET_CHARACTER_LIST, CREATE_CHARACTER]),
    ...mapActions('relation', [GET_RELATIONSHIP, GET_RELATIONSHIP_LIST, CREATE_RELATIONSHIP, UPDATE_RELATIONSHIP]),
    resetFormOnClick() {
      this.licensorForm = {
        ...this.defaultValue,
      };

      setTimeout(() => {
        this.$refs.licensorForm.validate();
      }, 1);
    },
    showLicensors() {
      this.show = 'licensor-details';
    },
    showCharacters() {
      this.show = 'characters';
    },
    addCharacter() {
      this.newCharacterDialog = !this.newCharacterDialog;
    },
    async saveCharacter() {
      this.newCharacterDialog = false;
      await this.CREATE_CHARACTER(this.characterForm);
      this.GET_CHARACTER_LIST(this.licensorDetails.licenseId);
      this.updateRelationship(this.characterDetails.characterId);
      console.log(this.data);
    },
    async saveRelations() {
      this.relationshipDialog = false;
      await this.CREATE_RELATIONSHIP(this.relationshipForm);
      console.log(this.data);
    },
    async updateRelationship(cid) {
      this.characterOptions = this.data.filter((x) => x.characterId !== cid);
      this.characterCurrent = cid;
      this.relationshipForm.inputs = [];
      this.relationshipDialog = !this.relationshipDialog;
      await this.GET_RELATIONSHIP(cid);
    },
    deleteCharacter() {
      // this.confirmationDialog = true;
    },
    discard() {
      this.relationshipDialog = false;
      this.newCharacterDialog = false;
    },
    addForm() {
      this.relationshipForm.inputs.push({
        characterRelationId: '',
        relatedCharacter: '',
        relation: '',
      });
      // this.go(this.relationshipForm.inputs.length - 1);
    },
    deleteForm(selectedRelation, i) {
      if (selectedRelation.relatedCharacter === '') {
        this.relationshipForm.inputs.splice(i, 1);
      } else {
        this.selectedRelation = selectedRelation;
        this.confirmationDialog = true;
      }
    },
    async deleteRelation(i) {
      this.confirmationDialog = false;
      this.relationshipForm.inputs.splice(i, 1);
      await this.UPDATE_RELATIONSHIP(this.selectedRelation);
    },
  },
  mounted() {
    this.GET_LICENSOR(this.$route.params.id);
  },
  watch: {
    licensorDetails() {
      this.licensorForm = {
        licenseId: this.licensorDetails.licenseId,
        licenseName: this.licensorDetails.licenseName,
        licenseDescription: this.licensorDetails.licenseDescription,
        licenseImageUrl: this.licensorDetails.licenseDisplayImage,
        oriLicenseDisplayImage: this.licensorDetails.licenseDisplayImage,
      };
      this.characterForm.license_uuid = this.licensorDetails.licenseId;
      this.defaultValue = {
        ...this.licensorForm,
      };
      this.GET_CHARACTER_LIST(this.licensorDetails.licenseId);
    },
    characterList() {
      this.data = this.characterList;
    },
    relationshipDetails() {
      this.relationshipForm.characterId = this.characterCurrent;
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
          characterRelationId: '',
          relatedCharacter: '',
          relation: '',
        });
      }
      console.log(JSON.stringify(this.relationshipForm.inputs));
    },
    relationshipForm: {
      handler(val) {
        if (val.inputs.length > 0) {
          if ((val.inputs[0].relatedCharacter.length > 0) && (val.inputs[0].relation.length > 0)) {
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
  components: {
    TextArea,
    TextInput,
    SingleImageUpload,
    SelectInput,
  },
};
</script>
<style lang="scss" scoped>
// .el-dialog__title {
//   font-size: 16px;
// }
</style>
