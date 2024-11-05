import { describe, expect, it } from "vitest";
import { cx } from "./cx";

describe("composite class names with cx function", () => {
  it("should handle various inputs", () => {
    expect(cx()).toBe("");
    expect(cx("card")).toBe("card");
    expect(cx("button", "active")).toBe("button active");
    expect(cx("input", { active: true })).toBe("input active");
  });

  it("should handle boolean conditions", () => {
    expect(cx({ input: true, focus: false })).toBe("input");
    expect(cx({ "mb-1": false, "mt-1": true })).toBe("mt-1");
    expect(cx({ input: true, focus: true })).toBe("input focus");
  });

  it("should handle empty strings", () => {
    expect(cx("", "card")).toBe("card");
    expect(cx("card", "")).toBe("card");
    expect(cx("", "", "")).toBe("");
  });

  it("should handle undefined and null", () => {
    const isCollapsed = undefined;
    const isExpanded = null;

    expect(cx("accordion", isCollapsed, isExpanded, "big")).toBe(
      "accordion big",
    );
    expect(cx({ collapsed: isCollapsed, expanded: true })).toBe("expanded");
    expect(cx({ collapsed: true, expanded: isExpanded })).toBe("collapsed");
  });
});
