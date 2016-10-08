import axios from 'axios'
import config from 'sources/config'
import { start, stop } from 'lib/loadingSpinner'

const api = axios.create({
  baseURL: config.apiHost + '/',
  withCredentials: true
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
