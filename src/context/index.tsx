import React, { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';
const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};

export default AppProvider;
