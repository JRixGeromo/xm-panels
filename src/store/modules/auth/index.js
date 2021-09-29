import authServices from '@/services/auth-service';
import { SIGN_IN, SIGN_OUT } from '@/store/modules/auth/actions-type';
import { SIGN_IN_START, SIGN_IN_END, SIGN_UP_START, SIGN_UP_END } from '@/store/modules/auth/mutations-type';
import { ElMessage } from 'element-plus';
import { saveAuthInfo, removeAuthInfo } from '@/helpers';

const state = {
  isSigningIn: false,
  isSigningUp: false,
};

const getters = {
};

const actions = {
  [SIGN_IN]({ commit }, loginCredentials) {
    commit(SIGN_IN_START);
    authServices.login(loginCredentials).then(
      (data) => {
        // if (checkIsAdminRole(data)) {
        saveAuthInfo(data);
        window.location.replace('/');
        // } else {
        //   ElMessage.error({
        //     showClose: true,
        //     message: 'You are not admin',
        //   });
        //   commit(SIGN_IN_END);
        // }
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(SIGN_IN_END);
      },
    );
  },
  [SIGN_OUT]() {
    authServices.logout();
    removeAuthInfo();
    window.location.replace('/');
  },
};

const mutations = {
  [SIGN_IN_START](state) {
    state.isSigningIn = true;
  },
  [SIGN_IN_END](state) {
    state.isSigningIn = false;
  },
  [SIGN_UP_START](state) {
    state.isSigningUp = true;
  },
  [SIGN_UP_END](state) {
    state.isSigningUp = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
