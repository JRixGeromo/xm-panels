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
      <span class="form-label">Create New Artist artist</span>
    </el-col>
    <el-col :span="9" :offset="3">
      <div class="grid-content bg-purple" style="max-width:70%;">
        <SingleImageUpload
          v-model:imgUrl="artistForm.artistImageUrl"
          v-model:imgFile="artistForm.artistImageFile"
          formProps="artistImageFile"
          formLabel="Display Image"
        />
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple">
        <SingleImageUpload
          v-model:imgUrl="artistForm.artistCoverImageUrl"
          v-model:imgFile="artistForm.artistCoverImageFile"
          formProps="artistCoverImageFile"
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
  </el-form>
</template>

<script>
import { IMAGE_FORMAT } from '@/common/constants';
import Datepicker from '@/components/Share/DateInput.vue';
import TextArea from '@/components/Share/TextArea.vue';
import TextInput from '@/components/Share/TextInput.vue';
import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';

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
      fileFormat: IMAGE_FORMAT.join(','),
      artistForm: {
        artistName: '',
        artistEmailAddress: '',
        artistDescription: '',
        artistWebsite: '',
        artistDob: '',
        role: process.env.VUE_APP_ARTIST_ROLE_ID,
        isAbleLogin: true,
        ArtistStatus: 'Active',
        artistCoverImageUrl: null,
        artistCoverImageFile: null,
        artistImageUrl: null,
        artistImageFile: null,
        create: 'artist',
      },
      rules: {
        artistImageFile: [
          {
            required: true,
            message: 'Please upload artist display image',
          },
        ],
        artistCoverImageFile: [
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
  methods: {
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
};
</script>
