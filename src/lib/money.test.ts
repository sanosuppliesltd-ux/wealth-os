import { describe, expect, it } from "vitest";
import { formatPaisaAsRupees } from "./money";

describe("formatPaisaAsRupees", () => {
  it("formats whole rupees with Western thousands grouping", () => {
    expect(formatPaisaAsRupees(250_000_000n)).toBe("Rs 2,500,000");
  });

  it("formats a smaller amount", () => {
    expect(formatPaisaAsRupees(7_500_000n)).toBe("Rs 75,000");
  });

  it("formats zero", () => {
    expect(formatPaisaAsRupees(0n)).toBe("Rs 0");
  });
});
