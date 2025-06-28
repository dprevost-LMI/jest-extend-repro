// Test file to demonstrate the TypeScript issue with declare module 'expect'
// Uncomment the import below to see the difference in behavior

// Instead of using the below if we uncomment code from jest-extensions.d.ts it will start to work
import './types/broken-expect-approach.d.ts'; 

describe('Demonstrating the TypeScript issue', () => {
  test('basic matcher works', () => {
    expect(100).toBeWithinRange(90, 110);
  });

  test('negated matcher - FAILS with declare module approach', () => {
    // This will show TypeScript error with declare module 'expect' approach:
    // Property 'toBeWithinRange' does not exist on type 'InverseAsymmetricMatchers'
    expect(101).not.toBeWithinRange(0, 100);
  });

  test('asymmetric matcher - FAILS with declare module approach', () => {
    // This will show TypeScript error with declare module 'expect' approach:
    // Property 'toBeWithinRange' does not exist on type 'Expect'
    expect({apples: 6, bananas: 3}).toEqual({
      apples: expect.toBeWithinRange(1, 10),
      bananas: expect.not.toBeWithinRange(11, 20),
    });
  });
});
