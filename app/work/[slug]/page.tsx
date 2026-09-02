import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ActionLink from "@/components/action-link"
import TagPill from "@/components/tag-pill"
import BodySection from "@/components/work/body-section"
import CompactFooter from "@/components/work/compact-footer"
import Screenshots from "@/components/work/screenshots"
import StackBlock from "@/components/work/stack-block"
import StatsRow from "@/components/work/stats-row"
import { liveLabel } from "@/lib/live-label"
import { getPersonalInfo, getProjectBySlug, getProjects } from "@/lib/queries"
import { urlFor } from "@/lib/sanity"
import type { ProjectDetail } from "@/types/portfolio"

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.flatMap((project) =>
    project.slug?.current ? [{ slug: project.slug.current }] : [],
  )
}

function heroSrc(project: ProjectDetail) {
  if (!project.image?.asset?._ref) return null
  return urlFor(project.image).width(1520).height(855).url()
}

// The meta row carries the mono annotation and the curated key pills; the full
// stack lives in StackBlock below the stats, so nothing is repeated up here.
function MetaRow({ project }: { project: ProjectDetail }) {
  const keyTechnologies = project.keyTechnologies ?? []
  if (!project.metaLine && !keyTechnologies.length) return null

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      {project.metaLine && (
        <span className="font-mono text-xs text-ink-faint">
          {project.metaLine}
        </span>
      )}
      {keyTechnologies.length > 0 && (
        <span className="flex flex-wrap gap-1.5">
          {keyTechnologies.map((tech) => (
            <TagPill
              key={tech._id}
              label={tech.name}
              href={tech.url}
              size="sm"
            />
          ))}
        </span>
      )}
    </div>
  )
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [project, personalInfo] = await Promise.all([
    getProjectBySlug(slug),
    getPersonalInfo(),
  ])
  if (!project) notFound()

  const hero = heroSrc(project)

  return (
    <div className="flex min-h-screen flex-col">
      <main id="content" className="mx-auto w-full max-w-[760px] flex-1 px-6">
        <div className="pb-6 pt-8">
          <Link
            href="/"
            className="font-mono text-[13px] text-ink-muted no-underline transition-colors duration-120 ease-out hover:text-ink hover:underline hover:underline-offset-[3px]"
          >
            ← all work
          </Link>
        </div>

        <header className="flex flex-col gap-4 pb-7">
          <div>
            <h1 className="m-0 text-[54px] font-semibold leading-[1.02] tracking-[-.025em] tight:text-[34px]">
              {project.title}
            </h1>
            {project.summary && (
              <p className="mb-0 mt-2.5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-muted">
                {project.summary}
              </p>
            )}
          </div>
          <MetaRow project={project} />
        </header>

        {hero && (
          <Image
            src={hero}
            alt={project.title}
            width={1520}
            height={855}
            priority
            fetchPriority="high"
            className="block aspect-video w-full rounded-[4px] border border-line object-cover saturate-[.9]"
          />
        )}

        {project.stats?.length ? <StatsRow stats={project.stats} /> : null}

        <StackBlock technologies={project.technologies} />

        {project.sections?.map((section) => (
          <BodySection key={section._key} section={section} />
        ))}

        {project.screenshots?.length ? (
          <Screenshots screenshots={project.screenshots} />
        ) : null}

        <div className="flex gap-2.5 pb-10 pt-8">
          {project.liveUrl && (
            <ActionLink
              href={project.liveUrl}
              variant="primary"
              className="px-4 py-[9px] text-sm"
            >
              {liveLabel(project)} ↗︎
            </ActionLink>
          )}
          <ActionLink
            href="/"
            variant="ghost"
            className="px-4 py-[9px] text-sm"
          >
            ← All work
          </ActionLink>
        </div>
      </main>

      <CompactFooter email={personalInfo.email} name={personalInfo.name} />
    </div>
  )
}
