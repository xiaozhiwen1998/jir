import { FullPageErrorFallback } from 'components/full-page-error';
import { FullPageLoading } from 'components/full-page-loading';
import { useAsync } from 'hooks/useAsync';
import { useMount } from 'hooks/useMount';
import React, { createContext, ReactNode } from 'react';
import { http } from 'utils/http';
import * as auth from '../auth-provider';
import { UserInterface } from '../screens/project-list';

interface AuthFormInterface {
  username: string;
  password: string;
}

interface AuthContextInterface {
  user: UserInterface | null;
  login: (form: AuthFormInterface) => Promise<void>;
  register: (form: AuthFormInterface) => Promise<void>;
  logout: () => Promise<void>;
}

//context，创建context
export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);
//context，给context取名
AuthContext.displayName = 'AuthContext';

//封装AuthContext.Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // //存储用户信息 使用useAsync替代
  // const [user, setUser] = useState<UserInterface | null>(null);

  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,

    setData: setUser,
  } = useAsync<UserInterface | null>();

  //login方法
  const login = (form: AuthFormInterface) => auth.login(form).then(setUser);

  //register方法
  const register = (form: AuthFormInterface) => auth.register(form).then(setUser);

  //logout方法
  const logout = () => auth.logout().then(() => setUser(null));

  //读取token,实现自动登录
  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    //eslint-disable-next-line
    return <FullPageLoading></FullPageLoading>;
  }

  //如果请求me登录接口出错，会自动跳转到登录界面，需要使其显示故障。
  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//提供使用auth-context的自定义hook。
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在 AuthProvider中使用');
  }
  return context;
};

//tip:防止刷新后返回登录界面
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    //tip: 请求me接口
    const data = await http('me', { token: token });
    user = data.user;
  }
  return user;
};
