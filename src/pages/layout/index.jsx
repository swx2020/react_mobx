import { useEffect } from "react";
// hook要在最上方进行导入
// 导入 函数 useNavigate
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../store";

// 一级路由中嵌套了二级路由，需要在渲染二级路由的区域 添加一个 出口！
import { Outlet } from "react-router-dom";

// 数据响应
import { observer } from 'mobx-react-lite'

import { Layout, Menu, Popconfirm } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
} from "@ant-design/icons";

import "./index.scss";

const { Header, Sider } = Layout;

function GeekLayout() {
  // 获取 跳转的函数
  const navigate = useNavigate();

  const { userStore, loginStore } = useStore();
  // 调用副作用， 触发调用接口的方法
  useEffect(() => {
    userStore.getUserInfo();
    // 在回调函数中使用的依赖项，最好在数组中进行声明，例如这里的userStore
  }, [userStore]);

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
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            // 属性selectedKeys的值应该根据当前路由对应的item的key来决定
            // 原理： selectedKeys === currentItem.key
            // 通过useLocation获取当前的pathname 来实现, 并返回对应的key值
            selectedKeys={highlight()}
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
          {/* 二级路由的出口 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default observer(GeekLayout);
