import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const callAPI = function callAPI(domain) {
  let endpoint;
  if (domain === 'user') {
    endpoint = process.env.API_USER_URL;
  } else if (domain === 'warehouse') {
    endpoint = process.env.API_WAREHOUSE_URL;
  } else if (domain === 'product') {
    endpoint = process.env.API_PRODUCT_URL;
  } else if (domain === 'order') {
    endpoint = process.env.API_ORDER_URL;
  }
  const instance = axios.create({
    baseURL: endpoint,
  });
  return instance;
};

const callAPIWithAuth = function callAPIWithAuth(domain) {
  let endpoint;
  if (domain === 'user') {
    endpoint = process.env.API_USER_URL;
  } else if (domain === 'warehouse') {
    endpoint = process.env.API_WAREHOUSE_URL;
  } else if (domain === 'product') {
    endpoint = process.env.API_PRODUCT_URL;
  } else if (domain === 'order') {
    endpoint = process.env.API_ORDER_URL;
  }
  const instance = axios.create({
    baseURL: endpoint,
    // baseURL: process.env.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    },
  });

  return instance;
};

export { axios, callAPI, callAPIWithAuth };
