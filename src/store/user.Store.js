// 用户信息相关
// 导入 runInAction函数， 处理异步操作时 更改状态
import { makeAutoObservable, runInAction } from "mobx";
import { http } from '@/utils'

class UserStore {
  userInfo = {}

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    // 调用接口
    const ret = await http.get('/user/profile')
    // mobx中只能在acrion中重新赋值！！！
    //  异步操作 更改 状态的值 时 需要再次包装为动作（使用回调函数再次包装）

    // https://blog.csdn.net/weixin_49684995/article/details/119890230
    // https://cn.mobx.js.org/best/actions.html   (5.1-5.2)

    //  // await 之后，再次修改状态需要动作: 借助mobx的语法糖 runInAction(f)
    // 在函数 runInAction 中进行修改
    runInAction(() => {
      // 在回调函数中修改 状态的值
      this.userInfo = ret.data
    })
  }
}

export default UserStore