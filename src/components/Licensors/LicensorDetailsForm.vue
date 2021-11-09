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
          default-active="0"
          class="el-menu-category sub-menu-product"
          mode="horizontal"
          text-color="#fff"
          active-text-color="#ffffff91"
        >
          <el-menu-item index="0" class="mf-size" @click="showLicensors()">LICENSOR DETAILS</el-menu-item>
          <el-menu-item index="1" class="mf-size" @click="showCharacters()">CHARACTERS</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="form-bg-color"
      style="padding-bottom:20px"
      v-if="show=='licensor-details'"
    >
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
              <el-button class="custom-btn discard-btn" @click="resetFormOnClick">Discard</el-button>
              <el-button
                type="success"
                @click="onSubmit($refs.licensorForm)"
                :loading="loading"
                class="custom-btn submit-btn"
              >Submit</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color pt-3" style="padding:20px 0;" v-else>
      <el-col :span="18" :offset="3" style="display: flex; flex-wrap: wrap;">
        <div class="show-character" v-for="(each, i) in characterData.inputs" :key="i">
          <span class="remove-char" @click="deleteCharacter(each.characterId, i)">
            <i class="el-icon-circle-close"></i>
          </span>
          <div
            style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding: 10px;"
            @click="popoutRelationship(each.characterId)"
          >{{ each.characterName }}</div>
        </div>
        <div class="add-character">
          <el-button class="custom-btn add-btn-new" @click="addCharacter()">
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
    <el-form
    @submit.prevent
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
            <el-button class="custom-btn discard-btn" @click="discard()">DISCARD</el-button>
          </el-col>
          <el-col :span="8" :offset="1" style="padding: 23px">
            <el-button class="custom-btn submit-btn" @click="saveCharacter()" :disabled="!characterForm.characterName">SAVE</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    :title="`${CurrentSelectedCharacterName}'s Relationship`"
    custom-class="custom-dialog"
    v-model="relationshipDialog"
    :destroy-on-close="true"
    width="55%"
  >
    <el-form
    @submit.prevent
    >
      <el-form-item>
        <el-row v-for="(input, i) in relationshipForm.inputs" :key="i">
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
              ></el-option>
            </SelectInput>
          </el-col>
          <el-col :span="10" :offset="1" style="text-align: center;">
            <TextInput v-model="input.relation" formProps="relationship" formLabel="RELATIONSHP" />
          </el-col>
          <el-col :span="1" :offset="1" style="text-align: center;">
            <div style="width: 100%; text-align: center; margin-top: 27px">
              <i
                class="el-icon-circle-close"
                style="color:#ff0000; font-size: 35px;"
                @click="deleteRelation(input, i)"
              ></i>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3">
            <div style="width: 100%; text-align: center; margin-top:30px">
              <button class="el-button el-button--default custom-btn add-btn-new"
              type="button" @click="addForm" :disabled="!allowed"><span><i class="el-icon-plus"></i></span></button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row v-if="hideButtons">
          <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
            <el-button class="custom-btn discard-btn" @click="discard()">DISCARD</el-button>
          </el-col>
          <el-col :span="8" :offset="1" style="padding: 23px">
            <el-button
              class="custom-btn submit-btn"
              @click="saveRelations()"
              :disabled="!allowSave"
            >SAVE</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    title="Are you sure want to delete this relationship?"
    custom-class="custom-dialog"
    v-model="confirmationDialog"
    :destroy-on-close="true"
    width="55%"
  >
    <el-form>
      <el-form-item>
        <el-row>
          <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
            <el-button class="custom-btn discard-btn" @click="confirmationDialog = false">CANCEL</el-button>
          </el-col>
          <el-col :span="8" :offset="1" style="padding: 23px">
            <el-button class="custom-btn submit-btn" @click="executeDelete()">DELETE</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { IMAGE_FORMAT } from '@/common/constants';
import { GET_LICENSOR, UPDATE_LICENSOR } from '@/store/modules/licensor/actions-type';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import SelectInput from '@/components/Share/SelectInput.vue';
import { GET_CHARACTER_LIST, CREATE_CHARACTER, UPDATE_CHARACTER } from '@/store/modules/character/actions-type';
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
      allowed: true,
      show: 'licensor-details',
      confirm: '',
      // action: '',
      hideButtons: false,
      newCharacterDialog: false,
      relationshipDialog: false,
      confirmationDialog: false,
      fileFormat: IMAGE_FORMAT.join(','),
      defaultValue: null,
      // characterCurrent: null,
      selectedRelation: null,
      selectedCharacter: null,
      selectedIndex: null,
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
        characterName: '',
        relationship: 'licensor',
        inputs: [],
      },
      characterOptions: [],
      characterData: {
        inputs: [],
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
    ...mapState('licensor', ['licensorDetails', 'updateLicensorSuccess', 'updatingLicensor']),
    ...mapState('character', ['characterList', 'characterDetails', 'newCharacterId', 'deleteSuccess']),
    ...mapState('relation', ['relationshipDetails']),
    CurrentSelectedCharacterName() {
      if (this.selectedCharacter) {
        const character = this.characterData.inputs.find((x) => x.characterId === this.selectedCharacter);
        if (typeof character !== 'undefined') {
          return character.characterName;
        }
        return '';
      }
      return '';
    },
  },
  methods: {
    ...mapActions('licensor', [GET_LICENSOR, UPDATE_LICENSOR]),
    ...mapActions('character', [GET_CHARACTER_LIST, CREATE_CHARACTER, UPDATE_CHARACTER]),
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
      await this.GET_CHARACTER_LIST(this.licensorDetails.licenseId);
      // this.action = 'addedCharacter';
      this.characterForm.characterName = '';
    },
    async saveRelations() {
      this.relationshipDialog = false;
      await this.CREATE_RELATIONSHIP(this.relationshipForm);
    },
    async popoutRelationship(cid) {
      this.characterOptions = this.characterData.inputs.filter((x) => x.characterId !== cid);
      this.selectedCharacter = cid;
      this.relationshipDialog = !this.relationshipDialog;
      const criteria = {
        id: cid,
        relation: 'character',
      };
      await this.GET_RELATIONSHIP(criteria);
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
        const criteria = {
          relation_uuid: this.selectedRelation.characterRelationId,
          relation: 'licensor',
        };
        await this.UPDATE_RELATIONSHIP(criteria);
        // await this.UPDATE_RELATIONSHIP(this.selectedRelation);
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
        characterRelationId: null,
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
          characterRelationId: null,
          relatedCharacter: '',
          relation: '',
        });
      }
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
      // this.characterData = this.characterList;
      this.characterData.inputs = [];
      if (this.characterList.length > 0) {
        for (let i = 0; i < this.characterList.length; i++) {
          this.characterData.inputs.push({
            characterId: this.characterList[i].characterId,
            characterName: this.characterList[i].characterName,
          });
        }
      }
    },
    newCharacterId() {
      this.GET_CHARACTER_LIST(this.licensorDetails.licenseId);
      this.popoutRelationship(this.newCharacterId[0]);
    },
    relationshipDetails() {
      this.relationshipForm.inputs = [];
      this.refreshRelation();
    },
    relationshipForm: {
      handler(val) {
        const i = val.inputs.length;
        if (val.inputs.length > 0) {
          if (val.inputs[0].relatedCharacter.length > 0 && val.inputs[0].relation.length > 0) {
            this.allowSave = true;
          } else {
            this.allowSave = false;
          }
          this.hideButtons = true;
          if ((val.inputs[i - 1].relatedCharacter.length > 0) && (val.inputs[i - 1].relation.length > 0)) {
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
