<template>
  <el-form
    class="custom-form"
    label-position="top"
    label-width="100px"
  >
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row justify="space-between">
          <el-col :span="24" style="margin-top: 50px; margin-bottom: 50px">
            <div style="width: 100%; text-align:left">
              <span class="form-label">CUSTOMER DETAILS </span>
            </div>
          </el-col>
          <el-col :span="8" :offset="8" style="margin-top: 50px; margin-bottom: 20px">
            <div style="width: 100%; text-align:left">
              <div :style="{ padding: '5px' }">
                <el-card :body-style="{ padding: '0px' }" style="cursor: initial;">
                  <div class="portrait" v-loading="gettingCustomerDetails">
                    <img :src="customerDetails.customerDisplayPhotoFilePath" v-if="!gettingCustomerDetails" />
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col :span="9" :offset="2" style="text-align: right; padding: 20px">
            <span class="dialog-label">Name</span><span class="dialog-content">
              {{ customerDetails.customerName ?? 'Loading' }}
              </span>
            <span class="dialog-label">Wallet number</span><span class="dialog-content">
              {{ customerDetails.customerWalletPublicAddress ?? "-" }}
            </span>
          </el-col>
          <el-col :span="11" :offset="2" style="padding: 20px">
            <span class="dialog-label">Date Joined</span><span class="dialog-content">
              {{ customerDetails.customerCreatedDate ? getDate(customerDetails.customerCreatedDate) : 'Loading' }}
              </span>
            <span class="dialog-label">Country</span><span class="dialog-content">
              {{ customerDetails.customerCountry ?? '-'}}
            </span>
          </el-col>
        </el-row>
        <el-collapse>
          <el-collapse-item title="RECENT PURCHASES (PAST 12 MONTHS)" name="1"  class="dialog-content">
            <el-scrollbar height="600px" v-if="customerProductsRecentPurchase.length > 0">
              <el-row justify="space-between">
                <el-col :span="12" class="wrapper" v-for="(each) in customerProductsRecentPurchase" :key="each">
                  <CustomerPurchase :purchaseDetails="each" />

                  <!-- <div style="margin:20px 0px 20px 20px; float: left; width:55%; display: block">
                    <div class="portrait">
                      <GetImage :productId="each.productId" />
                    </div>
                  </div>
                  <div style="float: left; width:15%">
                    <div class="listing-top highlight-text">
                    INVOICE# {{ each.invoiceNo }}<br>
                    ${{ each.price }}<br>
                    <span class="normal-text"
                    style="font-weight:100; font-family: 'Helvetica Neue' !important;">Purchased On: {{ getDate(each.invoiceDate) }} </span>
                    </div>
                    <div class="listing-bottom normal-text">
                      <GetOtherProductInfo :productId="each.productId" />
                    </div>
                  </div> -->
                </el-col>
              </el-row>
            </el-scrollbar>
            <el-row v-else>
              <el-col :span="24">
                <div>No Records</div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="PRODUCT OWNED" name="2"  class="dialog-content">
            <el-row v-if="customerProductsOwned.length > 0">
              <el-col :span="6" class="wrapper" v-for="(each) in customerProductsOwned" :key="each">
                <div style="margin:20px 20px 20px 20px; float: left; width:90%; display: block; cursor: pointer;"  @click="go(each.serialNumber)">
                  <div class="highlight-text">
                    {{ each.serialNumber }}
                  </div>
                  <div class="portrait">
                    <img
                      class="image"
                      :src="each.product.productDisplayImage"
                    />
                  </div>
                  <div class="highlight-text">
                  <span class="normal-text"
                    style="font-weight:100; font-family: 'Helvetica Neue' !important;">
                    <GetOtherProductInfo :productId="each.productId" />
                  </span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="24">
                <div>No Records</div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="PRODUCTS WITH OWNERSHIP TRANSFERRED" name="3"  class="dialog-content">
            <el-row v-if="customerProductsTransferred.length > 0">
              <el-col :span="6" class="wrapper" v-for="(each) in customerProductsTransferred" :key="each">
                <div style="margin:20px 20px 20px 20px; float: left; width:90%; display: block; cursor: pointer;"  @click="go(each.serialNumber)">
                  <div class="highlight-text">
                    {{ each.serialNumber }}
                  </div>
                  <div class="portrait">
                    <img
                      class="image"
                      :src="each.product.productDisplayImage"
                    />
                  </div>
                 <div class="highlight-text">
                  <span class="normal-text"
                  style="font-weight:100; font-family: 'Helvetica Neue' !important;">
                    <GetOtherProductInfo :productId="each.productId" />
                  </span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="24">
                <div>No Records</div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="PURCHASE HISTORY" name="4"  class="dialog-content">
            <el-scrollbar height="600px" v-if="customerProductsPurchaseHistories.length > 0">
              <el-row justify="space-between">
                <el-col :span="12" class="wrapper" v-for="(each) in customerProductsPurchaseHistories" :key="each">
                  <CustomerPurchase :purchaseDetails="each" />
                  <!-- <div style="margin:20px 0px 20px 20px; float: left; width:55%; display: block">
                    <div class="portrait">
                      <GetImage :productId="each.productId" />
                    </div>
                  </div>
                  <div style="float: left; width:15%">
                    <div class="listing-top highlight-text highlight-text-size">
                    INVOICE# {{ each.invoiceNo }}<br>
                    ${{ each.price }}<br>
                    <span class="normal-text"
                    style="font-weight:100; font-family: 'Helvetica Neue' !important;">Purchased On: {{ getDate(each.invoiceDate) }} </span>
                    </div>
                    <div class="listing-bottom normal-text">
                      <GetOtherProductInfo :productId="each.productId" />
                    </div>
                  </div> -->
                </el-col>
              </el-row>
            </el-scrollbar>
            <el-row v-else>
              <el-col :span="24">
                <div>No Records</div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// import GetImage from '@/components/Share/GetImage.vue';
import GetOtherProductInfo from '@/components/Share/GetOtherProductInfo.vue';
import CustomerPurchase from '@/components/Customers/CustomerPurchase.vue';
import * as dayjs from 'dayjs';
import {
  GET_CUSTOMER,
  GET_CUSTOMER_PRODUCT_RECENT_PURCHASE,
  GET_CUSTOMER_PRODUCT_OWNED,
  GET_CUSTOMER_PRODUCT_TRANSFERRED,
  GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES,
} from '@/store/modules/customer/actions-type';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('customer', [
      'customerDetails',
      // 'customerProductSerial',
      'gettingCustomerDetails',
      'customerProductsOwned',
      'customerProductsTransferred',
      'customerProductsPurchaseHistories',
      'customerProductsRecentPurchase',
    ]),
  },
  methods: {
    ...mapActions('customer', [
      GET_CUSTOMER,
      // GET_CUSTOMER_PRODUCT_SERIAL,
      GET_CUSTOMER_PRODUCT_RECENT_PURCHASE,
      GET_CUSTOMER_PRODUCT_OWNED,
      GET_CUSTOMER_PRODUCT_TRANSFERRED,
      GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES,
    ]),
    getSerialNumber(each) {
      return each.productSerialNumber.serialNumber ? each.productSerialNumber.serialNumber : '-';
    },
    getLicensor(each) {
      return each.character ? each.character.license.licenseName : '-';
    },
    getCharacter(each) {
      return each.character ? each.character.characterName : '-';
    },
    getDate(cusdt) {
      const dt = new Date(cusdt);
      return dayjs(dt).format('DD/MM/YYYY');
    },
    go(sn) {
      if (sn.length > 0) {
        window.open(`${process.env.VUE_APP_LOADING_API_DOMAIN}/productprovenance?id=${sn}`, '_blank');
      }
    },
  },
  mounted() {
    this.GET_CUSTOMER(this.$route.params.id);
    // this.GET_CUSTOMER_PRODUCT_SERIAL(this.$route.params.id);
    // this.GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED(this.$route.params.id);
    this.GET_CUSTOMER_PRODUCT_RECENT_PURCHASE(this.$route.params.id);
    this.GET_CUSTOMER_PRODUCT_OWNED(this.$route.params.id);
    this.GET_CUSTOMER_PRODUCT_TRANSFERRED(this.$route.params.id);
    this.GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES(this.$route.params.id);
  },
  watch: {
    customerDetails() {
    },
  },
  components: {
    // GetImage,
    GetOtherProductInfo,
    CustomerPurchase,
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

<style>
.el-collapse-item__header {
  background-color: #000000 !important;
  border: 1px solid #fff !important;
  margin-top: 10px !important;
  padding: 10px !important;
  color: #fff !important;
  font-family: 'gotham';
  text-transform: uppercase;
  font-size: 14px;
  line-height: 25px;
}
/*
.el-collapse {
  border-top: 1px solid #000000 !important;
  border-bottom: 1px solid #000000 !important;
} */

.el-collapse-item .is-active {
  margin-top: 15px;
  background-color: #000000 !important;
  /* border-top: 1px solid #fff !important;
  border-left: 1px solid #fff !important;
  border-right: 1px solid #fff !important; */
  border-bottom: 0px solid #000000 !important;
}

.el-collapse-item__content {
  margin-bottom: 10px !important;
  border-top: 0px solid #000000 !important;
  background-color: #000000 !important;
  border-bottom: 1px solid #fff !important;
  border-left: 1px solid #fff !important;
  border-right: 1px solid #fff !important;
  padding: 10px !important;
  color: #fff !important;
}
.el-collapse-item__wrap {
  background-color: #000000 !important;
}
.el-collapse {
    --el-collapse-border-color: #000000 !important;
}
.el-icon-arrow-right .is-active {
  border: 0px solid #000 !important;
}

.highlight-text-size {
  font-size: 16px !important;
}

</style>
