import { categoryRank, isCapability } from "@/lib/skills"
import type { SkillsQueryResult } from "@/types/sanity"

export interface Capability {
  id: string
  name: string
  detail: string | null
}

/** Featured capabilities, ordered by the design's category order then by name. */
export function buildCapabilities(skills: SkillsQueryResult): Capability[] {
  return skills
    .filter((skill) => skill.featured && isCapability(skill))
    .sort(
      (a, b) =>
        categoryRank(a.category) - categoryRank(b.category) ||
        a.name.localeCompare(b.name),
    )
    .map((skill) => ({
      id: skill._id,
      name: skill.name,
      detail: skill.detail ?? null,
    }))
}
