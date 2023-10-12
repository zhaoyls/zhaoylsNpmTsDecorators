// (() => {
//   debugger;
//   console.log('Test');
//   return void 0;
// })();
import { expect, describe, it } from 'vitest';
import { singletonProxy } from '../utils/singleton';

class MyClass {
  constructor(public username: string) {}
}

describe('SingletonMyClass test', () => {
  it('判断是不是一个单例 ', () => {
    const SingletonMyClass = singletonProxy(MyClass);
    const a = new SingletonMyClass('user1');
    const b = new SingletonMyClass('user2');
    const cs = a === b;
    expect(cs).toEqual(true);
  });

  // it('判断是不是一个单例2 ', () => {
  //   const SingletonMyClass = singletonProxy(MyClass);
  //   const a = new SingletonMyClass('user1');
  //   const b = new SingletonMyClass('user2');
  //   const cs = a === b
  //   expect(cs).toEqual(false)
  // })
});
