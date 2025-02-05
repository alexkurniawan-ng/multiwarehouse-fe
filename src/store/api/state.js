import { verifyEmail } from "../authentication/actions";

export default function () {
  return {
    authentication: {
      index: '/auth',
      login: '/auth/login',
    },
    user: {
      index: '/user',
      register: '/user/register',
      verifyEmail: '/user/verify-email',
      googleSignIn: '/user/google-signin',
      googleRegister: '/user/google-register',
      googleCheck: '/user/google-check',
      profile: '/user/profile',
      createAdmin: '/user/create-admin',
      updateAdmin: '/user/update-admin',
      resendEmail: '/user/resend-email',
      forgotPassword: '/user/forgot-password',
      resetPassword: '/user/reset-password',
      changePassword: '/user/change-password',
      setPassword: '/user/set-password',
      getAddress: '/user/get-address',
      createAddress: '/user/create-address',
      updateAddress: '/user/update-address',
      deleteAddress: '/user/delete-address',
      setPrimaryAddress: '/user/set-primary-address',
    },
    warehouse: {
      index: '/warehouse',
      getWarehouse: '/warehouse/get-warehouse',
      admin: '/warehouse/admin',
      address: '/warehouse/address',
      update: '/warehouse/update',
      delete: '/warehouse/delete',
    },
    inventory: {
      index: '/inventory',
      stockTake: '/inventory/stock-take',
      getStockPending: '/inventory/stock/pending',
      changeStockStatus: '/inventory/stock/status',
      stockRequest: '/inventory/stock/request',
    },
    product: {
      index: '/product',
      category: '/product/category',
    //   create: '/product/create',
    //   update: '/product/update',
    //   delete: '/product/delete',
    },
    orders: {
      index: '/orders',
      // create: '/order/create',
      // update: '/order/update',
      // delete: '/order/delete',
    },
  };
}
