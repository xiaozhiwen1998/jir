import { Table } from 'antd';
import React, { FC } from 'react';
import { ListInterface, UserInterface } from './index';

interface ListPropsInterface {
  list: ListInterface[];
  users: UserInterface[];
}

const List: FC<ListPropsInterface> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          dataIndex: 'name',
          render(value, project) {
            return (
              <span>{users && users.find((user) => user.id === project.personId)?.name};</span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};

export default List;
