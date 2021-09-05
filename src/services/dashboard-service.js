import { TransactionApiIni, ArtApiIni, ArtistApiIni } from './api';

function getUserDashboard() {
  return ArtistApiIni().get('/api/openpot/artist/v1/artist/dashboardcount')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function userChart() {
  return ArtistApiIni().get('/api/openpot/artist/v1/artist/dashboardchart')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getArtworkDashboard() {
  return ArtApiIni().get('/api/openpot/art/v1/arts/dashboardcount')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function artworkChart() {
  return ArtApiIni().get('/api/openpot/art/v1/arts/dashboardchart')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function transactionAmountChart() {
  return TransactionApiIni().get('/api/openpot/transaction/v1/dashboardchart')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  getUserDashboard,
  userChart,
  getArtworkDashboard,
  artworkChart,
  transactionAmountChart,
};

export default services;
