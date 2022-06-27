import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import KanbanScreen from './kanban-screen';
import EpicScreen from './epic-screen';

const ProjectScreen = () => {
  return (
    <ContentWarp>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
      </Routes>
    </ContentWarp>
  );
};

export default ProjectScreen;

const ContentWarp = styled.div`
  padding: 3.2rem;
`;
