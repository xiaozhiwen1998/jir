import { Button, Divider, List, Popover, Typography } from 'antd';
import { useProject } from 'hooks/getData/useProject';
import React from 'react';
import styled from 'styled-components';

const ProjectPopover = ({
  setProjectModelOpen,
}: {
  setProjectModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: projects, isLoading } = useProject(); //获取project列表

  const pinnedProject = projects?.filter((project) => project.pin); //筛选所有收场项目

  const content = (
    <ContentWrap>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider style={{ margin: '2px' }} />
      <Button
        style={{ paddingLeft: '0px' }}
        type={'link'}
        onClick={() => {
          setProjectModelOpen(true);
        }}>
        创建新项目
      </Button>
    </ContentWrap>
  );
  return (
    <Popover content={content}>
      <h2>项目</h2>
    </Popover>
  );
};

export default ProjectPopover;

const ContentWrap = styled.div`
  min-width: 20rem;
`;
