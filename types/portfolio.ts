import type {
  PersonalInfoQueryResult,
  ProjectBySlugQueryResult,
  ProjectsQueryResult,
} from "./sanity"

export type PersonalInfo = NonNullable<PersonalInfoQueryResult>

export type ProjectListItem = ProjectsQueryResult[number]

export type ProjectDetail = NonNullable<ProjectBySlugQueryResult>

export type ProjectStat = NonNullable<ProjectDetail["stats"]>[number]

export type ProjectSection = NonNullable<ProjectDetail["sections"]>[number]

export type ProjectScreenshot = NonNullable<
  ProjectDetail["screenshots"]
>[number]
