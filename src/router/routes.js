import routeLogin from './login';
import routeHome from './home';
import routeLogout from './logout';
import routeWarehouse from './warehouse';

const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  routeLogin,
  routeHome,
  routeLogout,
  routeWarehouse,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
