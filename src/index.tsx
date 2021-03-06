import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool';
// 务必在jira-dev-tool后面引入
import 'antd/dist/antd.less';
import AppProvider from './context/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

loadServer(() => {
  root.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </React.StrictMode>,
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
