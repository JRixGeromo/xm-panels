import { SET_LINKS } from '@/store/modules/linkstoggle/actions-type';
import { SET_LINKS_START, SET_LINKS_SUCCESS, SET_LINKS_FAILURE } from '@/store/modules/linkstoggle/mutations-type';

const state = {
  settingLinksToggle: false,
  linksToggled: {
    susLink: true,
    artLink: true,
    serLink: true,
    productName: '',
  },
};

const actions = {
  [SET_LINKS]({ commit }, toggle) {
    commit(SET_LINKS_START);
    const toggled = [];
    toggled.susLink = toggle.susLink;
    toggled.artLink = toggle.artLink;
    toggled.serLink = toggle.serLink;
    toggled.productName = toggle.productName;
    commit(SET_LINKS_SUCCESS, toggled);
  },
};

const mutations = {
  [SET_LINKS_START](state) {
    state.settingLinksToggle = true;
  },
  [SET_LINKS_SUCCESS](state, data) {
    state.settingLinksToggle = false;
    state.linksToggled = data;
  },
  [SET_LINKS_FAILURE](state) {
    state.settingLinksToggle = false;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
