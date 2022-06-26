import { Typography } from 'antd';
import { useProject } from 'hooks/getData/useProject';
import { useUsers } from 'hooks/getData/useUser';
import React, { useState } from 'react';
import styled from 'styled-components';
import List from './list';
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
}

const ProjectListScreen = () => {
  // state 可控组件
  const [param, setParam] = useState<InputControl>({
    name: '',
    personId: '',
  });

  // //state 是否正在加载
  // const [isLoading, setIsLoading] = useState(false);
  // //state 是否出错
  // const [error, setError] = useState('');
  // state 存储项目信息
  // const [list, setList] = useState<ProjectInterface[]>([]);
  //state 存储用户信息
  //  const [users, setUsers] = useState<UserInterface[]>([]);
  //使用useAsync 替代 上述三个state
  const { error, isLoading, data: list } = useProject(param);
  const { data: users } = useUsers();

  return (
    <ContentWarp>
      <h1>项目列表页</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger"> {error.message}</Typography.Text> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </ContentWarp>
  );
};

export default ProjectListScreen;

const ContentWarp = styled.div`
  padding: 3.2rem;
`;
