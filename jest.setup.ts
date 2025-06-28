// This file runs before each test file
// Use it to extend Jest matchers globally
import type {MatcherFunction} from 'expect';

const toBeWithinRange: MatcherFunction<[floor: unknown, ceiling: unknown]> =
  function (actual, floor, ceiling) {
    if (
      typeof actual !== 'number' ||
      typeof floor !== 'number' ||
      typeof ceiling !== 'number'
    ) {
      throw new TypeError('These must be of type number!');
    }

    const pass = actual >= floor && actual <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            actual,
          )} not to be within range ${this.utils.printExpected(
            `${floor} - ${ceiling}`,
          )}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            actual,
          )} to be within range ${this.utils.printExpected(
            `${floor} - ${ceiling}`,
          )}`,
        pass: false,
      };
    }
  };

// Extend Jest matchers globally
expect.extend({
  toBeWithinRange,
});

// TypeScript declarations for the custom matcher
// Replace by the .d.ts file in types/jest-extensions.d.ts
// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toBeWithinRange(floor: number, ceiling: number): R;
//     }
    
//     interface Expect {
//       toBeWithinRange(floor: number, ceiling: number): any;
//     }
    
//     interface InverseAsymmetricMatchers {
//       toBeWithinRange(floor: number, ceiling: number): any;
//     }
//   }
// }
