import "vitest";

interface CustomMatchers<R = unknown> {
  toBeOneOf: (expected: R[]) => void;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
