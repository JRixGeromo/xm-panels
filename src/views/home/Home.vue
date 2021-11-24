<template>
  <div>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item>Home</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col :span="24">
        <span class="welcome">WELCOME, ADMIN.</span>
        <div class="dashboard-panel">
          <el-row>
            <el-col :span="24">
              <span class="ds-title">OVERVIEW</span>
            </el-col>
            <el-col :span="5" :xs="24" :sm="10" :md="5" style="padding-top: 20px">
              <div style="float: left; witdh: 30%; margin-right: 10px"><i class="xm-el-icon-s-customer ds-icons" style="width: 50px"></i></div>
              <div style="float: left; witdh: 70%">
                <span class="ds-label" style="font-size: 30px">{{dsCharacters.totalCount}}</span><br><span class="ds-label">CHARACTERS</span></div>
            </el-col>
            <el-col :span="5" :xs="24" :sm="10" :md="5" style="padding-top: 20px">
              <div style="float: left; witdh: 30%; margin-right: 10px"><i class="xm-el-icon-s-nft ds-icons" style="width: 50px"></i></div>
              <div style="float: left; witdh: 70%">
                <span class="ds-label" style="font-size: 30px">{{dsNft.totalCount}}</span><br><span class="ds-label">NFT GENERATED</span></div>
            </el-col>
            <el-col :span="5" :xs="24" :sm="10" :md="5" style="padding-top: 20px">
              <div style="float: left; witdh: 30%; margin-right: 10px"><i class="xm-el-icon-s-customer ds-icons" style="width: 50px"></i></div>
              <div style="float: left; witdh: 70%">
                <span class="ds-label" style="font-size: 30px">{{dsCustomers.totalCount}}</span><br><span class="ds-label">CUSTOMERS</span></div>
            </el-col>
            <el-col :span="5" :xs="24" :sm="10" :md="5" style="padding-top: 20px">
              <div style="float: left; witdh: 30%; margin-right: 10px"><i class="xm-el-icon-s-artist ds-icons" style="width: 50px"></i></div>
              <div style="float: left; witdh: 70%">
                <span class="ds-label" style="font-size: 30px">{{dsArtists.totalCount}}</span><br><span class="ds-label">ARTISTS</span></div>
            </el-col>
            <el-col :span="4" :xs="24" :sm="8" :md="4" style="padding-top: 20px">
              <div style="float: left; witdh: 30%; margin-right: 10px"><i class="xm-el-icon-s-licensor ds-icons" style="width: 50px"></i></div>
              <div style="float: left; witdh: 70%">
                <span class="ds-label" style="font-size: 30px">{{dsLicensors.totalCount}}</span><br><span class="ds-label">LICENSORS</span></div>
            </el-col>
          </el-row>
        </div>

        <div class="dashboard-panel">
          <el-row>
          <el-col :span="24">
              <span class="ds-title">RECENT</span>
          </el-col>
          </el-row>
          <el-row v-for="(each) in recentProduct" :key="each.productId">
            <!-- <el-col :span="2" :xs="24" :sm="2" :md="2"> -->
            <el-col :span="1" :xs="24" :sm="1" :md="1">
              <div style="margin-bottom: 30px; margin-top: 30px">
              <!-- TEXT HERE -->
              </div>
            </el-col>
            <el-col :span="8" :xs="24" :sm="8" :md="8">
              <div style="margin-bottom: 30px; margin-top: 30px">
              <el-row>
                <el-col :span="24" style="min-height: 200px; position: relative;">
                  <div style="float: left; width:50%;">
                    <div class="portrait" style="float: right; margin-right: 10px">
                      <img :src="each.productDisplayImage">
                    </div>
                  </div>
                  <div style="float: left; width:50%">
                    <div class="listing-top normal-text" style="width: 100%;">
                      Created On {{ getDate(each) }}
                    </div>
                    <div class="listing-bottom normal-text" style="width: 100%;">
                      {{ each.productName }}<br>
                      {{ getLicensor(each) }}<br>
                      {{ getCharacter(each) }}
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
            </el-col>
            <el-col :span="14" :xs="24" :sm="14" :md="14">
              <div style="margin-bottom: 30px; margin-top: 30px">
              <ProductProgress
                :recentProd="each"
              />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState /* , mapGetters , mapMutations */ } from 'vuex';
import {
  GET_DS_CUSTOMERS,
  GET_DS_ARTISTS,
  GET_DS_CHARACTERS,
  GET_DS_LICENSORS,
  GET_DS_NFT,
  GET_DS_RECENT_PRODUCT,
} from '@/store/modules/dashboard/actions-type';
import ProductProgress from '@/components/Share/ProductProgress.vue';
import * as dayjs from 'dayjs';

export default {
  name: 'Home',
  computed: {
    ...mapState('dashboard', ['dsArtists', 'dsCustomers', 'dsCharacters', 'dsLicensors', 'dsNft', 'dsRecentProduct']),
  },

  mounted() {
    this.GET_DS_CUSTOMERS();
    this.GET_DS_ARTISTS();
    this.GET_DS_CHARACTERS();
    this.GET_DS_LICENSORS();
    this.GET_DS_NFT();
    this.GET_DS_RECENT_PRODUCT();
  },
  beforeUnmount() {
  },
  watch: {
    dsRecentProduct() {
      this.recentProduct = this.dsRecentProduct;
    },
  },
  methods: {
    ...mapActions('dashboard', [GET_DS_CUSTOMERS, GET_DS_ARTISTS, GET_DS_CHARACTERS, GET_DS_LICENSORS, GET_DS_NFT, GET_DS_RECENT_PRODUCT]),
    getDate(each) {
      const dt = new Date(each.productCreatedDate);
      return dayjs(dt).format('DD/MM/YYYY');
    },
    getLicensor(each) {
      return each.character ? each.character.license.licenseName : '-';
    },
    getCharacter(each) {
      return each.character ? each.character.characterName : '-';
    },
  },
  data() {
    return {
      // dsCustomers: [],
      // dsArtists: [],
      // dsCharacters: [],
      // dsLicensors: [],
      // dsNft: [],
      recentProduct: [],
    };
  },
  components: {
    ProductProgress,
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
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.portrait {
  height: 200px;
  width: 150px;
}

a {
  text-decoration: unset;
}
</style>
