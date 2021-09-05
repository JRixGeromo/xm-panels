<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="designForm"
    :rules="rules"
    ref="designForm"
    @keyup.enter="onSubmit($refs.designForm)"
  >
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="18" :offset="3">
        <div style="margin-top: 30px; text-align:center">
          <span v-for="(page, i) in designForm.inputs" :key="i" >
            <a href="#" @click="go(i)"><span style="padding: 0px 4px  0px  4px" :class="{ current: i == current }">{{i+1}}</span></a>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" v-for="(input, i) in designForm.inputs" :key="i">
      <el-col :span="18" :offset="3" v-show="input.show">
        <div>
          <el-form-item label="Artists / Designer" prop="designArtistId">
          <el-select v-model="input.designArtistId" placeholder="Select" style="max-width:800px">
            <el-option
              v-for="artist in existingArtistList"
              :key="artist.artistId"
              :label="artist.artistName"
              :value="artist.artistId">
            </el-option>
          </el-select>
          </el-form-item>
        </div>
        <div class="grid-content bg-purple">
          <span class="form-custom">Display Image</span>
          <div class="demo-image__preview" @click="handleClick(i)">
            <el-upload
              drag
              action=""
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleDesignImg"
              :auto-upload="false"
              :accept="fileFormat"
            >
              <img v-if="input.designImageUrl" :src="input.designImageUrl" class="image" />
              <i v-else class="el-icon-plus" style="padding-top:70px"></i>
            </el-upload>
            <i
              v-if="input.designImageUrl"
              class="el-icon-error clear-img-icon"
              @click="clearDesignImg(i)"
            ></i>
          </div>
        </div>
        <div style="margin-top: 15px;">
          <el-form-item label="Product Design Concept" prop="designConcept">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="Please input design concept"
            v-model="input.designConcept">
          </el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="18" :offset="3">
        <div v-show="input.show">
          <el-row justify="center">
            <el-button  @click="deleteForm(i)" v-if="designForm.inputs.length > 1">Delete Page</el-button>
            <el-button type="primary" @click="addForm">Add Page</el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color">
      <el-col :span="2" :offset="3">
        <div style="margin: 20px 0px 20px 0px;">
          <el-row>
            <el-button>Preview</el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="margin: 20px 0px 20px 0px;">
          <el-row justify="end">
            <el-button>Discard Changes</el-button>
            <el-button>Save and Exit</el-button>
            <el-button
              type="success"
              @click="onSubmit($refs.designForm)"
              :loading="loading"
            >
              Save and Proceed
            </el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_DESIGNS, GET_PRODUCT } from '@/store/modules/product/actions-type';
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
      country: '',
      region: '',
      current: 0,
      clicked: 0,
      existingArtistList: null,
      fileFormat: IMAGE_FORMAT.join(','),
      designForm: {
        productId: this.$route.params.id,
        inputs: [],
        forDelete: [],
        existing: [],
      },
      // rules: {
      //   designConcept: [
      //     {
      //       required: true,
      //       message: 'Please enter design concept',
      //     },
      //   ],
      //   designImageUrl: [
      //     {
      //       required: true,
      //       message: 'Please enter design image',
      //     },
      //   ],
      //   designCreateBy: [
      //     {
      //       required: true,
      //       message: 'Please select artist',
      //     },
      //   ],
      // },
    };
  },

  methods: {
    ...mapActions('artist', [GET_ARTIST_LIST]),
    ...mapActions('product', [GET_DESIGNS, GET_PRODUCT]),
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
        designId: null,
        show: false,
      });
      console.log(this.designForm.inputs);
    },
    deleteForm(i) {
      this.designForm.forDelete.push({
        designId: (this.designForm.inputs[i].designId ? this.designForm.inputs[i].designId : null),
      });
      console.log(this.designForm.forDelete);
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
  },
  computed: {
    ...mapState('artist', ['artistList']),
    ...mapState('product', ['designDetails', 'productDetails']),
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id);
    this.GET_DESIGNS(this.$route.params.id);
    this.designForm.productId = this.$route.params.id;
    this.designForm.inputs.push({
      designImageUrl: '',
      designImageFile: '',
      designConcept: '',
      designArtistId: '',
      designId: null,
      show: true,
    });
    console.log('RICO');
    console.log(this.$route.params);
  },
  watch: {
    designDetails() {
      this.designForm.productId = this.$route.params.id;
      let hideShow = false;
      if (this.designDetails.length > 0) {
        this.designForm.inputs = [];
        for (let i = 0; i < this.designDetails.length; i++) {
          if (i === 0) {
            hideShow = true;
          } else {
            hideShow = false;
          }
          this.designForm.inputs.push({
            designId: this.designDetails[i].designId,
            designArtistId: this.designDetails[i].designArtistId,
            designImageUrl: this.designDetails[i].designFilePath,
            designFileType: this.designDetails[i].designFileType,
            designConcept: this.designDetails[i].designConcept,
            show: hideShow,
          });
        }
      }
      this.designForm.existing = this.designDetails;
      // console.log(this.designForm.existing);
      this.defaultValue = {
        ...this.designForm,
      };
    },
    productDetails() {
      this.existingArtistList = this.productDetails.artistIds;
      console.log(this.existingArtistList);
      this.GET_ARTIST_LIST();
    },
    artistList() {
      this.existingArtistList = this.artistList.filter((f) => this.existingArtistList.includes(f.artistId));
    },
  },
};
</script>
<style lang="scss" scoped>
  .current {
      color: red;
      font-weight: bold;
  }
</style>
