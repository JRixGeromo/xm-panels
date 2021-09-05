// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { LicensorApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getLicensors() {
  SetAuthHeader();
  return LicensorApiIni().get('/api/xm/product/v1/licenses')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getLicensor(licensorId) {
  SetAuthHeader();
  return LicensorApiIni().get(`/api/xm/product/v1/${licensorId}/license`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getLicensorProfile(artistUserId) {
  SetAuthHeader();
  return LicensorApiIni().get(`/api/xm/product/v1/${artistUserId}/license`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateLicensor(licensorDetails) {
  const body = {
    ...licensorDetails,
  };
  // delete body.artistId;
  SetAuthHeader();
  return LicensorApiIni().put(`/api/xm/product/v1/${licensorDetails.licenseId}/license`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchLicensor(query) {
  SetAuthHeader();
  return LicensorApiIni().get(`/api/xm/product/v1/${encodeURIComponent(query)}/license`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createLicensor(licensorDetails) {
  SetAuthHeader();
  return LicensorApiIni().post('/api/xm/product/v1/license', licensorDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getLicensors,
  getLicensor,
  getLicensorProfile,
  updateLicensor,
  searchLicensor,
  createLicensor,
};

export default services;
