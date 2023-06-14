/**
 * 返回一个代理，允许类只有一个实例。
 * @param {Function} className - 要代理的类。
 * @returns {Proxy} ins - 传入类的实例对象。
 */
export default function singletonProx<T extends new (...args: any[]) => any>(
  className: T
): T {
  let ins: T;
  return new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args);
      }
      return ins;
    },
  });
}

//