/**
 * Points the published CLI tools at their npm package page instead of the repo.
 * Skips any package the registry doesn't know yet, so it is safe to run before
 * every tool is published. Dry run by default; set APPLY=1 to write.
 *
 *   pnpm exec sanity exec scripts/tool-links-to-npm.ts --with-user-token
 *   APPLY=1 pnpm exec sanity exec scripts/tool-links-to-npm.ts --with-user-token
 */
import { getCliClient } from "sanity/cli"

const client = getCliClient()

const NPM_PACKAGES: Array<[projectId: string, packageName: string]> = [
  ["project-commit-analyzer", "commit-analyzer"],
  ["project-airtable-schema-gen", "airtable-schema-gen"],
  ["project-add-ts-expect-error", "add-ts-expect-error"],
]

async function isPublished(packageName: string): Promise<boolean> {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`)
  return response.ok
}

async function patchProject(id: string, packageName: string) {
  const liveUrl = `https://www.npmjs.com/package/${packageName}`
  await client
    .patch(id)
    .set({ liveUrl, liveLabel: "View on npm" })
    .unset(["githubUrl"])
    .commit()
}

async function run() {
  const apply = process.env.APPLY === "1"
  for (const [id, packageName] of NPM_PACKAGES) {
    if (!(await isPublished(packageName))) {
      console.log(`${id}: skipped, ${packageName} is not on the registry yet`)
      continue
    }
    console.log(`${id}: → npmjs.com/package/${packageName}, githubUrl cleared`)
    if (apply) await patchProject(id, packageName)
  }
  console.log(apply ? "applied" : "dry run — set APPLY=1 to write")
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
