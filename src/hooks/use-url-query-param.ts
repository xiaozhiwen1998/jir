import { useMemo, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from '../utils/index';

//返回页面url执行键的参数值。
//tips，使用泛型，传入key数组，通过key从url中获取value，返回 {key,value} ,所有的K 都是在 K 中。
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // //react-router-dom提供的hook,需要通过 get来获取参数。
  const [searchParams, setSearchParams] = useSearchParams();
  const [stateKeys] = useState(keys);

  //每一次渲染都会返回一个新的对象。会导致页面重复渲染
  return [
    useMemo(() => {
      return stateKeys.reduce((pre, key) => {
        //tip： key是一个变量。不能直接写成key
        //tip：get返回的是string | null， null 不能赋值给string, 因此会报错。
        return { ...pre, [key]: searchParams.get(key) || '' };
        // 或则 }, {} as Record<string, string>),
      }, {} as { [key in K]: string });
      //tip:searchParams是一个对象，为什么这里依赖的searchParams对象不会引起页面重新渲染？
      // 因为useSearchParams，类似useState,需要显示的调用set方法才会认为对象发生了改变。
    }, [stateKeys, searchParams]), //只有当 url发生改变时候才会调用。
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
    //tips:如果不加上as const 会造成 元组会被自动解析成联合类型，我们需要加上as const变成tuple类型。
  ] as const;
};
