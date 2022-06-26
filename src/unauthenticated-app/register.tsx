import { Form, Input } from 'antd';
import React from 'react';
import { LongButton } from 'unauthenticated-app';
import { useAuth } from '../context/auth-context';

export const RegisterScreen = () => {
  const { register } = useAuth();

  //tips:查看onSubmit函数签名。
  const handleSubmit = (values: Record<'username' | 'password', string>) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register(values);
  };

  return (
    <Form onFinish={handleSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 20 }}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="确认密码" name="password" rules={[{ required: true, message: '输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'}>注册</LongButton>
      </Form.Item>
    </Form>
  );
};
