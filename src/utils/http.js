// 封装axios

// 1 导入axios
import axios from 'axios'

import { getToken } from './token'

// 导入history对象，实现在 组件外部进行路由跳转
import { history } from './history'

// 2 实例化并传入配置
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 3 请求拦截器
http.interceptors.request.use(config => {

  // 在请求拦截器中，判断本地是否存在token
  // 如果存在，就在这里将token 注入到请求头中，这样就不需要在每个需要token的地方都手动添加一遍token了

  // 取出本地的token
  const token = getToken()
  if (token) {
    // token存在，则注入到请求头中
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, err => {
  return Promise.reject(err)
})

// 4 响应拦截器
http.interceptors.response.use(res => {
  return res.data
}, err => {

  // 判断token是否失效
  // 条件： 如果状态码为401，则表示 token失效
  console.dir(err)
  if (err.response.status === 401) {
    // 跳回到登录页面

    // react中的router不支持在 react上下文的环境(组件)之外 实现路由跳转

    // 手动实现 react context 外部的 路由跳转
    history.push('/login')
  }

  return Promise.reject(err)
})

// 5 导出
export { http }