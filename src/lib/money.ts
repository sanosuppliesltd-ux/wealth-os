/**
 * Money display formatting — deliberately separate from the financial
 * calculation engine (see src/engine). This module only formats
 * already-computed bigint paisa values for display; it performs no
 * calculations of its own.
 */

const PAISA_PER_RUPEE = 100n;

/**
 * Formats a bigint paisa amount as "2,500,000" — Western thousands
 * grouping, no decimal places, no currency prefix. Truncates toward
 * zero on any leftover paisa (whole-rupee display only). Intended for
 * editable amount inputs, which show the "Rs" prefix separately.
 */
export function formatPaisaAsPlainRupees(paisa: bigint): string {
  const rupees = paisa / PAISA_PER_RUPEE;
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Formats a bigint paisa amount as "Rs 2,500,000" — Western thousands
 * grouping, no decimal places, a space after "Rs". Truncates toward
 * zero on any leftover paisa (whole-rupee display only).
 */
export function formatPaisaAsRupees(paisa: bigint): string {
  return `Rs ${formatPaisaAsPlainRupees(paisa)}`;
}
