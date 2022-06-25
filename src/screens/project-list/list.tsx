import React, { FC } from 'react';
import { ListInterface, UserInterface } from './index';

interface ListPropsInterface {
  list: ListInterface[];
  users: UserInterface[];
}

const List: FC<ListPropsInterface> = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((project) => {
            return (
              <tr key={project.id}>
                <th>{project.name}</th>
                <th>{users && users.find((user) => user.id === project.personId)?.name}</th>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default List;
