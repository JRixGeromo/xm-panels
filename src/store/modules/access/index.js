import accessServices from '@/services/access-service';
import {
  GET_PERMISSION_LIST,
  GET_ROLE_LIST,
  CREATE_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  EDIT_USER_ROLE,
  GET_USER_ROLE,
  ASSIGN_ROLE,
} from '@/store/modules/access/actions-type';
import {
  GET_PERMISSION_LIST_START,
  GET_PERMISSION_LIST_SUCCESS,
  GET_PERMISSION_LIST_FAILURE,
  GET_ROLE_LIST_START,
  GET_ROLE_LIST_SUCCESS,
  GET_ROLE_LIST_FAILURE,
  CREATE_ROLE_START,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  EDIT_ROLE_START,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAILURE,
  DELETE_ROLE_START,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  EDIT_USER_ROLE_START,
  EDIT_USER_ROLE_SUCCESS,
  EDIT_USER_ROLE_FAILURE,
  GET_USER_ROLE_START,
  GET_USER_ROLE_SUCCESS,
  GET_USER_ROLE_FAILURE,
  ASSIGN_ROLE_START,
  ASSIGN_ROLE_SUCCESS,
  ASSIGN_ROLE_FAILURE,
} from '@/store/modules/access/mutations-type';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router';

const state = {
  gettingPermissionList: false,
  permissionList: [],
  gettingRoleList: false,
  roleList: [],
  updatingRole: false,
  deletingRoleId: null,
  deletingRole: false,
  updatingUserRole: false,
  userUpdated: false,
  gettingUserRole: false,
  userRole: null,
};

const getters = {
  getRoleList: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.roleList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.roleList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };
    return data;
  },
};

const actions = {
  [GET_PERMISSION_LIST]({ commit }) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_PERMISSION_LIST_START);
    accessServices.getPermission().then(
      (data) => {
        commit(GET_PERMISSION_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_PERMISSION_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [GET_ROLE_LIST]({ commit }) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_ROLE_LIST_START);
    accessServices.getRole().then(
      (data) => {
        commit(GET_ROLE_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_ROLE_LIST_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [CREATE_ROLE]({ commit }, roleDetail) {
    commit(CREATE_ROLE_START);
    accessServices.createRole(roleDetail).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Role created successfully',
        });
        commit(CREATE_ROLE_SUCCESS);
        router.push('rolelisting');
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_ROLE_FAILURE);
      },
    );
  },
  [EDIT_ROLE]({ commit }, payload) {
    const { roleDetail, successEditCallback } = payload;
    commit(EDIT_ROLE_START);
    accessServices.editRole(roleDetail).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Role created successfully',
        });
        commit(EDIT_ROLE_SUCCESS);
        successEditCallback();
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(EDIT_ROLE_FAILURE);
      },
    );
  },
  [DELETE_ROLE]({ commit }, payload) {
    const { id, successCallback } = payload;
    commit(DELETE_ROLE_START, id);
    accessServices.deleteRole(id).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Role deleted successfully',
        });
        commit(DELETE_ROLE_SUCCESS);
        successCallback();
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(DELETE_ROLE_FAILURE);
      },
    );
  },
  [EDIT_USER_ROLE]({ commit }, payload) {
    ElLoading.service({
      fullscreen: true,
    });
    let authId = payload.authorizationId;
    if (authId === '-') {
      const roleDetails = {
        userId: payload.userId,
        ...payload.roleDetail,
      };
      commit(ASSIGN_ROLE_START);
      accessServices.assignRole(roleDetails).then(
        (data) => {
          authId = data;
          commit(ASSIGN_ROLE_SUCCESS);
        },
        () => {
          commit(ASSIGN_ROLE_FAILURE);
        },
      );
    } else {
      commit(EDIT_USER_ROLE_START);
      accessServices.editUserAuthorization(payload.roleDetail, payload.authorizationId).then(
        () => {
          /*
          ElMessage.success({
            showClose: true,
            message: 'Role updated successfully',
          });
          */
          commit(EDIT_USER_ROLE_SUCCESS);
        },
        (error) => {
          ElMessage.error({
            showClose: true,
            message: error,
          });
          commit(EDIT_USER_ROLE_FAILURE);
        },
      );
    }
  },
  [GET_USER_ROLE]({ commit }, userId) {
    const fullpageLoader = ElLoading.service({
      fullscreen: true,
    });
    commit(GET_USER_ROLE_START);
    accessServices.getUserAuthorization(userId).then(
      (data) => {
        commit(GET_USER_ROLE_SUCCESS, data);
      },
      () => {
        commit(GET_USER_ROLE_FAILURE);
      },
    ).finally(() => {
      fullpageLoader.close();
    });
  },
  [ASSIGN_ROLE]({ commit }, roleDetail) {
    commit(ASSIGN_ROLE_START);
    accessServices.assignRole(roleDetail).then(
      () => {
        commit(ASSIGN_ROLE_SUCCESS);
      },
      () => {
        commit(ASSIGN_ROLE_FAILURE);
      },
    );
  },
};

const mutations = {
  [GET_PERMISSION_LIST_START](state) {
    state.gettingPermissionList = true;
    state.permissionList = [];
  },
  [GET_PERMISSION_LIST_SUCCESS](state, data) {
    state.gettingPermissionList = false;
    state.permissionList = data;
  },
  [GET_PERMISSION_LIST_FAILURE](state) {
    state.gettingPermissionList = false;
  },
  [GET_ROLE_LIST_START](state) {
    state.gettingRoleList = true;
    state.roleList = [];
  },
  [GET_ROLE_LIST_SUCCESS](state, data) {
    state.gettingRoleList = false;
    state.roleList = data;
  },
  [GET_ROLE_LIST_FAILURE](state) {
    state.gettingRoleList = false;
  },
  [CREATE_ROLE_START](state) {
    state.creatingRole = true;
  },
  [CREATE_ROLE_SUCCESS](state) {
    state.creatingRole = false;
  },
  [CREATE_ROLE_FAILURE](state) {
    state.creatingRole = false;
  },
  [EDIT_ROLE_START](state) {
    state.updatingRole = true;
  },
  [EDIT_ROLE_SUCCESS](state) {
    state.updatingRole = false;
  },
  [EDIT_ROLE_FAILURE](state) {
    state.updatingRole = false;
  },
  [DELETE_ROLE_START](state, roleId) {
    state.deletingRole = true;
    state.deletingRoleId = roleId;
  },
  [DELETE_ROLE_SUCCESS](state) {
    state.deletingRole = false;
  },
  [DELETE_ROLE_FAILURE](state) {
    state.deletingRole = false;
  },
  [EDIT_USER_ROLE_START](state) {
    state.updatingUserRole = true;
    state.userUpdated = false;
  },
  [EDIT_USER_ROLE_SUCCESS](state) {
    state.updatingUserRole = false;
    state.userUpdated = true;
  },
  [EDIT_USER_ROLE_FAILURE](state) {
    state.updatingUserRole = false;
    state.userUpdated = false;
  },
  [GET_USER_ROLE_START](state) {
    state.gettingUserRole = true;
    state.userRole = null;
  },
  [GET_USER_ROLE_SUCCESS](state, data) {
    state.gettingUserRole = false;
    state.userRole = data;
  },
  [GET_USER_ROLE_FAILURE](state) {
    state.gettingUserRole = false;
  },
  [ASSIGN_ROLE_START](state) {
    state.userUpdated = false;
  },
  [ASSIGN_ROLE_SUCCESS](state) {
    state.userUpdated = true;
  },
  [ASSIGN_ROLE_FAILURE](state) {
    state.userUpdated = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
