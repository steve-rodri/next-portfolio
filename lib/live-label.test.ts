import { describe, expect, it } from "bun:test"
import { liveLabel, shortLiveLabel } from "./live-label"

describe("liveLabel", () => {
  it("defaults to View Site", () => {
    expect(liveLabel({ liveLabel: null })).toBe("View Site")
  })

  it("keeps the stored label", () => {
    expect(liveLabel({ liveLabel: "View on npm" })).toBe("View on npm")
  })
})

describe("shortLiveLabel", () => {
  it("shortens the known labels", () => {
    expect(shortLiveLabel({ liveLabel: "View Site" })).toBe("Site")
    expect(shortLiveLabel({ liveLabel: "View App" })).toBe("App")
    expect(shortLiveLabel({ liveLabel: "View on npm" })).toBe("npm")
  })

  it("falls back to dropping the View prefix", () => {
    expect(shortLiveLabel({ liveLabel: "View Demo" })).toBe("Demo")
  })
})
