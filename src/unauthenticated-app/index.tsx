import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import styled from 'styled-components';
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';

export const UnauthenticatedAPP = () => {
  //存储当前是什么状态
  const [isRegister, setIsRegister] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header></Header>
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        <div style={{ height: '30px' }}>
          {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        </div>
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <a
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >{`${isRegister ? '已经有账号了？直接登录' : '没有账号？去注册'}`}</a>
      </ShadowCard>
    </Container>
  );
};

const Title = styled.h2`
  user-select: none;
  margin-bottom: 2.4rem;
  color: #3e4351;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  //tip:使用svg ,需要先import svg图片
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 50rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;
