export default {
  path: '/register/',
  component: () => import('layouts/BaseLayout.vue'),
  children: [{
    path: '',
    name: 'PageAuthenticationRegister',
    component: () => import('pages/Authentication/Register.vue'),
  }, {
    path: 'pending/:user',
    name: 'PageAuthenticationPendingRegister',
    component: () => import('pages/Authentication/PendingRegister.vue'),
  }],
};
