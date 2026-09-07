import { describe, expect, it } from "vitest";
import { projectZeroReturnTotalPaisa } from "../projection";

// Financial Test Book — Test 001 (zero return).
// Starting capital: Rs 2,500,000 (250,000,000 paisa)
// Monthly contribution: Rs 75,000 (7,500,000 paisa)
// 12 monthly contributions, 0% annual return
// Expected total: Rs 3,400,000 (340,000,000 paisa)
describe("projectZeroReturnTotalPaisa", () => {
  it("Test 001: matches the known-answer zero-return result exactly", () => {
    const result = projectZeroReturnTotalPaisa({
      startingCapitalPaisa: 250_000_000n,
      monthlyContributionPaisa: 7_500_000n,
      months: 12,
    });

    expect(result).toBe(340_000_000n);
  });

  it("is deterministic across repeated calls with identical inputs", () => {
    const input = {
      startingCapitalPaisa: 250_000_000n,
      monthlyContributionPaisa: 7_500_000n,
      months: 12,
    };

    const first = projectZeroReturnTotalPaisa(input);
    const second = projectZeroReturnTotalPaisa(input);

    expect(first).toBe(second);
  });

  it("returns the starting capital unchanged when there are zero months", () => {
    const result = projectZeroReturnTotalPaisa({
      startingCapitalPaisa: 250_000_000n,
      monthlyContributionPaisa: 7_500_000n,
      months: 0,
    });

    expect(result).toBe(250_000_000n);
  });

  it("rejects a negative months value", () => {
    expect(() =>
      projectZeroReturnTotalPaisa({
        startingCapitalPaisa: 250_000_000n,
        monthlyContributionPaisa: 7_500_000n,
        months: -1,
      }),
    ).toThrow();
  });
});
