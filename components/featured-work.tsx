import Image from "next/image"
import ActionLink from "@/components/action-link"
import SectionHeader from "@/components/section-header"
import TagPill from "@/components/tag-pill"
import { liveLabel } from "@/lib/live-label"
import { urlFor } from "@/lib/sanity"
import { cardTechnologies } from "@/lib/technologies"
import type { ProjectListItem } from "@/types/portfolio"

function thumbSrc(project: ProjectListItem) {
  if (!project.image?.asset?._ref) return null
  return urlFor(project.image).width(520).height(328).url()
}

function FeaturedCard({
  project,
  position,
}: {
  project: ProjectListItem
  position: number
}) {
  const slug = project.slug?.current
  const showReadMore = Boolean(project.hasDetail && slug)
  const src = thumbSrc(project)

  return (
    <div className="grid grid-cols-[260px_1fr] items-start gap-[34px] tight:flex tight:flex-col tight:gap-3">
      <div className="h-[164px] w-[260px] max-w-full overflow-hidden rounded-[4px] border border-line bg-surface-inset">
        {src && (
          <Image
            src={src}
            alt={project.image?.alt || project.title}
            width={520}
            height={328}
            priority={position === 0}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-[9px]">
        <div className="flex items-baseline gap-3.5">
          <h3 className="m-0 text-[26px] font-semibold leading-[1.02] tracking-[-.025em]">
            {project.title}
          </h3>
          {project.meta && (
            <span className="font-mono text-[11px] text-ink-faint">
              {project.meta}
            </span>
          )}
        </div>
        {project.summary && (
          <p className="m-0 max-w-[60ch] text-[14.5px] leading-[1.6] text-ink-muted [text-wrap:pretty]">
            {project.summary}
          </p>
        )}
        {project.highlight && (
          <span className="mt-1 font-mono text-[11.5px] text-ink-faint">
            {project.highlight}
          </span>
        )}
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {cardTechnologies(project).map((tech) => (
            <TagPill key={tech._id} label={tech.name} href={tech.url} />
          ))}
        </div>
        {(showReadMore || project.liveUrl) && (
          <div className="mt-1.5 flex gap-2.5">
            {showReadMore && (
              <ActionLink
                href={`/work/${slug}`}
                variant="primary"
                className="px-[13px] py-[7px] text-[13.5px]"
              >
                Read more
                <span className="sr-only"> about {project.title}</span>
              </ActionLink>
            )}
            {project.liveUrl && (
              <ActionLink
                href={project.liveUrl}
                variant="ghost"
                className="px-[13px] py-[7px] text-[13.5px]"
              >
                {liveLabel(project)} ↗︎
              </ActionLink>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function FeaturedWork({
  projects,
}: {
  projects: ProjectListItem[]
}) {
  return (
    <section
      id="work"
      className="flex flex-col gap-[26px] px-10 pt-10 tight:px-6"
    >
      <SectionHeader label="Featured work" />
      {projects.map((project, index) => (
        <article
          key={project._id}
          className={index > 0 ? "border-t border-line pt-[26px]" : ""}
        >
          <FeaturedCard project={project} position={index} />
        </article>
      ))}
    </section>
  )
}
