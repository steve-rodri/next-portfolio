import Image from "next/image"
import SectionHeader from "@/components/section-header"
import { shortLiveLabel } from "@/lib/live-label"
import { urlFor } from "@/lib/sanity"
import type { ProjectListItem } from "@/types/portfolio"

const mutedLink =
  "no-underline text-ink-muted transition-colors duration-120 ease-out hover:text-ink hover:underline hover:underline-offset-[3px]"
const accentLink =
  "no-underline text-blueprint transition-colors duration-120 ease-out hover:text-blueprint-bright hover:underline hover:underline-offset-[3px]"

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
  return (
    <tr className="border-b border-line last:border-b-0">
      <td className="w-[210px] py-[7px]">
        <span className="inline-flex items-center gap-2.5">
          <Thumb project={project} />
          <span>{project.title}</span>
        </span>
      </td>
      <td className="py-[7px] text-ink-muted tight:hidden">
        {project.summary}
      </td>
      <td className="w-[150px] py-[7px] text-right">
        <span className="inline-flex gap-3.5">
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

export default function OtherWork({
  projects,
}: {
  projects: ProjectListItem[]
}) {
  return (
    <section id="other" className="flex flex-col gap-3.5 p-10 tight:px-6">
      <SectionHeader label="Other work" />
      <table className="w-full border-collapse text-[13.5px]">
        <tbody>
          {projects.map((project) => (
            <Row key={project._id} project={project} />
          ))}
        </tbody>
      </table>
    </section>
  )
}
