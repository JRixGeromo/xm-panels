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
      <span class="form-text-title">Create New Licensor</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <div class="demo-image__preview">
          <span class="form-custom">Display Image</span>
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
            v-if="licenseImageUrl"
            class="el-icon-error clear-img-icon"
            @click="clearLicenseImg"
          ></i>
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple">
        <!-- <div class="demo-image__preview">
          <span class="form-custom">Background Image</span>
          <el-upload
            action=""
            list-type="picture-card"
            :show-file-list="false"
            :on-change="handleLicenseImg"
            :auto-upload="false"
            :accept="fileFormat"
          >
            <img v-if="licensorForm.licenseDisplayImageUrl" :src="licensorForm.licenseDisplayImageUrl" class="image" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <i
            v-if="licensorForm.licenseDisplayImageUrl"
            class="el-icon-error clear-img-icon"
            @click="clearProfileImg"
          ></i>
        </div> -->
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <el-form-item label="License Name" prop="licenseName">
        <el-input
          placeholder="Please input Name"
          v-model="licensorForm.licenseName"
          >
        </el-input>
        </el-form-item>
      </div>
    </el-col>
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <el-form-item label="Descriptions" prop="licenseDescription">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Please input Description"
          v-model="licensorForm.licenseDescription">
        </el-input>
        </el-form-item>
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
// import { mapActions, mapState } from 'vuex';
// import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';

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
    // clearLicenseCoverImg() {
    //   this.licensorForm.licenseCoverImageUrl = null;
    //   this.licensorForm.licenseCoverImageFile = null;
    // },
  },
  // computed: {
  //   ...mapState('access', ['roleList']),
  // },
};
</script>
