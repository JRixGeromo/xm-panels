<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="sustainabilityReportForm"
    :rules="rules"
    ref="sustainabilityReportForm"
    @keyup.enter="onSubmit($refs.sustainabilityReportForm)"
  >
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="18" :offset="3">
        <div class="grid-content bg-purple">
          <span class="img-label">Upload Sustainability Report Image</span>
          <div class="upload-container">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleSustainabilityReportImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="sustainabilityReportForm.displayImageUrl"
              :src="sustainabilityReportForm.displayImageUrl" class="image" />
              <i v-else class="el-icon-upload"></i>
            </el-upload>
            <i
              v-if="sustainabilityReportForm.displayImageUrl"
              class="el-icon-delete clear-img-icon"
              @click="clearSustainabilityReportImg()"
            ></i>
          </div>
        </div>
        <div class="grid-content bg-purple">
          <span class="img-label">Upload Sustainability Report</span>
          <div class="upload-container">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleSustainabilityReportFile"
              :auto-upload="false"
              :accept="pdfFormat"
            >
              <!-- <img v-if="sustainabilityReportForm.reportFile"
              :src="sustainabilityReportForm.reportFile" class="image" /> -->
              <i v-if="sustainabilityReportForm.reportFileUrl" class="el-icon-document-checked" style="font-size:60px"></i>
              <i v-else class="el-icon-upload"></i>
            </el-upload>
            <i
              v-if="sustainabilityReportForm.reportFileUrl"
              class="el-icon-delete clear-img-icon"
              @click="clearSustainabilityReportFile"
            ></i>
          </div>
        </div>

        <div style="margin-top: 15px;">
          <TextArea
            v-model="sustainabilityReportForm.summary"
            formProps="summary"
            formLabel="Summary"
            style="padding: 0px"
          />
        </div>
      </el-col>
      <!-- dynamic -->
      <el-col :span="18" :offset="3">
        <el-row>
        <el-col :span="18" :offset="3" style="text-align: center; margin-bottom: 50px; margin-top: 50px">
            <div class="img-label">
                Resources Saved
            </div>
        </el-col>
        </el-row>
        <el-form-item>
        <el-row  v-for="(input, i) in sustainabilityReportForm.resourcesSaved" :key="i" >
        <el-col :span="11" style="text-align: center;">
            <TextInput
            v-model="input.totalSave"
            formProps="totalSave"
            formLabel="Total Amount Saved"
            />
        </el-col>
        <el-col :span="11" :offset="1" style="text-align: center;">
            <TextInput
            v-model="input.resourceAndSaveMethod"
            formProps="resourceAndSaveMethod"
            formLabel="Resources and How it is Saved"
            />
        </el-col>
        <el-col :span="1" style="text-align: center;">
            <div style="width: 100%; text-align: center; margin-top: 27px">
            <i class="el-icon-circle-close" style="color:#ff0000; font-size: 35px;" @click="deleteResourcesSaved(i)"></i>
            </div>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="18" :offset="3">
        <div style="width: 100%; text-align: center; margin-top:30px">
            <el-button type="default" class="custom-btn preview-btn" @click="addResourcesSavedForm">
                <!-- <i class="el-icon-plus"></i> -->
                Add Resources
            </el-button>
        </div>
        </el-col>
        </el-row>
        </el-form-item>
      </el-col>
      <!-- end: dynamic -->
    </el-row>

    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="3" :offset="3" style="text-align: left;  margin-top: 50px">
        <!-- <div style="margin: 20px 0px 20px 0px;">
            <el-button
            class="custom-btn preview-btn"
            @click="preview()">Preview</el-button>
        </div> -->
      </el-col>
      <el-col :span="15" style="text-align: right;  margin-top: 50px">
        <div style="margin: 20px 0px 20px 0px;">
            <el-button
              class="custom-btn discard-btn"
              @click="$router.push(`/allproducts`)">DISCARD</el-button>
            <el-button
              class="custom-btn save-exit-btn"
              @click="onSubmit($refs.sustainabilityReportForm)">SAVE AND EXIT</el-button>
            <el-button
              class="custom-btn submit-btn"
              type="success"
              @click="onSubmit($refs.sustainabilityReportForm)"
              :loading="loading"
            >
              SAVE AND PROCEED
            </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_SUSTAINABILITY_REPORT } from '@/store/modules/product/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
// import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
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
    // SingleImageUpload,
    TextInput,
    TextArea,
  },
  data() {
    return {
      base64: null,
      country: '',
      region: '',
      current: 0,
      clicked: 0,
      existingArtistList: null,
      fileFormat: IMAGE_FORMAT.join(','),
      pdfFormat: '.pdf',
      sustainabilityReportForm: {
        productId: this.$route.params.id,
        sustainabilityReportId: null,
        displayImageUrl: null,
        displayImageFile: null,
        reportFileUrl: null,
        reportFile: null,
        summary: null,
        resourcesSaved: [],
      },
      // resourcesSaved: [],
      // rules: {
      //   sustainabilityReportConcept: [
      //     {
      //       required: true,
      //       message: 'Please enter sustainabilityReport concept',
      //     },
      //   ],
      //   displayImageUrl: [
      //     {
      //       required: true,
      //       message: 'Please enter sustainabilityReport image',
      //     },
      //   ],
      //   sustainabilityReportCreateBy: [
      //     {
      //       required: true,
      //       message: 'Please select artist',
      //     },
      //   ],
      // },
    };
  },

  methods: {
    ...mapActions('product', [GET_SUSTAINABILITY_REPORT]),
    handleSustainabilityReportImg(file) {
      console.log(file);
      this.sustainabilityReportForm.displayImageUrl = URL.createObjectURL(file.raw);
      this.sustainabilityReportForm.displayImageFile = file.raw;
    },
    clearSustainabilityReportImg() {
      this.sustainabilityReportForm.displayImageUrl = null;
      this.sustainabilityReportForm.displayImageFile = null;
    },
    handleSustainabilityReportFile(file) {
      console.log(file);
      this.sustainabilityReportForm.reportFileUrl = URL.createObjectURL(file.raw);
      this.sustainabilityReportForm.reportFile = file.raw;
    },
    clearSustainabilityReportFile() {
      this.sustainabilityReportForm.reportFileUrl = null;
      this.sustainabilityReportForm.reportFile = null;
    },
    addResourcesSavedForm() {
      this.sustainabilityReportForm.resourcesSaved.push({
        totalSave: null,
        resourceAndSaveMethod: null,
      });
    },
    showSustainabilityReport(url) {
      window.open(url, '_blank');
    },
    deleteResourcesSaved(i) {
      this.selectedIndex = i;
      this.sustainabilityReportForm.resourcesSaved.splice(i, 1);
    },
    saveResourcesSaved() {
      this.relationshipDialog = false;
      this.memorySaved = true;
    },
    discard() {
      this.relationshipDialog = false;
      this.memorySaved = false;
    },
  },
  computed: {
    ...mapState('product', ['sustainabilityReportInfo']),
  },
  mounted() {
    this.sustainabilityReportForm.productId = this.$route.params.id;
    this.GET_SUSTAINABILITY_REPORT(this.$route.params.id);
    // this.addResourcesSavedForm();
  },
  watch: {
    sustainabilityReportInfo() {
      if (this.sustainabilityReportInfo.sustainabilityReportId) {
        this.sustainabilityReportForm.productId = this.$route.params.id;
        this.sustainabilityReportForm.sustainabilityReportId = this.sustainabilityReportInfo.sustainabilityReportId;
        this.sustainabilityReportForm.displayImageUrl = this.sustainabilityReportInfo.sustainabilityReportImg;
        this.sustainabilityReportForm.reportFileUrl = this.sustainabilityReportInfo.sustainabilityReportFile;
        this.sustainabilityReportForm.summary = this.sustainabilityReportInfo.sustainabilityReportDescription;
        this.sustainabilityReportForm.resourcesSaved = [];
        const resourcesSaved = JSON.parse(this.sustainabilityReportInfo.sustainabilityReportDetail);
        console.log(resourcesSaved);
        for (let i = 0; i < resourcesSaved.length; i++) {
          this.sustainabilityReportForm.resourcesSaved.push({
            totalSave: resourcesSaved[i].totalSave,
            resourceAndSaveMethod: resourcesSaved[i].resourceAndSaveMethod,
          });
        }
        console.log(this.sustainabilityReportInfo);
      } else {
        this.addResourcesSavedForm();
      }
      // this.sustainabilityReportForm.existing = this.sustainabilityReportDetails;
      // this.defaultValue = {
      // ...this.sustainabilityReportForm,
      // };
    },
  },
};

</script>
<style lang="scss" scoped>
  .current {
      color: #fff !important;
      font-weight: bold;
      text-decoration: underline;
      font-weight: bold;
  }
  .artist-page {
      color: #cccccc;
      padding: 0px 4px  0px  4px;
  }

  .upload-container .clear-img-icon {
    position: absolute;
    margin-top: -10px;
    right: 0;
    top: 0;
    margin-right: -10px;
    font-size: 20px;
    cursor: pointer;
    color: #FF0000 !important;
    background: #000;
  }
</style>
