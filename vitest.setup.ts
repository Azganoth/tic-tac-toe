import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

afterEach(() => {
  cleanup();
});

expect.extend({
  toBeOneOf(received, expectedValues) {
    const { isNot } = this;
    return {
      pass: expectedValues.includes(received),
      message: () =>
        `expected ${received}${isNot ? " not" : ""} to be one of ${expectedValues}`,
    };
  },
});
