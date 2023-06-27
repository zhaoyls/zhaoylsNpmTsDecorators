/**
 * 返回一个代理，允许类只有一个实例。
 * @param {Function} className - 要代理的类。
 * @returns {Proxy} ins - 传入类的实例对象。
 */
export function singletonProxy<T extends new (...args: any[]) => any>(
  className: T
): T {
  let ins: T;
  return new Proxy(className, {
    construct(target, args) { // 通过拦截目标对象的构造函数调用，实现单例。
      if (!ins) {
        ins = new target(...args);
      }
      return ins;
    },
  });
}

// class MyClass {
//   constructor(public username: string) {}
// }

// const SingletonMyClass = singletonProxy(MyClass);
// const a = new SingletonMyClass('user1');
// const b = new SingletonMyClass('user2');

// console.log(a.username); // 'user1'
// console.log(b.username); // 'user1'
// console.log(a === b); // true