// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { ProductApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getProducts() {
  SetAuthHeader();
  return ProductApiIni().get('/api/xm/product/v1/products')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getProduct(productId) {
  SetAuthHeader();
  return ProductApiIni().get(`/api/xm/product/v1/${productId}/product`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getProductProfile(artistUserId) {
  SetAuthHeader();
  return ProductApiIni().get(`/api/xm/product/v1/${artistUserId}/products`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateProduct(productDetails) {
  const body = {
    ...productDetails,
  };
  // delete body.productId;
  SetAuthHeader();
  return ProductApiIni().put(`/api/xm/product/v1/${productDetails.productId}/product`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchProduct(query) {
  SetAuthHeader();
  return ProductApiIni().get(`/api/xm/product/v1/${encodeURIComponent(query)}/products`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createProduct(productDetails) {
  SetAuthHeader();
  return ProductApiIni().post('/api/xm/product/v1/product', productDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createDesign(designDetails) {
  SetAuthHeader();
  return ProductApiIni().post(`/api/xm/product/v1/${designDetails[0].productId}/design`, designDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getDesigns(productId) {
  SetAuthHeader();
  return ProductApiIni().get(`/api/xm/product/v1/design/${productId}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function deleteDesign(designId) {
  SetAuthHeader();
  return ProductApiIni().delete(`/api/xm/product/v1/${designId}/design`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function updateDesign(designDetails) {
  SetAuthHeader();
  return ProductApiIni().put(`/api/xm/product/v1/${designDetails.designId}/design`, designDetails)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createSerialNumber(serialNumberDetails, productId) {
  SetAuthHeader();
  return ProductApiIni().post(`/api/xm/product/v1/${productId}/productserialnumber`, serialNumberDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function deactivateSerialNumber(serialNumberDetails, productId) {
  SetAuthHeader();
  return ProductApiIni().post(`/api/xm/product/v1/${productId}/deactivate`, serialNumberDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

const services = {
  getProducts,
  getProduct,
  getProductProfile,
  updateProduct,
  searchProduct,
  createProduct,
  createDesign,
  getDesigns,
  deleteDesign,
  updateDesign,
  createSerialNumber,
  deactivateSerialNumber,
};

export default services;
