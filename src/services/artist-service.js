// import { ApiIni, SetAuthHeader } from './api';
import { extendAuthCookiesTime } from '@/helpers';
import { ArtistApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function getArtistList() {
  SetAuthHeader();
  return ArtistApiIni().get('/api/xm/artist/v1/artists')
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getArtist(artistId) {
  SetAuthHeader();
  return ArtistApiIni().get(`/api/xm/artist/v1/artist/${artistId}`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function getArtistProfile(artistUserId) {
  SetAuthHeader();
  return ArtistApiIni().get(`/api/xm/artist/v1/${artistUserId}/artistprofile`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateArtistProfile(profileDetails) {
  const body = {
    ...profileDetails,
  };
  delete body.artistId;
  SetAuthHeader();
  return ArtistApiIni().post(`/api/xm/artist/v1/${profileDetails.artistId}/artist`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function updateArtist(profileDetails) {
  const body = {
    ...profileDetails,
  };
  // delete body.artistId;
  SetAuthHeader();
  return ArtistApiIni().put(`/api/xm/artist/v1/${profileDetails.artistId}/artist`, body)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function searchArtist(query) {
  SetAuthHeader();
  return ArtistApiIni().get(`/api/xm/artist/v1/${encodeURIComponent(query)}/artistsearch`)
    .then((response) => {
      extendAuthCookiesTime();
      return response.data;
    })
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

function createArtist(artistDetails) {
  SetAuthHeader();
  return ArtistApiIni().post('/api/xm/artist/v1/artist', artistDetails)
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}
const services = {
  getArtistList,
  getArtist,
  getArtistProfile,
  updateArtistProfile,
  updateArtist,
  searchArtist,
  createArtist,
};

export default services;
