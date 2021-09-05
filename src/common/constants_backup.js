const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_ID = 'auth_id';
const ADMIN_ROLE = 'Openpot Admin';
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
    name: 'Dashboard',
    route: '/',
    icon: 'el-icon-s-platform',
    child: false,
  },
  {
    name: 'User',
    child: true,
    icon: 'el-icon-user-solid',
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
    icon: 'el-icon-s-management',
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
];

export {
  AUTH_TOKEN_KEY,
  AUTH_ID,
  ADMIN_ROLE,
  IMAGE_FORMAT,
  VIDEO_FORMAT,
  NAV_MENU,
};
