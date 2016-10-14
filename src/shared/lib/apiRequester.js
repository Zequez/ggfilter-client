import axios from 'axios'
import config from 'sources/config'
import { start, stop } from 'shared/lib/loadingSpinner'
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
  start()
  return config
}, (error) => {
  stop()
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  stop()
  return response
}, (error) => {
  stop()
  return Promise.reject(error)
})

export default api
