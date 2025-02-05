export default {
  path: '/verify-email',
  component: () => import('layouts/BaseLayout.vue'),
  children: [{
    path: '',
    name: 'PageAuthenticationVerifyEmail',
    component: () => import('src/pages/Authentication/VerifyEmail.vue'),
    props: route => ({ token: route.query.token }),
  }],
};

