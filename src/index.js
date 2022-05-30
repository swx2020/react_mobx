import React from 'react';
import ReactDOM from 'react-dom/client';
// 注意：要先导入antd样式表，再导入全局样式文件，防止样式覆盖！
// 导入antd样式表文件
import 'antd/dist/antd.min.css'
// 引入全局样式
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

