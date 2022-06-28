import { PageHeader } from 'components/page-header';
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import ProjectListScreen from './screens/project-list';
import ProjectScreen from 'screens/project-screen';
import ProjectModal from 'screens/project-list/project-modal';
import { Button } from 'antd';

const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModelOpen] = useState(false);
  const projectButton = (
    <Button
      style={{ paddingLeft: '0px' }}
      type={'link'}
      onClick={() => {
        setProjectModelOpen(true);
      }}>
      创建新项目
    </Button>
  );
  return (
    <Container>
      <PageHeader projectButton={projectButton}></PageHeader>
      <Main>
        <Routes>
          <Route
            path="/project"
            element={<ProjectListScreen setProjectModelOpen={setProjectModelOpen} />}
          />
          {/* tip:":"表示参数 */}
          <Route path="/project/:projectId/*" element={<ProjectScreen />}></Route>
          <Route path="*" element={<Navigate to={`/project`} />} />
        </Routes>
      </Main>
      <ProjectModal
        projectModelOpen={projectModelOpen}
        onClose={() => setProjectModelOpen(false)}
      />
    </Container>
  );
};

export default AuthenticatedApp;

//tip：为什么这里声明，却可以在上面使用，也是变量提升，放到暂时性死区。因为并没有使用，而只是声明
//类似于 const f =()=>d  const d =1 ; 只是声明，并没有使用。
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main``;
