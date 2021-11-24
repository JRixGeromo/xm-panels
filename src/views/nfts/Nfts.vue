<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/managenfts' }">
      NFTS Products
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      {{ nftsList.productName }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
    :model="nftsForm"
    :rules="rules"
    ref="nftsForm"
  >
    <el-row :gutter="20" class="form-bg-color" v-show="showListing">
      <el-col :span="24" class="form-text-title-pad">
        <label class="form-label">{{ nftsList.productName }} NTFS</label>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" v-show="showListing">
      <el-col :span="24">
          <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px;" v-show="showListing">
      <el-col :span="24">
        <el-row>
          <el-col :span="6" v-for="(each) in data" :key="each" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <div :style="{ padding: '5px' }">
              <el-card :body-style="{ padding: '0px' }">
                <div style="font-size: 14px; padding: 30px 0px 30px 0px; text-align: center" @click="getDetails(each.serialNumber)">
                  <span style="font-size: 14px; color:#ff0000" class="font-text noselect">{{ checkStatus(each.status) }}</span><br>
                  <span style="font-size: 14px" class="font-text noselect">{{ each.serialNumber }}</span>
                  <div class="bottom font-text noselect" style="padding-bottom:10px; font-size:14px">
                    <span>EDITION {{ each.edition }}/ {{ each.total }}</span>
                  </div>
                  <Owner :customerId="each.customerId"/>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px;"  v-show="showDetails">
      <el-col :span="18" :offset="3">
          <div class="highlight-text" style="width: 100%; font-size: 16px; margin-bottom: 50px">
            <el-button
              class="custom-btn black-custom-btn"
              @click="goToList()"
              ><span>BACK TO NFTS</span>
            </el-button>
          </div>
          <div style="margin:0px 20px 20px 20px; float: left; width:50%; text-align: right; overflow: hidden">
            <div class="portrait">
              <img :src="nftsDetailData.productDisplayImage" style="max-height:400px">
            </div>
          </div>
          <div style="float: left; width:40%; margin:20px 0px 20px 20px;">
            <div class="highlight-text" style="width: 100%; font-size: 30px;">
             {{ nftsDetailData.productName }}<br>
             {{ nftsDetailData.serialNumber }}<br><br>
             <el-button
                class="custom-btn black-custom-btn"
                @click="go(nftsDetailData.serialNumber)"
                ><span>VIEW PROVENANCE</span>
              </el-button>
            </div>
            <el-button class="link-btn" style="padding: 0px;"
              @click="showProvenanceEvents = true;"
            >
              <span style="text-decoration: underline">
                View Provenance Events
              </span>
            </el-button>
          </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="form-bg-color" style="padding: 30px 0px 30px 0px;" v-show="showDetails">
      <el-col :span="14" :offset="3">
        <el-row>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">PRODUCT NAME</span><br>
            <span>{{ nftsDetailData.productName }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">NFT HASH</span><br>
            <span>{{ nftsDetailData.productName }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">PRODUCT DESCRIPTION</span><br>
            <span style="white-space: pre-wrap;overflow-wrap: break-word;">{{ nftsDetailData.productDescription }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">BACKGROUND OF CHARACTER</span><br>
            <span style="white-space: pre-wrap;overflow-wrap: break-word;">{{ nftsDetailData.productBackground }}</span>
            </div>
          </el-col>
          <el-col :span="24" style="padding-bottom: 30px">
            <div>
            <span style="font-size: 16px" class="font-text noselect">PRODUCT IMAGES</span><br>
            <span :span="6" v-for="(img) in nftsDetailData.productImages" :key="img" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              <img :src="img" class="image-files-display">
            </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">LICENSE</span><br>
            <span>{{ nftsDetailData.productLicense }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">CHARACTER</span><br>
            <span>{{ nftsDetailData.character }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
            <span style="font-size: 16px" class="font-text noselect">SERIES</span><br>
            <span>{{ nftsDetailData.productSeries }}</span>
            </div>
            <div style="cursor: pointer; margin-bottom: 20px">
            <el-button class="link-btn" style="padding: 0px"
              @click="viewRelation(nftsDetailData.productId)"
            >
              <span style="text-decoration: underline">
                View character relationships
              </span>
            </el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">EDITION</span><br>
            <span>{{ nftsDetailData.edition }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">COUNTRY OF MANUFACTURE</span><br>
            <span>{{ nftsDetailData.productManufactureCountry }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">DATE OF MANUFACTURE</span><br>
            <span>{{ getDate(nftsDetailData.productManufactureDate) }}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="margin-bottom: 20px">
            <span style="font-size: 16px" class="font-text noselect">ARTISTS</span><br>
            <span :span="6" v-for="(artist) in nftsDetailData.artists" :key="artist" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
              {{ artist.artistName }}<br>
            </span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="24">
            <span style="font-size: 16px" class="font-text noselect">META DATA</span><br>
            <div style="border: 1px solid #CCC; padding: 10px">
              JSON
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
  <el-dialog
    custom-class="custom-dialog provenance-event-dialog"
    v-model="showProvenanceEvents"
    :destroy-on-close="true"
    :fullscreen="true"
  >
    <iframe :src="provenanceEventUrl()" title="W3Schools Free Online Web Tutorials"></iframe>
  </el-dialog>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { GET_NFTS_LIST, GET_NFTS_DETAIL } from '@/store/modules/nfts/actions-type';
// import router from '@/router';
import Owner from '@/components/Share/GetOwner.vue';
import { ElMessage } from 'element-plus';
import * as dayjs from 'dayjs';

const defaultPagination = {
  itemPerPage: 25,
  totalRecord: 0,
  currentPage: 0,
};

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
    Owner,
  },
  data() {
    return {
      showDetails: false,
      showListing: true,
      data: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
      nftsDetailData: {
        productDisplayImage: '',
        serialNumber: '',
        productName: '',
        productLicense: '',
        productDescription: '',
        productBackground: '',
        productImages: '',
        productSeries: '',
        characterName: '',
        edition: '',
        productManufactureCountry: '',
        productManufactureDate: '',
        artists: [],
        metaData: '',
      },
      showProvenanceEvents: false,
    };
  },
  methods: {
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const nftsDetails = this.getNfts({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = nftsDetails.data;
      }, 1);
      this.pagination = nftsDetails.pagination;
    },
    error(m) {
      ElMessage.error({
        showClose: true,
        message: m,
      });
    },
    go(sn) {
      if (sn.length > 0) {
        window.open(`${process.env.VUE_APP_LOADING_API_DOMAIN}/productprovenance?id=${sn}`, '_blank');
      }
    },
    viewRelation(productId) {
      if (productId.length > 0) {
        window.open(`${process.env.VUE_APP_LOADING_API_DOMAIN}/productlibrary?id=${productId}`, '_blank');
      }
    },
    getDetails(sn) {
      this.showDetails = true;
      this.showListing = false;
      this.GET_NFTS_DETAIL(sn);
    },
    checkStatus(status) {
      // console.log(status);
      let result = 'NFT MINTED';
      if (status === 'Pending') {
        result = 'NFT MINTING IN PROGRESS';
      }
      return result;
    },
    getSerialNumber(nftsDetail) {
      return nftsDetail.serialNumber ? nftsDetail.serialNumber : '-';
    },
    getLicensor(nftsDetail) {
      return nftsDetail.productSerialNumber.product.character ? nftsDetail.productSerialNumber.product.character.license.licenseName : '-';
    },
    getCharacter(nftsDetail) {
      console.log(nftsDetail);
      // return nftsDetail.productSerialNumbers[0].product.character ? nftsDetail.productSerialNumbers[0].product.character.characterName : '-';
    },
    getDate(manufactureDate) {
      const dt = new Date(manufactureDate);
      return dayjs(dt).format('DD/MM/YYYY');
    },
    goToList() {
      this.showDetails = false;
      this.showListing = true;
    },
    provenanceEventUrl() {
      return `${process.env.VUE_APP_LOADING_API_DOMAIN}/provenanceevent?id=${this.nftsDetailData.serialNumber}`;
    },
    ...mapActions('nfts', [GET_NFTS_LIST, GET_NFTS_DETAIL]),
    ...mapActions('artist', [GET_ARTIST_LIST]),
  },
  computed: {
    ...mapState('nfts', ['nftsList', 'nftsDetail']),
    ...mapGetters('nfts', ['getNfts']),
    ...mapState('artist', ['artistList']),
  },
  mounted() {
    this.GET_NFTS_LIST(this.$route.params.id);
    this.GET_ARTIST_LIST(false);
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
  },
  watch: {
    nftsList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const nftsList = this.getNfts({
        ...this.pagination,
      });
      this.data = nftsList.data;
      this.pagination = nftsList.pagination;
      console.log(this.data);
    },
    nftsDetail() {
      this.nftsDetailData.productId = this.nftsDetail.productId;
      this.nftsDetailData.productDisplayImage = this.nftsDetail.productDisplayImage;
      this.nftsDetailData.serialNumber = this.nftsDetail.serialNumber;
      this.nftsDetailData.productName = this.nftsDetail.productName;
      this.nftsDetailData.productDescription = this.nftsDetail.productDescription;
      this.nftsDetailData.productBackground = this.nftsDetail.productBackground;
      this.nftsDetailData.productSeries = this.nftsDetail.productSeries;
      this.nftsDetailData.productLicense = this.nftsDetail.productLicense;
      this.nftsDetailData.character = this.nftsDetail.character;
      this.nftsDetailData.edition = this.nftsDetail.edition;
      this.nftsDetailData.productManufactureCountry = this.nftsDetail.productManufactureCountry;
      this.nftsDetailData.productManufactureDate = this.nftsDetail.productManufactureDate;
      this.nftsDetailData.metaData = this.nftsDetail.metaData;
      this.nftsDetailData.artists = this.artistList.filter((f) => this.nftsDetail.artistIds.includes(f.artistId));
      this.nftsDetailData.productImages = this.nftsDetail.productImages;
    },
  },
};
</script>
<style lang="scss" scoped>
  .dropbox {
    // outline: 2px dashed grey;
    outline: 2px solid grey;
    // outline-offset: -10px;
    /* background: lightcyan; */
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    // width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  // .dropbox:hover {
  //   background: lightblue;
  // }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .font-text {
    font-family: 'gotham';
  }

  .provenance-event-dialog {
    iframe {
      border: unset !important;
      height: 80vh;
      width: 100%;
      padding-top: 25px;
    }
  }
</style>

<style scoped>
  .el-pagination button:disabled {
      background-color: #d5d5d5 !important;
      color: #2a2a2a !important;
      font-size: 18px !important;
  }
  .el-pager li.active {
      color: #d5d5d5 !important;
      cursor: default;
  }
  .bg {
    background-color:WHITE !important;
  }
  .checkbox {
    position:absolute !important;
    right: 10px !important;
    top: 8px;
  }
  .el-card {
    position: relative !important;
  }
</style>

<style lang="scss" scoped>
  /* progress bar */
  $color: #fff;
  $serial: "SN Uploaded: 0";
  .bg {
    background-color: $color;
  }
  .el{
    color: $color;
    width: 100%;
    height: 20px;
    text-align: center;
    padding: 5px;
    &:after {
      // content: $serial;
      padding: 2px;
      display: block;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
    }
  }
</style>
