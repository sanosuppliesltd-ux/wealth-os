"use client";

import { useState } from "react";
import { Card } from "./card";

/**
 * Demo-only interaction. Deliberately does NOT create a transaction,
 * update any balance, or run any calculation — Phase 0 has no real
 * financial functionality. See Master Project Brief, section 4.
 */
export function AddInvestmentDemo() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg text-forest-700">
            Have extra cash?
          </p>
          <p className="mt-1 text-sm text-forest-400">
            Record a one-off investment
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setSubmitted(false);
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-forest-700 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-600"
        >
          + Add investment
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add investment (demo)"
          className="fixed inset-0 z-20 flex items-end justify-center bg-forest-900/40 p-4 sm:items-center"
        >
          <div className="w-full max-w-sm rounded-card bg-cream p-6 shadow-lg">
            <h2 className="font-serif text-xl text-forest-700">
              Add investment
            </h2>
            <p className="mt-1 text-xs text-forest-400">
              Demo interaction only — no real investment is recorded and
              no calculation is performed.
            </p>

            {submitted ? (
              <p className="mt-4 text-sm text-forest-600">
                This is a demo. Nothing was saved.
              </p>
            ) : (
              <form
                className="mt-4 space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label className="block text-sm text-forest-600">
                  Amount (Rs)
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="e.g. 100000"
                    className="mt-1 w-full rounded-xl border border-forest-100 bg-white px-3 py-2 text-forest-700 outline-none focus:border-forest-400"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-600"
                >
                  Continue
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-full border border-forest-100 px-4 py-2 text-sm font-medium text-forest-600 transition-colors hover:bg-forest-50"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
