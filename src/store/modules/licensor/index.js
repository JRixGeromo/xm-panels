import licensorServices from '@/services/licensor-service';
// import authServices from '@/services/auth-service';
// import accessServices from '@/services/access-service';
// import artistService from '@/services/artist-service';
import fileUploadServices from '@/services/file-upload-service';
import {
  GET_LICENSOR_LIST,
  GET_LICENSOR,
  CREATE_LICENSOR,
  UPDATE_LICENSOR,
  SEARCH_LICENSOR_IN_LIST,
  SORT_LICENSORS,
  SORT_LICENSORS_BY_QTY,
} from '@/store/modules/licensor/actions-type';
import {
  GET_LICENSOR_LIST_START,
  GET_LICENSOR_LIST_SUCCESS,
  GET_LICENSOR_LIST_FAILURE,
  GET_LICENSOR_START,
  GET_LICENSOR_SUCCESS,
  GET_LICENSOR_FAILURE,
  CREATE_LICENSOR_START,
  CREATE_LICENSOR_SUCCESS,
  CREATE_LICENSOR_FAILURE,
  UPDATE_LICENSOR_START,
  UPDATE_LICENSOR_SUCCESS,
  UPDATE_LICENSOR_FAILURE,
  SEARCHED_LICENSOR,
  SORTED_LICENSORS,
  SORTED_LICENSORS_BY_QTY,
} from '@/store/modules/licensor/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage } from 'element-plus';
import router from '@/router';

const state = {
  gettingLicensorList: false,
  licensorList: [],
  licensorDetails: [],
  creatingLicensor: false,
  gettingLicensorDetails: false,
  updatingLicensor: false,
};

// const initialState = {
//   gettingLICENSORList: false,
//   LICENSORList: [],
//   creatingLICENSOR: false,
// };

// const state = {
//   ...initialState,
// };

const getters = {
  getLicensors: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.licensorList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.licensorList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_LICENSOR_LIST]({ commit }) {
    commit(GET_LICENSOR_LIST_START);
    licensorServices.getLicensors().then(
      (data) => {
        commit(GET_LICENSOR_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_LICENSOR_LIST_FAILURE);
      },
    );
  },
  [GET_LICENSOR]({ commit }, licensorId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_LICENSOR_START);
    licensorServices.getLicensor(licensorId).then(
      (data) => {
        commit(GET_LICENSOR_SUCCESS, data);
      },
      () => {
        commit(GET_LICENSOR_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  async [CREATE_LICENSOR]({ commit }, licenseDetails) {
    console.log(licenseDetails);
    // upload
    let licensePicUrl = licenseDetails.oriLicenseDisplayImage;

    if (licenseDetails.licenseImageFile) {
      await fileUploadServices.uploadFile(licenseDetails.licenseImageFile).then(
        (uploadData) => {
          licensePicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    // end of: upload
    const licenseDetailsSource = {
      ...licenseDetails,
      licenseDisplayImage: licensePicUrl,
      // licenseDisplayBannerFilePath: isCoverPicSuccess ? coverPicUrl : null,
    };

    console.log(licenseDetailsSource);
    const licenseDetailsArray = [];
    licenseDetailsArray.push(licenseDetailsSource);
    commit(CREATE_LICENSOR_START);
    licensorServices.createLicensor(licenseDetailsArray).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Licensor created successfully',
        });
        commit(CREATE_LICENSOR_SUCCESS);
        router.push('/alllicensors');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_LICENSOR_FAILURE);
      },
    );
  },
  async [UPDATE_LICENSOR]({ commit }, licenseDetails) {
    // upload

    let licensePicUrl = licenseDetails.oriLicenseDisplayImage;

    if (licenseDetails.licenseImageFile) {
      await fileUploadServices.uploadFile(licenseDetails.licenseImageFile).then(
        (uploadData) => {
          licensePicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
        },
      );
    }
    // end of: upload
    const licenseDetailsSource = {
      ...licenseDetails,
      licenseDisplayImage: licensePicUrl,
      // licenseDisplayBannerFilePath: isCoverPicSuccess ? coverPicUrl : null,
    };

    // console.log(licenseDetailsSource);
    // const licenseDetailsArray = [];
    // licenseDetailsArray.push(licenseDetailsSource);
    commit(UPDATE_LICENSOR_START);
    licensorServices.updateLicensor(licenseDetailsSource).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Licensor updated successfully',
        });
        commit(UPDATE_LICENSOR_SUCCESS);
        router.push('/alllicensors');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_LICENSOR_FAILURE);
      },
    );
  },
  [SEARCH_LICENSOR_IN_LIST]({ commit, state }, searchKeyword) {
    const licensorList = [...state.oriLicensorList];
    const searchedList = searchKeyword ?
      licensorList.filter((x) => x.licenseName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      licensorList;
    commit(SEARCHED_LICENSOR, searchedList);
  },
  [SORT_LICENSORS]({ commit, state }, sortBy) {
    const licensorList = [...state.oriLicensorList];
    const sortedLicensors = licensorList.sort((a, b) => {
      const atime = new Date(a.licenseCreatedDate).getTime();
      const btime = new Date(b.licenseCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'oldest') {
        val = atime - btime;
      } else {
        val = btime - atime;
      }
      return val;
    });
    commit(SORTED_LICENSORS, sortedLicensors);
  },
  [SORT_LICENSORS_BY_QTY]({ commit, state }) {
    const licensorList = [...state.oriLicensorList];
    const sortedLicensors = licensorList.sort((a, b) => {
      const aqty = a.licenseProductQty;
      const bqty = b.licenseProductQty;
      let val = 0;
      val = aqty - bqty;
      return val;
    });
    commit(SORTED_LICENSORS_BY_QTY, sortedLicensors);
  },
};

const mutations = {
  [GET_LICENSOR_LIST_START](state) {
    state.gettingLicensorList = true;
  },
  [GET_LICENSOR_LIST_SUCCESS](state, data) {
    state.gettingLicensorList = false;
    state.licensorList = data;
    state.oriLicensorList = data;
  },
  [GET_LICENSOR_LIST_FAILURE](state) {
    state.licensorList = [];
    state.gettingLicensorList = false;
    state.oriLicensorList = [];
  },
  [GET_LICENSOR_START](state) {
    state.gettingLicensorDetails = true;
  },
  [GET_LICENSOR_SUCCESS](state, data) {
    state.gettingLicensorDetails = false;
    state.licensorDetails = data;
    state.oriLicensor = data;
  },
  [GET_LICENSOR_FAILURE](state) {
    state.licensorDetails = [];
    state.gettingLicensorDetails = false;
    state.oriLicensor = [];
  },
  [CREATE_LICENSOR_START](state) {
    state.creatingLicensor = true;
  },
  [CREATE_LICENSOR_SUCCESS](state) {
    state.creatingLicensor = false;
  },
  [CREATE_LICENSOR_FAILURE](state) {
    state.creatingLicensor = false;
  },
  [UPDATE_LICENSOR_START](state) {
    state.updatingLicensor = true;
  },
  [UPDATE_LICENSOR_SUCCESS](state) {
    state.updatingLicensor = false;
  },
  [UPDATE_LICENSOR_FAILURE](state) {
    state.updatingLicensor = false;
  },
  [SEARCHED_LICENSOR](state, data) {
    state.licensorList = data;
  },
  [SORTED_LICENSORS](state, data) {
    state.licensorList = data;
  },
  [SORTED_LICENSORS_BY_QTY](state, data) {
    state.licensorList = data;
  },
  [SORT_LICENSORS](state, data) {
    state.licensorList = data;
  },
  [SORT_LICENSORS_BY_QTY](state, data) {
    state.licensorList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
