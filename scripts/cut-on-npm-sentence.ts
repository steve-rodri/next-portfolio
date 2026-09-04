/**
 * Drops the "On npm." sentence from the tool summaries; the rows now carry an
 * npm link that says the same thing. Dry run by default; set APPLY=1 to write.
 *
 *   pnpm exec sanity exec scripts/cut-on-npm-sentence.ts --with-user-token
 *   APPLY=1 pnpm exec sanity exec scripts/cut-on-npm-sentence.ts --with-user-token
 */
import { getCliClient } from "sanity/cli"

const client = getCliClient()

const PROJECT_IDS = ["project-commit-analyzer", "project-airtable-schema-gen"]

function withoutOnNpm(summary: string): string {
  return summary.replace(/\s*\bOn npm\.\s*/, " ").trim()
}

async function run() {
  const apply = process.env.APPLY === "1"
  for (const id of PROJECT_IDS) {
    const summary: string | null = await client.fetch(
      `*[_id == $id][0].summary`,
      { id },
    )
    if (!summary) {
      console.log(`${id}: no summary, skipped`)
      continue
    }
    const next = withoutOnNpm(summary)
    if (next === summary) {
      console.log(`${id}: no "On npm." sentence, skipped`)
      continue
    }
    console.log(`${id}\n  before: ${summary}\n  after:  ${next} (${next.length} chars)\n`)
    if (apply) await client.patch(id).set({ summary: next }).commit()
  }
  console.log(apply ? "applied" : "dry run — set APPLY=1 to write")
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
