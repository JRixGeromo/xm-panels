import relationshipServices from '@/services/relationship-service';
// import authServices from '@/services/auth-service';
// import accessServices from '@/services/access-service';
// import artistService from '@/services/artist-service';
// import fileUploadServices from '@/services/file-upload-service';
import {
  GET_RELATIONSHIP_LIST,
  GET_RELATIONSHIP,
  CREATE_RELATIONSHIP,
  UPDATE_RELATIONSHIP,
  SEARCH_RELATIONSHIP_IN_LIST,
} from '@/store/modules/relationship/actions-type';
import {
  GET_RELATIONSHIP_LIST_START,
  GET_RELATIONSHIP_LIST_SUCCESS,
  GET_RELATIONSHIP_LIST_FAILURE,
  GET_RELATIONSHIP_START,
  GET_RELATIONSHIP_SUCCESS,
  GET_RELATIONSHIP_FAILURE,
  CREATE_RELATIONSHIP_START,
  CREATE_RELATIONSHIP_SUCCESS,
  CREATE_RELATIONSHIP_FAILURE,
  UPDATE_RELATIONSHIP_START,
  UPDATE_RELATIONSHIP_SUCCESS,
  UPDATE_RELATIONSHIP_FAILURE,
  SEARCHED_RELATIONSHIP,
} from '@/store/modules/relationship/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage, ElLoading } from 'element-plus';
// import router from '@/router';

const state = {
  gettingRelationshipList: false,
  relationshipList: [],
  relationshipDetails: [],
  creatingRelationship: false,
  gettingRelationshipDetails: false,
  updatingRelationship: false,
};

// const initialState = {
//   gettingRELATIONSHIPList: false,
//   RELATIONSHIPList: [],
//   creatingRELATIONSHIP: false,
// };

// const state = {
//   ...initialState,
// };

const getters = {
  getRelationships: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.relationshipList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.relationshipList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_RELATIONSHIP_LIST]({ commit }, lincenseId) {
    commit(GET_RELATIONSHIP_LIST_START);
    relationshipServices.getRelationship(lincenseId).then(
      (data) => {
        commit(GET_RELATIONSHIP_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_RELATIONSHIP_LIST_FAILURE);
      },
    );
  },
  [GET_RELATIONSHIP]({ commit }, relationInfo) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_RELATIONSHIP_START);
    relationshipServices.getRelationship(relationInfo).then(
      (data) => {
        commit(GET_RELATIONSHIP_SUCCESS, data);
      },
      () => {
        commit(GET_RELATIONSHIP_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [CREATE_RELATIONSHIP]({ commit }, relationshipDetails) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    const relationships = [];
    if (relationshipDetails.inputs.length > 0) {
      if (relationshipDetails.relationship === 'product') {
        for (let i = 0; i < relationshipDetails.inputs.length; i++) {
          relationships.push({
            product: relationshipDetails.productId,
            relatedProduct: relationshipDetails.inputs[i].relatedProduct,
            relation: relationshipDetails.inputs[i].relation,
          });
        }
      } else {
        for (let i = 0; i < relationshipDetails.inputs.length; i++) {
          relationships.push({
            character: relationshipDetails.characterId,
            relatedCharacter: relationshipDetails.inputs[i].relatedCharacter,
            relation: relationshipDetails.inputs[i].relation,
          });
        }
      }
    }
    alert(JSON.stringify(relationships));
    commit(CREATE_RELATIONSHIP_START);
    relationshipServices.createRelationship(relationships, relationshipDetails.relationship).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Relationship created successfully',
        });
        commit(CREATE_RELATIONSHIP_SUCCESS);
        // router.push('/allproducts');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_RELATIONSHIP_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  async [UPDATE_RELATIONSHIP]({ commit }, criteria) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(UPDATE_RELATIONSHIP_START);
    relationshipServices.deleteRelationship(criteria).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Relationship deleted successfully',
        });
        commit(UPDATE_RELATIONSHIP_SUCCESS);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_RELATIONSHIP_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [SEARCH_RELATIONSHIP_IN_LIST]({ commit, state }, searchKeyword) {
    const relationshipList = [...state.oriRelationshipList];
    const searchedList = searchKeyword ?
      relationshipList.filter((x) => x.relationshipName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      relationshipList;
    commit(SEARCHED_RELATIONSHIP, searchedList);
  },
};

const mutations = {
  [GET_RELATIONSHIP_LIST_START](state) {
    state.gettingRelationshipList = true;
  },
  [GET_RELATIONSHIP_LIST_SUCCESS](state, data) {
    state.gettingRelationshipList = false;
    state.relationshipList = data;
    state.oriRelationshipList = data;
  },
  [GET_RELATIONSHIP_LIST_FAILURE](state) {
    state.relationshipList = [];
    state.gettingRelationshipList = false;
    state.oriRelationshipList = [];
  },
  [GET_RELATIONSHIP_START](state) {
    state.gettingRelationshipDetails = true;
  },
  [GET_RELATIONSHIP_SUCCESS](state, data) {
    state.gettingRelationshipDetails = false;
    state.relationshipDetails = data;
    state.oriRelationship = data;
  },
  [GET_RELATIONSHIP_FAILURE](state) {
    state.relationshipDetails = [];
    state.gettingRelationshipDetails = false;
    state.oriRelationship = [];
  },
  [CREATE_RELATIONSHIP_START](state) {
    state.creatingRelationship = true;
  },
  [CREATE_RELATIONSHIP_SUCCESS](state) {
    state.creatingRelationship = false;
  },
  [CREATE_RELATIONSHIP_FAILURE](state) {
    state.creatingRelationship = false;
  },
  [UPDATE_RELATIONSHIP_START](state) {
    state.updatingPassword = true;
  },
  [UPDATE_RELATIONSHIP_SUCCESS](state) {
    state.updatingPassword = false;
  },
  [UPDATE_RELATIONSHIP_FAILURE](state) {
    state.updatingPassword = false;
  },
  [SEARCHED_RELATIONSHIP](state, data) {
    state.relationshipList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
