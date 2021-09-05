import { ApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function uploadFile(file) {
  SetAuthHeader();
  const formData = new FormData();
  formData.append('file', file);

  return ApiIni().post('/api/uploads/v1/xm', formData, {
    headers: {
      Accept: 'multipart/form-data',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      throw error.response.data;
    });
}

const services = {
  uploadFile,
};

export default services;
