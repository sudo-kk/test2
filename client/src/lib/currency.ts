/**
 * Currency utility functions for the e-commerce application
 * Converts and formats prices to Indian Rupees
 */

// Currency conversion rate (USD to INR)
// This should ideally come from an API in production
const USD_TO_INR_RATE = 75;

/**
 * Formats a price in Indian Rupees
 * @param amount - The amount to format
 * @param includeSymbol - Whether to include the ₹ symbol
 * @returns Formatted price string
 */
export function formatRupees(amount: number, includeSymbol = true): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: includeSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
}

/**
 * Converts USD to INR
 * @param usdAmount - Amount in USD
 * @returns Amount in INR
 */
export function usdToInr(usdAmount: number): number {
  return usdAmount * USD_TO_INR_RATE;
}

/**
 * Formats a USD amount as INR
 * @param usdAmount - Amount in USD
 * @returns Formatted INR string
 */
export function formatUsdAsRupees(usdAmount: number): string {
  return formatRupees(usdToInr(usdAmount));
}
