import qs from 'qs';
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

// TIP:会自动根据环境切换
const apiUrl = process.env.REACT_APP_API_URL;

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
  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res: any) => {
        setUsers(res);
      });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res: any) => {
        setList(res);
      });
  }, [debounceValue]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};

export default ProjectListScreen;
