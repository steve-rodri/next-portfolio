import { describe, expect, it } from "bun:test"
import { SWIPE_THRESHOLD, stepBack, stepForward, swipeIntent } from "./carousel"

describe("stepForward", () => {
  it("advances through the set", () => {
    expect(stepForward(0, 4)).toBe(1)
    expect(stepForward(2, 4)).toBe(3)
  })

  it("stops on the last item rather than wrapping", () => {
    expect(stepForward(3, 4)).toBe(3)
  })

  it("holds still for an empty or single-item set", () => {
    expect(stepForward(0, 0)).toBe(0)
    expect(stepForward(0, 1)).toBe(0)
  })
})

describe("stepBack", () => {
  it("moves toward the start", () => {
    expect(stepBack(3, 4)).toBe(2)
    expect(stepBack(1, 4)).toBe(0)
  })

  it("stops on the first item rather than wrapping", () => {
    expect(stepBack(0, 4)).toBe(0)
  })
})

describe("swipeIntent", () => {
  it("ignores a drag shorter than the threshold", () => {
    expect(swipeIntent(SWIPE_THRESHOLD - 1)).toBe("none")
    expect(swipeIntent(-(SWIPE_THRESHOLD - 1))).toBe("none")
  })

  it("reads a leftward drag as moving forward", () => {
    expect(swipeIntent(-(SWIPE_THRESHOLD + 1))).toBe("forward")
  })

  it("reads a rightward drag as moving back", () => {
    expect(swipeIntent(SWIPE_THRESHOLD + 1)).toBe("back")
  })
})
