<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="artistForm"
    :rules="rules"
    ref="artistForm"
    @keyup.enter="onSubmit($refs.artistForm)"
  >
  <el-row :gutter="20" class="form-bg-color">
    <el-col :span="21" :offset="3" class="form-text-title-pad">
      <span class="form-text-title">Create New Artist artist</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <div class="demo-image__preview">
          <span class="form-custom">Display Image</span>
          <!-- <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
          </el-upload> -->
          <el-upload
            action=""
            list-type="picture-card"
            :show-file-list="false"
            :on-change="handleArtistImg"
            :auto-upload="false"
            :accept="fileFormat"
          >
            <img v-if="artistForm.artistImageUrl" :src="artistForm.artistImageUrl" class="image" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <i
            v-if="artistForm.artistImageUrl"
            class="el-icon-error clear-img-icon"
            @click="clearArtistImg"
          ></i>
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple">
        <div class="demo-image__preview">
          <span class="form-custom">Background Image</span>
          <!-- <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload> -->
          <el-upload
            action=""
            list-type="picture-card"
            :show-file-list="false"
            :on-change="handleArtistCoverImg"
            :auto-upload="false"
            :accept="fileFormat"
          >
            <img v-if="artistForm.artistCoverImageUrl" :src="artistForm.artistCoverImageUrl" class="image" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <i
            v-if="artistCoverImageUrl"
            class="el-icon-error clear-img-icon"
            @click="clearArtistCoverImg"
          ></i>

        </div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
    <el-col :span="9" :offset="3">
      <div style="margin-top: 15px;">
        <el-form-item label="Artist Name" prop="artistName">
        <el-input
          placeholder="Please input Name"
          v-model="artistForm.artistName"
          >
        </el-input>
        </el-form-item>
      </div>
    </el-col>
    <el-col :span="9">
      <div style="margin-top: 15px;">
        <el-form-item label="Email Address" prop="artistEmailAddress">
        <el-input
          placeholder="Please input Email"
          v-model="artistForm.artistEmailAddress"
          >
        </el-input>
        </el-form-item>
      </div>
    </el-col>
    <el-col :span="9" :offset="3">
      <div style="margin-top: 15px;">
        <el-form-item label="Date" prop="artistDob">
          <el-date-picker
            v-model="artistForm.artistDob"
            type="date"
            placeholder="Pick a day">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-col>
    <el-col :span="9">
      <div style="margin-top: 15px;">
        <el-form-item label="Artist's Website" prop="artistWebsite">
        <el-input
          placeholder="Please input Website"
          v-model="artistForm.artistWebsite"
          clearable>
        </el-input>
        </el-form-item>
      </div>
    </el-col>
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <el-form-item label="Artist's Description" prop="description">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Please input Description"
          v-model="artistForm.description">
        </el-input>
        </el-form-item>
      </div>
    </el-col>
    <!-- <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <span class="form-custom">Artist's Role</span>
        <el-select v-model="artistForm.role" placeholder="Select">
          <el-option
            v-for="role in roleList"
            :key="role.roleId"
            :label="role.roleName"
            :value="role.roleId"
          >
          </el-option>
        </el-select>
      </div>
    </el-col> -->
    <!-- "roleId": "6b8e6cb9-e5e4-492c-6081-08d9621ec80e", -->
    <el-col :span="18" :offset="3">
      <div style="margin-top: 15px;">
        <el-row justify="end">
          <el-button>Discard Changes</el-button>
          <!-- <el-button type="success">Save</el-button> -->
          <el-button
            type="success"
            @click="onSubmit($refs.artistForm)"
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
          <el-input v-model="artistForm.firstName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="artistForm.lastName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Email" prop="emailAddress">
      <el-input v-model="artistForm.emailAddress"></el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-select v-model="artistForm.role" placeholder="Select">
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
      <el-button @click="resetForm($refs.artistForm)">Reset</el-button>
      <el-button
        type="primary"
        @click="onSubmit($refs.artistForm)"
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
import { /* DEFAULT_artist_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';

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
      artistForm: {
        artistName: '',
        artistEmailAddress: '',
        description: '',
        artistWebsite: '',
        artistDob: '',
        role: '6b8e6cb9-e5e4-492c-6081-08d9621ec80e',
        isAbleLogin: true,
        ArtistStatus: 'Active',
        artistCoverImageUrl: null,
        artistCoverImageFile: null,
        artistImageUrl: null,
        artistImageFile: null,
        create: 'artist',
      },
      rules: {
        artistName: [
          {
            required: true,
            message: 'Please enter artist name',
          },
        ],
        artistEmailAddress: [
          {
            required: true,
            message: 'Please enter email address',
          },
          {
            type: 'email',
            message: 'Please enter correct email address',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please enter description',
          },
        ],
        artistWebsite: [
          {
            required: true,
            message: 'Please enter website',
          },
        ],
        artistDob: [
          {
            required: true,
            message: 'Please enter date',
          },
        ],
      },
    };
  },
  // computed: {
  //   ...mapState('access', ['roleList']),
  // },
  methods: {
    handleArtistImg(file) {
      this.artistForm.artistImageUrl = URL.createObjectURL(file.raw);
      this.artistForm.artistImageFile = file.raw;
    },
    handleArtistCoverImg(file) {
      this.artistForm.artistCoverImageUrl = URL.createObjectURL(file.raw);
      this.artistForm.artistCoverImageFile = file.raw;
    },
    clearArtistImg() {
      this.artistForm.artistImageUrl = null;
      this.artistForm.artistImageFile = null;
    },
    clearArtistCoverImg() {
      this.artistForm.artistCoverImageUrl = null;
      this.artistForm.artistCoverImageFile = null;
    },
  },
  // mounted() {
  //   this.GET_ROLE_LIST();
  // },

  /*
  { "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1", "title": "One or more validation errors occurred.", "status": 400, "traceId": "00-54480d2acf5d7f4283c8b1aa55500ebc-04dcf3d9c9f0014f-00", "errors": { "secret": [ "The secret field is required." ], "lastName": [ "The lastName field is required." ], "userName": [ "The userName field is required." ], "firstName": [ "The firstName field is required." ], "displayName": [ "The displayName field is required." ] } }
  */
};
</script>
