import customerServices from '@/services/customer-service';
// import authServices from '@/services/auth-service';
// import accessServices from '@/services/access-service';
// import artistService from '@/services/artist-service';
import fileUploadServices from '@/services/file-upload-service';
import {
  GET_CUSTOMER_LIST,
  GET_CUSTOMER,
  GET_CUSTOMER_PRODUCT_SERIAL,
  GET_CUSTOMER_PRODUCT_RECENT_PURCHASE,
  GET_CUSTOMER_PRODUCT_OWNED,
  GET_CUSTOMER_PRODUCT_TRANSFERRED,
  GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  SEARCH_CUSTOMER_IN_LIST,
  SORT_CUSTOMERS,
  SORT_CUSTOMERS_BY_QTY,
} from '@/store/modules/customer/actions-type';
import {
  GET_CUSTOMER_LIST_START,
  GET_CUSTOMER_LIST_SUCCESS,
  GET_CUSTOMER_LIST_FAILURE,
  GET_CUSTOMER_START,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  GET_CUSTOMER_PRODUCT_SERIAL_START,
  GET_CUSTOMER_PRODUCT_SERIAL_SUCCESS,
  GET_CUSTOMER_PRODUCT_SERIAL_FAILURE,
  GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_START,
  GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_SUCCESS,
  GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_FAILURE,
  GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_START,
  GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_SUCCESS,
  GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_FAILURE,
  GET_CUSTOMER_PRODUCT_OWNED_START,
  GET_CUSTOMER_PRODUCT_OWNED_SUCCESS,
  GET_CUSTOMER_PRODUCT_OWNED_FAILURE,
  GET_CUSTOMER_PRODUCT_TRANSFERRED_START,
  GET_CUSTOMER_PRODUCT_TRANSFERRED_SUCCESS,
  GET_CUSTOMER_PRODUCT_TRANSFERRED_FAILURE,
  GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_START,
  GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_SUCCESS,
  GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_FAILURE,
  CREATE_CUSTOMER_START,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_START,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  SEARCHED_CUSTOMER,
  SORTED_CUSTOMERS,
  SORTED_CUSTOMERS_BY_QTY,
} from '@/store/modules/customer/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router';

const state = {
  gettingCustomerList: false,
  customerList: [],
  customerDetails: [],
  creatingCustomer: false,
  gettingCustomerDetails: false,
  updatingCustomer: false,
  customerProductSerial: [],
  gettingCustomerProductSerial: false,
  customerProductSerialTransferred: [],
  gettingCustomerProductSerialTransferred: false,
  gettingCustomerProductsOwned: false,
  customerProductsOwned: [],
  gettingCustomerProductsTransferred: false,
  customerProductsTransferred: [],
  gettingCustomerProductsPurchaseHistories: false,
  customerProductsPurchaseHistories: [],
  gettingCustomerProductsRecentPurchase: false,
  customerProductsRecentPurchase: [],
};

// const initialState = {
//   gettingCUSTOMERList: false,
//   CUSTOMERList: [],
//   creatingCUSTOMER: false,
// };

// const state = {
//   ...initialState,
// };

const getters = {
  getCustomers: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.customerList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.customerList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_CUSTOMER_LIST]({ commit }) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_CUSTOMER_LIST_START);
    customerServices.getCustomers().then(
      (data) => {
        const sortedCustomers = data.sort((a, b) => {
          const atime = new Date(a.customerCreatedDate).getTime();
          const btime = new Date(b.customerCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_CUSTOMER_LIST_SUCCESS, sortedCustomers);
      },
      () => {
        commit(GET_CUSTOMER_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_CUSTOMER]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_START);
    customerServices.getCustomerProducts(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  [GET_CUSTOMER_PRODUCT_SERIAL]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_PRODUCT_SERIAL_START);
    customerServices.getCustomerProductSerial(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_PRODUCT_SERIAL_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_PRODUCT_SERIAL_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  [GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_START);
    customerServices.getCustomerProductsPurchaseHistories(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },

  [GET_CUSTOMER_PRODUCT_RECENT_PURCHASE]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_START);
    customerServices.getCustomerProductsRecentPurchase(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },

  [GET_CUSTOMER_PRODUCT_OWNED]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_PRODUCT_OWNED_START);
    customerServices.getCustomerProductsOwned(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_PRODUCT_OWNED_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_PRODUCT_OWNED_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },

  [GET_CUSTOMER_PRODUCT_TRANSFERRED]({ commit }, customerId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CUSTOMER_PRODUCT_TRANSFERRED_START);
    customerServices.getCustomerProductsTransferred(customerId).then(
      (data) => {
        commit(GET_CUSTOMER_PRODUCT_TRANSFERRED_SUCCESS, data);
      },
      () => {
        commit(GET_CUSTOMER_PRODUCT_TRANSFERRED_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  async [CREATE_CUSTOMER]({ commit }, customerDetails) {
    // upload
    let customerPicUrl = customerDetails.oriLicenseDisplayImage;

    if (customerDetails.customerImageFile) {
      await fileUploadServices.uploadFile(customerDetails.customerImageFile).then(
        (uploadData) => {
          customerPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    // end of: upload
    const customerDetailsSource = {
      ...customerDetails,
      customerDisplayImage: customerPicUrl,
      // customerDisplayBannerFilePath: isCoverPicSuccess ? coverPicUrl : null,
    };

    const customerDetailsArray = [];
    customerDetailsArray.push(customerDetailsSource);
    commit(CREATE_CUSTOMER_START);
    customerServices.createCustomer(customerDetailsArray).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Customer created successfully',
        });
        commit(CREATE_CUSTOMER_SUCCESS);
        router.push('/allcustomers');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_CUSTOMER_FAILURE);
      },
    );
  },
  async [UPDATE_CUSTOMER]({ commit }, customerDetails) {
    // upload

    let customerPicUrl = customerDetails.oriLicenseDisplayImage;

    if (customerDetails.customerImageFile) {
      await fileUploadServices.uploadFile(customerDetails.customerImageFile).then(
        (uploadData) => {
          customerPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    // end of: upload
    const customerDetailsSource = {
      ...customerDetails,
      customerDisplayImage: customerPicUrl,
      // customerDisplayBannerFilePath: isCoverPicSuccess ? coverPicUrl : null,
    };

    commit(UPDATE_CUSTOMER_START);
    customerServices.updateCustomer(customerDetailsSource).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Customer updated successfully',
        });
        commit(UPDATE_CUSTOMER_SUCCESS);
        router.push('/allcustomers');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_CUSTOMER_FAILURE);
      },
    );
  },
  [SEARCH_CUSTOMER_IN_LIST]({ commit, state }, searchKeyword) {
    const customerList = [...state.oriCustomerList];
    const searchedList = searchKeyword ?
      customerList.filter((x) => x.customerName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      customerList;
    commit(SEARCHED_CUSTOMER, searchedList);
  },
  [SORT_CUSTOMERS]({ commit, state }, sortBy) {
    const customerList = [...state.oriCustomerList];
    const sortedCustomers = customerList.sort((a, b) => {
      const atime = new Date(a.customerCreatedDate).getTime();
      const btime = new Date(b.customerCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'oldest') {
        val = atime - btime;
      } else {
        val = btime - atime;
      }
      return val;
    });
    commit(SORTED_CUSTOMERS, sortedCustomers);
  },
  [SORT_CUSTOMERS_BY_QTY]({ commit, state }) {
    const customerList = [...state.oriCustomerList];
    const sortedCustomers = customerList.sort((a, b) => {
      const aqty = a.customerProductQty;
      const bqty = b.customerProductQty;
      let val = 0;
      val = aqty - bqty;
      return val;
    });
    commit(SORTED_CUSTOMERS_BY_QTY, sortedCustomers);
  },
};

const mutations = {
  [GET_CUSTOMER_LIST_START](state) {
    state.gettingCustomerList = true;
  },
  [GET_CUSTOMER_LIST_SUCCESS](state, data) {
    state.gettingCustomerList = false;
    state.customerList = data;
    state.oriCustomerList = data;
  },
  [GET_CUSTOMER_LIST_FAILURE](state) {
    state.customerList = [];
    state.gettingCustomerList = false;
    state.oriCustomerList = [];
  },
  [GET_CUSTOMER_START](state) {
    state.gettingCustomerDetails = true;
  },
  [GET_CUSTOMER_SUCCESS](state, data) {
    state.gettingCustomerDetails = false;
    state.customerDetails = data;
    state.oriCustomer = data;
  },
  [GET_CUSTOMER_FAILURE](state) {
    state.customerDetails = [];
    state.gettingCustomerDetails = false;
    state.oriCustomer = [];
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_START](state) {
    state.gettingCustomerProductSerial = true;
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_SUCCESS](state, data) {
    state.gettingCustomerProductSerial = false;
    state.customerProductSerial = data;
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_FAILURE](state) {
    state.customerProductSerial = [];
    state.gettingCustomerProductSerial = false;
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_START](state) {
    state.gettingCustomerProductSerialTransferred = true;
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_SUCCESS](state, data) {
    state.gettingCustomerProductSerialTransferred = false;
    state.customerProductSerialTransferred = data;
  },
  [GET_CUSTOMER_PRODUCT_SERIAL_TRANSFERRED_FAILURE](state) {
    state.customerProductSerialTransferred = [];
    state.gettingCustomerProductSerialTransferred = false;
  },

  [GET_CUSTOMER_PRODUCT_OWNED_START](state) {
    state.gettingCustomerProductsOwned = true;
  },
  [GET_CUSTOMER_PRODUCT_OWNED_SUCCESS](state, data) {
    state.gettingCustomerProductsOwned = false;
    state.customerProductsOwned = data;
  },
  [GET_CUSTOMER_PRODUCT_OWNED_FAILURE](state) {
    state.customerProductsOwned = [];
    state.gettingCustomerProductsOwned = false;
  },

  [GET_CUSTOMER_PRODUCT_TRANSFERRED_START](state) {
    state.gettingCustomerProductsTransferred = true;
  },
  [GET_CUSTOMER_PRODUCT_TRANSFERRED_SUCCESS](state, data) {
    state.gettingCustomerProductsTransferred = false;
    state.customerProductsTransferred = data;
  },
  [GET_CUSTOMER_PRODUCT_TRANSFERRED_FAILURE](state) {
    state.customerProductsTransferred = [];
    state.gettingCustomerProductsTransferred = false;
  },

  [GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_START](state) {
    state.gettingCustomerProductsPurchaseHistories = true;
  },
  [GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_SUCCESS](state, data) {
    state.gettingCustomerProductsPurchaseHistories = false;
    state.customerProductsPurchaseHistories = data;
  },
  [GET_CUSTOMER_PRODUCT_PURCHASE_HISTORIES_FAILURE](state) {
    state.customerProductsPurchaseHistories = [];
    state.gettingCustomerProductsPurchaseHistories = false;
  },

  [GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_START](state) {
    state.gettingCustomerProductsRecentPurchase = true;
  },
  [GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_SUCCESS](state, data) {
    state.gettingCustomerProductsRecentPurchase = false;
    state.customerProductsRecentPurchase = data;
  },
  [GET_CUSTOMER_PRODUCT_RECENT_PURCHASE_FAILURE](state) {
    state.customerProductsRecentPurchase = [];
    state.gettingCustomerProductsRecentPurchase = false;
  },

  [CREATE_CUSTOMER_START](state) {
    state.creatingCustomer = true;
  },
  [CREATE_CUSTOMER_SUCCESS](state) {
    state.creatingCustomer = false;
  },
  [CREATE_CUSTOMER_FAILURE](state) {
    state.creatingCustomer = false;
  },
  [UPDATE_CUSTOMER_START](state) {
    state.updatingCustomer = true;
  },
  [UPDATE_CUSTOMER_SUCCESS](state) {
    state.updatingCustomer = false;
  },
  [UPDATE_CUSTOMER_FAILURE](state) {
    state.updatingCustomer = false;
  },
  [SEARCHED_CUSTOMER](state, data) {
    state.customerList = data;
  },
  [SORTED_CUSTOMERS](state, data) {
    state.customerList = data;
  },
  [SORTED_CUSTOMERS_BY_QTY](state, data) {
    state.customerList = data;
  },
  [SORT_CUSTOMERS](state, data) {
    state.customerList = data;
  },
  [SORT_CUSTOMERS_BY_QTY](state, data) {
    state.customerList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
