/** Deterministic lane layout for the library panel. */
import type { LibraryTeamView } from '../library-projection.ts'

export const CARD_W = 176
export const CARD_H = 78
export const GAP_X = 24
export const GAP_Y = 16

export interface LibraryLayout {
  readonly lanes: readonly { depth: number; cards: readonly { taskId: string; x: number; y: number }[] }[]
  readonly edges: readonly { from: string; to: string; state: string; x1: number; y1: number; x2: number; y2: number }[]
  readonly width: number
  readonly height: number
}

/** Lay tasks out by dependency depth, then wire edges between card centers. */
export function layoutLibrary(team: LibraryTeamView): LibraryLayout {
  const byDepth = new Map<number, string[]>()
  for (const task of team.tasks) {
    const list = byDepth.get(task.depth) ?? []
    list.push(task.id)
    byDepth.set(task.depth, list)
  }
  const lanes = [...byDepth.entries()].sort((left, right) => left[0] - right[0]).map(([depth, ids]) => ({
    depth,
    cards: ids.map((taskId, index) => ({ taskId, x: GAP_X + index * (CARD_W + GAP_X), y: GAP_Y + depth * (CARD_H + GAP_Y) })),
  }))
  const position = new Map<string, { x: number; y: number }>()
  for (const lane of lanes) for (const card of lane.cards) position.set(card.taskId, card)
  let width = 0
  for (const lane of lanes) {
    const last = lane.cards[lane.cards.length - 1]
    if (last !== undefined) width = Math.max(width, last.x + CARD_W + GAP_X)
  }
  const height = lanes.length === 0 ? CARD_H + 2 * GAP_Y : lanes.length * (CARD_H + GAP_Y) + GAP_Y
  const edges = team.edges.flatMap((edge) => {
    const from = position.get(edge.from)
    const to = position.get(edge.to)
    if (from === undefined || to === undefined) return []
    return [{
      from: edge.from, to: edge.to, state: edge.state,
      x1: from.x + CARD_W, y1: from.y + CARD_H / 2,
      x2: to.x, y2: to.y + CARD_H / 2,
    }]
  })
  return { lanes, edges, width: Math.max(width, CARD_W + 2 * GAP_X), height }
}
