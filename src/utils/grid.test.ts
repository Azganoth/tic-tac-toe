import { describe, expect, it } from "vitest";
import * as Grid from "./grid";

describe("grid", () => {
  it("should convert index to row and column", () => {
    expect(Grid.getRowCol(0)).toEqual([1, 1]);
    expect(Grid.getRowCol(3)).toEqual([2, 1]);
    expect(Grid.getRowCol(7)).toEqual([3, 2]);
  });

  it("should convert row and column to index", () => {
    expect(Grid.getIndex(1, 1)).toBe(0);
    expect(Grid.getIndex(2, 1)).toBe(3);
    expect(Grid.getIndex(3, 2)).toBe(7);
  });
});
