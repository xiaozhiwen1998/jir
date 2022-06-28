import { useEffect } from 'react';
import { UserInterface } from 'screens/project-list';
import { cleanObject } from 'utils';
import { useAsync } from '../useAsync';
import { useHttp } from '../useHttp';

export const useUsers = (param?: Partial<UserInterface>) => {
  const { run, ...result } = useAsync<UserInterface[]>();
  const client = useHttp();

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }));
  }, [client, param, run]);

  return result;
};
