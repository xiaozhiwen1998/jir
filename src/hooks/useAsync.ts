import { useCallback, useReducer, useRef } from 'react';
import { useMountRef } from './useMountedRef';
import useSafeDispatch from './useSafeDispatch';

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
  const [state, dispatch] = useReducer(
    //定义的dispatch函数， action可以是自己定义的类型。dispatch能够返回新的state即可。
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    InitialState,
  );
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D | null) => safeDispatch({ data, status: 'success', error: null }),
    [safeDispatch],
  );

  const setError = useCallback(
    (error: Error) => safeDispatch({ data: null, status: 'error', error }),
    [safeDispatch],
  );

  const retry = useRef<() => void>();

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      //tip ： promise类型守卫
      if (!promise || !promise.then) {
        throw new Error('传入promise类型数据');
      }
      if (runConfig && runConfig.retry) {
        retry.current = () => run(runConfig.retry()); //保存 上一次的run(promise)
      }

      safeDispatch({ status: 'loading' });

      return promise
        .then((data: D) => {
          setData(data);
          return data;
        })
        .catch((err) => {
          setData(null); //清空
          setError(err);
          if (throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [safeDispatch, setData, setError, throwOnError],
  );

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    retry: retry.current, //用来刷新页面
    ...state, //传出 data, status, error
  };
};
