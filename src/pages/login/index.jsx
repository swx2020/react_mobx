import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

// 导入antd组件
import { Button, Card, Checkbox, Form, Input, message } from "antd";

// 导入页面样式文件
import './index.scss'

// (img的src赋值)正确方式一： 
import logo from '@/assets/logo.png'

import { useStore } from "@/store";

function Login() {
  
  const { loginStore } = useStore();

  // 获取 用于导航的 函数
  const navigate = useNavigate()

  // 提交表单成功的事件
  // 要注意，在这里 事件函数不是绑定给提交按钮，而是绑定给表单Form元素！！！
  const onFinish = async (values) => {
    console.log(values);

    // 一般涉及接口调用和promise时，会使用 try..catch处理成功和失败的情形
    try {
      // 调用store中的方法，获取token
      // loginStore.setToken这个函数被 async修饰，所以这个函数的返回值是promise
      // 为了确保 后面的跳转和提示都是在 接口成功调用后执行，这里 用 await修饰
      await loginStore.setToken({
        mobile: values.username,
        code: values.password,
      });

      // 跳转到首页
      // 编程式跳转： 要使用 react-router-dom中的函数 useNavigate,
      // 调用这个函数，会返回 一个导航函数
      navigate("/", { replace: true });
      // 提示
      message.success("登录成功");
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        {/* react中 img的src不支持直接使用相对路径导入！！！ */}
        {/* 无效导入： <img className="login-logo" src='@/assets/logo.png' alt="logo" /> */}

        {/* 正确方式一：  */}
        <img className="login-logo" src={logo} alt="logo" />
        {/* 正确方式二：  */}
        {/* <img src={require('@/assets/logo.png')} alt="" /> */}

        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={["onBlur", "onChange"]}
          // 传入事件函数
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              // 正则匹配
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "Please input right phone",
                // 配置什么时候触发验证： 失去焦点的时候
                // 设置这个的同时，要在 表单Form中配置选项 <Form validateTrigger={['onBlur', 'onChange']}></Form>
                validateTrigger: "onBlur",
              },
              // 设置是否为 必填项
              { required: true, message: "Please input your phone" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                len: 6,
                message: "Please input six numbers",
                validateTrigger: "onBlur",
              },
              { required: true, message: "Please input verified number" },
            ]}
          >
            {/* 设置rules必须同时设置 name */}
            {/* 注意：本次项目中的验证码必须是 246810 */}
            <Input size="large" placeholder="请输入验证码"></Input>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            {/* 因为checkbox的状态属性不是 value 而是checked，所以后面要通过 valuePropName进行转换 */}
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和 「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            {/* 提交按钮 */}
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default observer(Login);