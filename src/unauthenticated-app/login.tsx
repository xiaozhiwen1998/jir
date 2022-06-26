import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input, Button } from 'antd';
import { useAsync } from 'hooks/useAsync';

export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, true);

  //tips:查看onSubmit函数签名。
  const handleSubmit = (values: Record<'username' | 'password', string>) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    run(login(values)).catch((error) => {
      onError(error);
    });
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
        <Button loading={isLoading} htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
