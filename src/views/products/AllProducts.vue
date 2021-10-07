<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchProducts">Search Products</label>
          <el-input
            v-model="searchKeyword"
            @input="searchOnChange"
            suffix-icon="el-icon-search"
            >
          </el-input>
        </el-col>
        <el-col :span="6">
          <label class="sort" for="searchProducts">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortProducts">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-container>
  <el-affix style="margin: 20px 0;">
    <el-menu
      :default-active="`0`"
      class="el-menu-category"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#ffffff91"
    >

      <el-menu-item index="0" class="mf-size" @click="filterProduct('')">All Products</el-menu-item>
      <el-menu-item
        v-for="license in licensorList.slice(0, 3)"
        v-bind:key="license.licenseId"
        v-bind:index="license.licenseId"
        @click="filterProduct(license.licenseId)"
        class="mf-size"
      >
        {{ license.licenseName }}
      </el-menu-item>
      <el-submenu index="5" popper-class="category-submenu" v-if="licensorList.length > 3">
        <template #title>
          <span class="mf-size">Others</span></template>
          <el-scrollbar height="300px">
            <el-menu-item
              v-for="license in licensorList.slice(4)"
              v-bind:key="license.licenseId"
              v-bind:index="license.licenseId"
              @click="filterProduct(license.licenseId)"
              class="mf-size"
            >
              {{ license.licenseName }}
            </el-menu-item>
          </el-scrollbar>
      </el-submenu>
    </el-menu>
  </el-affix>
  <el-menu
    :default-active="`0`"
    class="el-menu-category sub-menu-product"
    mode="horizontal"
    text-color="#fff"
    active-text-color="#ffffff91">
    <el-menu-item index="0" class="mf-size" @click="products()">PRODUCTS</el-menu-item>
    <el-menu-item index="1" class="mf-size" @click="approvals()">APPROVALS</el-menu-item>
    <el-menu-item index="2" class="mf-size" @click="archives()">ARCHIVES</el-menu-item>
  </el-menu>
  <el-button class="custom-btn add-btn" v-if="show === 'products'" @click="$router.push(`/create/product`)">Add New Product</el-button>
<el-row v-if="show=='products'">
    <el-col :span="24" style="margin-bottom: 15px">
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
    <el-col :xs="24" :md="6" v-for="(each) in data" :key="each">
      <router-link :to="`/product/${each.productId}/details?name=${each.productName}`">
        <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <div class="portrait">
              <img :src="each.productDisplayImage">
            </div>
            <div style="padding: 10px 0; text-align: left;">
              <div>{{ each.productName }}</div>
              <div>{{ each.character.license.licenseName }}</div>
              <div>{{ each.productSeries }}</div>
            </div>
          </el-card>
        </div>
      </router-link>
    </el-col>
  </el-row>
  <el-row v-else-if="show=='approvals'">
    <el-col :span="24">
      <el-container v-for="(each) in autographApprovals" :key="each" style="border:1px solid #F9F9F9; margin:20px">
        <el-col :span="8" class="wrapper">
          <div style="margin:20px 0px 20px 20px; float: left; width:70%">
            <div class="portrait">
              <img :src="each.productSerialNumber.product.productDisplayImage">
            </div>
          </div>
          <div style="float: left; width:10%">
            <div class="listing-top highlight-text">
             {{ getSerialNumber(each) }}<br>
             {{ getArtist(each) }}
            </div>
            <div class="listing-bottom normal-text">
              {{ each.productSerialNumber.product.productName }}<br>
              {{ getLicensor(each) }}<br>
              {{ getCharacter(each) }}
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner normal-text">
            Date: {{ getDate(each) }} <br>
            Autograph Approval: <span
            v-bind:class="{ 'approved': each.productAutographStatus==='Approved',
            'rejected': each.productAutographStatus==='Rejected' }">{{ getStatus(each) }}</span>
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner">
          <el-button
            class="custom-btn black-custom-btn"
            @click="viewSubscription(each)"><span>VIEW SUBMISSION</span>
          </el-button>
          </div>
        </el-col>
      </el-container>
    </el-col>
  </el-row>
  <el-row v-else-if="show=='archives'">
    <el-col :span="24">
      <el-container v-for="(each) in autographArchives" :key="each" style="border:1px solid #F9F9F9; margin:20px">
        <el-col :span="8" class="wrapper">
          <div style="margin:20px 0px 20px 20px; float: left; width:70%">
            <div class="portrait">
              <img :src="each.productSerialNumber.product.productDisplayImage">
            </div>
          </div>
          <div style="float: left; width:10%">
            <div class="listing-top highlight-text">
             {{ getSerialNumber(each) }}<br>
             {{ getArtist(each) }}
            </div>
            <div class="listing-bottom normal-text">
              {{ each.productSerialNumber.product.productName }}<br>
              {{ getLicensor(each) }}<br>
              {{ getCharacter(each) }}
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner normal-text">
            Date: {{ getDate(each) }} <br>
            Autograph Approval: <span
            v-bind:class="{ 'approved': each.productAutographStatus==='Approved',
            'rejected': each.productAutographStatus==='Rejected' }">{{each.productAutographStatus}}</span>
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner">
          <el-button
            class="custom-btn black-custom-btn"
            @click="viewSubscription(each)"><span>VIEW SUBMISSION</span>
          </el-button>
          </div>
        </el-col>
      </el-container>
    </el-col>
  </el-row>
  <el-dialog
    :title="title"
    center
    custom-class="custom-dialog"
    fullscreen
    v-model="viewSubscriptionDialog"
    :destroy-on-close="true"
  >
  <el-form-item>
  <el-row>
    <el-col :span="8" :offset="3" style="text-align: right; padding: 20px">
      <span class="dialog-label">Artist Name</span><span class="dialog-content">
        {{ artistName }}
        </span>
      <span class="dialog-label">Name OF Event</span><span class="dialog-content">{{ productAutograph.eventName }}</span>
    </el-col>
    <el-col :span="8" :offset="1" style="padding: 20px">
      <span class="dialog-label">Date of Autograph</span><span class="dialog-content">{{ getDate(productAutograph) }}</span>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
      <label><span class="dialog-label">Uploaded Autograph</span></label>
      <img :src="productAutograph.productAutographUrl">
    </el-col>
    <el-col :span="8" :offset="1" style="padding: 23px">
      <label><span  class="dialog-label">Uploaded Image/Video Proof</span>
      <span class="dialog-content">For verification purposes, photo or video proof of the artist signing the autograph is required.</span></label>
      <DesignContainer
        :designDetails="productAutograph"
      />
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="15" :offset="4" style="text-align: center; margin-top: 10px;">
      <TextInput
        v-model="productAutographForm.remark"
        formProps="remark"
        formLabel="REMARK"
        :disabled="isEditable(productAutograph.productAutographStatus)"
      />
    </el-col>
  </el-row>
  </el-form-item>
  <el-form-item>
    <el-row>
      <el-col :span="8" :offset="3" style="text-align: right; padding: 23px">
        <el-button
          class="custom-btn discard-btn" @click="changeStatus('reject')"
          :disabled="isEditable(productAutograph.productAutographStatus)">REJECT</el-button>
      </el-col>
      <el-col :span="8" :offset="1" style="padding: 23px">
        <el-button  class="custom-btn submit-btn"
          @click="changeStatus('approve')" :disabled="isEditable(productAutograph.productAutographStatus)">
          APPROVE
        </el-button>
      </el-col>
    </el-row>
    </el-form-item>
  </el-dialog>
</template>

<script>
import {
  GET_PRODUCT_LIST,
  UPDATE_PRODUCT,
  SEARCH_PRODUCT_IN_LIST,
  SORT_PRODUCTS,
  FILTER_PRODUCT_IN_LIST,
} from '@/store/modules/product/actions-type';
import { SORT_LICENSORS_BY_QTY, GET_LICENSOR_LIST } from '@/store/modules/licensor/actions-type';
import { GET_AUTOGRAPH_APPROVALS_LIST, GET_AUTOGRAPH_ARCHIVES_LIST, UPDATE_AUTOGRAPH_STATUS } from '@/store/modules/autograph/actions-type';
import { GET_ARTIST, GET_ARTIST_LIST } from '@/store/modules/artist/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';
import DesignContainer from '@/components/Share/DesignContainer.vue';
import TextInput from '@/components/Share/TextInput.vue';
import * as dayjs from 'dayjs';

const defaultPagination = {
  itemPerPage: 8,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'ProductListing',
  computed: {
    ...mapState('product', ['productList', 'gettingProductList', 'updatingProduct']),
    ...mapState('licensor', ['licensorList', 'gettingLicensorList']),
    ...mapState('autograph', ['gettingAutographApprovalsList', 'gettingAutographArchivesList', 'autographApprovalsList', 'autographArchivesList', 'updatingAutographStatus']),
    ...mapGetters('product', ['getProducts']),
    ...mapState('artist', ['artistProfile', 'artistList']),
  },
  mounted() {
    this.GET_PRODUCT_LIST();
    this.GET_LICENSOR_LIST();
    this.GET_AUTOGRAPH_APPROVALS_LIST();
    this.GET_AUTOGRAPH_ARCHIVES_LIST();
    this.GET_ARTIST_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
    // this.RESET_PRODUCT_STATE();
  },
  watch: {
    productList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const productList = this.getProducts({
        ...this.pagination,
      });
      this.data = productList.data;
      // console.log(this.data);
      this.pagination = productList.pagination;
    },
    autographArchivesList() {
      this.autographArchives = this.autographArchivesList;
    },
    autographApprovalsList() {
      this.autographApprovals = this.autographApprovalsList;
    },
    artistList() {
      this.artistInfo = this.artistList;
    },
  },
  methods: {
    async changeStatus(status) {
      this.productAutographForm.productAutographId = this.productAutograph.productAutographId;
      this.productAutographForm.productAutographStatus = status;
      this.viewSubscriptionDialog = false;
      await this.UPDATE_AUTOGRAPH_STATUS(this.productAutographForm);
      this.GET_AUTOGRAPH_APPROVALS_LIST();
      this.GET_AUTOGRAPH_ARCHIVES_LIST();
    },
    isEditable(status) {
      let result = true;
      if (status === '' || status === 'Pending') {
        result = false;
      } else if (status === 'Appproved' || status === 'Rejected') {
        result = true;
      }
      return result;
    },
    getStatus(each) {
      let status = 'Requested';
      if (each.productAutographStatus !== 'Pending') {
        status = each.productAutographStatus;
      }
      return status;
    },
    getArtist(each) {
      let artist = [];
      artist = this.artistInfo.filter((x) => x.artistId === each.autographArtistId);
      console.log(each);
      return artist[0].artistName;
    },
    viewSubscription(data) {
      this.artistName = this.getArtist(data);
      this.productAutograph = data;
      this.viewSubscriptionDialog = !this.viewSubscriptionDialog;
      if (data.productAutographStatus === 'Pending') {
        this.title = 'APPROVAL REQUESTED';
      } else {
        this.title = data.productAutographStatus;
      }
    },
    filterProduct(licenseId) {
      this.FILTER_PRODUCT_IN_LIST(licenseId);
    },
    licensorTopMenu() {
      let menu = '';
      if (this.licensorList.length > 0) {
        menu = this.licensorList[3].licenseDescription;
      }
      return menu;
    },
    ...mapActions('product', [GET_PRODUCT_LIST, UPDATE_PRODUCT, SEARCH_PRODUCT_IN_LIST, SORT_PRODUCTS, FILTER_PRODUCT_IN_LIST]),
    ...mapActions('licensor', [GET_LICENSOR_LIST, SORT_LICENSORS_BY_QTY]),
    ...mapActions('autograph', [GET_AUTOGRAPH_APPROVALS_LIST, GET_AUTOGRAPH_ARCHIVES_LIST, UPDATE_AUTOGRAPH_STATUS]),
    ...mapActions('artist', [GET_ARTIST, GET_ARTIST_LIST]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const productList = this.getProducts({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = productList.data;
      }, 1);
      this.pagination = productList.pagination;
    },
    searchOnChange() {
      this.SEARCH_PRODUCT_IN_LIST(this.searchKeyword);
    },
    sortProducts() {
      this.SORT_PRODUCTS(this.value);
    },
    products() {
      this.show = 'products';
    },
    approvals() {
      this.show = 'approvals';
      console.log(this.autographArchivesList);
    },
    archives() {
      this.show = 'archives';
    },
    getSerialNumber(each) {
      return each.productSerialNumber.serialNumber ? each.productSerialNumber.serialNumber : '-';
    },
    getLicensor(each) {
      return each.productSerialNumber.product.character ? each.productSerialNumber.product.character.license.licenseName : '-';
    },
    getCharacter(each) {
      return each.productSerialNumber.product.character ? each.productSerialNumber.product.character.characterName : '-';
    },
    getDate(each) {
      const dt = new Date(each.autographDate);
      return dayjs(dt).format('DD/MM/YYYY');
    },
  },
  data() {
    return {
      page: 0,
      show: 'products',
      focused: [],
      autographApprovals: [],
      autographArchives: [],
      viewSubscriptionDialog: false,
      data: [],
      rawData: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
      editPasswordDialog: false,
      editRoleDialog: false,
      productAutograph: [],
      productAutographForm: {
        productAutographId: '',
        productAutographStatus: '',
        remark: '',
      },
      artistInfo: null,
      artistName: '',
      options: [
        {
          value: 'newest',
          label: 'Newest',
        },
        {
          value: 'oldest',
          label: 'Oldest',
        },
      ],
      value: 'newest',
      title: '',
    };
  },
  components: {
    TextInput,
    DesignContainer,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.profile-pic-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pad-top {
  margin-top: 10px;
}
.image {
  width: 100%;
  height: 100%;
  border-radius: 0px;
}
.el-card {
  background-color: $--color-primary;
  color: #fff;
  border-radius: 0px;
  text-align: center;
  border: unset;
  cursor: pointer;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.portrait {
  height: 400px;
  width: 100%;
}

a {
  text-decoration: unset;
}
// .landscape {
//     height: 30px;
//     width: 80px;
// }

// .square {
//     height: 75px;
//     width: 75px;
// }
</style>
