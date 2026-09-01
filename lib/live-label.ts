import type { ProjectListItem } from "@/types/portfolio"

type Labeled = Pick<ProjectListItem, "liveLabel">

/** "View Site" / "View App" for buttons; defaults to "View Site". */
export function liveLabel(project: Labeled): string {
  return project.liveLabel ?? "View Site"
}

/** "Site" / "App" for the compact other-work table links. */
export function shortLiveLabel(project: Labeled): string {
  return liveLabel(project).replace(/^View /, "")
}
