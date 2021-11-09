import { createRouter, createWebHistory } from 'vue-router';
import { nonAuthenticatedRoute, authenticatedRoute } from '@/helpers';

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "login" */ '../views/home/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: [nonAuthenticatedRoute],
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/createuser',
    name: 'User Create',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UserCreate.vue'),
  },
  {
    path: '/userlisting',
    name: 'User Listing',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UserListing.vue'),
  },
  {
    path: '/userprofile/:id',
    name: 'User Profile',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UserProfile.vue'),
  },
  {
    path: '/createrole',
    name: 'Role Create',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/access/RoleCreate.vue'),
  },
  {
    path: '/rolelisting',
    name: 'Role Listing',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/access/RoleListing.vue'),
  },
  {
    path: '/allproducts',
    name: 'Manage Products',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/products/AllProducts.vue'),
    // children: [
    //   {
    //     path: 'create',
    //     component: () => import(/* webpackChunkName: "user" */ '../views/products/CreateProduct.vue'),
    //   },
    // ],
  },
  {
    // path: '/product/:id',
    path: '/product/:id',
    name: 'Product Details',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/products/Product.vue'),
    children: [
      {
        path: 'details',
        component: () => import(/* webpackChunkName: "user" */ '../views/products/ProductDetails.vue'),
      },
      {
        path: 'sustainability',
        component: () => import(/* webpackChunkName: "user" */ '../views/products/ProductSustainabilityReport.vue'),
      },
      {
        path: 'designs',
        // props: true,
        component: () => import(/* webpackChunkName: "user" */ '../views/products/ProductDesigns.vue'),
      },
      {
        path: 'serialnumbers',
        component: () => import(/* webpackChunkName: "user" */ '../views/products/ProductSerialNumbers.vue'),
      },
    ],
  },
  {
    path: '/create',
    name: 'Create Product',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/products/Product.vue'),
    children: [
      {
        path: 'product',
        component: () => import(/* webpackChunkName: "user" */ '../views/products/CreateProduct.vue'),
      },
    ],
  },
  {
    path: '/managenfts',
    name: 'Manage NFTs',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/nfts/NftsProducts.vue'),
  },
  {
    path: '/managenfts/:id',
    name: 'NFTs',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/nfts/Nfts.vue'),
    // children: [
    //   {
    //     path: 'list',
    //     component: () => import(/* webpackChunkName: "user" */ '../views/nfts/NftsDetails.vue'),
    //   },
    // ],
  },
  {
    path: '/allcustomers',
    name: 'Manage Customers',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/customers/AllCustomers.vue'),
  },
  {
    // path: '/artist/:id',
    path: '/customers/:id',
    name: 'Customer Details',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/customers/Customer.vue'),
    children: [
      {
        path: 'details',
        component: () => import(/* webpackChunkName: "user" */ '../views/customers/CustomerDetails.vue'),
      },
    ],
  },
  {
    path: '/allartists',
    name: 'Manage Artists',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/artists/AllArtists.vue'),
  },
  {
    // path: '/artist/:id',
    path: '/artists/:id',
    name: 'Artist Details',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/artists/Artist.vue'),
    children: [
      {
        path: 'details',
        component: () => import(/* webpackChunkName: "user" */ '../views/artists/ArtistDetails.vue'),
      },
    ],
  },
  {
    path: '/create',
    name: 'Create Artist',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/artists/Artist.vue'),
    children: [
      {
        path: 'artist',
        component: () => import(/* webpackChunkName: "user" */ '../views/artists/CreateArtist.vue'),
      },
    ],
  },
  {
    path: '/alllicensors',
    name: 'Manage Licensors',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/licensors/AllLicensors.vue'),
  },
  {
    // path: '/artist/:id',
    path: '/licensor/:id',
    name: 'Licensor Details',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/licensors/Licensor.vue'),
    children: [
      {
        path: 'details',
        component: () => import(/* webpackChunkName: "user" */ '../views/licensors/LicensorDetails.vue'),
      },
    ],
  },
  {
    path: '/create',
    name: 'Create Licensor',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "user" */ '../views/licensors/Licensor.vue'),
    children: [
      {
        path: 'licensor',
        component: () => import(/* webpackChunkName: "user" */ '../views/licensors/CreateLicensor.vue'),
      },
    ],
  },
  {
    path: '/settings',
    name: 'Settings',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/settings/Settings.vue'),
  },
  {
    path: '/admin',
    name: 'Provenance',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/admin/Provenance.vue'),
  },
  {
    path: '/admin/owner',
    name: 'Provenance Owner',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/admin/ProvenanceOwner.vue'),
  },
  {
    path: '/admin/add',
    name: 'Provenance Add',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "access" */ '../views/admin/ProvenanceAdd.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "login" */ '../views/Logout.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
