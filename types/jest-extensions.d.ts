// Type declarations for custom Jest matchers
// The below works but is commented to show what the issue is with `declare module 'expect'`
// declare namespace jest {
//   interface Matchers<R> {
//     toBeWithinRange(floor: number, ceiling: number): R;
//   }
  
//   interface Expect {
//     toBeWithinRange(floor: number, ceiling: number): any;
//   }
  
//   interface InverseAsymmetricMatchers {
//     toBeWithinRange(floor: number, ceiling: number): any;
//   }
// }
