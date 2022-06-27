import { useEffect, useRef } from 'react';

//需要所有页面都使用 useDocumentTitle,否则更换页面时title不会改变,闭包实现
/**
 * @param title  表示传入的title值
 * @param keepOnUnmount 是否卸载组件的时候保留
 */
export const useDocumentTitle1 = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

//useRef实现
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle.current;
      }
    };
  }, []);
};
