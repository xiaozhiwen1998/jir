import React, { FormEvent } from 'react';

export const LoginScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  //tips:查看onSubmit函数签名。
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  const login = (params: Record<'username' | 'password', string>) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      });
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
      <button type={'submit'}>登录</button>
    </form>
  );
};
