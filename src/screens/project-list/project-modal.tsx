import React, { FC, ReactEventHandler } from 'react';
import { Button, Drawer, DrawerProps } from 'antd';

interface projectModalProps extends DrawerProps {
  projectModelOpen: boolean;
  onClose: ReactEventHandler | undefined;
}

export const ProjectModal: FC<projectModalProps> = ({ projectModelOpen = false, onClose }) => {
  return (
    <Drawer onClose={onClose} visible={projectModelOpen} width={'100%'}>
      <h1>Project model</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
