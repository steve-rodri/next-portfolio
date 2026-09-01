import type { SkillsQueryResult } from "@/types/sanity"

export type Skill = SkillsQueryResult[number]

/** Display order and labels for the Stack rows, per the design. */
export const CATEGORY_LABELS: Array<[category: string, label: string]> = [
  ["Languages", "Languages"],
  ["Mobile", "Mobile"],
  ["Frontend", "Front end"],
  ["Backend", "Back end"],
  ["Ship & verify", "Ship & verify"],
  ["Tools", "Tools"],
  ["Design", "Design"],
  ["Other", "Other"],
]

/** A capability is something you can do; everything else is something you install. */
export function isCapability(skill: Skill) {
  return skill.kind === "capability"
}

/** Position of a category in the design's order; unknown ones sort last. */
export function categoryRank(category: string) {
  const index = CATEGORY_LABELS.findIndex(([name]) => name === category)
  return index === -1 ? CATEGORY_LABELS.length : index
}
