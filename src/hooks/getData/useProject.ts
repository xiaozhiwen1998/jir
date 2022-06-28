import { useEffect } from 'react';
import { InputControl, ProjectInterface } from 'screens/project-list';
import { cleanObject } from 'utils';
import { useAsync } from '../useAsync';
import { useHttp } from '../useHttp';

export const useProject = (param: InputControl) => {
  const { run, ...result } = useAsync<ProjectInterface[]>();
  const client = useHttp();

  useEffect(() => {
    run(client('projects', { data: cleanObject(param) }), {
      retry: () => client('projects', { data: cleanObject(param) }),
    });
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...resResult } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<ProjectInterface>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: 'PATCH',
      }),
    );
  };

  return { mutate, ...resResult };
};

export const useAddProject = () => {
  const { run, ...resResult } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<ProjectInterface>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: 'POST',
      }),
    );
  };

  return { mutate, ...resResult };
};
