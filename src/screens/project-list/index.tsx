import { useHttp } from 'hooks/useHttp';

import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { cleanObject } from '../../utils';
import List from './list';
import SearchPanel from './search-panel';

export type InputControl = Record<'name' | 'personId', string>;
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface ListInterface {
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
  //state 存储用户信息
  const [users, setUsers] = useState<UserInterface[]>([]);

  //state 存储项目信息
  const [list, setList] = useState<ListInterface[]>([]);

  // debounce
  const debounceValue = useDebounce(param, 300);

  // 获取用户列表

  const client = useHttp();

  useEffect(() => {
    client('users').then(setUsers);
  }, []);

  useEffect(() => {
    client('projects', { data: cleanObject(param) }).then(setList);
  }, [debounceValue]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};

export default ProjectListScreen;
