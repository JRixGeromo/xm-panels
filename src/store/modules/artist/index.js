import artistServices from '@/services/artist-service';
import moment from 'moment';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_ARTIST_PROFILE,
  GET_ARTIST,
  UPDATE_ARTIST_PROFILE,
  GET_ARTIST_LIST,
  SEARCH_ARTIST_IN_LIST,
  SORT_ARTISTS,
} from '@/store/modules/artist/actions-type';
import {
  GET_ARTIST_LIST_START,
  GET_ARTIST_LIST_SUCCESS,
  GET_ARTIST_LIST_FAILURE,
  GET_ARTIST_PROFILE_START,
  GET_ARTIST_PROFILE_SUCCESS,
  GET_ARTIST_PROFILE_FAILURE,
  UPDATE_ARTIST_PROFILE_START,
  UPDATE_ARTIST_PROFILE_SUCCESS,
  UPDATE_ARTIST_PROFILE_FAILURE,
  SEARCHED_ARTIST,
  SORTED_ARTISTS,
  RESET_ARTIST_STATE,
} from '@/store/modules/artist/mutations-type';
// import { FILE_DOMAIN } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';

const initialState = {
  gettingArtistProfile: false,
  getArtistProfileFail: false,
  artistProfile: {
  },
  updatingArtistProfile: false,
  updateArtistProfileSuccess: false,
  gettingArtistList: false,
  artistList: [],
  oriArtistList: [],
};

const state = {
  ...initialState,
};

const getters = {
  getArtistList: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.artistList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.artistList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
  totalArtist(state) {
    return state.artistList.length;
  },
  newArtistInWeek(state) {
    const artistList = [
      ...state.artistList,
    ];

    return artistList.filter((x) => moment(x.artistCreatedDate).isBetween(moment().startOf('isoWeek'), moment().endOf('isoWeek'))).length;
  },
};

const actions = {
  [GET_ARTIST_LIST]({ commit }, isLoaderNeeded = true) {
    let fullpageLoader = null;
    if (isLoaderNeeded) {
      fullpageLoader = ElLoading.service({
        fullscreen: true,
      });
    }
    commit(GET_ARTIST_LIST_START);
    artistServices.getArtistList().then(
      (data) => {
        /*
        const sortedProducts = data.sort((a, b) => {
          const atime = new Date(a.productCreatedDate).getTime();
          const btime = new Date(b.productCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_PRODUCT_LIST_SUCCESS, sortedProducts);
        */
        const sortedArtists = data.sort((a, b) => {
          const atime = new Date(a.artistCreatedDate).getTime();
          const btime = new Date(b.artistCreatedDate).getTime();
          let val = 0;
          val = btime - atime;
          return val;
        });
        commit(GET_ARTIST_LIST_SUCCESS, sortedArtists);
      },
      () => {
        commit(GET_ARTIST_LIST_FAILURE);
      },
    ).finally(() => {
      if (isLoaderNeeded) {
        fullpageLoader.close();
      }
    });
  },
  [GET_ARTIST]({ commit }, artistId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_ARTIST_PROFILE_START);
    artistServices.getArtist(artistId).then(
      (data) => {
        commit(GET_ARTIST_PROFILE_SUCCESS, data);
      },
      () => {
        commit(GET_ARTIST_PROFILE_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_ARTIST_PROFILE]({ commit }, payload) {
    const { userId, loader } = payload;
    commit(GET_ARTIST_PROFILE_START);
    const fullPageLoader = loader.show();
    artistServices.getArtistProfile(userId).then(
      (data) => {
        commit(GET_ARTIST_PROFILE_SUCCESS, data);
      },
      () => {
        commit(GET_ARTIST_PROFILE_FAILURE);
      },
    ).finally(() => {
      fullPageLoader.hide();
    });
  },
  async [UPDATE_ARTIST_PROFILE]({ commit }, payload) {
    const { artistDetails, callbackFunc } = payload;
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(UPDATE_ARTIST_PROFILE_START);

    await artistServices.updateArtistProfile(artistDetails).then(
      (updateData) => {
        ElMessage.success({
          showClose: true,
          message: "Edit user's profile successfully",
        });
        if (callbackFunc) {
          callbackFunc();
        }
        commit(UPDATE_ARTIST_PROFILE_SUCCESS, updateData);
      },
      () => {
        commit(UPDATE_ARTIST_PROFILE_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_ARTIST_IN_LIST]({ commit, state }, searchKeyword) {
    const artistList = [...state.oriArtistList];
    const searchedList = searchKeyword ?
      artistList.filter((x) => x.artistName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      artistList;
    commit(SEARCHED_ARTIST, searchedList);
  },
  [SORT_ARTISTS]({ commit, state }, sortBy) {
    const artistList = [...state.oriArtistList];
    const sortedArtists = artistList.sort((a, b) => {
      const atime = new Date(a.artistCreatedDate).getTime();
      const btime = new Date(b.artistCreatedDate).getTime();
      let val = 0;
      if (sortBy === 'oldest') {
        val = atime - btime;
      } else {
        val = btime - atime;
      }
      return val;
    });
    commit(SORTED_ARTISTS, sortedArtists);
  },

};

const mutations = {
  [GET_ARTIST_LIST_START](state) {
    state.gettingArtistList = true;
  },
  [GET_ARTIST_LIST_SUCCESS](state, data) {
    state.gettingArtistList = false;
    state.artistList = data;
    state.oriArtistList = data;
  },
  [GET_ARTIST_LIST_FAILURE](state) {
    state.artistList = [];
    state.oriArtistList = [];
    state.gettingArtistList = false;
  },
  [GET_ARTIST_PROFILE_START](state) {
    state.gettingArtistProfile = true;
  },
  [GET_ARTIST_PROFILE_SUCCESS](state, data) {
    state.gettingArtistProfile = false;
    state.artistProfile = {
      ...data[0],
    };
  },
  [GET_ARTIST_PROFILE_FAILURE](state) {
    state.gettingArtistProfile = false;
    state.getArtistProfileFail = true;
  },
  [UPDATE_ARTIST_PROFILE_START](state) {
    state.updatingArtistProfile = true;
    state.updateArtistProfileSuccess = false;
  },
  [UPDATE_ARTIST_PROFILE_SUCCESS](state) {
    state.updatingArtistProfile = false;
    state.updateArtistProfileSuccess = true;
  },
  [UPDATE_ARTIST_PROFILE_FAILURE](state) {
    state.updatingArtistProfile = false;
    state.updateArtistProfileSuccess = false;
  },
  [SEARCHED_ARTIST](state, data) {
    state.artistList = data;
  },
  [SORTED_ARTISTS](state, data) {
    state.artistList = data;
  },
  [RESET_ARTIST_STATE](state) {
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
