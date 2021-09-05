import { VueCookieNext } from 'vue-cookie-next';
import { AUTH_TOKEN_KEY, AUTH_ID, ADMIN_ROLE } from '@/common/constants';

export function isLoggin() {
  const authToken = VueCookieNext.getCookie(AUTH_TOKEN_KEY);

  if (authToken === null) return false;
  return true;
}

export function getAuthToken() {
  return VueCookieNext.getCookie(AUTH_TOKEN_KEY);
}

export function getAuthID() {
  return VueCookieNext.getCookie(AUTH_ID);
}

export function saveAuthInfo(authInfo) {
  VueCookieNext.setCookie(AUTH_TOKEN_KEY, authInfo.token);
  VueCookieNext.setCookie(AUTH_ID, authInfo);
}

export function removeAuthInfo() {
  VueCookieNext.removeCookie(AUTH_ID);
  VueCookieNext.removeCookie(AUTH_TOKEN_KEY);
}

export function nonAuthenticatedRoute(to, from, next) {
  if (isLoggin()) {
    next(from.fullPath);
  } else next();
}

export function authenticatedRoute(to, from, next) {
  if (isLoggin()) {
    next();
  } else {
    next('/login');
  }
}

export function extendAuthCookiesTime() {
  const authToken = VueCookieNext.getCookie(AUTH_TOKEN_KEY);
  const authId = VueCookieNext.getCookie(AUTH_ID);

  if (authId !== null && authToken !== null) {
    VueCookieNext.setCookie(AUTH_TOKEN_KEY, authToken, {
      expire: '2h',
    });
    VueCookieNext.setCookie(AUTH_ID, authId, {
      expire: '2h',
    });
  }
}

export function checkIsAdminRole(authInfo) {
  const adminRole = authInfo.roles.find((x) => x === ADMIN_ROLE);
  if (typeof adminRole === 'undefined') {
    return false;
  }

  return true;
}

export function randomPassword(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
