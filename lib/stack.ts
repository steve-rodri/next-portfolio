import type { SkillsQueryResult } from "@/types/sanity"

export interface StackGroup {
  label: string
  items: string[]
}

/** Display order and labels for the Stack section, per the design. */
const GROUP_LABELS: Array<[category: string, label: string]> = [
  ["Mobile", "Mobile"],
  ["Frontend", "Front end"],
  ["Backend", "Back end"],
  ["Ship & verify", "Ship & verify"],
  ["Tools", "Tools"],
  ["Design", "Design"],
  ["Other", "Other"],
]

/** Groups featured skills into the design's Stack rows; empty groups drop out. */
export function buildStackGroups(skills: SkillsQueryResult): StackGroup[] {
  const featured = skills.filter((skill) => skill.featured)
  const byCategory = new Map<string, string[]>()
  for (const skill of featured) {
    const items = byCategory.get(skill.category) ?? []
    items.push(skill.name)
    byCategory.set(skill.category, items)
  }

  const groups: StackGroup[] = []
  for (const [category, label] of GROUP_LABELS) {
    const items = byCategory.get(category)
    if (items?.length) groups.push({ label, items })
    byCategory.delete(category)
  }
  for (const [category, items] of byCategory) {
    if (items.length) groups.push({ label: category, items })
  }
  return groups
}
