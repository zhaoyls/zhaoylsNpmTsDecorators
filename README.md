# npmTsDecorators

npm 发布包测试代码，后续 TS 装饰器学习代码以及工具封装都会存在这里。

## 依赖工具 ni

```sh
$ npm i @antfu/ni -g
$ ni --frozen
$ nr serve
$ nr build
```

## 初始化项目

See: [pnpm](https://pnpm.io/zh/pnpm-cli)

```bash
$  npm / pnpm init -y         # package.json
$  npm / pnpm add typescript  # dependencies
$  npm / pnpm add typescript -D # devDependencies
```

## 发布 npm 包流程

See: [npm](https://www.npmjs.com/)

### 查看用户，登录 npm 官网

```bash
 $ npm whoami / pnpm whoam
 $ npm login / pnpm login
 Username: admin
 Password: 123456
 Email: (this IS public) 123456@qq.com
 npm notice Please check your email for a one-time password (OTP)
 Enter one-time password: 键入一次性口令/密码（OTP）。
```

### 添加作用域@，并公开包权限

```bash
# 1.单一的版本控制（ monorepo 多项目在一个仓库管理）
$ npm / pnpm init --scope=itsme -y
$ npm / pnpm publish --access=public

# 2.或分包发布控制 D开发依赖项 w工作区依赖（指在 monorepo 或多包项目中共享的依赖项）
pnpm i @changesets/cli -Dw
# 初始化，随后在 script 中配置脚本命令  "release": "changeset publish", 运行发布。
pnpm changeset init

```

### 新增打印工具 chalk progress

```bash
pnpm add chalk -D
pnpm add progress -D
```

## 工具库搭建

1. 初始化工作目录配置

> ！！！！！其中参数D开发依赖项 w工作区依赖（指在 `monorep`o 或多包项目中共享的依赖项），另外如果需要单独给 `packages/cor`e 安装指定依赖使用 `pnpm add chalk --filter @zyl/core`。最后就是运行对应包的脚本 `pnpm --filter @zyl/core serve`。

```bash
$ pnpm init -y
$ echo > pnpm-workspace.yaml

$ mkdir packages/core
$ cd packages/core
$ pnpm init  -y
$ pnpm add reflect-metadata -Dw
$ pnpm i typescript @types/node -Dw
$ pnpm add ts-node -Dw  # devDependencies
$ pnpm add nodemon -Dw  # devDependencies
$ npx tsc --init  # create tsconfig,json
```

2. eslint + prettier + husky + commitlint

```bash
$ pnpm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -Dw  # 去配置脚本命令和检查的规则。

$ pnpm i prettier eslint-config-prettier eslint-plugin-prettier -Dw # 去配置脚本命令  "format": "prettier --write --cache ." .表示当前目录所有文件， cache 只有修改过的文件或新添加的文件会被重新格式化。

$ pnpm i husky lint-staged -Dw #  git hooks 协助运行 eslint 和 prettier 进行校验。
# 随后配置脚本命令（具体见 package.json prepare 和 lint-staged）, 如下初始化 husky。
$ npx husky install
$ npx husky add .husky/pre-commit "npx --no-install lint-staged"

# 下载创建 commitlint.config.ts 后运行第二个命令用于设置 Husky 的 commit-msg 钩子的命令。
$ pnpm i @commitlint/config-conventional @commitlint/cli  -Dw
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# 验证：
$ git add . && git commit -m "验证 husky commitlint"
$ git push
```

3. 共享函数集合@zyl/shared
   初始化 shared

```bash
$ cd packages/shared && pnpm init
```

配置路径 tsConfig

```json
"baseUrl": ".",
"paths": {
  "@zyl/shared": ["./packages/shared/index.ts"], // 引入它的地方 需要配置依赖和安装。
  "@zyl/shared/*": ["./packages/shared/*"],
  "@zyl/core": ["./packages/core/index.ts"],
  "@zyl/core/*": ["./packages/core/*"]
},
```

4. 单元测试

```bash
$ pnpm i vitest -Dw # 配置vitest.config.ts 及 package.json 中脚本命令。

```

5. 构建打包
   esm、cjs、iife 格式

- esm 格式：ECMAScript Module，现在使用的模块方案，使用 import export 来管理依赖；
- cjs 格式：CommonJS，只能在 NodeJS 上运行，使用 require("module") 读取并加载模块；
- iife 格式：通过 <script> 标签引入的自执行函数；

```bash
$ pnpm add tsup -Dw # 使用 tsup.config 处理 （用于打包 TypeScript 项目的工具）
```
tsup.config 配置:
```js
  {
    entry: ['packages/shared/index.ts'],
    format: ['cjs', 'esm', 'iife'],
    outDir: 'packages/shared/dist',
    dts: true, 
    metafile: true, 
    minify: true,
    splitting: false,
    sourcemap: true, 
    clean: true, // 先清除打包的目录!
  },
```

配置好 tsup 后在对应包 package.json 配置好路径, 例如 shared 包配置.
```json
 "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "unpkg": "./dist/index.global.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    },
    "./*": "./*"
  },```