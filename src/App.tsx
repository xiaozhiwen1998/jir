import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';
import { UnauthenticatedAPP } from './unauthenticated-app/index';
import AuthenticatedApp from './authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/full-page-error';

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
