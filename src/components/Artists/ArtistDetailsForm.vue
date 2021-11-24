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
        <SingleImageUpload
          v-model:imgUrl="artistForm.artistImageUrl"
          v-model:imgFile="artistForm.artistImageFile"
          formProps="artistImageUrl"
          formLabel="Display Image"
        />
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple">
        <SingleImageUpload
          v-model:imgUrl="artistForm.artistCoverImageUrl"
          v-model:imgFile="artistForm.artistCoverImageFile"
          formProps="artistCoverImageUrl"
          formLabel="Background Image"
        />
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
          <!-- <el-button
            class="custom-btn discard-btn"
            @click="resetFormOnClick"
          >
            Discard
          </el-button> -->
          <router-link :to="`/allartists`" style="margin: 20px">
            <el-button
              class="custom-btn discard-btn"
            >
              Discard
            </el-button>
          </router-link>
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
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import dayjs from 'dayjs';

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
    SingleImageUpload,
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
      defaultValue: null,
      artistForm: {
        artistId: '',
        artistUserId: '',
        artistName: '',
        artistEmailAddress: '',
        artistDescription: '',
        artistDob: '',
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
        artistImageUrl: [
          {
            required: true,
            message: 'Please upload artist display image',
          },
        ],
        artistCoverImageUrl: [
          {
            required: true,
            message: 'Please upload artist background image',
          },
        ],
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
    resetFormOnClick() {
      this.artistForm = {
        ...this.defaultValue,
      };
      setTimeout(() => {
        this.$refs.artistForm.validate();
      }, 1);
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
        artistDob: dayjs(this.artistProfile.artistDob).format('YYYY-MM-DDT00:00:00'),
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
  },
};
</script>
