import { CATEGORY_LABELS, categoryRank, isCapability } from "@/lib/skills"
import type { SkillsQueryResult } from "@/types/sanity"

export interface Capability {
  id: string
  name: string
  detail: string | null
}

export interface CapabilityGroup {
  label: string
  items: Capability[]
}

type CapabilitySkill = SkillsQueryResult[number]

function featuredCapabilities(skills: SkillsQueryResult): CapabilitySkill[] {
  return skills
    .filter((skill) => skill.featured && isCapability(skill))
    .sort(
      (a, b) =>
        categoryRank(a.category) - categoryRank(b.category) ||
        a.name.localeCompare(b.name),
    )
}

function toCapability(skill: CapabilitySkill): Capability {
  return { id: skill._id, name: skill.name, detail: skill.detail ?? null }
}

/** The Stack row label for a category; categories outside the design order keep their raw name. */
function labelFor(category: string) {
  return CATEGORY_LABELS.find(([name]) => name === category)?.[1] ?? category
}

/** Featured capabilities, ordered by the design's category order then by name. */
export function buildCapabilities(skills: SkillsQueryResult): Capability[] {
  return featuredCapabilities(skills).map(toCapability)
}

/** Featured capabilities grouped under the Stack's labels, in the Stack's order; empty groups drop out. */
export function buildCapabilityGroups(skills: SkillsQueryResult): CapabilityGroup[] {
  const groups: CapabilityGroup[] = []
  for (const skill of featuredCapabilities(skills)) {
    const label = labelFor(skill.category)
    const current = groups.at(-1)
    if (current?.label === label) current.items.push(toCapability(skill))
    else groups.push({ label, items: [toCapability(skill)] })
  }
  return groups
}
