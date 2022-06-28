import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import { useProject } from 'hooks/getData/useProject';
import { useUsers } from 'hooks/getData/useUser';
import { useDocumentTitle } from 'hooks/useDocumentTitle';

import List from './list';

import { useUrlQueryParam } from 'hooks/use-url-query-param';
import { useDebounce } from 'hooks/useDebounce';
import SearchPanel from './search-panel';
export type InputControl = Pick<ProjectInterface, 'name' | 'personId'>;
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface ProjectInterface {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: string;
  pin: boolean; //是否收藏
}

const ProjectListScreen = () => {
  useDocumentTitle('我的项目列表', false);
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  const debounceValue = useDebounce(param, 300);
  const { error, isLoading, data: list, retry } = useProject(debounceValue);
  const { data: users } = useUsers();

  return (
    <ContentWarp>
      <h1>项目列表页</h1>
      {/* tip: 这里传入的param 每次渲染不一样，会导致循环渲染。 {a:1} !=={a:1} */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger"> {error.message}</Typography.Text> : null}
      <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} />
    </ContentWarp>
  );
};

export default ProjectListScreen;

//查找循环渲染的原因
// ProjectListScreen.whyDidYouRender = true;

const ContentWarp = styled.div`
  padding: 3.2rem;
`;
