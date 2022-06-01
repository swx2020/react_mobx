import './App.css';

// 1 导入 unstable_HistoryRouter 并命名为 HistoryRouter，用于实现在组件外部也能够跳转路由
// 2 使用 HistoryRouter 替换 BrowserRouter
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
// 3 导入history对象
import { history } from './utils';
// 4 给 HistoryRouter组件标签 添加一个history属性，并赋值为history对象
// 5 在mobx中导入history对象 
// 6 在mobx的逻辑代码中使用history对象的push方法进行路由跳转

// 导入组件
import Login from './pages/login';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Article from '@/pages/article';
import Publish from '@/pages/publish';

import AuthComponent from './components/AuthComponent';

function App() {
  return (
    // 路由配置
    // 1 将最外层div元素 用 BrowserRouter包裹起来，是的使得路由(history模式)生效
    <HistoryRouter history={history}>
      <div className="App">
        {/* 路由出口，在内部配置路由与组件的映射关系 */}
        <Routes>
          {/* 定义路由与组件的映射关系 */}
          <Route path='/' element={
            // layout需要路由鉴权
            <AuthComponent>
              <Layout></Layout>
            </AuthComponent>
          }>
            {/* 嵌套二级路由 */}
            <Route index element={ <Home></Home> }></Route>
            <Route path='article' element = { <Article></Article> }></Route>
            <Route path = 'publish' element = { <Publish></Publish> }></Route >
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
