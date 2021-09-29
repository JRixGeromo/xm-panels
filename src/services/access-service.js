import { ApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getPermission() {
  SetAuthHeader();
  return ApiIni().get('/api/access/v1/permission')
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getRole() {
  SetAuthHeader();
  return ApiIni().get('/api/access/v1/role')
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createRole(roleDetails) {
  SetAuthHeader();
  return ApiIni().post('/api/access/v1/role', roleDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function editRole(roleDetails) {
  SetAuthHeader();
  return ApiIni().put(`/api/access/v1/role/${roleDetails.roleId}`, roleDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function deleteRole(roleId) {
  SetAuthHeader();
  return ApiIni().delete(`/api/access/v1/role/${roleId}`)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function assignRole(roleDetails) {
  SetAuthHeader();
  return ApiIni().post('/api/access/v1/authorization', roleDetails)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getUserAuthorization(userId) {
  SetAuthHeader();
  return ApiIni().get(`/api/access/v1/authorization/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function editUserAuthorization(userRole, authorizationId) {
  SetAuthHeader();
  return ApiIni().put(`/api/access/v1/authorization/${authorizationId}`, userRole)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

const services = {
  getPermission,
  getRole,
  createRole,
  editRole,
  deleteRole,
  assignRole,
  getUserAuthorization,
  editUserAuthorization,
};

export default services;
