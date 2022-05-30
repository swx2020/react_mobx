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

### axios
  - 安装： npm i axios
  - 在utlis文件夹中新建 http.js文件 -- 用于封装axios
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
