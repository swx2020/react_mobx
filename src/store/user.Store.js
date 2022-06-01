// 用户信息相关
import { makeAutoObservable } from "mobx";
import { http } from '@/utils'

class UserStore {
  userInfo = {}

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    // 调用接口
    const ret = await http.get('/user/profile')
    this.userInfo = ret.data
  }
}

export default UserStore