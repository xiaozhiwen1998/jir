import { Button, Dropdown, Menu, Table, TableProps } from 'antd';
import Pin from 'components/pin';
import dayjs from 'dayjs';
import { useEditProject } from 'hooks/getData/useProject';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProjectInterface, UserInterface } from './index';

//tip: TableProps 接收泛型，表示要渲染数据的类型,数据源在dataSource中
interface ListPropsInterface extends TableProps<ProjectInterface> {
  users: UserInterface[];
  refresh: (() => void) | undefined;
  setProjectModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const List: FC<ListPropsInterface> = ({ users, refresh, setProjectModelOpen, ...resProps }) => {
  const { mutate } = useEditProject();

  //tip:函数柯里化()()
  const handleOnCheckedChange = (id: string) => (pin: boolean) => mutate({ id, pin }).then(refresh);
  /* tip： 添加唯一索引rowKey */
  return (
    <Table
      // loading={loading}  使用透传
      rowKey={'id'}
      pagination={false}
      {...resProps}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin checked={project.pin} onCheckedChange={handleOnCheckedChange(project.id)}></Pin>
            );
          },
        },
        { title: 'id', dataIndex: 'id' },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            //tip:id 后台传入的是 number类型
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users && users.find((user) => user.id === project.personId)?.name}</span>;
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知'}</span>
            );
          },
        },
        {
          title: '编辑',
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key={'edit'}
                      onClick={() => {
                        setProjectModelOpen(true);
                      }}>
                      编辑
                    </Menu.Item>
                    <Menu.Item
                      key={'edit'}
                      onClick={() => {
                        //todo
                      }}>
                      删除
                    </Menu.Item>
                  </Menu>
                }>
                <Button type="link" style={{ padding: '0px' }}>
                  ...
                </Button>
              </Dropdown>
            );
          },
        },
      ]}></Table>
  );
};

export default List;
