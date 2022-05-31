// 判断当前是否登录， 决定渲染的页面

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// 高阶组件： 将 组件 作为参数 传入 另一个组件，然后根据条件判断，返回新的组件

function AuthComponent({ children }) {
  // children是组件的默认属性
  // 只要组件内部存在内容：文本(节点)， 子节点....
  // 那么这些内容都会在children 属性中

  // 判断token
  const token = getToken()
  if (token) {
    // 正常渲染children组件
    return <>{ children }</>
  } else {
    // 重定向
    // 通过 路由的内置组件Navigate的to属性 指定跳转的页面
    return <Navigate to='/login' replace></Navigate>
  }
}

// 实现方式
// 将需要权限的组件通过 AuthComponent组件 包裹起来
    // <AuthComponent> <Layout></Layout> </AuthComponent> -- 此时layout就是子组件
// 那么在实际渲染时
    // 已登录： <> <Layout></Layout> </>
    // 未登录： <Navigate to='/login' replace></Navigate>

export default AuthComponent