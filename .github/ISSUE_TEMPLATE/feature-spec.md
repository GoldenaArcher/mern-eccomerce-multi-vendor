---
name: 📘 Feature Spec / User Story
about: Use this for documenting a full feature, user story, or API contract.
title: "[Feature] "
labels: ["feature-spec", "backend", "frontend"]
assignees:
---

### 🎯 Description

<!-- What is this feature? Why do we need it? What problem does it solve? -->

---

### 🟢 Editable Fields

| Field       | Editable | Notes                       |
| ----------- | -------- | --------------------------- |
| `fieldName` | ✅ Yes   | What this field is used for |
| ...         | ⬜ No    | Explanation                 |

---

### 🛠 Tasks

- [ ] Describe feature logic and interaction
- [ ] Identify API needs (if any)
- [ ] Add related UI tasks
- [ ] Break down backend support (if needed)

---

### 📡 API Contract

**Endpoint:** `METHOD /api/your-endpoint`  
**Auth:** ⬜ Required / ✅ Optional  
**Relation:** Describe the data relationship (1:1, 1:N...)

#### 📥 Request Payload

```json
{
  "example": "data"
}
```

#### 📤 Expected Response

```json
{
  "message": "Success",
  "data": {}
}
```

### ✅ Acceptance Criteria

- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...
