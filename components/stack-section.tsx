import SectionHeader from "@/components/section-header"
import TagPill from "@/components/tag-pill"
import { buildStackGroups } from "@/lib/stack"
import type { SkillsQueryResult } from "@/types/sanity"

export default function StackSection({ skills }: { skills: SkillsQueryResult }) {
  const groups = buildStackGroups(skills)
  if (!groups.length) return null

  return (
    <section id="stack" className="flex flex-col gap-[22px] px-10 pb-10 tight:px-6">
      <SectionHeader label="Stack" />
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-[150px_1fr] items-baseline gap-4 tight:flex tight:flex-col tight:items-start tight:gap-2"
          >
            <h3 className="m-0 text-sm font-semibold">{group.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <TagPill key={item.name} label={item.name} href={item.url} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
