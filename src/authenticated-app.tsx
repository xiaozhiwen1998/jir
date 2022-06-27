import { PageHeader } from 'components/page-header';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import ProjectListScreen from './screens/project-list';
import ProjectScreen from 'screens/project-screen';

const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader></PageHeader>
      <Main>
        <Routes>
          <Route path="/project" element={<ProjectListScreen />} />
          {/* tip:":"表示参数 */}
          <Route path="/project/:projectId/*" element={<ProjectScreen />}></Route>
          <Route path="*" element={<Navigate to={`/project`} />} />
        </Routes>
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

const Main = styled.main``;
