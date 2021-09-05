import { ApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getUsers() {
  SetAuthHeader();
  return ApiIni().get('/api/user/v1')
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createUser(newUser) {
  SetAuthHeader();
  return ApiIni().post('/api/user/v1', newUser)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateUser(userInfo) {
  SetAuthHeader();
  return ApiIni().put(`/api/user/v1/${userInfo.artistUserId}`, userInfo)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updatePassword(userInfo) {
  SetAuthHeader();
  return ApiIni().put(`/api/user/v1/${userInfo.userId}/updatesecret`, userInfo)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

const services = {
  getUsers,
  createUser,
  updateUser,
  updatePassword,
};

export default services;
