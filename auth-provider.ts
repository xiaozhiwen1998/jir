//提供auth服务，todo:改成firebase

import { UserInterface } from './src/screens/project-list/index';

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

//用来接收并存储jwt
export const handleUserResponse = ({ user }: { user: UserInterface }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};

//登录功能
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      //登录时保存token
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(res.json());
    }
  });
};

//注册功能
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      //登录时保存token
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(res.json());
    }
  });
};

//async 用于返回一个promise 类型数据
export const logout = async () => {
  return window.localStorage.removeItem(localStorageKey);
};
