// Type declarations for custom Jest matchers
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
