# AGENT.md

## Principles for Simple, Scalable, and AI-Guided React + Next.js Development

This file provides persistent instructions and context for any AI coding assistant working in this repository.

---

# 1. Core Development Philosophy

## 1.1 Keep It Simple (KISS)

* Prefer simple, readable solutions over complex abstractions
* Avoid over-engineering
* Prioritize maintainability over cleverness

---

## 1.2 YAGNI (You Aren’t Gonna Need It)

* Do not implement speculative features
* Build only what is required now
* Avoid premature abstractions

---

## 1.3 Fail Fast

* Validate inputs early
* Throw errors explicitly
* Avoid silent failures

---

# 2. Design Principles

## 2.1 Single Responsibility Principle (SRP)

* Each component, hook, or function should have one clear purpose

## 2.2 Open/Closed Principle

* Components should be extendable via props/composition
* Avoid modifying stable components unnecessarily

## 2.3 Dependency Inversion

* Depend on abstractions, not concrete implementations
* Use hooks, interfaces, or services instead of tightly coupling logic

---

# 3. Project Architecture (Next.js)

## 3.1 Preferred Structure (Feature-Based / Vertical Slice)

```
/app
  /feature-name
    page.tsx
    layout.tsx
    components/
    hooks/
    services/
    types.ts
    utils.ts
    __tests__/

/components (shared UI)
/lib (shared utilities, api clients)
/hooks (global hooks)
/styles
```

* Co-locate logic, UI, and tests within the same feature
* Avoid global sprawl

---

## 3.2 Component Guidelines

### Functional Components Only

* Use React functional components with hooks
* No class components

### Component Size

* Max ~150 lines per component
* Split if too complex

### Separation

* UI → presentational
* Hooks → logic
* Services → API calls

---

## 3.3 Hooks Rules

* Custom hooks must start with `use*`
* Keep hooks focused and reusable
* No side effects outside `useEffect`

---

# 4. Code Quality Standards

## 4.1 File & Function Limits

* File ≤ 300–400 lines
* Function ≤ 40–50 lines
* Keep nesting shallow

---

## 4.2 Naming Conventions

* Components → PascalCase
* Functions → camelCase
* Constants → UPPER_CASE
* Files → kebab-case or feature-based

---

## 4.3 Line Length

* Max 100 characters

---

## 4.4 Type Safety

* Use TypeScript strictly
* Avoid `any` unless unavoidable
* Define clear interfaces/types

---

# 5. State Management Strategy

Preferred order:

1. Local state (`useState`)
2. Derived state
3. Context API
4. External libraries (only if necessary)

Avoid:

* Unnecessary global state
* Deep prop drilling (use context/hooks instead)

---

# 6. Data Fetching (Next.js Best Practices)

* Prefer Server Components where possible

* Use:

  * `fetch` in server components
  * `useEffect` only for client-side needs

* Use caching appropriately

* Avoid redundant API calls

---

# 7. Styling Guidelines

* Use Tailwind CSS (preferred)
* Avoid inline styles unless dynamic
* Maintain consistent spacing and design tokens

---

# 8. Testing Strategy

* Co-locate tests with features
* Use:

  * Jest / Vitest
  * React Testing Library

Test:

* Components
* Hooks
* Critical flows

---

# 9. Performance Guidelines

* Avoid unnecessary re-renders

* Use:

  * `React.memo`
  * `useMemo`
  * `useCallback` (only when needed)

* Lazy load heavy components

---

# 10. AI Agent Instructions (CRITICAL)

## 10.1 Before Writing Code

* Understand feature scope
* Reuse existing patterns
* Check similar components

---

## 10.2 While Writing Code

* Follow architecture strictly
* Keep functions/components small
* Avoid duplication
* Use TypeScript properly

---

## 10.3 When Modifying Code

* Do not break existing APIs
* Maintain backward compatibility
* Refactor only if necessary

---

## 10.4 Output Format

Always return:

1. Code
2. Short explanation
3. Trade-offs (if any)

---

## 10.5 Avoid

* Over-abstraction
* Introducing new libraries without need
* Large monolithic components
* Ignoring existing patterns

---

# 11. Development Commands

```bash
# install deps
npm install

# run dev server
npm run dev

# build
npm run build

# lint
npm run lint

# test
npm run test
```

---

# 12. Example Good Patterns

### Component

```tsx
type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return <h1 className="text-xl font-bold">{title}</h1>;
}
```

---

### Hook

```tsx
export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser);
  }, []);

  return user;
}
```

---

# 13. Summary for AI Agents

* Prefer simple over clever
* Prefer small over large
* Prefer explicit over implicit
* Prefer existing patterns over new ones
