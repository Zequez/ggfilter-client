import axios from 'axios'
import NProgress from 'nprogress/nprogress.js'
import config from 'src/app/config'
import { snakeizeKeys, camelizeKeys, camelCase } from 'shared/lib/utils/string'

export const snake = snakeizeKeys
export const camel = camelizeKeys

export const api = axios.create({
  baseURL: config.apiHost + '/',
  withCredentials: true,
  xsrfCookieName: 'X-CSRF-Token',
  xsrfHeaderName: 'csrftoken'
  // transformRequest: [
  //   (data) => (data instanceof Object && data.constructor === Object) ? snake(data) : data
  // ].concat(axios.defaults.transformRequest)
})

api.interceptors.request.use((config) => {
  NProgress.start()
  return config
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (error) => {
  NProgress.done()
  return Promise.reject(error)
})

export const withMeta = (response) => {
  let { headers, data } = response
  let meta = {}
  for (let header in headers) {
    if (header[0] === 'x' && header[1] === '-') {
      let value = headers[header]
      if (value.match(/^[0-9]+$/)) value = Number(value)
      meta[camelCase(header.slice(2))] = value
    }
  }
  return {data, meta}
}

export const responseData = (response) => {
  return response.data
}

export const get = (path, params) => api.get(path, {params}).then(responseData)
export const post = (path, params) => api.post(path, params).then(responseData)
export const patch = (path, params) => api.patch(path, params).then(responseData)
export const del = (path, params) => api.delete(path, {params}).then(responseData)
