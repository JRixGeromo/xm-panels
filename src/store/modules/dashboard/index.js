import dashboardServices from '@/services/dashboard-service';
// import moment from 'moment';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_DS_CUSTOMERS,
  GET_DS_ARTISTS,
  GET_DS_CHARACTERS,
  GET_DS_LICENSORS,
  GET_DS_NFT,
  GET_DS_RECENT_PRODUCT,
} from '@/store/modules/dashboard/actions-type';
import {
  GET_DS_CUSTOMERS_START,
  GET_DS_CUSTOMERS_SUCCESS,
  GET_DS_CUSTOMERS_FAILURE,
  GET_DS_ARTISTS_START,
  GET_DS_ARTISTS_SUCCESS,
  GET_DS_ARTISTS_FAILURE,
  GET_DS_CHARACTERS_START,
  GET_DS_CHARACTERS_SUCCESS,
  GET_DS_CHARACTERS_FAILURE,
  GET_DS_LICENSORS_START,
  GET_DS_LICENSORS_SUCCESS,
  GET_DS_LICENSORS_FAILURE,
  GET_DS_NFT_START,
  GET_DS_NFT_SUCCESS,
  GET_DS_NFT_FAILURE,
  GET_DS_RECENT_PRODUCT_START,
  GET_DS_RECENT_PRODUCT_SUCCESS,
  GET_DS_RECENT_PRODUCT_FAILURE,
} from '@/store/modules/dashboard/mutations-type';
import { /* ElMessage, */ ElLoading } from 'element-plus';

const initialState = {
  gettingDsCustomers: false,
  gettingDsArtists: false,
  gettingDsCharacters: false,
  gettingDsLicensors: false,
  gettingDsNft: false,
  gettingDsRecentProduct: false,
  dsCustomers: [],
  dsArtists: [],
  dsCharacters: [],
  dsLicensors: [],
  dsNft: [],
  dsRecentProduct: [],
};

const state = {
  ...initialState,
};

const getters = {
};

const actions = {
  [GET_DS_ARTISTS]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_ARTISTS_START);
    dashboardServices.getArtists().then(
      (data) => {
        commit(GET_DS_ARTISTS_SUCCESS, data);
      },
      () => {
        commit(GET_DS_ARTISTS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_CUSTOMERS]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_CUSTOMERS_START);
    dashboardServices.getCustomers().then(
      (data) => {
        commit(GET_DS_CUSTOMERS_SUCCESS, data);
      },
      () => {
        commit(GET_DS_CUSTOMERS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_CHARACTERS]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_CHARACTERS_START);
    dashboardServices.getCharacters().then(
      (data) => {
        commit(GET_DS_CHARACTERS_SUCCESS, data);
      },
      () => {
        commit(GET_DS_CHARACTERS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_LICENSORS]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_LICENSORS_START);
    dashboardServices.getLicensors().then(
      (data) => {
        commit(GET_DS_LICENSORS_SUCCESS, data);
      },
      () => {
        commit(GET_DS_LICENSORS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_NFT]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_NFT_START);
    dashboardServices.getNft().then(
      (data) => {
        commit(GET_DS_NFT_SUCCESS, data);
      },
      () => {
        commit(GET_DS_NFT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_CHARACTERS]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_CHARACTERS_START);
    dashboardServices.getCharacters().then(
      (data) => {
        commit(GET_DS_CHARACTERS_SUCCESS, data);
      },
      () => {
        commit(GET_DS_CHARACTERS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },

  [GET_DS_RECENT_PRODUCT]({ commit }) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_DS_RECENT_PRODUCT_START);
    dashboardServices.getRecentProduct().then(
      (data) => {
        commit(GET_DS_RECENT_PRODUCT_SUCCESS, data);
      },
      () => {
        commit(GET_DS_RECENT_PRODUCT_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
};

const mutations = {
  [GET_DS_CUSTOMERS_START](state) {
    state.gettingDsCustomers = true;
  },
  [GET_DS_CUSTOMERS_SUCCESS](state, data) {
    state.gettingDsCustomers = false;
    state.dsCustomers = data;
  },
  [GET_DS_CUSTOMERS_FAILURE](state) {
    state.dsCustomers = [];
    state.gettingDsCustomers = false;
  },
  [GET_DS_ARTISTS_START](state) {
    state.gettingDsArtists = true;
  },
  [GET_DS_ARTISTS_SUCCESS](state, data) {
    state.gettingDsArtists = false;
    state.dsArtists = data;
  },
  [GET_DS_ARTISTS_FAILURE](state) {
    state.dsArtists = [];
    state.gettingDsArtists = false;
  },

  [GET_DS_CHARACTERS_START](state) {
    state.gettingDsCharacters = true;
  },
  [GET_DS_CHARACTERS_SUCCESS](state, data) {
    state.gettingDsCharacters = false;
    state.dsCharacters = data;
  },
  [GET_DS_CHARACTERS_FAILURE](state) {
    state.dsCharacters = [];
    state.gettingDsCharacters = false;
  },

  [GET_DS_LICENSORS_START](state) {
    state.gettingDsLicensors = true;
  },
  [GET_DS_LICENSORS_SUCCESS](state, data) {
    state.gettingDsLicensors = false;
    state.dsLicensors = data;
  },
  [GET_DS_LICENSORS_FAILURE](state) {
    state.dsLicensors = [];
    state.gettingDsLicensors = false;
  },

  [GET_DS_NFT_START](state) {
    state.gettingDsNft = true;
  },
  [GET_DS_NFT_SUCCESS](state, data) {
    state.gettingDsNft = false;
    state.dsNft = data;
  },
  [GET_DS_NFT_FAILURE](state) {
    state.dsNft = [];
    state.gettingDsNft = false;
  },
  [GET_DS_RECENT_PRODUCT_START](state) {
    state.gettingDsRecentProduct = true;
  },
  [GET_DS_RECENT_PRODUCT_SUCCESS](state, data) {
    state.gettingDsRecentProduct = false;
    state.dsRecentProduct = data;
  },
  [GET_DS_RECENT_PRODUCT_FAILURE](state) {
    state.dsRecentProduct = [];
    state.gettingDsRecentProduct = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
