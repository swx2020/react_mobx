// 1 安装 history包

// 2 从 history包 中取出函数createBrowserHistory
import { createBrowserHistory } from "history";

// 3 调用函数，得到history对象
const history = createBrowserHistory()

// 4 导出 history对象
export { history }

// 5 将history对象 配置到 App.js文件的路由中 