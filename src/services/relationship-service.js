// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { SetAuthHeader, CheckAuthStatus, RelationshipApiIni } from './api';

function getRelationships() {
  SetAuthHeader();
  return RelationshipApiIni().get('/api/xm/product/v1/relationships')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getRelationship(relationInfo) {
  let relation = 'characterrelation';
  if (relationInfo.relation === 'product') {
    relation = 'productrelation';
  }
  SetAuthHeader();
  return RelationshipApiIni().get(`/api/xm/product/v1/${relation}/${relationInfo.id}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getRelationshipProfile(artistUserId) {
  SetAuthHeader();
  return RelationshipApiIni().get(`/api/xm/product/v1/${artistUserId}/relationship`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createRelationship(relationshipDetails, relationship) {
  console.log(relationshipDetails);
  SetAuthHeader();
  let relation = 'characterrelation';
  if (relationship === 'product') {
    relation = 'productrelation';
  }
  return RelationshipApiIni().post(`/api/xm/product/v1/${relation}`, relationshipDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function defaultRelationship(productId) {
  SetAuthHeader();
  return RelationshipApiIni().post(`/api/xm/product/v1/${productId}/defaultrelation`)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
function deleteRelationship(relationshipDetails) {
  SetAuthHeader();
  let relation = 'characterrelation';
  if (relationshipDetails.relation === 'product') {
    relation = 'productrelation';
  }
  console.log('HERE');
  console.log(relationshipDetails);
  return RelationshipApiIni().delete(`/api/xm/product/v1/${relationshipDetails.relation_uuid}/${relation}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchRelationship(query) {
  SetAuthHeader();
  return RelationshipApiIni().get(`/api/xm/product/v1/${encodeURIComponent(query)}/relationship`)
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
  getRelationships,
  getRelationship,
  getRelationshipProfile,
  deleteRelationship,
  searchRelationship,
  createRelationship,
  defaultRelationship,
};

export default services;
