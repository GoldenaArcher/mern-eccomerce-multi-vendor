# [MERN 项目实战] MERN Multi-Vendor 电商平台开发笔记（v2.1 基础工程化：Turborepo + Yarn Workspaces）

又是一起比想象中出现的早的文章，写这一篇的初心主要是来自于 2.0 的笔记中提出了一个疑问：微前端是解决业务逻辑重复的问题吗？

这里直接做个回答吧，不是 ❌，前端工程化才是解题思路，而经历过两个大版本的变更，从 1.0 的基础后端+dashboard UI，到 2.0 的 storefront UI，现在已经出现了 2 个 UI 界面，也确实迎来了更多重复代码的挑战

在花了两天的时间学习和研究，自觉有了些成果，打算趁着记忆还没消退的时候，系统性地整理一下

之前的笔记可以参考：

- [**[MERN] 项目实战】MERN Multi-Vendor 电商平台开发笔记（v1.0 初版结构 + 技术实践）**](https://goldenaarcher.blog.csdn.net/article/details/147279112)
- [**[MERN 项目实战] MERN Multi-Vendor 电商平台开发笔记（v2.0 从 bug 到结构优化的工程记录）**](https://blog.csdn.net/weixin_42938619/article/details/147476450)

感兴趣的也可以戳一下 github 地址，不过现在这个代码还是在更新中的：

[https://github.com/GoldenaArcher/mern-eccomerce-multi-vendor](https://github.com/GoldenaArcher/mern-eccomerce-multi-vendor)

---

## 👀  问题回顾

在 2.0 的笔记中我提到过一个问题，即 UI 部分的代码，在还没有开始正式的业务实现时已经出现了不少的重复，如：

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs]) {
  return twMerge(clsx(inputs));
}
```

这是一个很简单的 util 方法，主要处理的是 tailwind 的 CSS 合并问题。理论上来说，这样短的纯函数管理起来可能不会特别的复杂，毕竟也就是全局搜索 cv 几遍，其实不然……

2.0 中提到过一个 workspace 在使用某个第三方插件的时候，因为 React 版本不同的问题，出现了 `Invalid hook call` 的问题。这种情况也可能出现在这种插件上，尤其是在不少项目中，默认都是下载最新的版本，这更有可能会造成冲突

当时的解决方法就是在根目录的 package.json 中用 resolution 统一版本，随后再用 `yarn install --force` 强制规定版本一致。短期内这样的操作是解决了一些问题，但是从长期来看，这依旧无法解决后期可能会出现的升级，而导致的麻烦——同样的代码 cv 好几次，同样的 bug 修复好几次；越是担心这样的问题越无法升级，但是随着下载的 dependencies 到了 EOL，又不得不面对这样的问题……

众所周知，开发有两个非常知名的原则：

- **Don't repeat yourself - DRY，**不要重复自己
- **Keep it simple, stupid - KISS，维持愚蠢简单**

那解决思路其实应该也要从这两个方向着手

~~前者倒是可以满足了，后者……其实从配置上来说并没有简单很多，不过之后如果要做维护倒是会简单不少~~

## 🔍 问题分析

刚开始的项目设计倒是颇有先见之明，采取了 turborepo+yarn workspace 的方式进行管理——这里虽然有点王婆卖瓜，自卖自夸之嫌，不过当时也确实考虑到了后期可能会出现一些前后端的代码重复问题，尤其是 API 之间数据的类型，这种如果可以想办法拉出来做成 shared lib 的话，也省了 cv 两次的情况

当然，到了 2.0 后情况变得更复杂了一些，shopfront 的出现，让 UI 方面重复的代码变得更多了，在这些重复的代码之中，简单可以分成这两个部分：

- 和 React 无关的，纯函数的重复
- 与 React 有关的，包含了 UI 重复的组件

之前想着是否要使用微前端去解决这个问题，后面发现，微前端主要针对的问题在不同 UI 库之间的拼接，要解决重复代码的问题，不是不行，实在大材小用，杀鸡用牛刀。套在相对更佳成熟的后端应用场景就是，为了一个重复的 **lib**，特地做了一套微服务解决方案……

是的，问题的重点在这里：lib，AKA dependency

已知想要抽出来的功能，要么是纯函数，要么是 UI 组件，那么完全可以通过实现一个内部的依赖，让其他的项目在 package.json 中通过 dependencies 导入的方式去使用

## 📦 turborepo & 项目结构

这里需要简单的提一下 yarn workspace 和 turborepo 的关系。yarn workspace 负责管理依赖和 packages 的关联问题；turborepo 提供了 compile/transpile 的流程，并且 turborepo 事基于 yarn workspace 之上的，提供了高效编译和缓存功能的构造工具

换句话说，使用 turborepo 可以提供更细颗粒的控制，在这种情况下，非常满足我的需求：

- utils 方法不依赖于主程序、独立编译——turborepo 提供该功能
- utils 方法可以作为依赖，被主程序导入——yarn workspace 提供该功能

结果就是，utils 本身可以实现最大复用，并且它的维护/更新是独立于主程序之外的，也就做到了 DRY。KISS 部分，只能说初期没这么简单，但是在配置完了后，使用和维护会变得简单很多——utils 可以做稳定的部署，更新与测试与主程序无关。只要不介入 breaking changes，保持参数与返回值一致，主程序其实根本不在乎 utils 内部是如何实现的

<aside>
💡

补充说明一下，把 util 方法拉出去后，其实编译的速度会快很多。我并不太确定 turborepo 的异步编译在这个地方有多大的效果——毕竟存在依赖关系，但是 turborepo 本身是支持 HMR+cache 的，因此像 util 这种小方法，用 tsc 几乎是秒编译

React 那边可能会联动更新，不过在只需要修改和测试 util 的情况下，完全可以只运行对应的 utils，而不用依赖整个 React 项目

这也是为什么我提到提出来的方法是纯函数，没有外界的依赖

非纯函数管理起来会非常的麻烦……

</aside>

### 🏗️  项目结构设计

目前的结构如下：

```bash
├── backend
├── dashboard
├── frontend
└── packages
    ├── apis              # api 相关的配置，给redux用的，纯config 不包含状态
    │   ├── src
    │   └── tsconfig.json
    ├── hooks             # 如一些 pagination, debounce search 的 hooks
    │   ├── src
    │   └── tsconfig.json
    ├── ui                # 如一些 pagination，loaders 的 ui 组件库
    │   ├── src
    │   └── tsconfig.json
    └── utils             # 一些纯函数 utils，如 jwt 的 decode 之类的
        ├── src
        └── tsconfig.json
```

另外一种设计是主程序们归类在 `app` 下，和 `packages` 成对立的结构，不过要已经存在的项目结构要改很多的 import，而且目前来说项目结构比较简单——最多再加一个 LLM 相关的模块，因此保留现在的实现问题也不大

<aside>
🔔

根目录下还有一个新增的 tsconfig.base.json，现在想法是这个 config 文件可以作为所有项目的 base template，之后的项目只要继承这个 config，并且根据需求重写即可。项目结构是用 `tree` 跑的，手动加太麻烦了，这里就偷个懒

</aside>

## 🛠️ TypeScript 的落实

这里代码最终还是选择使用 TypeScript 去落实，主要的原因是因为提示比较方便——主要还是因为 utils 的方法是共用的，提早规范比不规范好

### base ts config

这个就是在根目录下的 ts config：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@mern/utils": ["packages/utils/src"],
      "@mern/hooks": ["packages/hooks/src"],
      "@mern/ui": ["packages/ui/src"],
      "@mern/apis": ["packages/apis/src"]
    }
  },
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/hooks" },
    { "path": "./packages/ui" },
    { "path": "./packages/apis" }
  ]
}
```

这里比较重要的是两个配置：

- paths - 让其他 TS 文件/项目在编译的时候知道，到什么路径去找对应的文件
- references - 让其他 TS 文件/项目在编译的时候知道，对应的模块（子项目）
  这个配置还是比较重要的，因为 turborepo 会根据这个配置去自动推导 build 的先后顺序，尤其是在当前项目里，其他的辅助方法可能对 `utils` 中的方法有依赖

### child ts config

这里我挑的是 ui 中的 tsconfig，主要是因为 ui 对 utils 是有依赖关系的。至少在这个项目里，这个字项目的 tsconfig 是最复杂的配置 ~~之一~~

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "composite": true,
    "declaration": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "../utils" }]
}
```

这里就提一下比较少用到的几个配置吧，其他的都还挺直接的：

- composite，表示是一个组成部分，即可以被别的包依赖的子项目
  这个配置有一个更特殊的点，就是告诉 tsc/turborepo 可以实现 incremental build，即只编译修改过的文件，跳过其他位修改的文件，这样可以极大地提高编译速度
    <aside>
    ❗
    
    这里也是有一个坑的，如果删除掉对应的文件，在composite为true的情况下，dist中的文件不会被删除，所以我在做refactor的时候遇到过好几次类似的问题
    
    目前采取的是手动的删除方法——毕竟代码量比较小。但是之后可能会考虑修改一下tasks，先做clean再build
    
    </aside>

- declaration，生成对应的 `d.ts` 类型声明文件
  我是看到配置推荐开就开了，不过在看其他的文档时有瞄到，如果不开的话，有可能其他的包会找不到对应 declaration，然后不能 infer 类型/方法/参数……？
  不过我目前用的是 JS 文件，而且也开了这个配置，所以没遇到过这个问题
- references，声明依赖关系，这样 tsc/turborepo 可以推导 build 的先后顺序

## 🔧 package.json 的配置

同样分为 root level 的 package.json 和子项目的 package.json

### root package.json

配置如下：

```json
{
  "devDependencies": {
    "typescript": "^5.8.3"
  },
  "workspaces": ["backend", "dashboard", "frontend", "packages/*"],
  "scripts": {
    "start": "turbo run start",
    "start:dev": "turbo run start:debug --parallel",
    "start:utils": "turbo run start:debug --filter=@mern/utils --concurrency=2",
    "start:ui": "turbo run start:debug --filter=@mern/ui --concurrency=2",
    "start:hooks": "turbo run start:debug --filter=@mern/hooks --concurrency=2",
    "start:packages": "turbo run start:debug --filter=@mern/utils --filter=@mern/ui --filter=@mern/hooks --concurrency=3"
  }
}
```

这里主要修改的就是 这三个地方， 其实都没什么好说的，一个是开发时的依赖，一个是 `workspaces` → 这里用的是 `packages/*` ，所以会包含 packages 下面的所有项目，根目录只需要配置一次即可

脚本里面需要注意的就是这两个参数了：

- `--parallel` ，这个表示所有的项目都会并发运行，完全的非阻塞——当然还是取决于电脑的配置
- `--concurrency` ，同时并行运行 n 个指令，阻塞式运行
  我加这个 flag 主要是之前跑的时候出现了一个 recursive cal：
  ![](https://i-blog.csdnimg.cn/direct/4f89f1d41d084bf9a5c3b37c981d0d27.png)

所以我加了这个 flag 做了一下测试

<aside>
❗

这里还是要多嘴题一下这个阻塞式运行，我之前在 debug 的时候也碰到过不少的问题

首先，这个阻塞式运行主要是针对的非 hanging 命令，如 build 指令。但是遇上 hanging 指令——比如说带 `--watch` 的指令，必须要保证当前可以并行运行的任务 ≥ 挂机指令

比如说我之前遇到这个 recursive 调用，一直增加挂机指令，如果我设置了 `--concurrency=2` ，那么第三个挂机指令出现后，turborepo 就会自动报错，并且停止运行，因为当前可以运行的指令超过了上限，报错异常如下：

```bash
@mern/utils:start:debug: turbo 2.4.4
@mern/utils:start:debug:
@mern/utils:start:debug:   × Invalid task configuration
@mern/utils:start:debug:   ╰─▶   × You have 1 persistent tasks but `turbo` is configured for concurrency of 1. Set --concurrency to at least 2
@mern/utils:start:debug:
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

</aside>

具体的高级配置，如并行/串行/先后调度等，暂时不会过多深入，如果碰到具体的问题再继续研究。

### child package.json

依旧只挑最复杂的 ui 作为案例：

```json
{
  "name": "@mern/ui",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "start": "tsc --watch",
    "start:debug": "tsc --watch"
  },
  "devDependencies": {
    "@types/react": "^19.1.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "tailwindcss": "3"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "react-icons": "^5.0.0"
  },
  "dependencies": {
    "@mern/hooks": "*",
    "@mern/utils": "*",
    "react-spinners": "^0.17.0"
  }
}
```

这里也没什么特别的，我只是出于规范多谢了点依赖，把 devDependencies、peerDependencies 和 dependencies 都补全了

<aside>
ℹ️

如果不太理解 peerDependencies 的话，它这个意思就是说，当前 packages 不会下载对应的 dependencies，引用这个包项目需要自己下载

</aside>

## 🚀  运行

1. 开发时手动 build

   ```bash
   ❯ yarn workspace @mern/utils build
   ❯ yarn workspace @mern/hooks build
   ❯ yarn workspace @mern/ui build

   # or
   ❯ turbo run build
   ```

2. 开发时使用 watch 自动 build

   ```json
   "scripts": {
     "start": "tsc --watch"
   }
   ```

3. 使用 turbo 进行管理

   ```json
   "scripts": {
   	"start": "turbo run start --concurrency=1 --filter=@mern/ui",
   	"start:debug": "turbo run start:debug --concurrency=1 --filter=@mern/ui"
   }
   ```

   最简单的方法就是用 `yarn start:dev`，就是在主 package.json 里面配置好的指令，效果如下：

   ![](https://i-blog.csdnimg.cn/direct/8ce3f68e77164e7a9abc9843fd78618b.gif#pic_center)

## 🪲  排错篇

### “not under rootDir” 报错

这也是我在笔记 2.0 中提到过的问题，这次选择在根目录下安装了 TS 的版本，为了之后可以慢慢 rollout TS 的升级：

```bash
❯ yarn add -D typescript -W

yarn add v1.22.22
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "workspace-aggregator-fc368999-27cb-4e16-84a5-213b8e977a99 > dashboard > react-scripts > eslint-config-react-app > eslint-plugin-flowtype@8.0.3" has unmet peer dependency "@babel/plugin-syntax-flow@^7.14.5".
warning "workspace-aggregator-fc368999-27cb-4e16-84a5-213b8e977a99 > dashboard > react-scripts > eslint-config-react-app > eslint-plugin-flowtype@8.0.3" has unmet peer dependency "@babel/plugin-transform-react-jsx@^7.14.9".
warning Workspaces can only be enabled in private projects.
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
warning Workspaces can only be enabled in private projects.
success Saved 1 new dependency.
info Direct dependencies
└─ typescript@5.8.3
info All dependencies
└─ typescript@5.8.3
✨  Done in 7.28s.
```

### 找不到导入

正常的导入应该是这样的：

![](https://i-blog.csdnimg.cn/direct/d06370cfe7614f8e9e5ef1c23043e446.png)

如果遇到导入失败，可以先通过在根目录下运行 `ls node_modules/@mern/utils` 或 `tree node_modules/@mern/utils` ，主要是为了确定一件事情——对应的 packages 确实被成功打包了

我遇到过两种情况：

1. 空文件夹

   这种情况可能是因为名字不对，查看子项目中的 package.json 中的 `name` 和根目录下的 tsconfig 中的 `paths` & `references` 是否一致

2. 文件夹下是奇怪的文件，而不是对应的 js/d.ts 文件

   这是因为我重命名了，不知道什么 symlink 没成功

完成排查后，在根目录下运行 `yarn install --force` 完成一次重新安装，yarn workspace 会强制重新更新所有的 symlink

最差情况下需要把 node_modules 删除，然后做整体的重新安装

### tailwindcss 不起效

查看 tailwind 的 config 文件，这种情况大多数是因为 `content` 里面没有包含第三方库——子项目中不包含 tailwind，所以不会在子项目中修改样式

我目前的配置是这样的：

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mern/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

第二条是给本地开发，第三条是给未来 production 用……不过第三条应该是用不上的……
