# [Docs]: Incomplete custom/asymmetric matcher documentation when using Jest globals and .d.ts files

## 🐛 Bug Report

The current Jest documentation for custom matchers shows incomplete TypeScript declarations when using:
- `injectGlobals: true` in Jest configuration  
- External `.d.ts` declaration files
- Asymmetric matchers with `expect.not.customMatcher()`

## 🔬 Minimal Reproduction

**Repository:** https://github.com/your-repo/jest-extend-repro

### Setup:
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  injectGlobals: true, // ← This is key
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
```

```typescript
// jest.setup.ts
import type {MatcherFunction} from 'expect';

const toBeWithinRange: MatcherFunction<[floor: unknown, ceiling: unknown]> =
  function (actual, floor, ceiling) {
    // Implementation...
    const pass = actual >= floor && actual <= ceiling;
    return { pass, message: () => `...` };
  };

expect.extend({
  toBeWithinRange,
});
```

### ❌ Current Documentation Approach (DOESN'T WORK):
```typescript
// types/jest-extensions.d.ts
declare module 'expect' {
  interface AsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
}
```

**Result:** TypeScript errors:
```
Property 'toBeWithinRange' does not exist on type 'InverseAsymmetricMatchers'.
Property 'toBeWithinRange' does not exist on type 'JestMatchers'.
```

### ✅ Working Solution:
```typescript
// types/jest-extensions.d.ts
declare namespace jest {
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
  
  interface Expect {
    toBeWithinRange(floor: number, ceiling: number): any;
  }
  
  interface InverseAsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): any;
  }
}
```

## 🧐 Expected Behavior

The documentation should clearly explain:

1. **When to use `declare module 'expect'`** vs **`declare namespace jest`**
2. **How `injectGlobals: true` affects type declarations**
3. **Complete interface requirements** for asymmetric matchers

## 📝 Current Documentation Issues

### 1. Missing `InverseAsymmetricMatchers` interface
The docs show `AsymmetricMatchers` but not `InverseAsymmetricMatchers`, which is required for `expect.not.customMatcher()`.

### 2. Inconsistent module declaration approach
- Shows `declare module 'expect'` but doesn't explain when this works vs when to use `declare namespace jest`
- Doesn't mention that `injectGlobals: true` changes the type requirements

### 3. Incomplete TypeScript examples
- Missing the `Expect` interface for asymmetric usage
- No guidance on `.d.ts` file setup vs inline declarations

## 🌍 Environment

- **Jest version:** 30.0.3
- **TypeScript version:** 5.8.3
- **ts-jest version:** 29.4.0
- **Configuration:** `injectGlobals: true`, external `.d.ts` files

## 📚 Suggested Documentation Improvements

### Add a section: "TypeScript Declarations for Different Setups"

#### Setup 1: Import-based approach with `@jest/globals`
```typescript
import {expect} from '@jest/globals';

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
}
```

#### Setup 2: Global Jest with external `.d.ts` files
```typescript
// types/jest-extensions.d.ts
declare namespace jest {
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
  
  interface Expect {
    toBeWithinRange(floor: number, ceiling: number): any;
  }
  
  interface InverseAsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): any;
  }
}
```

#### Setup 3: Inline global declarations
```typescript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
    // ... other interfaces
  }
}
```

## 🎯 Affected Documentation Pages

- [Expect - Custom Matchers](https://jestjs.io/docs/expect#custom-matchers)
- [Jest Configuration - setupFilesAfterEnv](https://jestjs.io/docs/configuration#setupfilesafterenv-array)
- TypeScript usage examples throughout the docs

## 💡 Additional Context

This issue particularly affects developers who:
- Use `injectGlobals: true` (the default behavior)
- Organize TypeScript declarations in separate `.d.ts` files
- Use asymmetric matchers in object matching scenarios
- Follow modern Jest + TypeScript patterns

The current documentation leads to a confusing trial-and-error experience when the `declare module 'expect'` approach fails silently or with cryptic TypeScript errors.
