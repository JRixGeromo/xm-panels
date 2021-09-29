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

function getRelationship(relationshipId) {
  SetAuthHeader();
  return RelationshipApiIni().get(`/api/xm/product/v1/characterrelation/${relationshipId}`)
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

function createRelationship(relationshipDetails) {
  SetAuthHeader();
  return RelationshipApiIni().post('/api/xm/product/v1/characterrelation', relationshipDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function deleteRelationship(relationshipDetails) {
  SetAuthHeader();
  return RelationshipApiIni().delete(`/api/xm/product/v1/${relationshipDetails.characterRelationId}/characterrelation`)
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
};

export default services;
