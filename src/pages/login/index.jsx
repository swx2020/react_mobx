// 导入antd组件
import { Button, Card, Checkbox, Form, Input } from "antd";

// 导入页面样式文件
import './index.scss'

// (img的src赋值)正确方式一： 
import logo from '@/assets/logo.png'

function Login() {
  // 提交表单成功的事件
  // 要注意，在这里 事件函数不是绑定给提交按钮，而是绑定给表单Form元素！！！
  const onFinish = (values) => {
    console.log(values);
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

export default Login