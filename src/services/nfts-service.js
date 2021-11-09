// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { NftsApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getNftsProductsList() {
  SetAuthHeader();
  // /api/xm/product/v1/nft/produts
  return NftsApiIni().get('/api/xm/product/v1/nft/produts')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getNftsList(productId) {
  SetAuthHeader();
  return NftsApiIni().get(`/api/xm/product/v1/${productId}/nft/product/serialnumber`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getNfts(nftsId) {
  SetAuthHeader();
  return NftsApiIni().get(`/api/xm/nfts/v1/nfts/${nftsId}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getNftsDetail(sn) {
  SetAuthHeader();
  return NftsApiIni().get(`/api/xm/product/v1/${sn}/nft/detail`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchNfts(query) {
  SetAuthHeader();
  return NftsApiIni().get(`/api/xm/nfts/v1/${encodeURIComponent(query)}/nftssearch`)
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
  getNftsList,
  getNftsProductsList,
  getNfts,
  getNftsDetail,
  searchNfts,
};

export default services;
