// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { ProductAutographApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getProductAutographList($status) {
  SetAuthHeader();
  return ProductAutographApiIni().get(`/api/xm/product/v1/productautograph/${$status}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateProductAutographStatus(autographInfo) {
  SetAuthHeader();
  return ProductAutographApiIni()
    .put(`/api/xm/product/v1/${autographInfo.productAutographId}/productautograph/${autographInfo.status}`, autographInfo)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchProductAutograph(query) {
  SetAuthHeader();
  return ProductAutographApiIni().get(`/api/xm/artist/v1/${encodeURIComponent(query)}/artistsearch`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createProductAutograph(artistDetails) {
  SetAuthHeader();
  return ProductAutographApiIni().post('/api/xm/artist/v1/artist', artistDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getProductAutographList,
  updateProductAutographStatus,
  searchProductAutograph,
  createProductAutograph,
};

export default services;
