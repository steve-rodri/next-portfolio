/** Display order and labels for the Other work groups; labels sit in the lowercase mono register. */
export const KIND_LABELS: Array<[kind: string, label: string]> = [
  ["paid", "paid work"],
  ["side", "side projects"],
  ["tool", "tools"],
  ["takehome", "take-homes"],
  ["coursework", "coursework"],
]

interface Kinded {
  kind?: string | null
}

export interface WorkGroup<T extends Kinded> {
  label: string | null
  projects: T[]
}

function isKnownKind(kind: string | null | undefined): kind is string {
  return KIND_LABELS.some(([known]) => known === kind)
}

/** Groups projects by kind in the design's order, keeping their order inside each group. Rows without a known kind trail the list, unlabeled. */
export function groupByKind<T extends Kinded>(projects: T[]): WorkGroup<T>[] {
  const byKind = new Map<string, T[]>()
  const unlabeled: T[] = []
  for (const project of projects) {
    if (!isKnownKind(project.kind)) {
      unlabeled.push(project)
      continue
    }
    const rows = byKind.get(project.kind) ?? []
    rows.push(project)
    byKind.set(project.kind, rows)
  }

  const groups: WorkGroup<T>[] = []
  for (const [kind, label] of KIND_LABELS) {
    const rows = byKind.get(kind)
    if (rows?.length) groups.push({ label, projects: rows })
  }
  if (unlabeled.length) groups.push({ label: null, projects: unlabeled })
  return groups
}
