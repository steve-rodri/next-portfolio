import { CATEGORY_LABELS, isCapability } from "@/lib/skills"
import type { SkillsQueryResult } from "@/types/sanity"

export interface StackItem {
  name: string
  url: string | null
}

export interface StackGroup {
  label: string
  items: StackItem[]
}

interface Categorized {
  name: string
  category: string
  url?: string | null
}

function toItem(technology: Categorized): StackItem {
  return { name: technology.name, url: technology.url ?? null }
}

/** Groups technologies into the design's Stack rows, in category order; empty groups drop out. */
export function groupByCategory(technologies: Categorized[]): StackGroup[] {
  const byCategory = new Map<string, StackItem[]>()
  for (const technology of technologies) {
    const items = byCategory.get(technology.category) ?? []
    items.push(toItem(technology))
    byCategory.set(technology.category, items)
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

/** The home Stack: featured technologies only, capabilities excluded. */
export function buildStackGroups(skills: SkillsQueryResult): StackGroup[] {
  return groupByCategory(
    skills.filter((skill) => skill.featured && !isCapability(skill)),
  )
}
