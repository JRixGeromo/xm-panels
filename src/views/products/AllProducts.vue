<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18"><label class="search" for="searchProducts">Search Products</label>
          <el-input
            placeholder="Type something to start searching..."
            v-model="searchKeyword"
            @input="searchOnChange"
            class="search-padding"
            >
            <template #prefix>
              <i class="el-input__icon el-icon-search search-margin"></i>
            </template>
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
  <el-container style="justify-content: center;">
  <el-affix style="margin: 20px 0;">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="-1" class="mf-size" @click="filterProduct('')">All Products</el-menu-item>
      <el-menu-item
      v-for="license in licensorList.slice(0, 3)"
      v-bind:key="license.licenseId"
      v-bind:index="license.licenseId"
      @click="filterProduct(license.licenseId)"
      class="mf-size"
      >{{ license.licenseDescription }}</el-menu-item>
      <el-submenu index="5">
        <template #title>
          <span class="mf-size">Others</span></template>
        <el-menu-item
        v-for="license in licensorList.slice(4)"
        v-bind:key="license.licenseId"
        v-bind:index="license.licenseId"
        @click="filterProduct(license.licenseId)"
        class="mf-size"
        >{{ license.licenseDescription }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-affix>
  </el-container>
  <el-container style="justify-content: center;" class="this-font">
    <el-menu
      :default-active="activeIndexSub"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" class="mf-size" @click="products()">PRODUCTS</el-menu-item>
      <el-menu-item index="1" class="mf-size" @click="approvals()">APPROVALS</el-menu-item>
      <el-menu-item index="2" class="mf-size" @click="archives()">ARCHIVES</el-menu-item>
    </el-menu>
  </el-container>
  <el-button class="custom-btn add-btn" @click="$router.push(`/create/product`)">Add New Product</el-button>
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
    <el-col :span="6" v-for="(each) in data" :key="each">
      <div :style="{ padding: '5px' }" @click="$router.push({ path:`/product/${each.productId}/details`, query: { name: `${each.productName}` }})">
      <el-card :body-style="{ padding: '0px' }">
        <div class="portrait">
          <img :src="each.productDisplayImage">
        </div>
        <div style="padding: 14px;">
          <span style="font-size:22px">{{ each.productName }}</span>
          <div class="bottom" style="padding-top:10px; font-size:18px">
            <span>{{ each.productName }}</span>
          </div>
        </div>
      </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row v-else-if="show=='approvals'">
    <el-col :span="24">
      <!-- <el-col :span="24">
        <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        >
      </el-pagination>
      </el-col> -->
      <el-container v-for="(each) in autographApprovals" :key="each" style="border:1px solid #F9F9F9; margin:20px">
        <el-col :span="8" class="wrapper">
          <div style="margin:20px 0px 20px 20px; float: left; width:70%">
            <div class="portrait">
              <img :src="each.productInfo.productDisplayImage">
            </div>
          </div>
          <div style="float: left; width:10%">
            <div style="position: absolute;
              top: 20px;
              margin-left: 20px">
             {{ getSerialNumber(each) }}<br>
             {{ 'artist' }}
            </div>
            <div style="position: absolute;
              bottom: 20px;
              margin-left: 20px;">
              {{ each.productInfo.productName }}<br>
              {{ getLicensor(each) }}<br>
              {{ getCharacter(each) }}
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner">
            Date: {{ getDate(each) }} <br>
            Autograph Approval: {{each.productAutographStatus}}
          </div>
        </el-col>
        <el-col :span="8" class="wrapper">
          <div class="inner">
          <button
          class="el-button el-button--default custom-btn"
          type="button"><span>VIEW SUBSCRIPTION</span>
          </button>
          </div>
        </el-col>
      </el-container>
    </el-col>
  </el-row>
  <el-row v-else-if="show=='archives'">
    <el-container v-for="(each) in autographArchives" :key="each" class="portrait">
      <el-col :span="8">
        <button
        class="el-button el-button--default custom-btn"
        type="button"><span>VIEW SUBSCRIPTION</span>
        </button>
      </el-col>
      <el-col :span="8">
        <button
        class="el-button el-button--default custom-btn"
        type="button"><span>VIEW SUBSCRIPTION</span>
        </button>
      </el-col>
      <el-col :span="8">
        <button
        class="el-button el-button--default custom-btn"
        type="button"><span>VIEW SUBSCRIPTION</span>
        </button>
      </el-col>
    </el-container>
  </el-row>
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
import { GET_AUTOGRAPH_APPROVALS_LIST, GET_AUTOGRAPH_ARCHIVES_LIST } from '@/store/modules/autograph/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';

// import { getAuthID } from '@/helpers';

const defaultPagination = {
  itemPerPage: 10,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'ProductListing',
  computed: {
    ...mapState('product', ['productList', 'gettingProductList', 'updatingProduct']),
    ...mapState('licensor', ['licensorList', 'gettingLicensorList']),
    ...mapState('autograph', ['gettingAutographApprovalsList', 'gettingAutographArchivesList', 'autographApprovalsList', 'autographArchivesList']),
    ...mapGetters('product', ['getProducts']),
  },
  mounted() {
    this.GET_PRODUCT_LIST();
    this.GET_LICENSOR_LIST();
    this.GET_AUTOGRAPH_APPROVALS_LIST();
    this.GET_AUTOGRAPH_ARCHIVES_LIST();
    console.log();
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
      this.pagination = productList.pagination;
      this.products();
    },
    autographArchivesList() {
      this.autographArchives = this.autographArchivesList;
    },
    autographApprovalsList() {
      this.autographApprovals = this.autographApprovalsList;
    },
  },
  methods: {
    filterProduct(licenseId, filterBy) {
      this.FILTER_PRODUCT_IN_LIST(licenseId, filterBy);
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
    ...mapActions('autograph', [GET_AUTOGRAPH_APPROVALS_LIST, GET_AUTOGRAPH_ARCHIVES_LIST]),
    // ...mapMutations('product', [RESET_PRODUCT_STATE]),
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
      return each.productInfo.productSerialNumbers ? each.productInfo.productSerialNumbers[0].serialNumber : '-';
    },
    getLicensor(each) {
      return each.productInfo.character ? each.productInfo.character.license.licenseName : '-';
    },
    getCharacter(each) {
      return each.productInfo.character ? each.productInfo.character.characterName : '-';
    },
    getDate(each) {
      const dt = new Date(each.autographDate);
      const d = dt.getDate().toString().concat('/');
      const m = (dt.getMonth() + 1).toString().concat('/');
      const y = dt.getFullYear().toString();
      return each.autographDate ? d + m + y : '-';
    },
  },
  data() {
    return {
      page: 0,
      show: 'products',
      autographApprovals: [],
      autographArchives: [],
      data: [],
      rawData: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
      editPasswordDialog: false,
      editRoleDialog: false,
      productInfo: {
        productId: '',
        productName: '',
      },
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
    };
  },
  components: {
    // EditPasswordForm,
    // ProductRole,
    // EditRoleForm,
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
// .landscape {
//     height: 30px;
//     width: 80px;
// }

// .square {
//     height: 75px;
//     width: 75px;
// }
</style>
