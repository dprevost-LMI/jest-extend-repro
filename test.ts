// No imports needed! Jest globals are automatically available
// Custom matchers are set up in jest.setup.ts

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

