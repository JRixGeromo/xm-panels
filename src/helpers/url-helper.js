// eslint-disable-next-line import/prefer-default-export
export function getUrlParams(params) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(params);
}
