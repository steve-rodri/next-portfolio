import { describe, expect, it } from "bun:test"
import { groupByCategory } from "./stack"

describe("groupByCategory", () => {
  it("groups into the design's category order and drops empty groups", () => {
    const groups = groupByCategory([
      { name: "Vitest", category: "Ship & verify", url: null },
      { name: "React", category: "Frontend", url: "https://react.dev" },
      { name: "Expo", category: "Mobile" },
    ])
    expect(groups.map((g) => g.label)).toEqual([
      "Mobile",
      "Front end",
      "Ship & verify",
    ])
    expect(groups[0].items).toEqual([{ name: "Expo", url: null }])
    expect(groups[1].items).toEqual([
      { name: "React", url: "https://react.dev" },
    ])
  })

  it("appends unknown categories after the known ones", () => {
    const groups = groupByCategory([
      { name: "Thing", category: "Hardware" },
      { name: "Bash", category: "Languages" },
    ])
    expect(groups.map((g) => g.label)).toEqual(["Languages", "Hardware"])
  })

  it("returns nothing for an empty list", () => {
    expect(groupByCategory([])).toEqual([])
  })
})
