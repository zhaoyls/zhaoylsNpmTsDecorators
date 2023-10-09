import 'reflect-metadata';
import chalk from 'chalk';
import * as utils from './utils/index.js';
import * as form from './form/index.js';
import * as decorator from './decorator/index.js';

const { print } = utils.commom;

// print("utils", utils);
// print("form", form);
// print("decorator", decorator);
// Object.setPrototypeOf(decorator.Dlog, null);

print(chalk.bgGreen('./src/main.ts 启动成功...'));
