// 管理登录模块相关数据和逻辑
import { makeAutoObservable } from "mobx"

// 导入http模块
import { http, setToken, getToken, removeToken } from "../utils"

class LoginStore {
  // 为了确保 token 的持久化，这里不能直接设置token为空字符串，否则一刷新，已存在的token就会被重新赋值为空字符串
  // 这里需要做一个判断，判断 localStorage中是否已经存在token，如果已经存在，就将已存在的token 赋值
  token = getToken() || ''

  constructor() {
    // 数据响应式
    makeAutoObservable(this)
  }

  // async：修饰的函数表示函数里面有异步操作，【返回值 -- Promise对象】
  // 函数本身的返回值，会作为Promise中 resolve的参数；
  setToken = async ({ mobile, code }) => {
    // 调用登录接口
    // await 修饰函数后，那么，返回值变成了Promise对象中resolve的参数；【如果要拿到reject里参数，就使用try catch】
    const ret = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    console.log('ret: ');
    console.log(ret);
    // 将获取的数据存入token
    this.token = ret.data.token
    // 将token存入localStorage
    setToken(this.token)
  }

  // 退出登录
  logout = () => {
    this.token = ''
    removeToken()

    // 注意： 跳转的操作不能 这里进行
    // 因为 react中的 hook(useXXX)，只能在两个地方使用
    // 1 在其他hook内部
    // 2 在函数组件中
  }
}

export default LoginStore