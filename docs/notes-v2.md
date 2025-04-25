# [MERN 项目实战] MERN Multi-Vendor 电商平台开发笔记（v2.0 从 bug 到结构优化的工程记录）

其实之前没想着这么快就能把 2.0 的笔记写出来的，之前的预期是，下一个阶段会一直维持到将 MERN 项目写完，毕竟后期很多东西都是 cv 了。不过没想到，一个 frontend（2C 端的商城页面）写着写着还是碰到了不少的问题

## 后端

这里其实就一个 routes 的路径顺序问题，我也是等到 v1 收尾了，又做了一点点 cleanup，在不同页面来回切换的时候，发现请求的路径不对，express 的 log 一直在显示 string 是一个不合法的 ObjectId,然后找不到对应的数据

后面看了下，是 routes 的路径问题，之前的写法是：

```jsx
routes.get("/something/:someId", getSomethingById);
routes.get("/something/sub-resource", getSubResource);
```

这种写法，会将 `sub-resource` map 到 `:someId` 里，express 直接运行 `getSomethingById` ，最终因为 id 不匹配而抛出异常

## 数据库

简单的记录一下这个用法：

```jsx
SellerModel.findById(id).populate("shop");
```

我这里的 shop 和 seller 又 1-to-1 的关系，具体的 schema 关系如下：

```tsx
import { Schema, model, Types, Document } from "mongoose";

export interface IShop extends Document {
  seller: Types.ObjectId;
  name: string;
  country: string;
  state: string;
  city: string;
  image?: string;
}

const shopSchema = new Schema<IShop>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true, // enforce one-to-one
    },
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<IShop>("Shop", shopSchema);
```

Seller 内部的实现是差不多的，代码太长了就不贴了。这种情况下，使用 `populate` 可以将 shop 的数据 map 到 seller 种的 shop 属性——原本是一个 ObjectId 的字符串，这种情况就可以减少一个与后端的 API 请求，在真实的使用场景会很好的减少数据库的压力

## Workspace/MonoRepo

前端的东西就比较多啦，毕竟这次主要折腾的就是 UI，而且还是比较难得，场景比较全面的 2C 端的 UI。这次写完也确实发现一点问题，尤其是代码重复的这个问题

鉴于 notion 的结构比较有限——只有 3 级，这里就把前端部分的问题细细拆成 workspace、React 相关、tailwind css 相关，

### 重复的业务逻辑……微前端是解决方法？

这里主要说的是 hooks，utils 和 componengs 三个组件，如：

![](https://i-blog.csdnimg.cn/direct/5ca82afdc4334226b36a4f8b6f8a21ca.png)

![](https://i-blog.csdnimg.cn/direct/2e2fd1e3b5b842218c8de25c9520ec5d.png)

虽然 frontend 尚且还没有开始实现业务相关的逻辑，不过已经能够看到有一些重复的使用，如：

- cn.js → 一个简单的 tailwind css 的 util 方法
- Pagination → Pagination 的 UI 渲染
- usePaginnationSearch → 实现了 debounce/search/pagination 的 hooks
- 共通的 packages 等等

包括之后可能会涉及到的 auth 相关的逻辑……也的确是应该研究一下微前端是不是能够很好的解决这个问题，尤其是两个项目都是 React based，共通的 modules 太多了

### 冲突的 React 版本

这个问题的出现，是在尝试使用一个 dependency 的时候发生的，具体的报错大概就是 react 中的 `useEffect` 这个 hook 出现了问题，具体只记得是 `Invalid hook call`，但是记不太清细节了……有可能是 `useEffect` 被调用了两次……不过最终发现，原因是 React 的版本发生了冲突：

```bash
❯ yarn list react

yarn list v1.22.22
warning Filtering by arguments is deprecated. Please use the pattern option instead.
├─ frontend@0.1.0
│  └─ react@19.1.0
└─ react@19.0.0
✨  Done in 0.54s.
```

我之前有简单搜索一下，这个问题的确是通过 turborepo 进行 monorepo 的管理出现的问题，尤其是我在两个不同的时间段安装了 dashboard 和 frontend 模块，这导致两个模块中的 React 版本有了轻微的冲突。在两个版本都出现在 node_modules 中，就会被识别成两个不同的 React 实例

问题的关键在这里：

两个 React 实例创建了不同的 context，以至于在某些 edge case 的情况下会抛出异常，即用串了 context，找不到自己原本应该调用的 context，然后触发该异常。只能说在运行不同的 React 版本，没有抛异常是运气，抛了异常，就有可能是 production issue……

最后的解决方案是在 root dependency 中定义 React 的版本，在根目录下运行 `yarn install --force`，重新安装/管理依赖，解决问题。根目录的 package.json 如下：

```json
{
  "resolutions": {
    "react": "^19.1.0"
  }
}
```

运行过程&结果：

```bash
❯ yarn install --force
❯ yarn list react
yarn list v1.22.22
warning Filtering by arguments is deprecated. Please use the pattern option instead.
└─ react@19.1.0
✨  Done in 0.57s.

```

⚠️：在这种情况下，推荐的做法是不写死 react 版本，而是用 `peerDependencies` 去更优化的管理版本

### 无法安装依赖的根目录

这算是一个补充吧，因为我自己其实都不知道还有这个限制

事情起因是，在新建 frontend 的时候，不小心在根目录下运行了 `yarn add` 指令，然后 yarn/turborepo 抛出了这个异常：

> error Running this command will add the dependency to the workspace root rather than the workspace itself, wh…

这里做个简单的记录

## React

这里放一点只和 React 相关，范围比较狭窄的内容

### 使用 `env` 改变 PORT

其实我不太清楚 `.env` 文件到底能够重写多少 React 的属性，不过 port 算是蛮重要的一个，这里提一嘴

修改了 port 之后，turborepo 就可以同时运行 3000(dashboard ui) 和 3001(frontend ui) 了

### React 项目文件结构如何设计

最初我们开始写 React 的时候用的结构就不谈了，说一下我们现在主要用的两种，第一种是所有的相关联的组件在 `components` 下，并且按照功能关联，大体如下：

```bash

components/
├── features/                  # 页面级组件
│   ├── home/
│   ├── products/
├── ui/                     # 原子化 UI 组件（通常无状态）
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── shared/                 # 可复用的复合组件（页面级别也会引用）
│   ├── PageBanner.tsx
│   ├── ProductCard.tsx
│   └── Ratings.tsx
├── layout/                 # 页面布局类组件
│   └── Navbar.tsx

```

另一种则是所有相关联的组件在 `pages` 下，每个页面不作为单独的 jsx 文件，而是作为一个文件夹，存储相关联的组件，大体结构如下：

```bash
pages/
├── Home/
│   ├── index.tsx             # Home 页面入口组件
│   ├── HeroBanner.tsx        # 页面专属组件
│   ├── useWelcomeData.ts     # 页面专属 hook
│   └── styles.module.css     # 页面样式
├── Products/
│   ├── index.tsx
│   ├── ProductList.tsx
│   ├── ProductFilter.tsx
│   ├── useProductQuery.ts
│   └── styles.module.css
├── Checkout/
│   ├── index.tsx
│   ├── AddressForm.tsx
│   ├── PaymentSummary.tsx
│   ├── useCheckout.ts
│   └── styles.module.css

```

需要注意的是，这种以页面为中心的存储方式，依然会保留 `components` 文件夹，并且在里面集中管理 shared、UI 之类相关组件，只是会将 features 中的内容放到页面中

具体二者的存储方式并没有绝对意义上的优缺点，只能说必须要根据业务情况做分析。以我自己的项目为经验，我个人感觉是：

- B2C 适合第一种
  其主要原因是 B2C 的业务，结构相对而言更加的简单，业务逻辑复用更多，比如说一个常见的商城项目，首页会出现各种各样的商品卡片、促销商品，商家页面中会出现商品卡片，商品页面中会出现更多的 product 相关的组件。这种时候，在 `components` 下放一个商品相关的 feature，集中管理散落在各个页面的复用组件
- B2B 适合第二种
  与之对比的是 B2B 的业务，结构相对会更加的复杂，业务逻辑多与页面进行绑定，鲜少会出现核心 UI 逻辑散落在不同页面中。就算偶尔会出现这个情况，大多数也是作为 reference data 的存在，可以以该 UI 的主页面作为 base 进行导入

## React Router DOM

这个应该说在写这个项目之前，我都没有意识到会有这个问题，写法大体如下：

```jsx
<Link
  to="/something"
  state={{
    someState: someState,
  }}
>
  <button>something</button>
</Link>
```

在我看来这个代码是没问题的——或者说一直以来都是这么写的，一直工作都没什么问题，除了这个 `state`——主要是想尝试一下新写法，尝试在 navigate 的时候将状态带到下一个页面去，而不是使用 zustand/redux 进行全局化的管理，这样清理状态也比较方便

搜索了一下之后发现，这是 React Router DOM 在遵从了 HTML 的标准实现规范后出现的问题。本质上的逻辑是这样的：

1. `Link` 在渲染后成为 `<a href=""></a>`
2. `button` 嵌套在了 a 标签中

这就是问题

好吧，这么说还是不够直白……具体要解释原因，就得到 WHATWG——也就是现在 HTML 版本规范的组织——的官方文档里

其中在 **\*\***[3.2.5.2.7 interactive content](https://html.spec.whatwg.org/multipage/dom.html#interactive-content) 中提到：

> **_3.2.5.2.7 Interactive content_**
>
> Interactive content is content that is specifically intended for user interaction.
>
> - [`a`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element) (if the [`href`](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href) attribute is present)
> - [`audio`](https://html.spec.whatwg.org/multipage/media.html#the-audio-element) (if the [`controls`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls) attribute is present)
> - [`button`](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
> - [`details`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
> - [`embed`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element)
> - [`iframe`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element)
> - [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element) (if the [`usemap`](https://html.spec.whatwg.org/multipage/image-maps.html#attr-hyperlink-usemap) attribute is present)
> - [`input`](https://html.spec.whatwg.org/multipage/input.html#the-input-element) (if the [`type`](https://html.spec.whatwg.org/multipage/input.html#attr-input-type) attribute is *not* in the [Hidden](<https://html.spec.whatwg.org/multipage/input.html#hidden-state-(type=hidden)>) state)
> - [`label`](https://html.spec.whatwg.org/multipage/forms.html#the-label-element)
> - [`select`](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element)
> - [`textarea`](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)
> - [`video`](https://html.spec.whatwg.org/multipage/media.html#the-video-element) (if the [`controls`](https://html.spec.whatwg.org/multipage/media.html#attr-media-controls) attribute is present)

**在 [4.10.6 The `button` element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) 中提到**

> **4.10.6 The `button` element
> …**
>
> [Content model](https://html.spec.whatwg.org/multipage/dom.html#concept-element-content-model):[Phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2), but there must be no [interactive content](https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2) descendant and no descendant with the [`tabindex`](https://html.spec.whatwg.org/multipage/interaction.html#attr-tabindex) attribute specified.

同样在 stack overflow 上的一个 thread 也有讨论过：[\*\*HTML Validation: Why is it not valid to put an interactive element inside an interactive element?](https://stackoverflow.com/questions/62092211/html-validation-why-is-it-not-valid-to-put-an-interactive-element-inside-an-int) ，这就能解决问题了：\*\*

互动内容中嵌套互动内容是不合法的 HTML，这种实践下的行为是不可预测的，有可能 button 的 event listener 捕捉了 a 标签的重定向，反之亦然。工作那是运气好，不工作才是默认的行为

这里最终的解决方法其实是用 `onClick` 绑定了 `useNavigate`，但是真正、最好、符合 accessibility 的解法，还是应该用 button+span+手写样式的方法去解决这个问题……

## Tailwind CSS

之前主要上的是 tailwind css 的课，instructors 不管怎么说对 tailwind 还是比较专业的，因此学到了一些基础，不过反思比较少。这次的 instructor 代码写的真的挺烂的，然后就发现已经学过的 tailwind css——或者说 css，其实还是有不少东西可以深挖的

### 基础色的变化

虽然我发现在之前学习的过程中，大部分项目使用的是 hex，不过在做了 tailwind 之后，我发现其实 rgb 相对而言会更加的动态一些。以下面这个 button 为例：

![](https://i-blog.csdnimg.cn/direct/db9903da4edf40d2be8f30471031c394.gif)

它 ~~至少~~ 有两种实现方法：

```jsx
<button
  className={cn(
    "w-[200px] h-[36px] px-4 py-1  rounded-md bg-[#059473] text-white",
    "hover:shadow-lg hover:shadow-[#059473B2]"
  )}
>
  Example
</button>
```

这里的 hover，其实还是以 base color，即 `059473` 做的变量，起主要就是修改了不透明度，也就是 hex 后面的两位数字

对比起来是用 rgb 的实现：

```jsx
<button
  className={cn(
    "w-[200px] h-[36px] px-4 py-1 rounded-md text-white bg-[rgb(5,148,115)]",
    "hover:shadow-lg hover:shadow-[rgba(5,148,115,0.7)]"
  )}
>
  Example
</button>
```

可以看到，这种情况下，使用 rgb 是可以更加直观地看到对于背景色的修改是多少。对于前端开发来说，这样可以在选择好 base 这种基础颜色后，通过调整不透明程度的方法获取一整套的颜色表——毕竟现在前端开发其实 UI/UX 的差别越来越大了。以我本人来说，根本搞不定 figma/adobe illustrator，更别说能够拿出同样的配色表

rgb 和 rgba 的搭配其实只能获取一个浅色表，如果想要获取深色的方法，可以：

- 使用 hsl
  如下面的代码：
  ```jsx
            <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,20%)] text-white">Dark Mode</div>
            <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,30%)] text-white">Base Mode</div>
            <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,45%)] text-black">Light Mode</div>
  ```
  效果如下：
  ![](https://i-blog.csdnimg.cn/direct/f34d993e82ed48c4aa17045f4b6f2529.png)
  可以看到，换了亮度后就有了不同等级的颜色，其实也可以对标类似于 blue50-800 这样的配置
- 手动计算 rgb 的值，即每个数值乘以相同的系数
  这个只是我觉得理论上可以 work，实际操作可能会觉得比较麻烦没做过的事情，而且我觉得这个操作对于纯色的挑战会比较大……

同样的原理其实也可以用在 opacity 上。普通的 opacity 只能加一个透明度，但是如果在 div 上，添加一个大小完全一致的黑色遮照，通过控制遮照的透明度，也能够完成 hover 后获取一个更深的背景色这一方法——这时候就要善用 `relative` & `absolute` & `:before` or `:after` 了

### 兄弟组件也一起向上移动

这种情况用截图说明比较容易：

![](https://i-blog.csdnimg.cn/direct/d8c33b4334cc450db219eb560e4a02dc.gif)

可以看到，Base Mode 移动了的话，Light Mode 也会一起向上走，这是因为移动时用的是 `mt`:

```jsx
          <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,20%)] text-white hover:mt-2 transition-all duration-100">
            Dark Mode
          </div>
          <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,30%)] text-white hover:mt-2 transition-all duration-100">
            Base Mode
          </div>
          <div class="w-[150px] h-[32px] my-5 bg-[hsl(164,93%,45%)] text-black hover:mt-2 transition-all duration-100">
            Light Mode
```

而使用 `mt` 会重新计算文档流的位置，这种情况下，用 `translate` 会有更好的效果。`translate` 本身不会修改原有元素的位置，因此不会计算剩下所有文档流的位置

### eslint

主要是因为 instructor 有 typo，然后我发现 css 不起效，eslint 有蛮多的问题的，首先是 CRA 用的 eslint 还是 v8，但是现在 eslint 的官方已经出到了 v9，我在这个配置，出了很多的报错，后面才发现是版本冲突的问题，导致 eslint 的配置也不一样了——eslint 的配置文件名也不一样

这里就按照 eslint v8 的配置，文件名还是 `.eslintrc.js`:

```jsx
module.exports = {
  plugins: ["tailwindcss"],
  extends: ["react-app", "plugin:tailwindcss/recommended"],
  rules: {
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        whitelist: ["header-top", "my-swiper", "custom_bullet"],
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
```

只要 VSCode 开启了 eslint 的附件，那么，出现了 typo 之后，vscode 就会开始自动提示：

![](https://i-blog.csdnimg.cn/direct/65a5689cfbee4e7aa3c2271bfa97c653.png)

### `cn` util

之前好像在 electron 里面提过这个 util，实现方法如下：

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

用 `cn` 可以用这几种方式加类名：

```jsx
cn("plain string", true && "plain string", {
  "plain string": condition1,
  "plain stringq": condition2,
});
```

整体来说，使用 `cn` 动态管理类名会相对而言更加的直观

## gh

还是 github 的功能，研究了下发现还是还挺有意思的

### gh template

templates 需要放在 `.github/ISSUE_TEMPLATE` 下，里面是 md 文档，放一些描述/heading 即可

![](https://i-blog.csdnimg.cn/direct/eaaab257eeeb4bc5b01df466ded4520d.png)

![](https://i-blog.csdnimg.cn/direct/5058abdbcb6b469fae12a5019a562d97.png)

![](https://i-blog.csdnimg.cn/direct/618558581cc043bbacd81a787b6d5700.png)

### 批量更新

不过这里用脚本跑的，代码大体如下：

```bash
for i in 42 43 44 45 46 47
do
  gh issue edit $i --add-label "features,frontend,ui"
done
```

这样就能一次更新 42-47，然后添加相同的 labels
