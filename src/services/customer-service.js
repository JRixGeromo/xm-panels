// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { CustomerApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getCustomers() {
  SetAuthHeader();
  return CustomerApiIni().get('api/xm/customer/v1/customers')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProducts(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`api/xm/customer/v1/customer/${customerId}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProductSerial(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`api/xm/product/v1/productserialnumber/${customerId}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProductsRecentPurchase(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`api/xm/customer/v1/${customerId}/recentpurchase`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProductsOwned(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`api/xm/product/v1/productserialnumber/${customerId}/owned`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProductsTransferred(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`api/xm/product/v1/productserialnumber/${customerId}/transferred`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProductsPurchaseHistories(customerId) {
  SetAuthHeader();
  return CustomerApiIni().get(`/api/xm/customer/v1/${customerId}/purchasehistories`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCustomerProfile(artistUserId) {
  SetAuthHeader();
  return CustomerApiIni().get(`/api/xm/product/v1/${artistUserId}/customer`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateCustomer(customerDetails) {
  const body = {
    ...customerDetails,
  };
  // delete body.artistId;
  SetAuthHeader();
  return CustomerApiIni().put(`/api/xm/product/v1/${customerDetails.customerId}/customer`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchCustomer(query) {
  SetAuthHeader();
  return CustomerApiIni().get(`/api/xm/product/v1/${encodeURIComponent(query)}/customer`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createCustomer(customerDetails) {
  SetAuthHeader();
  return CustomerApiIni().post('/api/xm/product/v1/customer', customerDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getCustomers,
  getCustomerProducts,
  getCustomerProductSerial,
  getCustomerProductsRecentPurchase,
  getCustomerProductsOwned,
  getCustomerProductsTransferred,
  getCustomerProductsPurchaseHistories,
  getCustomerProfile,
  updateCustomer,
  searchCustomer,
  createCustomer,
};

export default services;
