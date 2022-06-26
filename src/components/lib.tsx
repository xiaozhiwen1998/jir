import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  /* props 是通过函数传入， 变量需要写声明变量 */
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      //通过props传入参数。 如果gap是数值，就直接使用，如果不是数值就使用2rem，否则就是undefined
      typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`;

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'}></Spin>
    <span>加载中....</span>
  </FullPage>
);
