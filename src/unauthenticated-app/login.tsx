import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';
export const LoginScreen = () => {
  const { login } = useAuth();

  //tips:查看onSubmit函数签名。
  const handleSubmit = (values: any) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login(values);
  };

  return (
    //tip: 原生时间 onSubmit, antd 使用的是onFinish
    <Form onFinish={handleSubmit}>
      <Form.Item
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密  码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        {/* antd的type是主题，对应的类型是htmlType */}
        <LongButton htmlType="submit">登录</LongButton>
      </Form.Item>
    </Form>
  );
};
