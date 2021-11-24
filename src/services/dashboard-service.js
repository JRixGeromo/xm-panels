// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { DashboardApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getCustomers() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/customer/v1/dashboard/customer')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getArtists() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/artist/v1/dashboard/artists')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCharacters() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/product/v1/dashboard/characters')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function getLicensors() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/product/v1/dashboard/licensors')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function getNft() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/product/v1/dashboard/nft')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function getRecentProduct() {
  SetAuthHeader();
  return DashboardApiIni().get('/api/xm/product/v1/dashboard/recentproduct')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getCustomers,
  getArtists,
  getLicensors,
  getCharacters,
  getNft,
  getRecentProduct,
};

export default services;
