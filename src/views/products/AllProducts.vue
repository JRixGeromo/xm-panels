<template>
  <!-- <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
    <el-breadcrumb-item>
      Product Listing
    </el-breadcrumb-item>
  </el-breadcrumb> -->
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
        <!-- <el-menu-item index="5-2" class="mf-size">item two</el-menu-item>
        <el-menu-item index="5-3" class="mf-size">item three</el-menu-item> -->

      </el-submenu>
    </el-menu>
  </el-affix>
  <el-button class="custom-btn add-btn" @click="$router.push(`/create/product`)">Add New Product</el-button>
  <el-pagination
    class="table-pagination"
    layout="prev, pager, next"
    :total="pagination.totalRecord"
    :page-size="pagination.itemPerPage"
    @current-change="paginationCallback"
    :current-page="pagination.currentPage + 1"
  >
  </el-pagination>
  <!-- <el-table :data="data" v-loading="gettingProductList" stripe :header-cell-style="{ background: '#373737' }">
    <el-table-column
      prop="productName"
      label="Display Name"
      align="left"
      width="auto"
      :min-width="120"
    >
      <template v-slot:default="slotProps">
        {{ slotProps.row.productName ?? '-' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="lastName"
      label="Last Name"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column
      prop="firstName"
      label="First Name"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column
      prop="emailAddress"
      label="Email"
      align="left"
      width="auto"
    >
    </el-table-column>
    <el-table-column label="Role" align="center">
      <template v-slot:default="slotProps">
        <ProductRole :productId="slotProps.row.productId" />
      </template>
    </el-table-column>
    <el-table-column label="Edit Role" align="center">
      <template #default="scope">
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditRoleDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="Edit Password" align="center">
      <template #default="scope">
        <el-button size="mini" icon="el-icon-edit" class="edit-icon" @click="handleEditPasswordDialog(scope.row)"
          ></el-button>
      </template>
    </el-table-column>
  </el-table> -->
  <!-- <el-table :data="data" v-loading="gettingProductList" stripe :header-cell-style="{ background: '#373737' }"> -->
  <el-row>
    <!-- <el-col :span="24" v-for="(o, index) in data" :key="o" :offset="index > 0 ? 2 : 0"> -->
    <el-col :span="6" v-for="(each) in data" :key="each">
    <!-- <el-col :span="8" :data="data" v-loading="gettingProductList"> -->
      <!-- <div :style="{ padding: '5px' }" @click="$router.push(`/productprofile/${o.productId}`)"> -->
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
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';

// import EditPasswordForm from '@/components/Product/EditPasswordForm.vue';
// import EditRoleForm from '@/components/Product/EditRoleForm.vue';
// import ProductRole from '@/components/Access/ProductRole.vue';
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
    ...mapGetters('product', ['getProducts']),
  },
  mounted() {
    this.GET_PRODUCT_LIST();
    this.GET_LICENSOR_LIST();
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
    // licensorList() {
    //   this.sortLicensors();
    // },
  },
  methods: {
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
    // sortLicensors() {
    //   this.SORT_LICENSORS_BY_QTY();
    // },
  },
  data() {
    return {
      page: 0,
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
