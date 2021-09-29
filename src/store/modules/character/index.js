import characterServices from '@/services/character-service';
// import authServices from '@/services/auth-service';
// import accessServices from '@/services/access-service';
// import artistService from '@/services/artist-service';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_CHARACTER_LIST,
  GET_CHARACTER,
  CREATE_CHARACTER,
  UPDATE_CHARACTER,
  SEARCH_CHARACTER_IN_LIST,
} from '@/store/modules/character/actions-type';
import {
  GET_CHARACTER_LIST_START,
  GET_CHARACTER_LIST_SUCCESS,
  GET_CHARACTER_LIST_FAILURE,
  GET_CHARACTER_START,
  GET_CHARACTER_SUCCESS,
  GET_CHARACTER_FAILURE,
  CREATE_CHARACTER_START,
  CREATE_CHARACTER_SUCCESS,
  CREATE_CHARACTER_FAILURE,
  UPDATE_CHARACTER_START,
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE,
  SEARCHED_CHARACTER,
} from '@/store/modules/character/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';
// import router from '@/router';

const state = {
  gettingCharacterList: false,
  characterList: [],
  characterDetails: [],
  creatingCharacter: false,
  gettingCharacterDetails: false,
  updatingCharacter: false,
  newCharacterId: '',
  deleteSuccess: false,
};

// const initialState = {
//   gettingCHARACTERList: false,
//   CHARACTERList: [],
//   creatingCHARACTER: false,
// };

// const state = {
//   ...initialState,
// };

const getters = {
  getCharacters: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.characterList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.characterList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_CHARACTER_LIST]({ commit }, lincenseId) {
    commit(GET_CHARACTER_LIST_START);
    characterServices.getCharacter(lincenseId).then(
      (data) => {
        commit(GET_CHARACTER_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_CHARACTER_LIST_FAILURE);
      },
    );
  },
  [GET_CHARACTER]({ commit }, characterId) {
    // const fullpageLoader = ElLoading.service({
    //   fullscreen: true,
    // });
    commit(GET_CHARACTER_START);
    characterServices.getCharacter(characterId).then(
      (data) => {
        commit(GET_CHARACTER_SUCCESS, data);
      },
      () => {
        commit(GET_CHARACTER_FAILURE);
      },
    );
    // .finally(() => {
    //   fullpageLoader.close();
    // });
  },
  async [CREATE_CHARACTER]({ commit }, characterDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    const characterDetailsSource = [];
    characterDetailsSource.push(characterDetails);
    commit(CREATE_CHARACTER_START);
    characterServices.createCharacter(characterDetailsSource).then(
      (data) => {
        ElMessage.success({
          showClose: true,
          message: 'Character created successfully',
        });
        commit(CREATE_CHARACTER_SUCCESS, data);
        // router.push('/allcharacters');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_CHARACTER_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [UPDATE_CHARACTER]({ commit }, characterDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(UPDATE_CHARACTER_START);
    characterServices.deleteCharacter(characterDetails).then(
      (data) => {
        ElMessage.success({
          showClose: true,
          message: 'Character deleted successfully',
        });
        commit(UPDATE_CHARACTER_SUCCESS, data);
        // router.push('/allcharacters');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_CHARACTER_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_CHARACTER_IN_LIST]({ commit, state }, searchKeyword) {
    const characterList = [...state.oriCharacterList];
    const searchedList = searchKeyword ?
      characterList.filter((x) => x.characterName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      characterList;
    commit(SEARCHED_CHARACTER, searchedList);
  },
};

const mutations = {
  [GET_CHARACTER_LIST_START](state) {
    state.gettingCharacterList = true;
  },
  [GET_CHARACTER_LIST_SUCCESS](state, data) {
    state.gettingCharacterList = false;
    state.characterList = data;
    state.oriCharacterList = data;
  },
  [GET_CHARACTER_LIST_FAILURE](state) {
    state.characterList = [];
    state.gettingCharacterList = false;
    state.oriCharacterList = [];
  },
  [GET_CHARACTER_START](state) {
    state.gettingCharacterDetails = true;
  },
  [GET_CHARACTER_SUCCESS](state, data) {
    state.gettingCharacterDetails = false;
    state.characterDetails = data;
    state.oriCharacter = data;
  },
  [GET_CHARACTER_FAILURE](state) {
    state.characterDetails = [];
    state.gettingCharacterDetails = false;
    state.oriCharacter = [];
  },
  [CREATE_CHARACTER_START](state) {
    state.creatingCharacter = true;
  },
  [CREATE_CHARACTER_SUCCESS](state, data) {
    state.creatingCharacter = false;
    state.newCharacterId = data;
  },
  [CREATE_CHARACTER_FAILURE](state) {
    state.creatingCharacter = false;
  },
  [UPDATE_CHARACTER_START](state) {
    state.updatingPassword = true;
  },
  [UPDATE_CHARACTER_SUCCESS](state) {
    state.updatingPassword = false;
  },
  [UPDATE_CHARACTER_FAILURE](state) {
    state.updatingPassword = false;
  },
  [SEARCHED_CHARACTER](state, data) {
    state.characterList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
