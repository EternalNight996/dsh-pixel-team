/** Task states that represent an interrupted attempt, not a quality failure. */
export function isInterruptedTask(task: {
  readonly status: string
  readonly output?: string
  readonly verdict?: string
  readonly findings?: readonly unknown[]
}): boolean {
  if (task.status !== 'failed' && task.status !== 'cancelled') return false
  // A failed review/gate has findings or a reject verdict: repair/review owns it,
  // never auto-resume it as if the process was killed.
  if (task.verdict === 'reject' || (task.findings?.length ?? 0) > 0) return false
  const output = (task.output ?? '').toLowerCase()
  if (output.trim() === '') return false
  return output.includes('watchdog:')
    || output.includes('stopped from')
    || output.includes('interrupted')
    || output.includes('interrupt')
    || output.includes('用户从')
    || output.includes('中断')
    || output.includes('已停止')
    || output.includes('cancel')
}
