// This file demonstrates the issue with declare module 'expect' approach
// when using injectGlobals: true and .d.ts files

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
}

// This approach works for basic matchers:
// expect(100).toBeWithinRange(90, 110) ✅

// But fails for these cases:
// expect(101).not.toBeWithinRange(0, 100) ❌ - missing InverseAsymmetricMatchers
// expect.toBeWithinRange(1, 10) ❌ - missing Expect interface
// expect.not.toBeWithinRange(11, 20) ❌ - missing InverseAsymmetricMatchers
