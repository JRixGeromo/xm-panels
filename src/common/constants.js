const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_ID = 'auth_id';
const ADMIN_ROLE = 'XM Admin';

// const DEFAULT_PROFILE_PICTURE = 'https://fileupload.bsg-api.tk/api/uploads/v1/af553d95-60a3-4c40-8d08-aa75158178f1';

const DEFAULT_PROFILE_PICTURE = `${process.env.VUE_APP_FILE_DOMAIN}/af553d95-60a3-4c40-8d08-aa75158178f1`;

const ARTWORKS_SIZE = 100 * 1024 * 1024; // Convert MB to Byte
const ARTWORKS_SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/avif',
  'image/apng',
  'video/x-flv',
  'video/mp4',
  'application/x-mpegURL',
  'video/MP2T',
  'video/3gpp',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
];
const IMAGE_FORMAT = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/avif',
  'image/apng',
];
const VIDEO_FORMAT = [
  'video/x-flv',
  'video/mp4',
  'application/x-mpegURL',
  'video/MP2T',
  'video/3gpp',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
];
const NAV_MENU = [
  {
    name: 'Home',
    route: '/',
    icon: 'xm-el-icon-s-home',
    child: false,
  },
  /* {
    name: 'Art Listing',
    route: '/artworklisting',
    icon: 'xm-el-icon-picture',
    child: false,
  },
  {
    name: 'Page',
    child: true,
    icon: 'xm-el-icon-licensor',
    subNav: [
      {
        name: 'Page List',
        route: '/pagelisting',
      },
      {
        name: 'Create Page',
        route: '/createpage',
      },
    ],
  },
  {
    name: 'Configuration',
    icon: 'xm-el-icon-s-settings',
    child: true,
    subNav: [
      {
        name: 'Platform',
        route: '/configuration',
      },
      {
        name: 'Wallet',
        route: '/wallet',
      },
      {
        name: 'Navigation',
        route: '/navigation',
      },
      {
        name: 'Category',
        route: '/productcategory',
      },
      {
        name: 'Footer',
        route: '/footer',
      },
    ],
  }, */
  {
    name: 'Manage Products',
    route: '/allproducts',
    icon: 'xm-el-icon-s-product',
    child: false,
  },
  {
    name: 'Manage NFTs',
    route: '/managenfts',
    icon: 'xm-el-icon-s-nft',
    child: false,
  },
  {
    name: 'Manage Customers',
    route: '/allcustomers',
    icon: 'xm-el-icon-s-customer',
    child: false,
  },
  {
    name: 'Manage Artists',
    route: '/allartists',
    icon: 'xm-el-icon-s-artist',
    child: false,
  },
  {
    name: 'Manage Licensors',
    route: '/alllicensors',
    icon: 'xm-el-icon-s-licensor',
    child: false,
  },
  {
    name: 'Settings',
    route: '/settings',
    icon: 'xm-el-icon-s-settings',
    child: false,
  },
  {
    name: 'User',
    child: true,
    icon: 'xm-el-icon-s-user',
    subNav: [
      {
        name: 'User List',
        route: '/userlisting',
      },
      {
        name: 'Create User',
        route: '/createuser',
      },
    ],
  },
  {
    name: 'Role',
    child: true,
    icon: 'xm-el-icon-s-licensor',
    subNav: [
      {
        name: 'Role List',
        route: '/rolelisting',
      },
      {
        name: 'Create Role',
        route: '/createrole',
      },
    ],
  },
  {
    name: 'Logout',
    route: '/logout',
    icon: 'xm-el-icon-s-logout',
    child: false,
  },
];

export {
  AUTH_TOKEN_KEY,
  AUTH_ID,
  ADMIN_ROLE,
  DEFAULT_PROFILE_PICTURE,
  ARTWORKS_SIZE,
  ARTWORKS_SUPPORTED_FORMATS,
  IMAGE_FORMAT,
  VIDEO_FORMAT,
  NAV_MENU,
};
