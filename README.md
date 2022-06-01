# mobx + react + antd + react-router
## 整理项目目录
  - 新建文件夹store -- 用于管理 数据状态和逻辑方法
    * store文件夹中需要一个 index.js文件， 用于合并所有子模块

  - 新建文件夹pages -- 用于存放项目的页面
  - 新建文件夹components -- 用于管理通用组件
  - 新建文件夹styles -- 用于存放css样式
  - 新建文件夹hooks -- 用于存放自定义钩子函数
  - 新建文件夹utils -- 用于管理工具方法

## Css预处理器 -- Sass
  - 安装： npm i sass -D(属于开发时依赖)
  - 在react中内置了处理SASS的配置，所有在CRA(react脚手架：create-react-app)中，可以直接使用SASS来写样式
  - 文件后缀名用 **.scss**
  - 创建全局样式文件 index.scss

## 路由模块的初步配置
  - 安装 npm i react-router-dom(默认v6)
  - 使用：
    * 定义两个页面组件 Layout Login
    * 在App.js文件中导入组件
    * 在App.js文件中导入路由所需配置： BrowserRouter(history模式) Routes Route
    * 使用：**首先要用 BrowserRouter 包裹最外层app元素！**才能使得路由生效
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 导入组件
import Login from './pages/login';
import Layout from './pages/layout';

function App() {
  return (
    // 路由配置
    // 1 将最外层div元素 用 BrowserRouter包裹起来，是的使得路由(history模式)生效
    <BrowserRouter>
      <div className="App">
        {/* 2 路由出口，在内部配置路由与组件的映射关系 */}
        <Routes>
          {/* 3 定义路由与组件的映射关系 */}
          <Route path='/' element={<Layout></Layout>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

## 组件库 -- Ant Design
  - 安装： npm i antd
  - 在入口文件index.js中引入样式表文件：
    * ***注意：现在的版本使用antd，引入样式表时，要引入 antd.min.css文件！***
    * 注意：要先导入antd样式表，再导入全局样式文件，防止样式覆盖！
```js
// 注意：要先导入antd样式表，再导入全局样式文件，防止样式覆盖！
// 导入antd样式表文件
import 'antd/dist/antd.min.css'
// 引入全局样式
import './index.scss';
```

## 别名配置
  - CRA默认将所有工程化配置都隐藏在了react-scripts包中，（目的是实现零配置）所有默认在项目中看不到任何配置信息
  - 如果需要修改CRA的默认配置，有两种方案：
    * 推荐**使用 第三方库 来修改， 如 @craco/craco**
    * 通过执行npm/yarn eject 命令，释放所有的配置到项目中(会自动创建一个config文件夹)

### 使用 @craco/craco
  - 安装： npm i @craco/craco --force(react-scripts版本冲突，(要求是^4.0.0,但是本项目是5.0.1)，所有加了 --force 希望有用QAQ)
  - 在项目根目录下创建一个 配置文件 **craco.config.js**（名称是固定的，就和vue中的vue.config,js一样）
  - 修改 package.json 文件中的 脚本命令， 使用插件 @craco/craco 来接管 脚本名命令
  - 重新启动项目
```js
// craco.config.js
// 自定义 webpack 配置项

// 导入node内置模块path
const path = require('path')

module.exports = {
  // webpack配置
  webpack: {
    // 配置别名：
    alias: {
      // 约定规则：
      // 使用 @ 表示 src文件所在路径
      // __dirname指的是当前文件所在【文件夹】的绝对路径。在这里即 根目录 D:\前端\react\11_learn_\04_react+mobx\react_mobx_project\
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

```json
// package.json
// 修改脚本命令
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```


### 路径提示
  - 如果配置别名 之后没有路径提示，可以在项目根目录新建一个 文件 jsconfig.json(VScode配置文件)
  - vs code 会自动读取 jsconfig.json 中的配置

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "path": {
      "@/*": ["src/*"]
    }
  }
}
```


## 登录模块
### 基本结构搭建
1、 Login.jsx创建登录页面的基本结构
  - 注意： ***react中 img 的 src属性 不支持赋值为相对路径！！！***
    * 方式一： 使用import导入，且用变量接收 --> ① import logo from '';  ② src={logo}
    * 方式二： 使用require --> src={require('')}
2、 创建登录页面的样式文件 index.scss
3、 将资源文件夹assets拷贝到当前项目的src中


### 表单
  - 使用 antd 的组件 -- Form Checkbox等
  - 参照文档，实现表单 校验， 获取表单数据等功能
  - 注意：本次项目中的验证码必须是 246810 

### axios
  - 安装： npm i axios
  - 在utlis文件夹中新建 http.js文件 -- 用于封装axios


### 登录功能的实现
  - 点击按钮，提交表单
  - 成功后
    * 跳转页面
    * message提示框

### token持久化
  - 创建 utils/token.js
  - 分别提供 getToken/setToken/clearToken/isAuth四个工具函数并导出
  - 创建 utils/index.js 文件，统一导出token.js中的内容
  - 替换原先 用到token 的函数 为当前的工具函数

```js
// token.js
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
```

### 在请求拦截器中 注入 token -- 目的：一处配置，多处生效
  - 在http模块，在请求拦截器中，判断本地是否存在token
  - 如果存在，就在这里将token 注入到请求头中，这样就不需要在每个需要token的地方都手动添加一遍token了

```js
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
```


### 路由鉴权 -- 未登录时访问 则 强制跳转到 登录页面
  - react中 没有 vue的路由导航
  - 所以这里需要自己封装一个组件，实现路由鉴权
  - 思路：
    ***判断本地是否存在token， 有，就返回子组件，没有，就重定向跳转到登录页面***
#### 步骤
  - 在 components 目录中，创建 AuthComponent/index.js文件
  - 判断是否登录
    * 已登录，则直接渲染当前页面
    * 未登录，则重定向到登录页面: 重定向 通过 路由的内置组件Navigate的to属性 指定跳转的页面
  - 将需要鉴权的页面路由配置，替换为AuthRoute组件渲染


## Layout 模块
### 基本结构
#### 报错： 
  - Warning: [antd: Menu] `children` will be removed in next major version. Please use `items` instead.
  - 原因时 Ant Design中的Menu组件的使用发生更改
    * 原先用法： <Menu> 的子组件是 <Menu.Item>
    * 但是现在要求 通过 属性items 的方式写子组件

```jsx
// 以前的写法： Menu

function GeekLayout() {
  return (
    <Layout>
      <Header className="header">
        ...
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item icon={<HomeOutlined></HomeOutlined>} key="1">
              数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined></DiffOutlined>} key="2">
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined></EditOutlined>} key="3">
              发布文章
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='layout-content' style={{ padding: 20}}>内容</Layout>
      </Layout>
    </Layout>
  );
}

export default GeekLayout;
```

```jsx
// 现在的写法： 

function GeekLayout() {
  return (
    <Layout>
      <Header className="header">
        ...
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: `数据概览`,
                //当点击该标签， 跳转到Home
              },
              {
                key: "2",
                icon: <DiffOutlined />,
                label: "内容管理"
              },
              {
                key: "3",
                icon: <EditOutlined />,
                label: "发布文章"
              },
            ]}
          ></Menu>
        </Sider>
        <Layout className='layout-content' style={{ padding: 20}}>内容</Layout>
      </Layout>
    </Layout>
  );
}

```

### 二级路由
  - 在pages文件夹下，创建 Home(数据概览) Article(内容管理) Publish(发布文章)文件夹
  - 在每个文件夹下新建index.js, 并创建基础组件并导出
  - 在 App.js 中配置二级路由
  - 使用react-router-dom内置hook获取 页面跳转的函数， 从而通过绑定 点击事件onClick 实现二级菜单的跳转功能
```jsx
// hook要在最上方进行导入
// 导入 函数 useNavigate
import { useNavigate, useLocation } from "react-router-dom";

function GeekLayout() {
  // 获取 跳转的函数
  const navigate = useNavigate();

  return (
    <Layout>
      <Header className="header">
        ...
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: `数据概览`,
                //当点击该标签， 跳转到Home
                onClick: () => navigate("/"),
              },
              {
                key: "2",
                icon: <DiffOutlined />,
                label: "内容管理",
                //当点击该标签， 跳转到Article
                onClick: () => navigate("/article"),
              },
              {
                key: "3",
                icon: <EditOutlined />,
                label: "发布文章",
                //当点击该标签， 跳转到Publish
                onClick: () => navigate("/publish"),
              },
            ]}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口！！！！ */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
}
```

### 菜单的高亮设置
  - 通过设置 selectedKeys
```jsx
// hook要在最上方进行导入
// 导入 函数 useNavigate
import { useNavigate, useLocation } from "react-router-dom";

function GeekLayout() {
  // 获取 跳转的函数
  const navigate = useNavigate();

  // 高亮
  // 获取当前 url的pathname
  const { pathname } = useLocation();
  const highlight = () => {
    switch (pathname) {
      case "/article":
        return ["2"];
      case "/publish":
        return ["3"];
      default:
        return ["1"];
    }
  };

  return (
    <Layout>
      <Header className="header">
        ...
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            // 属性selectedKeys的值应该根据当前路由对应的item的key来决定
            // 原理： selectedKeys === currentItem.key
            // 通过useLocation获取当前的pathname 来实现, 并返回对应的key值
            selectedKeys={highlight()}

            style={{ height: "100%", borderRight: 0 }}
            items={[
              ...
            ]}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口！！！！ */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
}
```

### 退出登录
  - 参考官网中 Popconfirm 组件的使用
  - onConfirm	点击确认的回调	function(e)
  - 在回调函数中需要实现两个功能：
    * 清除token
    * 跳转到登录页面
  - 注意：逻辑代码 写在 mobx 中！！！！
  - 当前组件只需要负责触发退出登录的方法

```js
// store

// 导入http模块
import { ..., removeToken } from "../utils"
class LoginStore {
  ...
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
```

```jsx
// 组件

// hook要在最上方进行导入
// 导入 函数 useNavigate
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../store";

function GeekLayout() {
  
  // 获取 跳转的函数
  const navigate = useNavigate();
  const { userStore, loginStore } = useStore();

  ...

  // 退出登录
  const onConfirm = () => {
    // 调用 loginStore中的方法

    // 清除token值
    loginStore.logout();

    // 跳转
    navigate("/login");
    // 注意： 跳转的操作不能再 mobx中使用
    // 因为 react中的 hook(useXXX)，只能在两个地方使用
    // 1 在其他hook内部
    // 2 在函数组件中
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name"> {userStore.userInfo.name} </span>
          <span className="user-logout">

            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              // 点击确认时的回调函数
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>

          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          ...
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由的出口 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
}
```

### 处理Token失效
  - token通常会有一个有效时间
  - 超过有效时间就会失效，此时token 就不再能够实现鉴权的功能，需要清除
  - 在 http模块的 响应拦截器 中处理失效的token
    * err.response.status === 401时， 需要设置疼跳转到login页面
    * ***但是注意： 在组件外部 react-router默认是不能进行路由跳转的！！！***
    * 所以需要进行配置
   
#### 新建 history.js 文件， 配置history对象
  - 安装： npm i history
  - 配置： 
    * 1 安装 history包
    * 2 从 history包 中取出函数createBrowserHistory
    * 3 调用函数，得到history对象
    * 4 导出 history对象
    * 5 将history对象 配置到 App.js文件的路由中 

```js
// 1 安装 history包

// 2 从 history包 中取出函数createBrowserHistory
import { createBrowserHistory } from "history";

// 3 调用函数，得到history对象
const history = createBrowserHistory()

// 4 导出 history对象
export { history }

// 5 将history对象 配置到 App.js文件的路由中 
```

#### 将 获取的history对象 配置在 App.js 的路由中
  - 1 导入 unstable_HistoryRouter 并命名为 HistoryRouter，用于实现在组件外部也能够跳转路由
  - 2 使用 HistoryRouter 替换 BrowserRouter
  - 3 导入history对象
  - 4 给 HistoryRouter组件标签 添加一个history属性，并赋值为history对象
  - 5 在mobx中导入history对象 
  - 6 在mobx的逻辑代码中使用history对象的push方法进行路由跳转

```jsx
// 1 导入 unstable_HistoryRouter 并命名为 HistoryRouter，用于实现在组件外部也能够跳转路由
// 2 使用 HistoryRouter标签 替换 BrowserRouter
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
// 3 导入history对象
import { history } from './utils';
// 4 给 HistoryRouter组件标签 添加一个history属性，并赋值为history对象
// 5 在mobx中导入history对象 
// 6 在mobx的逻辑代码中使用history对象的push方法进行路由跳转


function App() {
  return (
    // 路由配置
    // 2 使用 HistoryRouter标签 替换 BrowserRouter
    // 4 给 HistoryRouter组件标签 添加一个history属性，并赋值为history对象
    <HistoryRouter history={history}>
      ...
    </HistoryRouter>
  );
}

export default App;
```

#### http 模块中 处理 失效token
  - 在 响应失败的 回调函数中处理
  - 当 err.response.status为401时，代表用户信息失效（token失效）
  - 此时，需要跳转页面到登录页面
    * 导入 history对象
    * 调用 history对象的push方法， 并传入登录页面的 path

```js
// 1 导入axios
import axios from 'axios'

// 导入history对象，实现在 组件外部进行路由跳转
import { history } from './history'

...

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
```


### echart 图标的实现
  - 安装： npm i echarts
  - 在components文件夹中新建组件Bar

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
