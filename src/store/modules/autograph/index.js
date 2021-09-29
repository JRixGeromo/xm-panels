import autographServices from '@/services/autograph-service';
import moment from 'moment';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_AUTOGRAPH_STATUS,
  GET_AUTOGRAPH,
  UPDATE_AUTOGRAPH_STATUS,
  GET_AUTOGRAPH_LIST,
  GET_AUTOGRAPH_APPROVALS_LIST,
  GET_AUTOGRAPH_ARCHIVES_LIST,
  SEARCH_AUTOGRAPH_IN_LIST,
  SORT_AUTOGRAPHS,
} from '@/store/modules/autograph/actions-type';
import {
  GET_AUTOGRAPH_LIST_START,
  GET_AUTOGRAPH_LIST_SUCCESS,
  GET_AUTOGRAPH_LIST_FAILURE,
  GET_AUTOGRAPH_APPROVALS_LIST_START,
  GET_AUTOGRAPH_APPROVALS_LIST_SUCCESS,
  GET_AUTOGRAPH_APPROVALS_LIST_FAILURE,
  GET_AUTOGRAPH_ARCHIVES_LIST_START,
  GET_AUTOGRAPH_ARCHIVES_LIST_SUCCESS,
  GET_AUTOGRAPH_ARCHIVES_LIST_FAILURE,
  GET_AUTOGRAPH_STATUS_START,
  GET_AUTOGRAPH_STATUS_SUCCESS,
  GET_AUTOGRAPH_STATUS_FAILURE,
  UPDATE_AUTOGRAPH_STATUS_START,
  UPDATE_AUTOGRAPH_STATUS_SUCCESS,
  UPDATE_AUTOGRAPH_STATUS_FAILURE,
  SEARCHED_AUTOGRAPH,
  SORTED_AUTOGRAPHS,
  RESET_AUTOGRAPH_STATE,
} from '@/store/modules/autograph/mutations-type';
// import { FILE_DOMAIN } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';

const initialState = {
  gettingAutographProfile: false,
  getAutographProfileFail: false,
  autographProfile: {
  },
  updatingAutographProfile: false,
  updateAutographProfileSuccess: false,
  gettingAutographList: false,
  gettingAutographApprovalsList: false,
  gettingAutographArchivesList: false,
  autographList: [],
  autographApprovalsList: [],
  autographArchivesList: [],
  oriAutographList: [],
  oriAutographApprovalsList: [],
  oriAutographArchivesList: [],
};

const state = {
  ...initialState,
};

const getters = {
  getAutographList: (state) => (params) => {
    const paginationDetails = {
      itemPerPage: params.itemPerPage,
      totalRecord: state.autographList.length,
      currentPage: params.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.autographList.slice(
        (params.itemPerPage * params.currentPage),
        (params.itemPerPage * (params.currentPage + 1)),
      ),
    };
    return data;
  },
  getAutographApprovalsList: (state) => (params) => {
    const paginationDetails = {
      itemPerPage: params.itemPerPage,
      totalRecord: state.autographApprovalsList.length,
      currentPage: params.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.autographApprovalsList.slice(
        (params.itemPerPage * params.currentPage),
        (params.itemPerPage * (params.currentPage + 1)),
      ),
    };
    return data;
  },
  getAutographArchivesList: (state) => (params) => {
    const paginationDetails = {
      itemPerPage: params.itemPerPage,
      totalRecord: state.autographArchivesList.length,
      currentPage: params.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.autographArchivesList.slice(
        (params.itemPerPage * params.currentPage),
        (params.itemPerPage * (params.currentPage + 1)),
      ),
    };
    return data;
  },
  totalAutograph(state) {
    return state.autographList.length;
  },
  newAutographInWeek(state) {
    const autographList = [
      ...state.autographList,
    ];

    return autographList.filter((x) => moment(x.autographCreatedDate).isBetween(moment().startOf('isoWeek'), moment().endOf('isoWeek'))).length;
  },
};

const actions = {
  [GET_AUTOGRAPH_LIST]({ commit }, $status) {
    commit(GET_AUTOGRAPH_LIST_START);
    autographServices.getProductAutographList($status).then(
      (data) => {
        commit(GET_AUTOGRAPH_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_AUTOGRAPH_LIST_FAILURE);
      },
    );
  },
  [GET_AUTOGRAPH_APPROVALS_LIST]({ commit }) {
    commit(GET_AUTOGRAPH_APPROVALS_LIST_START);
    autographServices.getProductAutographList('pending').then(
      (data) => {
        commit(GET_AUTOGRAPH_APPROVALS_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_AUTOGRAPH_APPROVALS_LIST_FAILURE);
      },
    );
  },
  [GET_AUTOGRAPH_ARCHIVES_LIST]({ commit }) {
    commit(GET_AUTOGRAPH_ARCHIVES_LIST_START);
    autographServices.getProductAutographList('archive').then(
      (data) => {
        commit(GET_AUTOGRAPH_ARCHIVES_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_AUTOGRAPH_ARCHIVES_LIST_FAILURE);
      },
    );
  },
  [GET_AUTOGRAPH]({ commit }, autographId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_AUTOGRAPH_STATUS_START);
    autographServices.getAutograph(autographId).then(
      (data) => {
        commit(GET_AUTOGRAPH_STATUS_SUCCESS, data);
      },
      () => {
        commit(GET_AUTOGRAPH_STATUS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_AUTOGRAPH_STATUS]({ commit }, payload) {
    const { userId, loader } = payload;
    commit(GET_AUTOGRAPH_STATUS_START);
    const fullPageLoader = loader.show();
    autographServices.getAutographProfile(userId).then(
      (data) => {
        commit(GET_AUTOGRAPH_STATUS_SUCCESS, data);
      },
      () => {
        commit(GET_AUTOGRAPH_STATUS_FAILURE);
      },
    ).finally(() => {
      fullPageLoader.hide();
    });
  },
  async [UPDATE_AUTOGRAPH_STATUS]({ commit }, autographInfo) {
    // const { autographInfo, callbackFunc } = payload;
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    const autographInfoSource = {
      productAutographId: autographInfo.productAutographId,
      status: autographInfo.productAutographStatus,
      remark: autographInfo.remark,
    };

    commit(UPDATE_AUTOGRAPH_STATUS_START);

    await autographServices.updateProductAutographStatus(autographInfoSource).then(
      (updateData) => {
        ElMessage.success({
          showClose: true,
          message: 'Edit product Autograph updated status successfully',
        });

        // if (callbackFunc) {
        //   callbackFunc();
        // }
        commit(UPDATE_AUTOGRAPH_STATUS_SUCCESS, updateData);
      },
      () => {
        commit(UPDATE_AUTOGRAPH_STATUS_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_AUTOGRAPH_IN_LIST]({ commit, state }, searchKeyword) {
    const autographList = [...state.oriAutographList];
    const searchedList = searchKeyword ?
      autographList.filter((x) => x.autographName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      autographList;
    commit(SEARCHED_AUTOGRAPH, searchedList);
  },
  [SORT_AUTOGRAPHS]({ commit, state }, sortBy) {
    const autographList = [...state.oriAutographList];
    const sortedAutographs = autographList.sort((a, b) => {
      const atime = new Date(a.autographCreatedDate).getTime();
      const btime = new Date(b.autographCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'oldest') {
        val = atime - btime;
      } else {
        val = btime - atime;
      }
      return val;
    });
    commit(SORTED_AUTOGRAPHS, sortedAutographs);
  },

};

const mutations = {
  [GET_AUTOGRAPH_LIST_START](state) {
    state.gettingAutographList = true;
  },
  [GET_AUTOGRAPH_LIST_SUCCESS](state, data) {
    state.gettingAutographList = false;
    state.autographList = data;
    state.oriAutographList = data;
  },
  [GET_AUTOGRAPH_LIST_FAILURE](state) {
    state.autographList = [];
    state.oriAutographList = [];
    state.gettingAutographList = false;
  },

  [GET_AUTOGRAPH_APPROVALS_LIST_START](state) {
    state.gettingAutographApprovalsList = true;
  },
  [GET_AUTOGRAPH_APPROVALS_LIST_SUCCESS](state, data) {
    state.gettingAutographApprovalsList = false;
    state.autographApprovalsList = data;
    state.oriAutographApprovalsList = data;
  },
  [GET_AUTOGRAPH_APPROVALS_LIST_FAILURE](state) {
    state.autographApprovalsList = [];
    state.oriAutographApprovalsList = [];
    state.gettingAutographApprovalsList = false;
  },

  [GET_AUTOGRAPH_ARCHIVES_LIST_START](state) {
    state.gettingAutographArchivesList = true;
  },
  [GET_AUTOGRAPH_ARCHIVES_LIST_SUCCESS](state, data) {
    state.gettingAutographArchivesList = false;
    state.autographArchivesList = data;
    state.oriAutographArchivesList = data;
  },
  [GET_AUTOGRAPH_ARCHIVES_LIST_FAILURE](state) {
    state.autographArchivesList = [];
    state.oriAutographArchivesList = [];
    state.gettingAutographArchivesList = false;
  },

  [GET_AUTOGRAPH_STATUS_START](state) {
    state.gettingAutographProfile = true;
  },
  [GET_AUTOGRAPH_STATUS_SUCCESS](state, data) {
    state.gettingAutographProfile = false;
    state.autographProfile = {
      ...data[0],
    };
  },
  [GET_AUTOGRAPH_STATUS_FAILURE](state) {
    state.gettingAutographProfile = false;
    state.getAutographProfileFail = true;
  },
  [UPDATE_AUTOGRAPH_STATUS_START](state) {
    state.updatingAutographProfile = true;
    state.updateAutographProfileSuccess = false;
  },
  [UPDATE_AUTOGRAPH_STATUS_SUCCESS](state) {
    state.updatingAutographProfile = false;
    state.updateAutographProfileSuccess = true;
  },
  [UPDATE_AUTOGRAPH_STATUS_FAILURE](state) {
    state.updatingAutographProfile = false;
    state.updateAutographProfileSuccess = false;
  },
  [SEARCHED_AUTOGRAPH](state, data) {
    state.autographList = data;
  },
  [SORTED_AUTOGRAPHS](state, data) {
    state.autographList = data;
  },
  [RESET_AUTOGRAPH_STATE](state) {
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
