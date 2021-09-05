import configServices from '@/services/configuration-service';
import { GET_CONFIGURATION, GET_CONFIGURATION_BY_NAME, UPDATE_CONFIGURATION } from '@/store/modules/configuration/actions-type';
import {
  GET_CONFIGURATION_START,
  GET_CONFIGURATION_SUCCESS,
  GET_CONFIGURATION_FAILURE,
  GET_CONFIGURATION_BY_NAME_START,
  GET_CONFIGURATION_BY_NAME_SUCCESS,
  GET_CONFIGURATION_BY_NAME_FAILURE,
  UPDATE_CONFIGURATION_START,
  UPDATE_CONFIGURATION_SUCCESS,
  UPDATE_CONFIGURATION_FAILURE,
} from '@/store/modules/configuration/mutations-type';
import { ElMessage, ElLoading } from 'element-plus';

const state = {
  gettingConfig: false,
  config: null,
  updatingConfig: false,
};

const getters = {
  getNavigationItems: (state) => (parmas) => {
    const navItems = JSON.parse(state.config.configurations[0].value);

    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: navItems.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: navItems.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
  getProductCategories: (state) => (parmas) => {
    const newProductCategoriesList = state.config.configurations.map((x) => JSON.parse(x.value));

    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: newProductCategoriesList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: newProductCategoriesList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_CONFIGURATION]({ commit }) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_CONFIGURATION_START);
    configServices.getConfiguration().then(
      (data) => {
        fullpageLoader.close();
        commit(GET_CONFIGURATION_SUCCESS, data);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        fullpageLoader.close();
        commit(GET_CONFIGURATION_FAILURE);
      },
    );
  },
  [GET_CONFIGURATION_BY_NAME]({ commit }, name) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_CONFIGURATION_BY_NAME_START);
    configServices.getConfigurationByName(name).then(
      (data) => {
        fullpageLoader.close();
        commit(GET_CONFIGURATION_BY_NAME_SUCCESS, data);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        fullpageLoader.close();
        commit(GET_CONFIGURATION_BY_NAME_FAILURE);
      },
    );
  },
  [UPDATE_CONFIGURATION]({ commit }, payload) {
    const { configDetails, callbackFunc } = payload;
    commit(UPDATE_CONFIGURATION_START);
    configServices.updateConfiguration(configDetails).then(
      () => {
        callbackFunc();
        ElMessage.success({
          showClose: true,
          message: 'Platform configuration updated',
        });
        commit(UPDATE_CONFIGURATION_SUCCESS);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_CONFIGURATION_FAILURE);
      },
    );
  },
};

const mutations = {
  [GET_CONFIGURATION_START](state) {
    state.gettingConfig = true;
    state.config = null;
  },
  [GET_CONFIGURATION_SUCCESS](state, data) {
    state.gettingConfig = false;
    state.config = {
      ...data[0],
    };
  },
  [GET_CONFIGURATION_FAILURE](state) {
    state.gettingConfig = false;
  },
  [GET_CONFIGURATION_BY_NAME_START](state) {
    state.gettingConfig = true;
    state.config = null;
  },
  [GET_CONFIGURATION_BY_NAME_SUCCESS](state, data) {
    state.gettingConfig = false;
    state.config = {
      ...data[0],
    };
  },
  [GET_CONFIGURATION_BY_NAME_FAILURE](state) {
    state.gettingConfig = false;
  },
  [UPDATE_CONFIGURATION_START](state) {
    state.updatingConfig = true;
    state.config = null;
  },
  [UPDATE_CONFIGURATION_SUCCESS](state) {
    state.updatingConfig = false;
  },
  [UPDATE_CONFIGURATION_FAILURE](state) {
    state.updatingConfig = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
