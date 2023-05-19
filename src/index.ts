/**
 *  ES7 @decorator 装饰器借助对象 defineProperty 方法来实现，主要面向 AOP 编程。
 *  [TypeScript 装饰器](https://www.tslang.cn/docs/handbook/decorators.html)
 *  - 时机：定义类时，就会立即对类进行装饰，而不是对类进行实例化时。
 *  - 分类：参数装饰器 方法装饰器 访问器装饰器 属性装饰器 类装饰器。
 *  - 顺序：多装饰器，会从左到右，从上到下收集所有的装饰器，装饰器执行顺序：从下到上，从右到左。
 * @param constructor
 */
export function log<T extends { new (...args: any[]): {} }>(constructor: T) {
  console.log(" classs", constructor);
  console.log(" @log 装饰器日志系统");
}

// export function log() {
//     return function <T extends { new (...args: any[]): {} }> (constructor: T) {
//         console.log(' classs', constructor);
//         console.log(" @log 装饰器日志系统");
//     }
//   }

@log
export class ExceptionErr {}