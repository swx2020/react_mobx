// 管理登录模块相关数据和逻辑
import { makeAutoObservable } from "mobx"

// 导入http模块
import { http } from "../utils"

class LoginStore {
  token = ''

  constructor() {
    // 数据响应式
    makeAutoObservable(this)
  }

  setToken = async ({ mobile, code }) => {
    // 调用登录接口
    const ret = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    console.log('ret: ');
    console.log(ret);
    // 将获取的数据存入token
    this.token = ret.data
  }
}

export default LoginStore