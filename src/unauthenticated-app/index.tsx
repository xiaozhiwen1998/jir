import React from 'react';
import { useState } from 'react';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';

export const UnauthenticatedAPP = () => {
  //存储当前是什么状态
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >{`切换到${isRegister ? '登录' : '注册'}`}</button>
    </div>
  );
};
