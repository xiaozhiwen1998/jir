import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.less';
import { UnauthenticatedAPP } from './unauthenticated-app/index';
import AuthenticatedApp from './authenticated-app';

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}</div>;
}

export default App;
