import { Spin } from 'antd';
import React from 'react';
import { FullPage } from './lib';

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'}></Spin>
    <span>加载中....</span>
  </FullPage>
);
