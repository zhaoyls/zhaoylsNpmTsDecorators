# npmTsDecorators

npm 发布包测试代码，后续 TS 装饰器学习代码以及工具封装都会存在这里。

- ...
-
-

- [pnpm 及项目初始化](#初始化项目)
- [monorep 工具项目](#发布-npm-包流程)
- [eslint husky等工具](#eslint--prettier--husky--commitlint)
- [vitest 单元测试](#vitest-单元测试)
- [vitepress 文档](#vitepress-搭建文档)
- [tsup 构建打包](#tsup-构建打包)
- [github pages](#github-pages-部署文档)
- [npm 发包](#发布-npm-包流程)

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
 $ npm login / pnpm login
 $ npm whoami / pnpm whoami
 Username: admin
 Password: 123456
 Email: (this IS public) 123456@qq.com
 npm notice Please check your email for a one-time password (OTP)
 Enter one-time password: 键入一次性口令/密码（OTP）。
```

### 添加作用域@，并公开包权限

```bash
# 1.单一的版本控制（ monorepo 多项目在一个仓库管理）
$ npm init --scope=zylmo -y
$ npm / pnpm publish --access=public # "publishConfig": { "access": "public"} 最好在子包中添加配置.
$ npm / pnpm unpublish zyls-decorators --force # 删除指定的 package 或者对应版本。

# 2.或分包发布控制 D开发依赖项 w工作区依赖（指在 monorepo 或多包项目中共享的依赖项）
# !!!!!!!! 注意子包的@xxx/xx 需要在 npm 注册 Organizations 并添加 @zylmo/shared / @zylmo/shared package包
pnpm i @changesets/cli -Dw
pnpm changeset init

```

配置脚本 package.json "script": {...}

```json
{
  "release": "changeset publish"
}
```

发布： pnpm release。

### 新增打印工具 chalk progress

```bash
pnpm add chalk -D
pnpm add progress -D
```

## 工具库搭建

Monorepo 开发方式。

### 初始化工作目录配置

> ！！！！！其中参数D开发依赖项 w工作区依赖（指在 `monorepo` 或多包项目中共享的依赖项），另外如果需要单独给 `packages/cor`e 安装指定依赖使用 `pnpm add chalk --filter @zylmo/core`。最后就是运行对应包的脚本 `pnpm --filter @zylmo/core serve`。

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

### eslint + prettier + husky + commitlint

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

### 共享函数集合@zylmo/shared

初始化 shared

```bash
$ cd packages/shared && pnpm init
```

配置路径 tsConfig

```json
"baseUrl": ".",
"paths": {
  "@zylmo/shared": ["./packages/shared/index.ts"],
  "@zylmo/shared/*": ["./packages/shared/*"],
  "@zylmo/core": ["./packages/core/index.ts"],
  "@zylmo/core/*": ["./packages/core/*"]
},
```

### vitest 单元测试

```bash
$ pnpm i vitest -Dw # 配置vitest.config.ts 及 package.json 中脚本命令。
$ pnpm i @vitest/coverage-v8 -Dw # 测试覆盖率
```

### vitepress 搭建文档

```bash
$ pnpm i vitepress -Dw # 配置  vitepress.config.ts, 默认不需要配置
```

配置下脚本:

```json
  "docs:dev": "vitepress dev packages",
  "docs:build": "vitepress build packages",
```

- 新建 packages/index.md: 编写首页配置
- packages/core/doc/xx.md: 对应文档编写
- packages/guide/index.md 指导页
- packages/.vitepress/config.ts 配置路径等
- packages/.vitepress theme 配置主题

...

### GitHub Pages 部署文档

GitHub Pages。

- 配置Workflow file：C:\Users\zylmo\Desktop\react\zylmosTsDecorators\.github\workflows\docs-deploy.yml
- git push 提交去运行工作 （失败了可能是权限等问题，去 github 的 Actions 运行的任务去查看 ）
- 权限问题：头像-> Settings -> developer settings -> Token(classic) 配置生成 (这里我取名：zylmo-tool)。
- 去对应的项目点击 Settings -> Security -> Secrets -> Actions -> New repository secret 设置Name = ACTION_SECRET 值为上面生成的 Token。生成后可在 Repository secrets 中查看结果。
- 重新运行 Actions 中的工作 （回去用自己电脑 git config list --list 配置部署试试 ===>>>>>>>> `目前403 TODO 2023.10.16！！`）。
- 项目 Settings -> pages -> Build and deployment 设置在一个新的分支部署文档就OK.

### tsup 构建打包

tsup 来构建 esm、cjs、iife 格式文件或者选择 vite、webpack等工具

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
    clean: true, // 先清除打包的目录.
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
  },
```

### [具体见发布 npm 包流程](#发布-npm-包流程)
