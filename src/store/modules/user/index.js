import userServices from '@/services/user-service';
// import authServices from '@/services/auth-service';
import accessServices from '@/services/access-service';
import artistService from '@/services/artist-service';
import fileUploadServices from '@/services/file-upload-service';
import {
  GET_USER_LIST,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_PASSWORD,
  SEARCH_USER_IN_LIST,
} from '@/store/modules/user/actions-type';
import {
  GET_USER_LIST_START,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  SEARCHED_USER,
} from '@/store/modules/user/mutations-type';
// import { DEFAULT_PROFILE_PICTURE } from '@/common/constants';
import { ElMessage } from 'element-plus';
import router from '@/router';

const state = {
  gettingUserList: false,
  userList: [],
  creatingUser: false,
  updatingUser: false,
  updatingPassword: false,
};

// const initialState = {
//   gettingUserList: false,
//   userList: [],
//   creatingUser: false,
// };

// const state = {
//   ...initialState,
// };

const getters = {
  getUsers: (state) => (parmas) => {
    const paginationDetails = {
      itemPerPage: parmas.itemPerPage,
      totalRecord: state.userList.length,
      currentPage: parmas.currentPage,
    };
    const data = {
      pagination: paginationDetails,
      data: state.userList.slice(
        (parmas.itemPerPage * parmas.currentPage),
        (parmas.itemPerPage * (parmas.currentPage + 1)),
      ),
    };

    return data;
  },
};

const actions = {
  [GET_USER_LIST]({ commit }) {
    commit(GET_USER_LIST_START);
    userServices.getUsers().then(
      (data) => {
        commit(GET_USER_LIST_SUCCESS, data);
      },
      () => {
        commit(GET_USER_LIST_FAILURE);
      },
    );
  },
  async [CREATE_USER]({ commit }, artistDetails) {
    commit(CREATE_USER_START);
    console.log(artistDetails);
    userServices.createUser(artistDetails).then(
      async (data) => {
        const roleDetails = {
          userId: data,
          roleIds: [
            artistDetails.role,
          ],
        };
        if (artistDetails.create === 'artist') {
          // let walletAddress = '';
          // const walletAddress = '';
          /*
          await authServices.createWallet(roleDetails.userId).then((wallet) => {
            // call create wallet
            walletAddress = wallet[0].paymentAddr;
          });
          */

          // upload
          let artistPicUrl = artistDetails.artistDisplayPhotoFilePath;

          if (artistDetails.artistImageFile) {
            await fileUploadServices.uploadFile(artistDetails.artistImageFile).then(
              (uploadData) => {
                artistPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
              },
            );
          }

          let coverPicUrl = artistDetails.artistDisplayBannerFilePath;

          if (artistDetails.artistCoverImageFile) {
            await fileUploadServices.uploadFile(artistDetails.artistCoverImageFile).then(
              (uploadData) => {
                coverPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
              },
            );
          }
          // end of: upload

          // create artist profile
          const artistInfo = {
            artistUserId: data,
            ...artistDetails,
            artistDisplayPhotoFilePath: artistPicUrl,
            artistDisplayBannerFilePath: coverPicUrl,
          };
          // console.log(JSON.stringify(profileDetails));
          const artistInfosArray = [];
          artistInfosArray.push(artistInfo);
          artistService.createArtist(artistInfosArray).then(
            () => {
              accessServices.assignRole(roleDetails).then(
                () => {
                  ElMessage.success({
                    showClose: true,
                    message: 'Created new user successfully',
                  });
                  router.push('/allartists');
                  commit(CREATE_USER_SUCCESS);
                },
                () => {
                  ElMessage.error({
                    showClose: true,
                    message: 'Please contact our customer service.',
                  });
                  commit(CREATE_USER_FAILURE);
                },
              );
            },
            () => {
              ElMessage.error({
                showClose: true,
                message: 'Please contact our customer service.',
              });
              commit(CREATE_USER_FAILURE);
            },
          );
        } else { // only user creation
          accessServices.assignRole(roleDetails).then(
            () => {
              ElMessage.success({
                showClose: true,
                message: 'Created new user successfully',
              });
              // router.push('/userlisting');
              commit(CREATE_USER_SUCCESS);
            },
            () => {
              ElMessage.error({
                showClose: true,
                message: 'Please contact our customer service.',
              });
              commit(CREATE_USER_FAILURE);
            },
          );
        }
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(CREATE_USER_FAILURE);
      },
    );
  },
  async [UPDATE_USER]({ commit }, artistDetails) {
    commit(UPDATE_USER_START);
    console.log(artistDetails);
    userServices.updateUser(artistDetails).then(
      async (data) => {
        // upload
        console.log(JSON.stringify(artistDetails));

        let artistPicUrl = artistDetails.oriArtistImageUrl;

        if (artistDetails.artistImageFile) {
          await fileUploadServices.uploadFile(artistDetails.artistImageFile).then(
            (uploadData) => {
              artistPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
            },
          );
        }

        let coverPicUrl = artistDetails.oriArtistCoverImageUrl;

        if (artistDetails.artistCoverImageFile) {
          await fileUploadServices.uploadFile(artistDetails.artistCoverImageFile).then(
            (uploadData) => {
              coverPicUrl = process.env.VUE_APP_FILE_DOMAIN + uploadData;
            },
          );
        }
        // end of: upload

        // update artist profile
        const artistInfo = {
          artistUserId: data,
          ...artistDetails,
          artistDisplayPhotoFilePath: artistPicUrl,
          artistDisplayBannerFilePath: coverPicUrl,
        };
        // console.log(JSON.stringify(artistInfo));
        artistService.updateArtist(artistInfo).then(
          () => {
            ElMessage.success({
              showClose: true,
              message: 'Created new user successfully',
              data,
            });
            router.push('/allartists');
            commit(UPDATE_USER_SUCCESS);
          },
          () => {
            ElMessage.error({
              showClose: true,
              message: 'Please contact our customer service.',
            });
            commit(UPDATE_USER_FAILURE);
          },
          () => {
            ElMessage.error({
              showClose: true,
              message: 'Please contact our customer service.',
            });
            commit(UPDATE_USER_FAILURE);
          },
        );
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_USER_FAILURE);
      },
    );
  },
  async [UPDATE_PASSWORD]({ commit }, userDetails) {
    commit(UPDATE_PASSWORD_START);
    userServices.updatePassword(userDetails).then(
      () => {
        ElMessage.success({
          showClose: true,
          message: 'Password updated successfully',
        });
        commit(UPDATE_PASSWORD_SUCCESS);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(UPDATE_PASSWORD_FAILURE);
      },
    );
  },
  [SEARCH_USER_IN_LIST]({ commit, state }, searchKeyword) {
    const userList = [...state.oriUserList];
    const searchedList = searchKeyword ?
      userList.filter((x) => x.userName.toLowerCase().includes(searchKeyword.toLowerCase())) :
      userList;
    commit(SEARCHED_USER, searchedList);
  },
};

const mutations = {
  [GET_USER_LIST_START](state) {
    state.gettingUserList = true;
  },
  [GET_USER_LIST_SUCCESS](state, data) {
    state.gettingUserList = false;
    state.userList = data;
    state.oriUserList = data;
  },
  [GET_USER_LIST_FAILURE](state) {
    state.userList = [];
    state.gettingUserList = false;
    state.oriUserList = [];
  },
  [CREATE_USER_START](state) {
    state.creatingUser = true;
  },
  [CREATE_USER_SUCCESS](state) {
    state.creatingUser = false;
  },
  [CREATE_USER_FAILURE](state) {
    state.creatingUser = false;
  },
  [UPDATE_USER_START](state) {
    state.updatingUser = true;
  },
  [UPDATE_USER_SUCCESS](state) {
    state.updatingUser = false;
  },
  [UPDATE_USER_FAILURE](state) {
    state.updatingUser = false;
  },
  [UPDATE_PASSWORD_START](state) {
    state.updatingPassword = true;
  },
  [UPDATE_PASSWORD_SUCCESS](state) {
    state.updatingPassword = false;
  },
  [UPDATE_PASSWORD_FAILURE](state) {
    state.updatingPassword = false;
  },
  [SEARCHED_USER](state, data) {
    state.userList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
