import { useEffect } from 'react';
import { InputControl, ProjectInterface } from 'screens/project-list';
import { cleanObject } from 'utils';
import { useAsync } from '../useAsync';
import { useDebounce } from '../useDebounce';
import { useHttp } from '../useHttp';

export const useProject = (param: InputControl) => {
  const { run, ...result } = useAsync<ProjectInterface[]>();
  const client = useHttp();
  const debounceValue = useDebounce(param, 300);

  useEffect(() => {
    run(client('projects', { data: cleanObject(param) }));
  }, [debounceValue]);

  return result;
};
