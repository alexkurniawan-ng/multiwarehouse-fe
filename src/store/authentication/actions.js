import { callAPI, callAPIWithAuth } from '../../boot/axios';

export function check({ rootState, commit }) {
  const endpoint = rootState.api.user.profile;
  console.log({ endpoint })
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('user')
      .get(endpoint)
      .then((res) => {
        console.log('check', res)
        commit('LOADING', false);
        commit('VALID_TOKEN', true);
        commit('USER', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        commit('LOADING', false);
        commit('VALID_TOKEN', false);
        reject(err);
      });
  });
}

export function login({ rootState, commit }, { email, password }) {
  const endpoint = rootState.api.authentication.login;
  return new Promise(((resolve, reject) => {
    commit('LOADING', true);
    callAPI('user')
      .post(endpoint, { email, password })
      .then((res) => {
        commit('LOADING', false);
        // commit('STATE_EDITED', false);
        resolve(res);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  }));
}
