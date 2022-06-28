import { useAuth } from 'context/auth-context';
import { http } from 'utils/http';

//携带token的请求
export const useHttp = () => {
  const { user } = useAuth();
  //tips: 使用Parameters获取参数
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
