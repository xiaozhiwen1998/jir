import { Form, Input, Button } from 'antd';
import React, { FocusEventHandler } from 'react';

import { useAuth } from '../context/auth-context';

export const RegisterScreen = ({ onError }: { onError: (err: Error | null) => void }) => {
  const { register } = useAuth();

  //tips:查看onSubmit函数签名。
  const handleSubmit = (values: Record<'username' | 'password' | 'confirmPassword', string>) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    if (values.password !== values.confirmPassword) {
      onError(new Error('密码不相同，请检查'));
    } else {
      register(values).catch((error) => onError(error));
    }
  };

  const handleOnFocus: FocusEventHandler<HTMLFormElement> = () => {
    onError(null);
  };

  const handleOnBlur: FocusEventHandler<HTMLFormElement> = (e) => {
    const inputElement = e.currentTarget.getElementsByTagName('input');
    if (
      inputElement[1].value !== inputElement[2].value &&
      inputElement[2].value !== null &&
      inputElement[1].value !== null
    ) {
      onError(new Error('密码不相同，请检查'));
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="confirmPassword"
        rules={[{ required: true, message: '输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'}>注册</Button>
      </Form.Item>
    </Form>
  );
};
