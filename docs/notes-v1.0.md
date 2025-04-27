# [MERN] Multi-Vendor 电商项目开发 1.0

@[toc]

这是最近在做的一个新的个人项目，主要是想从 B2B 转一下 B2C，自己再完整的实现一个从后端到前端的一个实现，技术栈的选择依旧是 MERN——当然，技术栈的选择其实很看个人

以我来说，我主要还是写 React/JS/TS 前端的功能，后端部分以前 on bench 的时候简单的抄过一点 controller 的实现，后来自己也看了一点 express 的用法，不过一直以来都不算特别的体系化。spring boot/java 现在的项目倒是在用，不过我们的项目规模又太大了，我们这里只是做的一个数据的整合/清理，具体的 CRUD 操作是别的项目组进行的实现，我们只是将其导入到 maven dependency 使用而已。python/go/scala 我最多就是在个人使用过程中或多或少地了解一点，能写点脚本刷个题已经是上限，具体到框架的选择/实现这种大规模的程度，就力有不怠

所以选择就只有在 MERN 和 spring boot 整合 react 这两个，而后者的技术债也确实不少——我比较常用的功能还是 java8 以前的了，新版的 lambda/stream 照猫画虎写过，但是要真的写得非常 elegant，又要拓展到 spring 的具体实现——不是 boot 这种高度封装的，而是涉及到 spring 原生的 DI/AOP 的学习，时间上来说也有点捉襟见肘

因此最终选择还是放在了 MERN 上，至少上手比较容易，实现起来比较原生，也是现在主流的选择之一

## 目前项目结构

项目采用了前后端分离架构，整体结构如下：

```
mern-eccomerce-multi-vendor-main/  # Turborepo monorepo 根目录
├── backend/        # 后端服务（Node.js + Express + MongoDB）
│   ├── controllers/     # 控制器层，处理请求和响应
│   ├── decorators/      # 自定义装饰器（如 token 验证、自动响应包装）
│   ├── errors/          # 全局错误定义（继承 Error）
│   ├── middlewares/     # 中间件，包括鉴权、上传、验证等
│   ├── models/          # Mongoose 数据模型定义
│   ├── routes/          # 路由层，连接 controller
│   ├── services/        # 业务逻辑层（如 createUser、updateShop）
│   ├── types/           # TypeScript 类型声明（扩展 Express 的 Request）
│   ├── uploads/         # 上传相关逻辑
│   ├── utils/           # 工具函数（如删除图片、生成 token）
│   ├── validators/      # Yup/Joi 等验证逻辑封装
│   ├── server.ts        # 应用入口
│   └── tsconfig.json / package.json / .env 等配置

├── dashboard/      # 管理后台前端（React + RTK Query + Zustand）
│   ├── src/
│   │   ├── App.jsx                # 应用入口，挂载 Router
│   │   ├── api/                  # axios 封装 + RTK Base Query
│   │   │   └── axiosBaseQuery.js
│   │   ├── components/           # 通用 UI 组件库
│   │   │   ├── shared/               # 通用按钮、图标、状态徽章等
│   │   ├── hooks/                # 自定义 hooks（如 useProductFormLogic）
│   │   ├── pages/
│   │   │   ├── seller/               # Seller 页面（Profile、Products）
│   │   │   │   ├── components/
│   │   │   │   │   ├── profile/              # seller 个人信息相关组件（Avatar、Shop 等）
│   │   │   │   │   └── ProductForm.jsx       # 产品表单封装（新增/编辑共用）
│   │   │   └── admin/                # Admin 页面（后续添加）
│   │   ├── router/routes/        # 路由配置文件（如 sellerRoutes）
│   │   ├── store/features/       # RTK Slice + RTK Query（如 userApi, shopApi）
│   │   ├── utils/                # 通用工具函数（如语言映射、路由导航）
│   │   └── index.js              # 挂载根组件
│   └── package.json / tailwind.config.js 等前端配置文件（React + RTK Query + Zustand）
├── README.md
├── package.json / turbo.json / tsconfig.base.json 等 monorepo 根配置
└── ...
```

这个实现看怎么理解了，大体上来说还是 MVC 的结构，V 层完全脱离出来交给 React 去做。细分的话是后端 MVC+Service 层，前端 MVVM 的一个，目前比较主流的结构

从结构上来说，之后想要拆分成 microservice+microfrontend 的实现也比较容易——这一块还在思考怎么做，毕竟 nodejs+microservice 的内容相对而言比较少，现在的主流实现还是 spring boot/cloud 去做的。microfrontend 之前倒是有过一点的了解，有时间的话可以去了解一下

### backend

简单的描述一下为什么现在的项目，要拆成 microservice 还是比较简单的事情，首先，项目虽然是 monolith 架构，但是 router-controller-service 的实现比较规范化，耦合度较低，除了 auth 模块和 seller 有一定程度的耦合度——admin 和 seller 都可以通过 seller endpoint 去对用户进行管理，如前者可以对用户状态进行变化

这个问题同样可以通过介绍 api gateway 进行处理——只要 controller/service 的功能耦合度低，那么服务层之间的交流就可以通过 Kafka/RabbitMQ 去进行处理，以 auth-service / seller-service 为起点做解耦

当然，目前只是一个思考和学习的过程而已，具体下一步还是会等到完成这个 MERN 项目在着手进行学习。毕竟我们现在的项目是使用 Kafka，我多多少少可能有学习参考，RabbitMQ 就是一个新东西了，需要从头开始

⚠️：虽然刚开始确实因为这个 MERN 实现比较快，所以用了 MERN，但是等真的写到了一定程度后发现，Express 原生对于 DI 的支持确实比较差，而且 boilerplate 比较多，在中大型项目中实现有些疲软。下一步也考虑接触一下 nest，我听说这个对于商业项目的支持比较好

❗：这不是 express 的问题，express 最初的目的是一个轻量级的中间件，因此不具备一站式商业集成能力。只是对于目前的业务场景来说，确实限制较大

👀：可以考虑接触一些 ORM 的 dep，目前很多东西都是手动写的，如果能接入像 hibernate 一样的 ORM 会方便很多

### dashboard

这一块拆成 microfrontend 其实是一个比较简单的事情，我在做设计的时候就将其拆分成了 3 个模块：

- common

  可以被所有的的组件所共享的内容，包括 src 下面的 assets，components/hooks 等

- admin

  独立的 page 逻辑，其中也包括独立的 components/hooks，只负责与 admin 相关的逻辑

- seller

  同 admin

因此这个在拆分的时候就比较简单，只需要将 pages 下面的 admin/seller 单独拆出来，做独立的模块，并且将共享的部分做成另一个模块，可以让 admin/seller 进行交流即可

这个细分下来的话，难点大概是怎么使用 CRA 的脚手架进行拆分。以前都是自己手动用 webpack 的 module federation 去实现的。这次前端是用 CRA……

我知道别的项目因为不想 eject 整个 CRA，所以使用 CRACO 进行一些功能上的重载，说不定我也可以了解一下 CRACO……

## 已实现的功能

### Seller 模块

- [x] 用户注册、登录（含密码验证与 token 签发）
- [x] 获取当前 seller 信息 `GET /seller/user`
- [x] 更新头像 `PATCH /seller/user/avatar`，含上传图片和原图清理逻辑
- [x] 创建 shop：`POST /seller/shop` 与数据预填 `GET /seller/shop`
- [x] 前端 Seller Profile 页面组件拆分（ProfileInfoCard、ProfileAvatar、ProfileShop）
- [x] 使用 RTK Query 查询 seller/shop/categories 信息，预填表单 + 自动缓存
- [x] 创建 product：`POST /product` 与数据预填 `GET /product`
- [ ] ...

页面看起来这样

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0376228c609b4a0d96f238c7eefc3c7e.png)

目前还没实现的有

- dashboard - 现在渲染静态数据
- discount product - 这个应该是做 filter 就可以了，不过暂时没做
- orders - 完全没做
- payments - 完全没做
- chats - 完全没做
- profile - 实现了一半，更新已有信息部分功能还没做

只能说现在做了一小半的功能

### 管理员视角（Admin）

- [x] 获取所有 seller 列表（分页 + 搜索）`GET /sellers`
- [x] 后台管理页面 SellerRequests.jsx 支持状态徽章、跳转查看
- [x] 使用 `usePaginationSearch` 封装分页 + 搜索联动逻辑
- [ ] 更新 seller 状态（`PATCH /sellers/:id/status`），支持 active/suspended 等枚举控制
- [ ] 后台状态切换入口：下拉框 / ActionIcon 操作按钮（开发中）
- [ ] ...

这个要做的还挺多的，从页面上来说，做得七七八八的只有一个 categories：

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8716ecf2c3be42cd98ed3dbc24f46b8e.png)

add 是做完了，delete/edit 还在 pending

seller 是完成了动态加载，但是 edit 部分还在 pending，并且 pagination 还需要一点修正：

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/467efb2ba08a477a99001d8124e0fcf8.png)

### 技术尝试&实现

#### RTKQ

使用 RTK Query 管理异步请求，统一缓存 & loading 状态

这里目前还需要研究的是 tag 相关的，目前的实现因为做了 pagination，所以在 fetch 的时候会直接 invalidate 整个 store 进行 refetch

总体来说这应该是一个比较合适的解决方案了，如果需要提升的话，我个人是觉得不如考虑接入 redis 进行真正的缓存，从而优化读写，而不是非得折腾 RTKQ 的 store

#### toast & RTKQ

Toast 逻辑目前还在组件内，暂未迁移至 mutation 生命周期（计划中）

这个是打算做一个前端的 notification system，目前只是一个想法，具体怎么落地还得看后面要花多久时间进行研究

目前主要的 toast 还是通过 `isLoading` + `isSuccess`/`isError` 在组件哪用 `uesEffect` 进行渲染，我个人是觉得这样的效率比较低——需要更多的 state change 从而进行更多的重新计算和 recompute，不如直接在 redux store 触发一个集成的 message notification system 比较好

#### TS decorator 尝鲜

也不能算是尝鲜了，毕竟这个功能稳定推出很多年了，不过还是在尝试使用 decorator 去简化一部分的功能实现

写法如下：

```typescript
import { ApiError } from "@/errors";
import ResponseModel, { ResponseModelParams } from "@/models/response.model";
import { NextFunction, Request, Response } from "express";

export function CatchAndSend() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const result = await originalMethod.call(this, req, res, next);

        if (res.headersSent) return;

        if (result instanceof ApiError) {
          return next(result);
        }

        if (
          result &&
          typeof result === "object" &&
          ("message" in result || "data" in result || "code" in result)
        ) {
          const { message, data, code }: Partial<ResponseModelParams> = result;
          return new ResponseModel({ code, message, data }).send(res);
        }

        return new ResponseModel({
          message: "OK",
          data: result ?? null,
        }).send(res);
      } catch (err) {
        next(err);
      }
    };
  };
}
```

用法是这样的：

```typescript
@BindRoute()
@CatchAndSend()
async getUser(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<ControllerResponse> {
    const {
    user: { id },
    } = req;

    const user = await this.adminAuthService.getAdmin(id);

    if (!user) {
    throw new NotFoundError("Admin not found");
    }

    return {
    message: "Admin retrieved successfully",
    data: user,
    };
}
```

目前这是一个尝试，在学完 [[spring] spring AOP - 面向切面编程の学习](https://goldenaarcher.blog.csdn.net/article/details/147023898) 就想加到当前的项目里的功能

不过目前的难点在于：

- TS 最新的 decorator 已经接轨了 JS 的 proposal，目前的写法处于旧版，需要被更新
- decorator 具体的实现逻辑需要学习
- 现在的 decorator 还没有那么好用，特别是 `BindRoute`，还需要手动的在 controller 中手动绑定

  换言之，这个 decorator 没有完成它本身应该实现的功能

因此在短暂的尝试了一下后，就暂时搁置了……不过 `CatchAndSend` 确实蛮好用的，可以直接 throw error 不用担心 try-catch 的问题了……

#### 搭配本地开发环境

支持 HMR 和 debugger，具体文档参考 [【实战笔记】TypeScript 服务端热更新配置全解（含 ts-node-dev + 路径别名 + VSCode 调试）](https://blog.csdn.net/weixin_42938619/article/details/147200937)

#### turborepo 的使用

使用 turborepo 进行 workspace 的管理和一键式启动

yarn 的 workspace 配置好了，也对未来接入 microfrontend 有所帮助

## 补充 - gh 命令行

这也是开始折腾 kanban 之后发现，还是官方的东西好用啊……目前用了以下 2 个功能：

```bash
 2856  gh label create backend --description "Backend-related logic, routes, models, or services" --color 1D76DB\ngh label create dx --description "Developer Experience improvement (e.g., tooling, naming, structure)" --color A2EEEF\ngh label create internal-tools --description "Non-user-facing tools, scripts, or helper infrastructure" --color E99695\n
 2861  gh issue edit 3 \\n  --add-label "features" \\n  --add-label "backend" \\n  --add-label "frontend" \\n  --add-label "rtk-query"\n
```

第一个就是手动创建 label，这个真的挺好用的，list 也是：

```bash
❯ gh label list


NAME              DESCRIPTION                                                          COLOR
bug               Something isn't working                                              #d73a4a
documentation     Improvements or additions to documentation                           #0075ca
duplicate         This issue or pull request already exists                            #cfd3d7
enhancement       New feature or request                                               #a2eeef
good first issue  Good for newcomers                                                   #7057ff
help wanted       Extra attention is needed                                            #008672
invalid           This doesn't seem right                                              #e4e669
question          Further information is requested                                     #d876e3
wontfix           This will not be worked on                                           #ffffff
tech-debt         Common for refactors, signals priority if left undone                #B60205
frontend          Clean, React/UX-related changes                                      #1D76DB
rtk-query         Framework/tooling-related work                                       #5319E7
notification      Bright, stands out for UX messages                                   #FBCA04
refactor          Safe, used widely for code re-org                                    #0366D6
backend           Backend-related logic, routes, models, or services                   #1D76DB
dx                Developer Experience improvement (e.g., tooling, naming, structure)  #A2EEEF
internal-tools    Non-user-facing tools, scripts, or helper infrastructure             #E99695
features          User-facing functionality or new capabilities                        #0E8A16
```

这种搭配 edit 批量修改比在 UI 那里重定向方便多了

第二个就是修改 issue 的 labels，也就是第 3 条指令，这个搭配 list 获取所有 tag 后批量修改也方便
