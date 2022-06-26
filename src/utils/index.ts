/*
  tip: 如果泛型是object会出错。
  因为object可能是function 或者数组都可以,对函数进行解构操作的话会出错。
  也可以替换成 {[key:string]:unknown}
*/
export const cleanObject = (object: Record<string, unknown>): Record<string, unknown> => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    //要注意value=0的情况,0是有效的数字
    if (!value && value !== 0) {
      delete result[key];
    }
  });
  return result;
};
