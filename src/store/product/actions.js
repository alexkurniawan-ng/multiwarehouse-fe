import { callAPI, callAPIWithAuth } from '../../boot/axios';

export function getProductList({ rootState, commit }) {
  const endpoint = `${rootState.api.product.index}`;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('product')
      .get(endpoint)
      .then((response) => {
        commit('PRODUCT_LIST', response.data);
        commit('LOADING', false);
        resolve(response.data);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}

export function getCategoryList({ rootState, commit }) {
  const endpoint = `${rootState.api.product.category}`;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('product')
      .get(endpoint)
      .then((response) => {
        commit('CATEGORY_LIST', response.data);
        commit('LOADING', false);
        resolve(response.data);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}

// export function updateWarehouse({ rootState, commit }, {
//   id, name, description, street, city, province, postalCode, lat, lng
// }) {
//   const endpoint = `${rootState.api.warehouse.update}`;
//   return new Promise((resolve, reject) => {
//     commit('LOADING', true);
//     callAPIWithAuth('warehouse')
//       .put(endpoint, {
//         id, name, description, street, city, province, postalCode, lat, lng
//       })
//       .then((response) => {
//         commit('LOADING', false);
//         resolve(response.data);
//       })
//       .catch((err) => {
//         commit('LOADING', false);
//         reject(err);
//       });
//   });
// }

