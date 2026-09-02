import { describe, expect, test } from "bun:test"
import { buildCapabilityGroups } from "./capabilities"
import type { SkillsQueryResult } from "@/types/sanity"

function skill(
  overrides: Partial<SkillsQueryResult[number]> & { name: string; category: string },
): SkillsQueryResult[number] {
  return {
    _id: `id-${overrides.name}`,
    kind: "capability",
    detail: null,
    url: null,
    featured: true,
    ...overrides,
  } as SkillsQueryResult[number]
}

describe("buildCapabilityGroups", () => {
  test("groups featured capabilities under the Stack labels in Stack order, items by name", () => {
    const groups = buildCapabilityGroups([
      skill({ name: "Typed API design", category: "Backend" }),
      skill({ name: "Media pipelines", category: "Mobile", detail: "Cached video." }),
      skill({ name: "Auth & sessions", category: "Backend" }),
    ])

    expect(groups.map((group) => group.label)).toEqual(["Mobile", "Back end"])
    expect(groups[0].items).toEqual([
      { id: "id-Media pipelines", name: "Media pipelines", detail: "Cached video." },
    ])
    expect(groups[1].items.map((item) => item.name)).toEqual([
      "Auth & sessions",
      "Typed API design",
    ])
  })

  test("drops technologies, unfeatured capabilities, and the groups they would have filled", () => {
    const groups = buildCapabilityGroups([
      skill({ name: "React", category: "Frontend", kind: "technology" }),
      skill({ name: "Old thing", category: "Tools", featured: false }),
      skill({ name: "Testing", category: "Ship & verify" }),
    ])

    expect(groups.map((group) => group.label)).toEqual(["Ship & verify"])
    expect(groups[0].items.map((item) => item.name)).toEqual(["Testing"])
  })

  test("labels a category outside the design order by its raw name, after the known groups", () => {
    const groups = buildCapabilityGroups([
      skill({ name: "Something", category: "Data" }),
      skill({ name: "Home automation", category: "Other" }),
    ])

    expect(groups.map((group) => group.label)).toEqual(["Other", "Data"])
  })
})
