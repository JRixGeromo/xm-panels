import nftsServices from '@/services/nfts-service';
import moment from 'moment';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_NFTS_DETAIL,
  GET_NFTS_PRODUCTS_LIST,
  GET_NFTS,
  GET_NFTS_LIST,
  SEARCH_NFTS_IN_LIST,
  SORT_NFTS_PRODUCTS,
} from '@/store/modules/nfts/actions-type';
import {
  GET_NFTS_PRODUCTS_LIST_START,
  GET_NFTS_PRODUCTS_LIST_SUCCESS,
  GET_NFTS_PRODUCTS_LIST_FAILURE,
  GET_NFTS_LIST_START,
  GET_NFTS_LIST_SUCCESS,
  GET_NFTS_LIST_FAILURE,
  GET_NFTS_DETAIL_START,
  GET_NFTS_DETAIL_SUCCESS,
  GET_NFTS_DETAIL_FAILURE,
  SEARCHED_NFTS,
  SORTED_NFTS_PRODUCTS,
  RESET_NFTS_STATE,
} from '@/store/modules/nfts/mutations-type';
// import { FILE_DOMAIN } from '@/common/constants';
import { /* ElMessage, */ ElLoading } from 'element-plus';

const initialState = {
  gettingNftsDetail: false,
  getNftsDetailFail: false,
  nftsDetail: {
  },
  updatingNftsDetail: false,
  updateNftsDetailSuccess: false,
  gettingNftsProductsList: false,
  gettingNftsList: false,
  nftsList: [],
  nftsProductsList: [],
  oriNftsProductsList: [],
  oriNftsList: [],
};

const state = {
  ...initialState,
};

const getters = {
  getNftsProducts: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.nftsProductsList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.nftsProductsList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };
    return data;
  },
  getNfts: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.nftsList.productSerialNumbers.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.nftsList.productSerialNumbers.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };
    return data;
  },
  totalNfts(state) {
    return state.nftsList.length;
  },
  newNftsInWeek(state) {
    const nftsList = [
      ...state.nftsList,
    ];

    return nftsList.filter((x) => moment(x.nftsCreatedDate).isBetween(moment().startOf('isoWeek'), moment().endOf('isoWeek'))).length;
  },
};

const actions = {
  [GET_NFTS_PRODUCTS_LIST]({ commit }, isLoaderNeeded = true) {
    let fullpageLoader = null;
    if (isLoaderNeeded) {
      fullpageLoader = ElLoading.service({
        fullscreen: true,
      });
    }
    commit(GET_NFTS_PRODUCTS_LIST_START);
    nftsServices.getNftsProductsList().then(
      (data) => {
        const sortedNfts = data.sort((a, b) => {
          const atime = new Date(a.productCreatedDate).getTime();
          const btime = new Date(b.productCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_NFTS_PRODUCTS_LIST_SUCCESS, sortedNfts);
      },
      () => {
        commit(GET_NFTS_PRODUCTS_LIST_FAILURE);
      },
    ).finally(() => {
      if (isLoaderNeeded) {
        fullpageLoader.close();
      }
    });
  },
  // [GET_NFTS_LIST]({ commit }, isLoaderNeeded = true) {
  [GET_NFTS_LIST]({ commit }, productId) {
    let fullpageLoader = null;
    fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_NFTS_LIST_START);
    nftsServices.getNftsList(productId).then(
      (data) => {
        /*
        const sortedNftss = data.sort((a, b) => {
          const atime = new Date(a.nftsCreatedDate).getTime();
          const btime = new Date(b.nftsCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_NFTS_LIST_SUCCESS, sortedNftss);
        */
        commit(GET_NFTS_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_NFTS_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_NFTS]({ commit }, nftsId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_NFTS_DETAIL_START);
    nftsServices.getNfts(nftsId).then(
      (data) => {
        commit(GET_NFTS_DETAIL_SUCCESS, data);
      },
      () => {
        commit(GET_NFTS_DETAIL_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_NFTS_DETAIL]({ commit }, sn) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_NFTS_DETAIL_START);
    nftsServices.getNftsDetail(sn).then(
      (data) => {
        commit(GET_NFTS_DETAIL_SUCCESS, data);
      },
      () => {
        commit(GET_NFTS_DETAIL_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_NFTS_IN_LIST]({ commit, state }, searchKeyword) {
    const nftsList = [...state.oriNftsProductsList];
    const searchedList = searchKeyword ?
      nftsList.filter((x) => x.productName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      nftsList;
    commit(SEARCHED_NFTS, searchedList);
  },
  [SORT_NFTS_PRODUCTS]({ commit, state }, sortBy) {
    const nftsList = [...state.oriNftsProductsList];
    const sortedNfts = nftsList.sort((a, b) => {
      const atime = new Date(a.productCreatedDate).getTime();
      const btime = new Date(b.productCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'oldest') {
        val = atime - btime;
      } else {
        val = btime - atime;
      }
      return val;
    });
    commit(SORTED_NFTS_PRODUCTS, sortedNfts);
  },

};

const mutations = {
  [GET_NFTS_PRODUCTS_LIST_START](state) {
    state.gettingNftsProductsList = true;
  },
  [GET_NFTS_PRODUCTS_LIST_SUCCESS](state, data) {
    state.gettingNftsProductsList = false;
    state.nftsProductsList = data;
    state.oriNftsProductsList = data;
  },
  [GET_NFTS_PRODUCTS_LIST_FAILURE](state) {
    state.nftsProductsList = [];
    state.oriNftsProductsList = [];
    state.gettingNftsProductsList = false;
  },
  [GET_NFTS_LIST_START](state) {
    state.gettingNftsList = true;
  },
  [GET_NFTS_LIST_SUCCESS](state, data) {
    state.gettingNftsList = false;
    state.nftsList = data;
    state.oriNftsList = data;
  },
  [GET_NFTS_LIST_FAILURE](state) {
    state.nftsList = [];
    state.oriNftsList = [];
    state.gettingNftsList = false;
  },
  [GET_NFTS_DETAIL_START](state) {
    state.gettingNftsDetail = true;
  },
  [GET_NFTS_DETAIL_SUCCESS](state, data) {
    state.gettingNftsDetail = false;
    state.nftsDetail = data;
  },
  [GET_NFTS_DETAIL_FAILURE](state) {
    state.gettingNftsDetail = false;
    state.getNftsDetailFail = true;
  },
  [SEARCHED_NFTS](state, data) {
    state.nftsProductsList = data;
  },
  [SORTED_NFTS_PRODUCTS](state, data) {
    state.nftsProductsList = data;
  },
  [RESET_NFTS_STATE](state) {
    Object.assign(state, initialState);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
