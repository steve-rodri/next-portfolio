import TagPill from "@/components/tag-pill"
import { groupByCategory } from "@/lib/stack"
import { sortTechnologies } from "@/lib/technologies"
import type { ProjectDetail } from "@/types/portfolio"

/** The project's full stack, grouped into the same category rows as the home Stack; sits after the story as a ruled appendix. */
export default function StackBlock({
  technologies,
}: {
  technologies: ProjectDetail["technologies"]
}) {
  const groups = groupByCategory(sortTechnologies(technologies))
  if (!groups.length) return null

  return (
    <div className="mt-8 flex flex-col gap-3.5 border-t border-line pt-6">
      {groups.map((group) => (
        <div
          key={group.label}
          className="grid grid-cols-[150px_1fr] items-baseline gap-4 tight:flex tight:flex-col tight:items-start tight:gap-2"
        >
          <h3 className="m-0 font-mono text-[10.5px] font-medium lowercase tracking-[.02em] text-ink-faint">
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <TagPill
                key={item.name}
                label={item.name}
                href={item.url}
                size="sm"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
