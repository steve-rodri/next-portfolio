/**
 * Sets a project's copy (summary, meta line, stats, sections) from a spec file.
 * Dry run by default; set APPLY=1 to patch.
 *
 *   SLUG=link-front SPEC=/tmp/linkfront-copy.json \
 *     pnpm exec sanity exec scripts/project-copy.ts --with-user-token
 *
 * Every key is optional, so this can set the sections alone or the stats alone:
 *   { "summary": "the one-line card blurb",
 *     "metaLine": "role: engineer ...",
 *     "stats": [{ "value": "224", "label": "commits on the app" }],
 *     "sections": [{ "heading": "Overview", "body": ["first para", "second para"] }] }
 *
 * Section bodies are plain paragraphs; each string becomes one portable-text block.
 * All of it is public copy, so it goes through the portfolio-copy skill first.
 */
import { readFileSync } from "node:fs"
import { getCliClient } from "sanity/cli"

type Stat = { value: string; label: string }
type Section = { heading: string; body: string[] }
type CopySpec = { summary?: string; metaLine?: string; stats?: Stat[]; sections?: Section[] }
type ProjectCopy = {
  _id: string
  title: string
  summary: string | null
  metaLine: string | null
  statCount: number
  sectionCount: number
}

const client = getCliClient({ apiVersion: "2025-04-03" })
const APPLY = process.env.APPLY === "1"

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`set ${name} (see the header of this file)`)
  return value
}

function readSpec(path: string): CopySpec {
  const spec: CopySpec = JSON.parse(readFileSync(path, "utf8"))
  if (!spec.summary && !spec.metaLine && !spec.stats?.length && !spec.sections?.length) {
    throw new Error(`${path} sets none of "summary", "metaLine", "stats", "sections"`)
  }
  return spec
}

function keyFrom(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function emDashCheck(spec: CopySpec) {
  const strings = [
    spec.summary ?? "",
    spec.metaLine ?? "",
    ...(spec.stats ?? []).flatMap((stat) => [stat.value, stat.label]),
    ...(spec.sections ?? []).flatMap((section) => [section.heading, ...section.body]),
  ]
  const offender = strings.find((text) => text.includes("—"))
  if (offender) throw new Error(`em dash in public copy: ${offender}`)
}

function block(text: string, index: number) {
  return {
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `p${index}s`, text, marks: [] }],
  }
}

function buildSections(sections: Section[]) {
  return sections.map((section) => ({
    _key: keyFrom(section.heading),
    heading: section.heading,
    body: section.body.map(block),
  }))
}

function buildStats(stats: Stat[]) {
  return stats.map((stat) => ({ _key: keyFrom(stat.label), ...stat }))
}

function describeSummaryPlan(spec: CopySpec, project: ProjectCopy) {
  if (!spec.summary) return
  console.log(`  summary   <- "${spec.summary}"`)
  if (project.summary) console.log(`              (was "${project.summary}")`)
}

function describeMetaPlan(spec: CopySpec, project: ProjectCopy) {
  if (!spec.metaLine) return
  console.log(`  meta line <- "${spec.metaLine}"`)
  if (project.metaLine) console.log(`              (was "${project.metaLine}")`)
}

function describeStatPlan(spec: CopySpec, project: ProjectCopy) {
  if (!spec.stats) return
  for (const stat of spec.stats) console.log(`  stat  ${stat.value}  ${stat.label}`)
  if (project.statCount > 0) console.log(`  (replaces all ${project.statCount} existing stats)`)
}

function describeSectionPlan(spec: CopySpec, project: ProjectCopy) {
  if (!spec.sections) return
  for (const section of spec.sections) {
    const words = section.body.join(" ").split(/\s+/).length
    console.log(`  section "${section.heading}"  ${section.body.length} paras, ${words} words`)
  }
  if (project.sectionCount > 0) {
    console.log(`  (replaces all ${project.sectionCount} existing sections)`)
  }
}

async function fetchProject(slug: string): Promise<ProjectCopy> {
  const project = await client.fetch<ProjectCopy | null>(
    `*[_type=="project" && slug.current==$slug][0]{
       _id, title, summary, metaLine, "statCount": count(stats), "sectionCount": count(sections)
     }`,
    { slug },
  )
  if (!project) throw new Error(`no project with slug ${slug}`)
  return project
}

async function main() {
  const slug = requiredEnv("SLUG")
  const spec = readSpec(requiredEnv("SPEC"))
  emDashCheck(spec)
  const project = await fetchProject(slug)

  console.log(`${project.title} (${project._id})`)
  describeSummaryPlan(spec, project)
  describeMetaPlan(spec, project)
  describeStatPlan(spec, project)
  describeSectionPlan(spec, project)

  if (!APPLY) {
    console.log("dry run; set APPLY=1 to patch")
    return
  }

  const fields: Record<string, unknown> = {}
  if (spec.summary) fields.summary = spec.summary
  if (spec.metaLine) fields.metaLine = spec.metaLine
  if (spec.stats) fields.stats = buildStats(spec.stats)
  if (spec.sections) fields.sections = buildSections(spec.sections)

  const result = await client.patch(project._id).set(fields).commit()
  console.log(`patched ${result._id} rev ${result._rev}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
