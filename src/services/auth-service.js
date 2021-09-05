import { ApiIni, SetAuthHeader } from './api';

function login(loginCredentials) {
  return ApiIni().post('/api/user/v1/auth', loginCredentials)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function logout() {
  SetAuthHeader();
  return ApiIni().post('/api/user/v1/session/terminate')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  login,
  logout,
};

export default services;
