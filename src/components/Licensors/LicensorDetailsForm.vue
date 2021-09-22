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
      <span class="form-text-title">Licensor Details</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <div class="demo-image__preview">
          <label class="img-label">Display Image</label>
          <el-form-item prop="licenseImageFile">
            <el-upload
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleLicenseImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="licensorForm.licenseImageUrl" :src="licensorForm.licenseImageUrl" class="image" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <i
              v-if="licensorForm.licenseImageUrl"
              class="el-icon-error clear-img-icon"
              @click="clearLicenseImg"
            ></i>
          </el-form-item>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
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
          <el-button>Discard Changes</el-button>
          <!-- <el-button type="success">Save</el-button> -->
          <el-button
            type="success"
            @click="onSubmit($refs.licensorForm)"
            :loading="loading"
          >
            Submit
          </el-button>
        </el-row>
      </div>
    </el-col>
  </el-row>

    <!-- <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="licensorForm.firstName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="licensorForm.lastName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Email" prop="emailAddress">
      <el-input v-model="licensorForm.emailAddress"></el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-select v-model="licensorForm.role" placeholder="Select">
        <el-option
          v-for="role in roleList"
          :key="role.roleId"
          :label="role.roleName"
          :value="role.roleId"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item class="button-wrapper">
      <el-button @click="resetForm($refs.licensorForm)">Reset</el-button>
      <el-button
        type="primary"
        @click="onSubmit($refs.licensorForm)"
        :loading="loading"
      >
        Submit
      </el-button>
    </el-form-item> -->
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
import { GET_LICENSOR,
  UPDATE_LICENSOR } from '@/store/modules/licensor/actions-type';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';

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
      fileFormat: IMAGE_FORMAT.join(','),
      licensorForm: {
        licenseName: '',
        licenseDescription: '',
        licenseImageUrl: null,
        licenseImageFile: null,
        oriLicenseDisplayImage: null,
        licenseStatus: 'Active',
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
      },
    };
  },
  computed: {
    ...mapState('licensor', [
      'licensorDetails',
      'updateLicensorSuccess',
      'updatingLicensor',
    ]),
  },
  methods: {
    ...mapActions('licensor', [GET_LICENSOR, UPDATE_LICENSOR]),
    handleLicenseImg(file) {
      this.licensorForm.licenseImageUrl = URL.createObjectURL(file.raw);
      this.licensorForm.licenseImageFile = file.raw;
    },
    clearLicenseImg() {
      this.licensorForm.licenseImageUrl = null;
      this.licensorForm.licenseImageFile = null;
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
        licenseStatus: this.licensorDetails.licenseStatus,
        licenseImageUrl: this.licensorDetails.licenseDisplayImage,
        oriLicenseDisplayImage: this.licensorDetails.licenseDisplayImage,
      };
      // console.log(this.artistForm);
      this.defaultValue = {
        ...this.licensorForm,
      };
    },
  },
  components: {
    TextArea,
    TextInput,
  },
};
</script>
