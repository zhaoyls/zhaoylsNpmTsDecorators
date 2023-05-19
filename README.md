# @decorators
测试项目装饰器及ts5.0特性，发布包！

## 初始化项目
See: [pnpm](https://pnpm.io/zh/pnpm-cli)

```bash
$  npm / pnpm init -y         # package.json
$  npm / pnpm add typescript  # dependencies
$  tsc --init                 # tsconfig.json 
$  npm / pnpm add ts-node -D  # devDependencies
$  npm / pnpm add nodemon -D  # devDependencies
```
...

##  发布 npm 包流程
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
$ npm / pnpm init --scope=itsme -y
$ npm / pnpm publish --access=public
```
