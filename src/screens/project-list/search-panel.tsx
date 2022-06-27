import { Form, Input, Select } from 'antd';
import React, { FC } from 'react';
import { UserInterface, InputControl } from './index';

export interface SearchPanelPropsInterface {
  param: InputControl;
  setParam: (param: InputControl) => void;
  users: UserInterface[];
}

const SearchPanel: FC<SearchPanelPropsInterface> = ({ param, setParam, users }) => {
  // state 存储用户信息
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Form layout={'inline'}>
        <Form.Item>
          <Input
            placeholder="请输入项目名称"
            type="text"
            value={param.name}
            onChange={(e) => setParam({ ...param, name: e.target.value })}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Select
            value={param.personId}
            onChange={(value) => setParam({ ...param, personId: value })}
          >
            <Select.Option value="">负责人</Select.Option>
            {users &&
              users.map((user) => {
                return (
                  <Select.Option key={user.id} value={String(user.id)}>
                    {user.name}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchPanel;
