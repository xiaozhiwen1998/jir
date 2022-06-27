import React from 'react';
import { FullPage } from './lib';
import { ReactComponent as ErrorPageSvg } from '../assets/error.svg';
import { DevTools } from 'jira-dev-tool';

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <div style={{ position: 'absolute', left: '55vw', color: 'white', fontSize: '30px' }}>
      {error?.message}
    </div>
    <DevTools></DevTools>
    <ErrorPageSvg></ErrorPageSvg>
  </FullPage>
);
