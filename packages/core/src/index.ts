import 'reflect-metadata';

import chalk from 'chalk';

import { isString } from '@zylmo/shared'; // 配置好 需要 install 才可以，然后就需要配合tsup编译出对应的文件
import { commom, download, singleton } from './utils/index.js';
// import { DlogMethod } from './decorator/index.js'
// import { formReflect } from './form/index.js'

console.log(chalk.bgGreen('./src/main.ts 启动成功...'));

console.log('[ isString ] >', isString('测试...'));

console.log('[ commom, download, singleton ] >', commom, download, singleton);
// Object.setPrototypeOf(DlogMethod, null);
// console.log('[ DlogMethod ] >', DlogMethod)
// console.log('[ form ] >', formReflect)

export {
  commom,
  download,
  singleton,
  // DlogMethod,
  // formReflect,
};
