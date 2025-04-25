---
name: 📦 Feature Task / Module Ticket
about: Use this template for implementation tasks like UI components, packages, or reusable logic
title: "[Module] Create @mern/utils utility package"
labels: ["infra", "frontend", "features"]
assignees:
---

### 🎯 Description

<!-- Describe the goal. Are we building a reusable module? a hook? a shared utility? -->

Create a shared `@mern/utils` package to centralize reusable helpers such as `cn`, pagination hooks, validation, etc.  
This will be used by both `frontend` and `dashboard`, and serve as the base layer for shared logic.

---

### 📁 Scope

| Area                        | Required | Notes                                               |
|-----------------------------|----------|-----------------------------------------------------|
| Create package dir          | ☑️ Yes   | `packages/utils`                                    |
| Setup package.json/tsconfig| ☑️ Yes   | Includes `build`, `name: @mern/utils`, etc         |
| Core utils implemented      | ⬜ Yes   | e.g. `cn`, `usePagination`, `validateEmail`        |
| Exports setup               | ☑️ Yes   | `src/index.ts` export all APIs                     |
| Workspace integration       | ☑️ Yes   | Add to `frontend/dashboard` `package.json`         |
| TS path / IDE support       | ⬜ Yes   | Optional: setup `tsconfig.base.json` paths         |
| Turbo pipeline integration  | ⬜ Yes   | Optional: add `turbo.json` build/output rules      |
| Add example usage           | ⬜ Yes   | Optional: use in an existing UI component          |

---

### 🛠️ Tasks

- [ ] Create `packages/utils` folder
- [ ] Setup `package.json`, `tsconfig.json`, `src/index.ts`
- [ ] Add `clsx + tailwind-merge` for `cn.ts`
- [ ] Add `usePagination.ts` (optional)
- [ ] Add workspace references to `frontend`/`dashboard`
- [ ] Verify `yarn dev` / `yarn build` continues working
- [ ] Document basic usage (in readme or notion)

---

### 🕓 Deferred Tasks

- [ ] Add unit tests with Vitest or Jest
- [ ] Add more hooks (useLocalStorage, useDebounce, etc)
- [ ] Create `@mern/ui` package for shared components

---

### ✅ Acceptance Criteria

- [ ] Package `@mern/utils` can be imported in both `frontend` and `dashboard`
- [ ] At least one utility (e.g. `cn`) works and builds correctly
- [ ] Project runs without regressions
