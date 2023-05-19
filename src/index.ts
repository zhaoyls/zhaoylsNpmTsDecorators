/**
 *  ES7 decorator 装饰器借助对象 defineProperty 方法实现 主要面向 AOP 编程
 *  TypeScript中的装饰器 https://www.tslang.cn/docs/handbook/decorators.html
 * 装饰器的运行时刻（时机）：
 *  - 定义类的时候，就会立即对类进行装饰，而不是对类进行实例化的时候
 *  - 类装饰器接收的参数是构造函数，如果是方法 target、 key、 descriptor。如果属性？。
 *  - 多装饰器，会从左到右，从上到下收集所有的装饰器，装饰器执行顺序：从下到上，从右到左。
 * @param constructor
 */
export function log(constructor: any) {
    console.log(constructor);
    console.log("@log装饰器日志系统");
  }
  
  @log
  class ExceptionErr {}
  new ExceptionErr();