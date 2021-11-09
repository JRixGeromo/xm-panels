<template>
  <el-container class="bg-portion el-container-search">
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="18">
          <label class="search" for="searchNfts">Search Nfts</label>
          <el-input
            v-model="searchKeyword"
            @input="searchOnChange"
            suffix-icon="el-icon-search"
            >
          </el-input>
        </el-col>
        <el-col :span="6">
          <label class="sort" for="searchNfts">Sort By</label>
          <el-select v-model="value" placeholder="Select" @change="sortNfts">
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
  <el-row>
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
      <router-link :to="`/managenfts/${each.productId}`">
        <div :style="{ padding: '5px' }">
          <el-card :body-style="{ padding: '0px' }">
            <div class="portrait">
              <img :src="each.productDisplayImage">
            </div>
            <div style="text-align: left;">
              <div>{{ each.productName }}</div>
              <div>{{ each.productlicense }}</div>
              <div>{{ each.productSeries }}</div>
            </div>
            <div style="padding-bottom: 10px; text-align: right; font-weight: bold">
              <div>{{ each.totalNFT }} NFTS</div>
            </div>
          </el-card>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import { GET_NFTS_PRODUCTS_LIST, SEARCH_NFTS_IN_LIST, SORT_NFTS_PRODUCTS } from '@/store/modules/nfts/actions-type';
import { mapActions, mapState, mapGetters /* , mapMutations */ } from 'vuex';
import * as dayjs from 'dayjs';

const defaultPagination = {
  itemPerPage: 8,
  totalRecord: 0,
  currentPage: 0,
};

export default {
  name: 'NftsProductsListing',
  computed: {
    ...mapState('nfts', ['nftsProductsList', 'gettingNftsProductsList']),
    ...mapGetters('nfts', ['getNftsProducts']),
  },
  mounted() {
    this.GET_NFTS_PRODUCTS_LIST();
  },
  beforeUnmount() {
    clearTimeout(this.paginationTimeout);
  },
  watch: {
    nftsProductsList() {
      if (this.searchKeyword) {
        this.pagination = {
          ...this.pagination,
          currentPage: 0,
        };
      }
      const nftsProductsList = this.getNftsProducts({
        ...this.pagination,
      });
      this.data = nftsProductsList.data;
      this.pagination = nftsProductsList.pagination;
    },
  },
  methods: {
    getStatus(each) {
      let status = 'Requested';
      if (each.nftsAutographStatus !== 'Pending') {
        status = each.nftsAutographStatus;
      }
      return status;
    },
    ...mapActions('nfts', [GET_NFTS_PRODUCTS_LIST, SEARCH_NFTS_IN_LIST, SORT_NFTS_PRODUCTS]),
    paginationCallback(page) {
      const newPagination = {
        ...this.pagination,
        currentPage: page - 1,
      };
      const nftsProductsList = this.getNftsProducts({
        ...newPagination,
      });
      this.data = [];
      this.paginationTimeout = setTimeout(() => {
        this.data = nftsProductsList.data;
      }, 1);
      this.pagination = nftsProductsList.pagination;
    },
    searchOnChange() {
      this.SEARCH_NFTS_IN_LIST(this.searchKeyword);
    },
    sortNfts() {
      this.SORT_NFTS_PRODUCTS(this.value);
    },
    getSerialNumber(each) {
      return each.nftsSerialNumber.serialNumber ? each.nftsSerialNumber.serialNumber : '-';
    },
    getLicensor(each) {
      return each.nftsSerialNumber.nfts.character ? each.nftsSerialNumber.nfts.character.license.licenseName : '-';
    },
    getCharacter(each) {
      return each.nftsSerialNumber.nfts.character ? each.nftsSerialNumber.nfts.character.characterName : '-';
    },
    getDate(each) {
      const dt = new Date(each.autographDate);
      return dayjs(dt).format('DD/MM/YYYY');
    },
  },
  data() {
    return {
      page: 0,
      show: 'nfts',
      focused: [],
      data: [],
      rawData: [],
      pagination: defaultPagination,
      paginationTimeout: null,
      searchKeyword: '',
      editPasswordDialog: false,
      editRoleDialog: false,
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
