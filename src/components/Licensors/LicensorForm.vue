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
      <span class="form-label">Create New Licensor</span>
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

  <el-row :gutter="20" class="form-bg-color pt-3" style="padding:20px 0">
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
// import { mapActions, mapState } from 'vuex';
// import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
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
        // licenseCoverImageUrl: null,
        // licenseCoverImageFile: null,
        licenseImageUrl: null,
        licenseImageFile: null,
        // licenseImageUrl: null,
        // licenseImageFile: null,
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
        licenseImageFile: [
          {
            required: true,
            message: 'Please upload licensor image',
          },
        ],
      },
    };
  },
  methods: {
    handleLicenseImg(file) {
      this.licensorForm.licenseImageUrl = URL.createObjectURL(file.raw);
      this.licensorForm.licenseImageFile = file.raw;
    },
    // handleLicenseCoverImg(file) {
    //   this.licensorForm.licenseCoverImageUrl = URL.createObjectURL(file.raw);
    //   this.licensorForm.licenseCoverImageFile = file.raw;
    // },
    clearLicenseImg() {
      this.licensorForm.licenseImageUrl = null;
      this.licensorForm.licenseImageFile = null;
      // this.licensorForm.profileImageUrl = null;
      // this.licensorForm.profileImageFile = null;
    },
    resetFormOnClick() {
      this.clearLicenseImg();
      this.resetForm(this.$refs.licensorForm);
    },
    // clearLicenseCoverImg() {
    //   this.licensorForm.licenseCoverImageUrl = null;
    //   this.licensorForm.licenseCoverImageFile = null;
    // },
  },
  // computed: {
  //   ...mapState('access', ['roleList']),
  // },
  components: {
    TextArea,
    TextInput,
  },
};
</script>
