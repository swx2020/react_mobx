// 封装axios

// 1 导入axios
import axios from 'axios'

// 2 实例化并传入配置
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 3 请求拦截器
http.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 4 响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

// 5 导出
export { http }