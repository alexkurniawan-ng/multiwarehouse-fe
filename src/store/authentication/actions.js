import { callAPI, callAPIWithAuth } from '../../boot/axios';

export function check({ rootState, commit }) {
  const endpoint = rootState.api.user.profile;
  console.log({ endpoint })
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPIWithAuth('user')
      .get(endpoint)
      .then((res) => {
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

export function register({ rootState, commit }, { fullName, email }) {
  const endpoint = rootState.api.user.register;
  return new Promise(((resolve, reject) => {
    commit('LOADING', true);
    callAPI('user')
      .post(endpoint, { fullName, email })
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

export function verifyEmail({ rootState, commit }, { token }) {
  const endpoint = `${rootState.api.user.verifyEmail}/${token}`;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPI('user')
      .post(endpoint)
      .then((response) => {
        commit('LOADING', false);
        resolve(response);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}

export function setPassword({ rootState, commit }, { token, password, rePassword }) {
  const endpoint = rootState.api.user.setPassword;
  return new Promise((resolve, reject) => {
    commit('LOADING', true);
    callAPI('user')
      .put(endpoint, { token, password, rePassword })
      .then((res) => {
        commit('LOADING', false);
        resolve(res);
      })
      .catch((err) => {
        commit('LOADING', false);
        reject(err);
      });
  });
}
