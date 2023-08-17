import { getCallerFileInfo } from "../utils/stackError.js";

/**
  * 装饰器函数，用于装饰一个类 声明： declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
  * - 普通装饰器（无法传参）function DClassLog(target: Object) {}
  * - 装饰器工厂（可接传参）function DClassLog(...args: any[]) { return function(target: Object) }
  * - 重载构造函数 (extents) function DClassLog(target: Object) { return class extends target {}}     
- * @constructor  被装饰类的构造函数
  * @returns {Function} 装饰器函数 用于记录构造函数名称、文件路径、行号、列号
 */
export function DClassLog() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const { filePath, lineNumber, columnNumber } = getCallerFileInfo();
    console.log(`${filePath}:${lineNumber}:${columnNumber}:${constructor.name}`);   
  };
}

/**
 * 为类属性添加日志记录行为 声明：declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 * 需要注意区分【静态】成员和【实例】成员：一个是类的构造函数、一个是构造函数原型对象。
 * @param target 目标对象
 * @param key 要设置属性的名称
 */
export function DlogProperty(target: Object, key: string) {
  let value = target[key];

  const getter = function () {
    console.log(`Getting value for ${key}: ${value}`);
    return value;
  };

  const setter = function (newVal: any) {
    console.log(`Setting value for ${key} to ${newVal}`);
    value = newVal;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

/**
 * 方法调用和结果记录装饰器 声明：declare type MethodDecorator = <T>( target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
 * @param target 被装饰类的原型对象
 * @param key 被装饰方法的名称
 * @param descriptor 被装饰方法的对象
 * @returns 修改后的描述符对象
 */
export function DlogMethods(
  target: Object,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`Result of ${key}: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}

// 就到这里把..
// 方法参数装饰器 区分实例/静态方法
// 访问器装饰器 get set

@DClassLog()
export class ExceptionErr {
  @DlogProperty
  private myProperty: string = "";

  @DlogMethods
  public getSetLog(param1: string, param2: number): string {
    this.myProperty = 'setter' + ' ' + "触发了属性装饰器！";
    console.log('[  getmyProperty ] >', this.myProperty)
    
    return `Received ${param1} and ${param2}`;
  }
}

// new ExceptionErr().getSetLog("参数", 6666666777777777); 
