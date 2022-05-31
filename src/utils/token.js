// 封装 localStorage 存取 token

const key = 'mobx-project ^^'

const setToken = (token) => {
  return window.localStorage.setItem(key, token)
  // key 和 token 是一对键值对！！！！
  // 即最终 存入 localStorage中的数据是：
  // 表头 key       value
  // 表格 key       token

  // 所以取值的时候，只需要通过 key 就能获取到token

  // 函数 window.localStorage.setItem(key, token)有一个返回值
  // 这个返回值 表示 执行成功还是执行失败，将这个返回值返回出去

  // 所以 setToken函数 返回的是 存入成功还是失败的结果
}

const getToken = () => {
  return window.localStorage.getItem(key)
  // 最终 存入 localStorage中的数据是：
  // 表头 key       value
  // 表格 key       token

  // 所以取值的时候，只需要通过 key 就能获取到token
  // window.localStorage.getItem(key)函数的返回值是 key对应的token
  // 所以getToken函数返回的是token
}

const removeToken = () => {
  return window.localStorage.removeItem(key)
  // window.localStorage.removeItem(key)函数有一个返回值
  // 这个返回值表示的是 【移除成功还是失败】，将这个执行结果返回出去

  // 所以 removeToken函数 返回的是 移除成功还是失败的结果
}

export {
  setToken,
  getToken,
  removeToken
}