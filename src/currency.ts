/** Display-only USD→CNY rate; budgets and logs stay in USD. */
export const USD_TO_CNY = 7.2

export function usdToCny(usd: number): number {
  return Math.round(usd * USD_TO_CNY * 100) / 100
}
