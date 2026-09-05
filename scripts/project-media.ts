/**
 * Sets a project's card image and rebuilds its screenshots[] array from a spec file.
 * Dry run by default; set APPLY=1 to upload and patch.
 *
 *   SLUG=burn-by-cara-loren SPEC=/tmp/burn/spec.json \
 *     pnpm exec sanity exec scripts/project-media.ts --with-user-token
 *
 * Both spec keys are optional, so this can set the hero alone or the tiles alone:
 *   { "image": "/abs/hero.png",
 *     "screenshots": [{ "caption": "goal quiz", "path": "/abs/goal-quiz.png" }] }
 *
 * Captions are public copy: lowercase noun phrases, per the portfolio-copy skill.
 * See scripts/README.md for the capture steps that produce the spec.
 */
import { createReadStream, readFileSync } from "node:fs"
import { basename } from "node:path"
import { getCliClient } from "sanity/cli"

type Shot = { caption: string; path: string }
type MediaSpec = { image?: string; screenshots?: Shot[] }
type ProjectMedia = { _id: string; title: string; hasImage: boolean; shotCount: number }

const client = getCliClient({ apiVersion: "2025-04-03" })
const APPLY = process.env.APPLY === "1"

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`set ${name} (see the header of this file)`)
  return value
}

function readSpec(path: string): MediaSpec {
  const spec: MediaSpec = JSON.parse(readFileSync(path, "utf8"))
  if (!spec.image && !spec.screenshots?.length) {
    throw new Error(`${path} sets neither "image" nor "screenshots"`)
  }
  return spec
}

function keyFrom(caption: string) {
  return caption
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function imageValue(assetId: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } }
}

async function uploadImage(path: string) {
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
  })
  const { width, height } = asset.metadata.dimensions
  console.log(`  uploaded ${basename(path)} -> ${asset._id} (${width}x${height})`)
  return asset._id
}

function describeImagePlan(spec: MediaSpec, project: ProjectMedia) {
  if (!spec.image) return
  const state = project.hasImage ? "replaces existing" : "fills empty required field"
  console.log(`  card image <- ${basename(spec.image)}  [${state}]`)
}

function describeShotPlan(spec: MediaSpec, project: ProjectMedia) {
  if (!spec.screenshots) return
  for (const shot of spec.screenshots) {
    console.log(`  "${shot.caption}" <- ${basename(shot.path)}`)
  }
  if (project.shotCount > 0) {
    console.log(`  (replaces all ${project.shotCount} existing screenshot entries)`)
  }
}

async function buildScreenshots(shotList: Shot[]) {
  const entries = []
  for (const shot of shotList) {
    const assetId = await uploadImage(shot.path)
    entries.push({ _key: keyFrom(shot.caption), caption: shot.caption, image: imageValue(assetId) })
  }
  return entries
}

async function fetchProject(slug: string): Promise<ProjectMedia> {
  const project = await client.fetch<ProjectMedia | null>(
    `*[_type=="project" && slug.current==$slug][0]{
       _id, title, "hasImage": defined(image.asset), "shotCount": count(screenshots)
     }`,
    { slug },
  )
  if (!project) throw new Error(`no project with slug ${slug}`)
  return project
}

async function main() {
  const slug = requiredEnv("SLUG")
  const spec = readSpec(requiredEnv("SPEC"))
  const project = await fetchProject(slug)

  console.log(`${project.title} (${project._id})`)
  describeImagePlan(spec, project)
  describeShotPlan(spec, project)

  if (!APPLY) {
    console.log("dry run; set APPLY=1 to upload and patch")
    return
  }

  const fields: Record<string, unknown> = {}
  if (spec.image) fields.image = imageValue(await uploadImage(spec.image))
  if (spec.screenshots) fields.screenshots = await buildScreenshots(spec.screenshots)

  const result = await client.patch(project._id).set(fields).commit()
  console.log(`patched ${result._id} rev ${result._rev}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
