import axios from 'axios'
import NProgress from 'nprogress/nprogress.js'
import config from 'src/app/config'
import { snakeizeKeys } from 'shared/lib/utils'

const api = axios.create({
  baseURL: config.apiHost + '/',
  withCredentials: true,
  xsrfCookieName: 'X-CSRF-Token',
  xsrfHeaderName: 'csrftoken',
  transformRequest: [
    (data) => (data instanceof Object && data.constructor === Object) ? snakeizeKeys(data) : data
  ].concat(axios.defaults.transformRequest)
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

export default api
