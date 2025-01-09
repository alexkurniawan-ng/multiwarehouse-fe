export default {
  path: '/warehouse/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    name: 'PageWarehouseList',
    component: () => import('src/pages/Warehouse/WarehouseList.vue'),
  }, {
    path: 'warehouse-detail/:id',
    name: 'PageWarehouseDetail',
    component: () => import('src/pages/Warehouse/Form.vue'),
  }],
};
