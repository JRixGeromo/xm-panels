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
      <span class="form-label">Artist Details</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <div class="demo-image__preview">
          <label class="img-label">Display Image</label>
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
          <label class="img-label">Background Image</label>
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
            v-if="artistForm.artistCoverImageUrl"
            class="el-icon-error clear-img-icon"
            @click="clearArtistCoverImg"
          ></i>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" class="form-bg-color" style="padding-bottom:20px">
    <el-col :span="9" :offset="3">
      <div style="margin-top: 30px;">
        <TextInput
          v-model="artistForm.artistName"
          formProps="artistName"
          formLabel="Artist Name"
        />
      </div>
    </el-col>
    <el-col :span="9">
      <div style="margin-top: 30px;">
        <TextInput
          v-model="artistForm.artistEmailAddress"
          formProps="artistEmailAddress"
          formLabel="Email Address"
        />
      </div>
    </el-col>
    <el-col :span="9" :offset="3">
      <div style="margin-top: 30px;">
        <Datepicker
          v-model="artistForm.artistDob"
          formProps="artistDob"
          formLabel="Date of Birth"
        />
      </div>
    </el-col>
    <el-col :span="9">
      <div style="margin-top: 30px;">
        <TextInput
          v-model="artistForm.artistWebsite"
          formProps="artistWebsite"
          formLabel="Artist's Website"
        />
      </div>
    </el-col>
    <el-col :span="18" :offset="3">
      <div style="margin-top: 30px;">
        <TextArea
          v-model="artistForm.artistDescription"
          formProps="artistDescription"
          formLabel="Artist's Description"
        />
      </div>
    </el-col>
    <!-- <el-col :span="18" :offset="3">
      <div style="margin-top: 30px;">
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
             @click="onSubmit($refs.artistForm)"
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
import { mapActions, mapState } from 'vuex';
import { IMAGE_FORMAT } from '@/common/constants';
// import { GET_ROLE_LIST } from '@/store/modules/access/actions-type';
import { GET_ARTIST,
  UPDATE_ARTIST_PROFILE } from '@/store/modules/artist/actions-type';
import Datepicker from '@/components/Share/DateInput.vue';
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
  components: {
    Datepicker,
    TextArea,
    TextInput,
  },
  data() {
    return {
      // editUserForm: {
      //   artistName: '',
      //   artistEmailAddress: '',
      //   description: '',
      //   artistDob: '',
      //   artistWebsite: '',
      // },
      fileFormat: IMAGE_FORMAT.join(','),
      artistForm: {
        artistId: '',
        artistUserId: '',
        artistName: '',
        artistEmailAddress: '',
        artistDescription: '',
        artistDob: new Date(),
        artistWebsite: '',
        isAbleLogin: true,
        artistCoverImageUrl: null,
        artistCoverImageFile: null,
        artistImageUrl: null,
        artistImageFile: null,
        oriArtistImageUrl: null,
        oriArtistCoverImageUrl: null,
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
        artistDescription: [
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
  computed: {
    ...mapState('artist', [
      'artistProfile',
      'updateArtistProfileSuccess',
      'updatingArtistProfile',
    ]),
  },
  methods: {
    ...mapActions('artist', [GET_ARTIST, UPDATE_ARTIST_PROFILE]),
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
    resetFormOnClick() {
      this.clearArtistImg();
      this.clearArtistCoverImg();
      this.resetForm(this.$refs.artistForm);
    },
  },
  mounted() {
    this.GET_ARTIST(this.$route.params.id);
  },
  watch: {
    artistProfile() {
      this.artistForm = {
        artistId: this.artistProfile.artistId,
        artistUserId: this.artistProfile.artistUserId,
        artistName: this.artistProfile.artistName,
        artistEmailAddress: this.artistProfile.artistEmailAddress,
        artistDob: new Date(this.artistProfile.artistDob),
        artistDescription: this.artistProfile.artistDescription,
        artistStatus: 'Active',
        artistWebsite: this.artistProfile.artistWebsite,
        artistImageUrl: this.artistProfile.artistDisplayPhotoFilePath,
        artistCoverImageUrl: this.artistProfile.artistDisplayBannerFilePath,
        oriArtistImageUrl: this.artistProfile.artistDisplayPhotoFilePath,
        oriArtistCoverImageUrl: this.artistProfile.artistDisplayBannerFilePath,
      };
      this.defaultValue = {
        ...this.artistForm,
      };
    },
    // updateArtistProfileSuccess(newUpdateArtistProfileSuccess) {
    //   if (newUpdateArtistProfileSuccess) {
    //     this.GET_ARTIST(this.$route.params.id);
    //   }
    // },
  },
};
</script>
