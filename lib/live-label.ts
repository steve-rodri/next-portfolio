import type { ProjectListItem } from "@/types/portfolio"

type Labeled = Pick<ProjectListItem, "liveLabel">

/** The compact form each button label takes in the other-work table. */
const SHORT_LABELS: Record<string, string> = {
  "View Site": "Site",
  "View App": "App",
  "View on npm": "npm",
}

/** "View Site" / "View App" / "View on npm" for buttons; defaults to "View Site". */
export function liveLabel(project: Labeled): string {
  return project.liveLabel ?? "View Site"
}

/** "Site" / "App" / "npm" for the compact other-work table links. */
export function shortLiveLabel(project: Labeled): string {
  const label = liveLabel(project)
  return SHORT_LABELS[label] ?? label.replace(/^View /, "")
}
