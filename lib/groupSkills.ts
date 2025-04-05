import { SkillsQueryResult } from "@/types/sanity"

export type SkillCategory = SkillsQueryResult[0]["category"]

export interface SkillGroup {
  _id: number
  category: SkillCategory
  items: SkillsQueryResult
}

export function groupSkills(skills: SkillsQueryResult): SkillGroup[] {
  if (!skills.length) return []
  const sortedSkills = skills.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1
    }
    return a.name.localeCompare(b.name)
  })

  const groups: { [key: string]: SkillsQueryResult } = {}
  sortedSkills.forEach((skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = []
    }
    groups[skill.category].push(skill)
  })

  return Object.keys(groups)
    .sort((a, b) => a.localeCompare(b))
    .map((c, i) => {
      const category = c as unknown as SkillCategory
      return {
        _id: i,
        category,
        items: groups[category],
      }
    })
}
