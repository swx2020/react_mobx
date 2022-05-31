import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 导入组件
import Login from './pages/login';
import Layout from '@/pages/layout';

import AuthComponent from './components/AuthComponent';

function App() {
  return (
    // 路由配置
    // 1 将最外层div元素 用 BrowserRouter包裹起来，是的使得路由(history模式)生效
    <BrowserRouter>
      <div className="App">
        {/* 路由出口，在内部配置路由与组件的映射关系 */}
        <Routes>
          {/* 定义路由与组件的映射关系 */}
          <Route path='/' element={
            // layout需要路由鉴权
            <AuthComponent>
              <Layout></Layout>
            </AuthComponent>
          }></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
