import React, { createContext, ReactNode, useState } from 'react';
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
  //存储用户信息
  const [user, setUser] = useState<UserInterface | null>(null);

  //login方法
  const login = (form: AuthFormInterface) => auth.login(form).then(setUser);

  //register方法
  const register = (form: AuthFormInterface) => auth.register(form).then(setUser);

  //logout方法
  const logout = () => auth.logout().then(() => setUser(null));

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
