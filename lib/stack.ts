import { CATEGORY_LABELS, isCapability, type Skill } from "@/lib/skills"
import type { SkillsQueryResult } from "@/types/sanity"

export interface StackItem {
  name: string
  url: string | null
}

export interface StackGroup {
  label: string
  items: StackItem[]
}

function toItem(skill: Skill): StackItem {
  return { name: skill.name, url: skill.url ?? null }
}

/** Groups featured technologies into the design's Stack rows; empty groups drop out. */
export function buildStackGroups(skills: SkillsQueryResult): StackGroup[] {
  const byCategory = new Map<string, StackItem[]>()
  for (const skill of skills) {
    if (!skill.featured || isCapability(skill)) continue
    const items = byCategory.get(skill.category) ?? []
    items.push(toItem(skill))
    byCategory.set(skill.category, items)
  }

  const groups: StackGroup[] = []
  for (const [category, label] of CATEGORY_LABELS) {
    const items = byCategory.get(category)
    if (items?.length) groups.push({ label, items })
    byCategory.delete(category)
  }
  for (const [category, items] of byCategory) {
    if (items.length) groups.push({ label: category, items })
  }
  return groups
}
