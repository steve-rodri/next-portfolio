import { describe, expect, it } from "bun:test"
import { groupByKind } from "./work-kinds"

const row = (title: string, kind: string | null) => ({ title, kind })

describe("groupByKind", () => {
  it("groups by kind in display order, keeping row order inside each group", () => {
    const groups = groupByKind([
      row("Zen Garden", "coursework"),
      row("LinkFront", "paid"),
      row("commit-analyzer", "tool"),
      row("MSNY", "paid"),
    ])
    expect(groups.map((g) => g.label)).toEqual([
      "paid work",
      "tools",
      "coursework",
    ])
    expect(groups[0].projects.map((p) => p.title)).toEqual([
      "LinkFront",
      "MSNY",
    ])
  })

  it("trails rows without a known kind in one unlabeled group", () => {
    const groups = groupByKind([
      row("Mystery", null),
      row("Plantifilm", "takehome"),
      row("Odd one", "hardware"),
    ])
    expect(groups.map((g) => g.label)).toEqual(["take-homes", null])
    expect(groups[1].projects.map((p) => p.title)).toEqual([
      "Mystery",
      "Odd one",
    ])
  })

  it("returns nothing for an empty list", () => {
    expect(groupByKind([])).toEqual([])
  })
})
