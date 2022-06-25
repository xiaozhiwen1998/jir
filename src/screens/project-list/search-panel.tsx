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
      <form>
        <input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        ></input>

        <select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e.target.value })}
        >
          <option value="">负责人</option>

          {users &&
            users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
        </select>
      </form>
    </div>
  );
};

export default SearchPanel;
