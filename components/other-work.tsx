import Image from "next/image"
import Link from "next/link"
import SectionHeader from "@/components/section-header"
import { shortLiveLabel } from "@/lib/live-label"
import { urlFor } from "@/lib/sanity"
import { groupByKind, type WorkGroup } from "@/lib/work-kinds"
import type { ProjectListItem } from "@/types/portfolio"

const mutedLink =
  "no-underline text-ink-muted transition-colors duration-120 ease-out hover:text-ink hover:underline hover:underline-offset-[3px]"
const accentLink =
  "no-underline text-blueprint transition-colors duration-120 ease-out hover:text-blueprint-bright hover:underline hover:underline-offset-[3px]"

// The thumbnail is what gives a row its height and its title indent. Reserving
// the 44px gutter (w-11) and the 28px row height (h-7) here keeps both the left
// edge and the vertical rhythm identical on rows that have no image.
const projectCell = "grid min-h-7 grid-cols-[44px_1fr] items-center gap-2.5"

function Thumb({ project }: { project: ProjectListItem }) {
  if (!project.image?.asset?._ref) return null
  return (
    <span className="h-7 w-11 flex-none overflow-hidden rounded-[3px] border border-line">
      <Image
        src={urlFor(project.image).width(120).height(76).url()}
        alt={project.image.alt || project.title}
        width={120}
        height={76}
        className="block h-full w-full object-cover"
      />
    </span>
  )
}

function Row({ project }: { project: ProjectListItem }) {
  const slug = project.slug?.current
  const detailHref = project.hasDetail && slug ? `/work/${slug}` : null

  return (
    <tr className="border-b border-line last:border-b-0">
      <td className="w-[210px] py-[7px]">
        <span className={projectCell}>
          <Thumb project={project} />
          <span className="col-start-2">{project.title}</span>
        </span>
      </td>
      <td className="py-[7px] text-ink-muted tight:hidden">
        {project.summary}
      </td>
      <td className="w-[190px] py-[7px] text-right">
        <span className="inline-flex gap-3.5">
          {detailHref && (
            <Link href={detailHref} className={mutedLink}>
              Read more
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={mutedLink}
            >
              Code ↗︎
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={accentLink}
            >
              {shortLiveLabel(project)} ↗︎
            </a>
          )}
        </span>
      </td>
    </tr>
  )
}

// A group opens like a section in miniature: a mono label over a hairline. The
// first group sits directly under the section header, so it skips the top gap.
function groupLabelGap(position: number) {
  return position === 0 ? "pt-0" : "pt-6"
}

function GroupLabel({ label, position }: { label: string; position: number }) {
  return (
    <tr>
      <th
        scope="rowgroup"
        colSpan={3}
        className={`border-b border-line pb-[7px] text-left font-mono text-[10.5px] font-medium lowercase tracking-[.02em] text-ink-faint ${groupLabelGap(position)}`}
      >
        {label}
      </th>
    </tr>
  )
}

function Group({
  group,
  position,
}: {
  group: WorkGroup<ProjectListItem>
  position: number
}) {
  return (
    <tbody>
      {group.label && <GroupLabel label={group.label} position={position} />}
      {group.projects.map((project) => (
        <Row key={project._id} project={project} />
      ))}
    </tbody>
  )
}

export default function OtherWork({
  projects,
}: {
  projects: ProjectListItem[]
}) {
  const groups = groupByKind(projects)

  return (
    <section id="other" className="flex flex-col gap-3.5 p-10 tight:px-6">
      <SectionHeader label="Other work" />
      <table className="w-full border-collapse text-[13.5px]">
        <caption className="sr-only">
          Other projects, grouped by kind, with links to details, code, and live
          sites
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Description</th>
            <th scope="col">Links</th>
          </tr>
        </thead>
        {groups.map((group, index) => (
          <Group
            key={group.label ?? "unlabeled"}
            group={group}
            position={index}
          />
        ))}
      </table>
    </section>
  )
}
