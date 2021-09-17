// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { CharacterApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getCharacters() {
  SetAuthHeader();
  return CharacterApiIni().get('/api/xm/product/v1/characters')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCharacter(characterId) {
  SetAuthHeader();
  return CharacterApiIni().get(`/api/xm/product/v1/${characterId}/characters`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getCharacterProfile(artistUserId) {
  SetAuthHeader();
  return CharacterApiIni().get(`/api/xm/product/v1/${artistUserId}/character`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateCharacter(characterDetails) {
  const body = {
    ...characterDetails,
  };
  // delete body.artistId;
  SetAuthHeader();
  return CharacterApiIni().put(`/api/xm/product/v1/${characterDetails.characterId}/character`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchCharacter(query) {
  SetAuthHeader();
  return CharacterApiIni().get(`/api/xm/product/v1/${encodeURIComponent(query)}/character`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createCharacter(characterDetails) {
  SetAuthHeader();
  return CharacterApiIni().post('/api/xm/product/v1/character', characterDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getCharacters,
  getCharacter,
  getCharacterProfile,
  updateCharacter,
  searchCharacter,
  createCharacter,
};

export default services;
