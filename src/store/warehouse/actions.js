import { callAPI, callAPIWithAuth } from '../../boot/axios';

export function getWarehouseList({ rootState, commit }, { token }) {
  const endpoint = `${rootState.api.warehouse.getWarehouse}`;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('warehouse')
      .post(endpoint, {
        token
      })
      .then((response) => {
        commit('WAREHOUSE_LIST', response.data);
        commit('LOADING', false);
        resolve(response.data);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}

export function updateWarehouse({ rootState, commit }, {
  id, name, description, street, city, province, postalCode, lat, lng
}) {
  const endpoint = `${rootState.api.warehouse.update}`;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('warehouse')
      .put(endpoint, {
        id, name, description, street, city, province, postalCode, lat, lng
      })
      .then((response) => {
        commit('LOADING', false);
        resolve(response.data);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}

