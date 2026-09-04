// One-off: RIDR role ended 2026-09-02. Move all "current" phrasing to past tense.
// Dry run by default. APPLY=1 to write.
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})
const APPLY = process.env.APPLY === '1'

const BIO_OLD = "and I'm one of two engineers on RIDR,"
const BIO_NEW = "and I spent this year as one of two engineers on RIDR,"

const ABOUT_OLD = "These days I'm one of two engineers on RIDR, and on the side I take on website work through "
const ABOUT_NEW = "I was one of two engineers on RIDR through September, and I take on website work through "

const OVERVIEW_OLD = "I joined RIDR GmbH in March 2026 as one of two engineers. In practice that means the mobile app is my responsibility end to end:"
const OVERVIEW_NEW = "I was at RIDR GmbH from March to September 2026, one of two engineers. The mobile app was my responsibility end to end:"

async function main() {
  const info = await client.fetch(`*[_type=="personalInfo"][0]{_id, bio, about}`)
  const proj = await client.fetch(`*[_type=="project" && slug.current=="ridr"][0]{_id, meta, metaLine, sections}`)
  const exp  = await client.fetch(`*[_type=="experience" && company=="RIDR GmbH"][0]{_id, period}`)

  const changes: {doc: string; field: string; from: string; to: string}[] = []
  const patches: {id: string; set: Record<string, unknown>}[] = []

  // personalInfo.bio
  if (info?.bio?.includes(BIO_OLD)) {
    const to = info.bio.replace(BIO_OLD, BIO_NEW)
    changes.push({doc: 'personalInfo', field: 'bio', from: BIO_OLD, to: BIO_NEW})
    patches.push({id: info._id, set: {bio: to}})
  }

  // personalInfo.about -> the span that opens paragraph 3
  const about = structuredClone(info?.about ?? [])
  let aboutHit = false
  for (const block of about) {
    for (const span of block.children ?? []) {
      if (span.text === ABOUT_OLD) { span.text = ABOUT_NEW; aboutHit = true }
    }
  }
  if (aboutHit) {
    changes.push({doc: 'personalInfo', field: 'about[para 3]', from: ABOUT_OLD, to: ABOUT_NEW})
    const p = patches.find(x => x.id === info._id)
    if (p) p.set.about = about
    else patches.push({id: info._id, set: {about}})
  }

  // project.meta / metaLine
  const projSet: Record<string, unknown> = {}
  if (proj?.meta?.includes('current')) {
    const to = proj.meta.replace('current', '2026')
    changes.push({doc: 'project:ridr', field: 'meta', from: proj.meta, to})
    projSet.meta = to
  }
  if (proj?.metaLine?.includes('2026–now')) {
    const to = proj.metaLine.replace('2026–now', 'march–september 2026')
    changes.push({doc: 'project:ridr', field: 'metaLine', from: proj.metaLine, to})
    projSet.metaLine = to
  }

  // project.sections -> Overview body
  const sections = structuredClone(proj?.sections ?? [])
  let secHit = false
  for (const sec of sections) {
    for (const block of sec.body ?? []) {
      for (const span of block.children ?? []) {
        if (typeof span.text === 'string' && span.text.includes(OVERVIEW_OLD)) {
          span.text = span.text.replace(OVERVIEW_OLD, OVERVIEW_NEW); secHit = true
        }
      }
    }
  }
  if (secHit) {
    changes.push({doc: 'project:ridr', field: 'sections[Overview]', from: OVERVIEW_OLD, to: OVERVIEW_NEW})
    projSet.sections = sections
  }
  if (Object.keys(projSet).length) patches.push({id: proj._id, set: projSet})

  // experience.period
  if (exp?.period && exp.period !== 'March 2026 - September 2026') {
    changes.push({doc: 'experience:RIDR', field: 'period', from: exp.period, to: 'March 2026 - September 2026'})
    patches.push({id: exp._id, set: {period: 'March 2026 - September 2026'}})
  }

  for (const c of changes) {
    console.log(`\n${c.doc} . ${c.field}`)
    console.log(`  - ${c.from}`)
    console.log(`  + ${c.to}`)
  }
  console.log(`\n${changes.length} change(s) across ${patches.length} document(s).`)

  if (!APPLY) { console.log('DRY RUN. Re-run with APPLY=1 to write.'); return }
  const tx = client.transaction()
  for (const p of patches) tx.patch(p.id, {set: p.set})
  const res = await tx.commit()
  console.log('committed:', res.transactionId)
}
main().catch(e => { console.error(e); process.exit(1) })
