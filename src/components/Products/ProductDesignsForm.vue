<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="designForm"
    ref="designForm"
    @keyup.enter="onSubmit($refs.designForm)"
  >
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="21" :offset="3" class="form-text-title-pad">
        <label class="form-label">ARTIST DETAILS</label>
      </el-col>
      <el-col :span="18" :offset="3">
        <div style="text-align:center">
          <span v-for="(page, i) in designForm.inputs" :key="i" style="margin-right:10px">
            <a href="#" @click="go(i)" style="text-decoration: none;">
              <span class="artist-page" :class="{ current: i == current }">{{i+1}}</span>
              </a>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" v-for="(input, i) in designForm.inputs" :key="i">
      <el-col :span="18" :offset="3" v-show="input.show">
        <div>
          <SelectInput
            v-model="input.designArtistId"
            formProps="designArtistId"
            formLabel="Artists / Designer"
          >
            <el-option
              v-for="artist in existingArtistList"
              :key="artist.artistId"
              :label="artist.artistName"
              :value="artist.artistId"
            >
            </el-option>
          </SelectInput>
        </div>
        <div class="grid-content bg-purple">
          <span class="img-label">Display Image</span>
          <div class="upload-container" @click="handleClick(i)">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleDesignImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="input.designImageUrl.length > 0" :src="input.designImageUrl" class="image" />
              <i v-else class="el-icon-upload"></i>
            </el-upload>
            <i
              v-if="input.designImageUrl"
              class="el-icon-delete clear-img-icon"
              @click="clearDesignImg(i)"
            ></i>
          </div>
        </div>
        <div style="margin-top: 35px;">
          <TextArea
            v-model="input.designConcept"
            formProps="designConcept"
            formLabel="Product Design Concept"
          />
        </div>
      </el-col>
      <el-col :span="18" :offset="3" style="text-align: center">
        <div v-show="input.show">
            <el-button  @click="deleteForm(i)" v-if="designForm.inputs.length > 1">Delete Page</el-button>
            <el-button type="default" @click="addForm">Add Page</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="3" :offset="3" style="text-align: left">
        <div style="margin: 20px 0px 20px 0px;">
            <el-button
            class="custom-btn preview-btn"
            @click="preview()">Preview</el-button>
        </div>
      </el-col>
      <el-col :span="15" style="text-align: right">
        <div style="margin: 20px 0px 20px 0px;">
            <el-button
              class="custom-btn discard-btn"
              @click="$router.push(`/allproducts`)">DISCARD</el-button>
            <el-button
              class="custom-btn save-exit-btn" :disabled="!allowSave"
              @click="onSubmit($refs.designForm, 'exit')">SAVE AND EXIT</el-button>
            <el-button
              class="custom-btn submit-btn"
              type="success"
              :disabled="!allowSave"
              @click="onSubmit($refs.designForm, 'proceed')"
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
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_PRODUCT, PREVIEW_DESIGN } from '@/store/modules/product/actions-type';
import { /* DEFAULT_PROFILE_PICTURE, */ IMAGE_FORMAT } from '@/common/constants';
// import SingleImageUpload from '@/components/Share/SingleImageUpload.vue';
import TextArea from '@/components/Share/TextArea.vue';
import SelectInput from '@/components/Share/SelectInput.vue';
import imageToBase64 from 'image-to-base64/browser';
import { SET_LINKS } from '@/store/modules/linkstoggle/actions-type';
// import { ElMessage } from 'element-plus';
import router from '@/router';

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
    next: {
      type: String,
    },
  },
  components: {
    TextArea,
    SelectInput,
  },
  data() {
    return {
      allowSave: false,
      toggle: {
        susLink: true,
        artLink: true,
        serLink: true,
        productName: '',
      },
      base64: null,
      country: '',
      region: '',
      current: 0,
      clicked: 0,
      existingArtistList: null,
      fileFormat: IMAGE_FORMAT.join(','),
      previewForm: {
        productId: null,
        designs: [],
        artists: [],
      },
      designForm: {
        productId: this.$route.params.id,
        inputs: [],
        forDelete: [],
        existing: [],
      },
    };
  },

  methods: {
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('product', [GET_PRODUCT, PREVIEW_DESIGN]),
    ...mapActions('linkstoggle', [SET_LINKS]),
    handleClick(i) {
      this.clicked = i;
    },
    handleDesignImg(file) {
      this.designForm.inputs[this.clicked].designImageUrl = URL.createObjectURL(file.raw);
      this.designForm.inputs[this.clicked].designImageFile = file.raw;
    },
    clearDesignImg(i) {
      this.designForm.inputs[i].designImageUrl = null;
      this.designForm.inputs[i].designImageFile = null;
    },
    addForm() {
      this.designForm.inputs.push({
        designImageUrl: '',
        designImageFile: '',
        designConcept: '',
        designArtistId: '',
        designFileType: '',
        designId: null,
        show: false,
      });
      this.go(this.designForm.inputs.length - 1);
    },
    preview() {
      this.previewForm.productId = null;
      this.previewForm.designs = [];
      this.previewForm.artists = [];
      this.previewForm.productId = this.$route.params.id;

      this.designForm.inputs.forEach(async (input) => {
        const fileType = input.designFileType;
        if (!input.designId) {
          this.base64 = await imageToBase64(input.designImageUrl);
          this.previewForm.designs.push({
            designId: input.designId,
            designConcept: input.designConcept,
            designFilePath: this.base64,
            designArtistId: input.designArtistId,
            designFileType: fileType,
          });
        } else {
          this.previewForm.designs.push({
            designId: input.designId,
            designConcept: input.designConcept,
            designFilePath: input.designImageUrl,
            designArtistId: input.designArtistId,
            designFileType: fileType,
          });
        }
      });

      for (let i = 0; i < this.existingArtistList.length; i++) {
        this.previewForm.artists.push({
          artistName: this.existingArtistList[i].artistName,
          artistDisplayPhotoFilePath: this.existingArtistList[i].artistDisplayPhotoFilePath,
        });
      }
      console.log(JSON.stringify(this.previewForm));
      this.PREVIEW_DESIGN(this.previewForm);
    },
    deleteForm(i) {
      this.designForm.forDelete.push({
        designId: (this.designForm.inputs[i].designId ? this.designForm.inputs[i].designId : null),
      });
      this.designForm.inputs.splice(i, 1);
      this.designForm.inputs[0].show = true;
      this.current = 0;
    },
    go(i) {
      for (let j = 0; j < this.designForm.inputs.length; j++) {
        if (j === i) {
          this.current = i;
          this.designForm.inputs[j].show = true;
        } else {
          this.designForm.inputs[j].show = false;
        }
      }
    },
    showDesign(url) {
      window.open(url, '_blank');
    },
    effectLinks() {
      if (this.productDetails.productName) {
        this.toggle.susLink = true;
      } else {
        this.toggle.susLink = false;
      }
      if (this.productDetails.sustainabilityReport) {
        this.toggle.artLink = true;
      } else {
        this.toggle.artLink = false;
      }
      if ((this.productDetails.sustainabilityReport && this.productDetails.designs.length > 0) || this.newDesignId) {
        this.toggle.serLink = true;
      } else {
        this.toggle.serLink = false;
      }
      this.toggle.productName = this.productDetails.productName;
      this.SET_LINKS(this.toggle);
    },
  },
  computed: {
    ...mapState('artist', ['artistList']),
    ...mapState('product', ['designDetails', 'productDetails', 'previewDetails', 'previewDesign', 'newDesignId', 'updateDesignResult']),
    ...mapState('linkstoggle', ['linksToggled']),
  },
  mounted() {
    this.designForm.productId = this.$route.params.id;
    this.GET_PRODUCT(this.$route.params.id);
  },
  watch: {
    designDetails() {
    },
    previewDesign() {
      if (this.previewDesign.length > 0) {
        this.showDesign(this.previewDesign);
      }
    },
    productDetails() {
      // this.existingArtistList = this.productDetails.artistIds;
      this.GET_ARTIST_LIST();

      this.designForm.productId = this.$route.params.id;
      let hideShow = false;
      if (this.productDetails.designs.length > 0) {
        this.designForm.inputs = [];
        for (let i = 0; i < this.productDetails.designs.length; i++) {
          if (i === 0) {
            hideShow = true;
          } else {
            hideShow = false;
          }
          this.designForm.inputs.push({
            designId: this.productDetails.designs[i].designId,
            designArtistId: this.productDetails.designs[i].designArtistId,
            designImageUrl: this.productDetails.designs[i].designFilePath,
            designFileType: this.productDetails.designs[i].designFileType,
            designConcept: this.productDetails.designs[i].designConcept,
            show: hideShow,
          });
        }
      } else {
        this.addForm();
      }
      this.designForm.existing = this.productDetails.designs;
      this.defaultValue = {
        ...this.designForm,
      };
    },
    artistList() {
      this.existingArtistList = this.artistList.filter((f) => this.productDetails.artistIds.includes(f.artistId));
    },
    newDesignId() {
      this.effectLinks();
      if (this.next === 'exit') {
        router.push('/allproducts');
      } else {
        router.push(`/product/${this.$route.params.id}/serialnumbers`);
      }
    },
    updateDesignResult() {
      if (this.updateDesignResult[0].next === 'exit') {
        router.push('/allproducts');
      } else {
        router.push(`/product/${this.$route.params.id}/serialnumbers`);
      }
    },
    designForm: {
      handler(val) {
        if (val.inputs.length > 0) {
          for (let i = 0; i < val.inputs.length; i++) {
            if ((val.inputs[i].designArtistId.length > 0) && (val.inputs[i].designConcept.length > 0) && (val.inputs[i].designImageUrl.length > 0)) {
              this.allowSave = true;
            } else {
              this.allowSave = false;
            }
          }
        } else {
          this.allowSave = false;
        }
      },
      deep: true,
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
