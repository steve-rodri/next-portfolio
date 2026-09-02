import SectionHeader from "@/components/section-header"
import {
  buildCapabilityGroups,
  type Capability,
  type CapabilityGroup,
} from "@/lib/capabilities"
import type { SkillsQueryResult } from "@/types/sanity"

function CapabilityRow({ capability }: { capability: Capability }) {
  return (
    <div className="grid grid-cols-[240px_1fr] items-baseline gap-4 tight:flex tight:flex-col tight:items-start tight:gap-1">
      <h4 className="m-0 text-sm font-medium">{capability.name}</h4>
      {capability.detail ? (
        <p className="m-0 text-[13px] leading-[1.6] text-ink-muted">
          {capability.detail}
        </p>
      ) : null}
    </div>
  )
}

function GroupRow({ group }: { group: CapabilityGroup }) {
  return (
    <div className="grid grid-cols-[150px_1fr] items-baseline gap-4 tight:flex tight:flex-col tight:items-start tight:gap-2">
      <h3 className="m-0 text-sm font-semibold">{group.label}</h3>
      <div className="flex flex-col gap-3">
        {group.items.map((capability) => (
          <CapabilityRow key={capability.id} capability={capability} />
        ))}
      </div>
    </div>
  )
}

export default function CapabilitiesSection({
  skills,
}: {
  skills: SkillsQueryResult
}) {
  const groups = buildCapabilityGroups(skills)
  if (!groups.length) return null

  return (
    <section
      id="capabilities"
      className="flex flex-col gap-[22px] px-10 pb-10 tight:px-6"
    >
      <SectionHeader label="Capabilities" />
      <div className="flex flex-col gap-7">
        {groups.map((group) => (
          <GroupRow key={group.label} group={group} />
        ))}
      </div>
    </section>
  )
}
