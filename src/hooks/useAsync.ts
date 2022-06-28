import { useCallback, useRef, useState } from 'react';
import { useMountRef } from './useMountedRef';

interface State<D> {
  error: Error | null;
  data: D | null;
  /** 请求的状态 */
  status: 'idle' | 'loading' | 'error' | 'success';
}
//tip: 使用useMemo 和useCallback的时机：为了非基本类型的依赖而存在，如果定义的非基本类型，例如对象（useMemo），或者函数(useCallback),想要做依赖的时候，限制其引用值地址更新导致的渲染（{} !==={}），只有当依赖项里面的值发生变化才会更改。
// 经验：当写自定义hooks时，如果要返回一个函数，需要使用useCallback.
export const useAsync = <D>(
  InitialState: State<D> = { error: null, data: null, status: 'idle' },
  throwOnError = false,
) => {
  //tip: 注意泛型的书写方式
  const [state, setState] = useState<State<D>>(InitialState);

  const setData = useCallback(
    (data: D | null) => setState({ data, status: 'success', error: null }),
    [],
  );

  const setError = useCallback(
    (error: Error) => setState({ data: null, status: 'error', error }),
    [],
  );

  //tip:用来处理组件卸载时，调用setState，导致的出错
  const MountedRef = useMountRef();

  //tip:再次使用上一次的promise
  const retry = useRef<() => void>();

  //用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      //tip ： promise类型守卫
      if (!promise || !promise.then) {
        throw new Error('传入promise类型数据');
      }
      if (runConfig && runConfig.retry) {
        retry.current = () => run(runConfig.retry()); //保存 上一次的run(promise)
      }
      setState((preState) => {
        return { ...preState, status: 'loading' };
      });
      return promise
        .then((data: D) => {
          //tip:如果为true 说明组件正在被挂载而不是卸载状态。
          if (MountedRef.current) {
            setData(data);
          }
          return data;
        })
        .catch((err) => {
          //tip: 这里的catch 会捕捉异常,需要返回Promise.reject，才能被login登录中catch捕捉
          if (MountedRef.current) {
            setData(null); //清空
          }
          setError(err);
          if (throwOnError) return Promise.reject(err);
          return err;
        });
    },
    [MountedRef, setData, setError, throwOnError],
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
