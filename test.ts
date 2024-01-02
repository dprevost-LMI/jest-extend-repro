import {expect, describe, test} from '@jest/globals';
import type {MatcherFunction} from 'expect';

const toBeWithinRange: MatcherFunction<[floor: unknown, ceiling: unknown]> =
  // `floor` and `ceiling` get types from the line above
  // it is recommended to type them as `unknown` and to validate the values
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
          // `this` context will have correct typings
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

expect.extend({
  toBeWithinRange,
});

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;
  }
}

describe('potato', () => {
  test('is within range', () => expect(100).toBeWithinRange(90, 110));

  test('is NOT within range', () => expect(101).not.toBeWithinRange(0, 100));

  test('asymmetric ranges', () => {
    expect({apples: 6, bananas: 3}).toEqual({
      apples: expect.toBeWithinRange(1, 10),
      bananas: expect.not.toBeWithinRange(11, 20),
    });
  });
});

