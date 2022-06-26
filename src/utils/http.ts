import qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;
export interface FetchConfig extends RequestInit {
  data?: Record<string, unknown> | null;
  token?: string;
}

//封装fetch
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: FetchConfig = { data: null, token: undefined },
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : 'application/x-www-form-urlencoded',
      ...headers,
    },
    ...customConfig, //如果method是别的，则会覆盖
  };
  //get请求的参数放在url中，post,patch,delete,放在body中
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      return Promise.reject({ message: '用户或者密码错误，请重新登录' });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
