import axios from 'axios';
import * as NProgress from 'nprogress/nprogress.js';
import config from 'src/app/config';
import { snakeizeKeys, camelizeKeys, camelCase } from 'shared/lib/utils/string';

export const snake = snakeizeKeys;
export const camel = camelizeKeys;

export const api = axios.create({
  baseURL: config.apiHost + '/',
  withCredentials: true,
  xsrfCookieName: 'X-CSRF-Token',
  xsrfHeaderName: 'csrftoken'
  // transformRequest: [
  //   (data) => (data instanceof Object && data.constructor === Object) ? snake(data) : data
  // ].concat(axios.defaults.transformRequest)
});

api.interceptors.request.use((config) => {
  NProgress.start();
  return config;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  NProgress.done();
  return response;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

export const withMeta = (response) => {
  let { headers, data } = response;
  let meta = {};
  for (let header in headers) {
    if (header[0] === 'x' && header[1] === '-') {
      let value = headers[header];
      if (value.match(/^[0-9]+$/)) value = Number(value);
      meta[camelCase(header.slice(2))] = value;
    }
  }
  return {data, meta};
};

export const responseData = (response) => {
  return response.data;
};

let caches = {};
let cachesPromises = {};
export const cached = (action, url) => {
  if (caches[url]) {
    return Promise.resolve(caches[url]);
  } else {
    if (cachesPromises[url]) {
      return new Promise(((resolve) => cachesPromises[url].push(resolve)));
    } else {
      cachesPromises[url] = [];
      return action(url).then((data) => {
        caches[url] = data.length ? data : camelizeKeys(data);
        cachesPromises[url].forEach((resolve) => resolve(caches[url]));
        return caches[url];
      });
    }
  }
};

export const get = (path, params?) => api.get(path, {params}).then(responseData);
export const post = (path, params?) => api.post(path, params).then(responseData);
export const patch = (path, params?) => api.patch(path, params).then(responseData);
export const del = (path, params?) => api.delete(path, {params}).then(responseData);
