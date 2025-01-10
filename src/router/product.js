export default {
  path: '/product/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    name: 'PageProductList',
    component: () => import('src/pages/Product/ProductList.vue'),
  }, {
    path: 'create-product',
    name: 'PageCreateProductDetail',
    component: () => import('src/pages/Product/Form.vue'),
  }, {
    path: 'edit-product-detail/:id',
    name: 'PageEditProductDetail',
    component: () => import('src/pages/Product/Form.vue'),
  }, {
    path: 'product-detail/:id',
    name: 'PageProductDetail',
    component: () => import('src/pages/Product/Form.vue'),
  }],
};
