`SellerModel.findById(id).populate("shop");`

order of router matters in express

i.e., if the first route is `/something/:someId`, then all the `/something/subPage` will go to this routes

## 重复cv的hooks/utils/components

## react

## eslint

## cn util

## bug

cannot use link on top of the button, using this method, the state will not be passed to the next page

the usage is similar to:

```js
<Link to="/something" state={{
  someState: someState
}}>
  <Button>something</Button>
</Link>
```

in this case, redirection will not work

use `useNavigate` instead

## project organization

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

## workspace

❯ yarn add @reduxjs/toolkit react-redux axios react-hot-toast stripe react-icons react-multi-carousel react-range react-rating react-router-dom react-spinners socket.io-client
yarn add v1.22.22
error Running this command will add the dependency to the workspace root rather than the workspace itself, wh

## frontend

use `.env` file to set different profile

## gh template

## gh

gh issue edit 15 --add-label "refactor,backend,tech-debt,internal-tools,data-safety,dx"

for i in 42 43 44 45 46 47
do
  gh issue edit $i --add-label "features,frontend,ui"
done
