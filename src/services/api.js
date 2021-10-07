import axios from 'axios';
import { getAuthToken, removeAuthInfo } from '@/helpers';
// import {
//   GENERIC_API_DOMAIN,
//   CARDANO_API_DOMAIN,
//   ARTIST_API_DOMAIN,
//   ART_API_DOMAIN,
//   TRANSACTION_API_DOMAIN,
// } from '@/common/constants';

export function ApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_GENERIC_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function SetAuthHeader() {
  // if (getAuthToken() !== null) axios.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
  axios.defaults.headers.common.Authorization = `Bearer ${getAuthToken()}`;
}
export function ArtistApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function LicensorApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function CharacterApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function RelationshipApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function ProductApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function ProductAutographApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_BSG_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function DesignPreviewApiIni() {
  return (
    axios.create({
      baseURL: process.env.VUE_APP_LOADING_API_DOMAIN,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
}
export function CheckAuthStatus(response) {
  if (response.status === 403) {
    removeAuthInfo();
    window.location.reload();
  }
}
