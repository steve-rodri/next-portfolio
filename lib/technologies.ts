interface Technology {
  name: string
  featured: boolean | null
}

interface CuratedProject<T extends Technology> {
  technologies: T[] | null
  keyTechnologies: T[] | null
}

/** Featured pills first, then alphabetical: the order an uncurated stack is listed in. */
export function sortTechnologies<T extends Technology>(
  technologies: T[] | null | undefined,
): T[] {
  return [...(technologies ?? [])].sort((a, b) => {
    const byFeatured = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    return byFeatured || a.name.localeCompare(b.name)
  })
}

/** The pills a featured card shows: the curated key list in Studio order, or everything until one is curated. */
export function cardTechnologies<T extends Technology>(
  project: CuratedProject<T>,
): T[] {
  if (project.keyTechnologies?.length) return project.keyTechnologies
  return sortTechnologies(project.technologies)
}
