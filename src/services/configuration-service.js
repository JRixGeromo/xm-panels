import { ApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getConfiguration() {
  SetAuthHeader();
  return ApiIni().get('/api/configuration/v1')
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getConfigurationByName(name) {
  SetAuthHeader();
  return ApiIni().get(`/api/configuration/v1/${name}`)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateConfiguration(configDetails) {
  SetAuthHeader();
  return ApiIni().put(`/api/configuration/v1/${configDetails.configurationGroupName}`, configDetails.config)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

const services = {
  getConfiguration,
  getConfigurationByName,
  updateConfiguration,
};

export default services;
