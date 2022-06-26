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
    <div>
      <Form>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        ></Input>

        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>

          {users &&
            users.map((user) => {
              return (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              );
            })}
        </Select>
      </Form>
    </div>
  );
};

export default SearchPanel;
