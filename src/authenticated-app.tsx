import { Button, Dropdown, Menu, Space } from 'antd';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import styled from 'styled-components';
import ProjectListScreen from './screens/project-list';
// tip: 使用svg导入的方式，而不是img
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  const menu = <Menu items={[{ key: 'logout', label: <a onClick={logout}>退出登录</a> }]} />;

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={3}>
          {/* tip: 使用svg的形式渲染，而不是以img形式
            <img src={softwareLogo} alt="logo"></img>
          */}
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}></SoftwareLogo>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              <Space>hi, {user && user.name}</Space>
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

export default AuthenticatedApp;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
