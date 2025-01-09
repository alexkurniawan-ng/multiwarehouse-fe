export default {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    name: 'PageMainHome',
    component: () => import('pages/Main/Home.vue'),
  }, {
    path: 'admin',
    name: 'PageMainHomeAdmin',
    component: () => import('pages/Main/HomeAdmin.vue'),
  }, {
    path: 'me',
    name: 'PageMainMe',
    component: () => import('pages/Main/Me.vue'),
  }],
};
