import { useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  /** 请求的状态 */
  status: 'idle' | 'loading' | 'error' | 'success';
}

export const useAsync = <D>(
  InitialState: State<D> = { error: null, data: null, status: 'idle' },
  throwOnError = false,
) => {
  //tip: 注意泛型的书写方式
  const [state, setState] = useState<State<D>>(InitialState);

  const setData = (data: D | null) => setState({ data, status: 'success', error: null });

  const setError = (error: Error) => setState({ data: null, status: 'error', error });

  //用来触发异步请求
  const run = (promise: Promise<D>) => {
    //tip ： promise类型守卫
    if (!promise || !promise.then) {
      throw new Error('传入promise类型数据');
    }
    setState({ ...state, status: 'loading' });
    return promise
      .then((data: D) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        //tip: 这里的catch 会捕捉异常,需要返回Promise.reject，才能被login登录中catch捕捉
        setData(null); //清空
        setError(err);
        if (throwOnError) return Promise.reject(err);
        return err;
      });
  };
  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state, //传出 data, status, error
  };
};
