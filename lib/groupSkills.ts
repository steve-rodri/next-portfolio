import { SkillsQueryResult } from "@/types/sanity"

export type SkillCategory = SkillsQueryResult[0]["category"]

export interface SkillGroup {
  _id: number
  category: SkillCategory
  items: SkillsQueryResult
}

// Function to group skills by category after sorting
export function groupSkills(skills: SkillsQueryResult): SkillGroup[] {
  if (!skills.length) return []
  // First, sort the skills:
  // - Featured skills first (descending order)
  // - Then alphabetically by name (ascending order)
  const sortedSkills = skills.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1
    }
    return a.name.localeCompare(b.name)
  })

  // Group the sorted skills by category
  const groups: { [key: string]: SkillsQueryResult } = {}
  sortedSkills.forEach((skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = []
    }
    groups[skill.category].push(skill)
  })

  // Convert the groups object into an array of SkillGroup
  return Object.keys(groups).map((c, i) => {
    const category = c as unknown as SkillCategory
    return {
      _id: i,
      category,
      items: groups[category],
    }
  })
}
