import React, { FormEvent } from 'react';
import { useAuth } from '../context/auth-context';

export const RegisterScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { register, user } = useAuth();

  //tips:查看onSubmit函数签名。
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type={'text'} id={'username'}></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type={'password'} id={'password'}></input>
      </div>
      <button type={'submit'}>注册</button>
    </form>
  );
};
