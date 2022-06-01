// 统一管理所有的工具函数

// 导入所有的工具函数，然后统一导出

import { http } from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'

import { history } from './history'

export {
  http,
  setToken,
  getToken,
  removeToken,
  history
}