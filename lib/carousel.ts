/** Horizontal drag, in pixels, before a swipe counts as a deliberate move. */
export const SWIPE_THRESHOLD = 45

export type SwipeIntent = "forward" | "back" | "none"

/**
 * The carousel stops at both ends instead of wrapping, so the arrows can
 * disable and you can feel where you are in a long set.
 */
export function stepForward(index: number, total: number): number {
  return Math.min(index + 1, Math.max(total - 1, 0))
}

export function stepBack(index: number, total: number): number {
  return Math.max(index - 1, 0)
}

/** Dragging left reveals what comes next, matching how a phone gallery reads. */
export function swipeIntent(deltaX: number): SwipeIntent {
  if (Math.abs(deltaX) <= SWIPE_THRESHOLD) return "none"
  return deltaX < 0 ? "forward" : "back"
}
