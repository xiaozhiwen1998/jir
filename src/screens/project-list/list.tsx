import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { ProjectInterface, UserInterface } from './index';

//tip: TableProps 接收泛型，表示要渲染数据的类型,数据源在dataSource中
interface ListPropsInterface extends TableProps<ProjectInterface> {
  users: UserInterface[];
  // isLoading: boolean;  // tip: 使用继承 tableProps，使其能够添加更多属性
}

const List: FC<ListPropsInterface> = ({ users, ...resProps }) => {
  {
    /* tip： 添加唯一索引rowKey */
  }
  return (
    <Table
      // loading={loading}  使用透传
      rowKey={'id'}
      pagination={false}
      {...resProps}
      columns={[
        { title: 'id', dataIndex: 'id' },
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>{users && users.find((user) => user.id === project.personId)?.name};</span>
            );
          },
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          render(value, project) {
            return (
              <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知'}</span>
            );
          },
        },
      ]}
    ></Table>
  );
};

export default List;
