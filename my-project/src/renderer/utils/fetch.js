import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import businessErrorHandler from './businessErrorHandler'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
  // timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['pSessionId'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== '10000') {
      return businessErrorHandler(res)
    } else {
      return response.data
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return new Promise(() => {})
  }
)

export default service
