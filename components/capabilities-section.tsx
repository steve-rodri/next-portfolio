import SectionHeader from "@/components/section-header"
import { buildCapabilities } from "@/lib/capabilities"
import type { SkillsQueryResult } from "@/types/sanity"

export default function CapabilitiesSection({
  skills,
}: {
  skills: SkillsQueryResult
}) {
  const capabilities = buildCapabilities(skills)
  if (!capabilities.length) return null

  return (
    <section
      id="capabilities"
      className="flex flex-col gap-[22px] px-10 pb-10 tight:px-6"
    >
      <SectionHeader label="Capabilities" />
      <div className="flex flex-col gap-4">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className="grid grid-cols-[240px_1fr] items-baseline gap-4 tight:flex tight:flex-col tight:items-start tight:gap-1"
          >
            <h3 className="m-0 text-sm font-semibold">{capability.name}</h3>
            {capability.detail ? (
              <p className="m-0 text-[13px] leading-[1.6] text-ink-muted">
                {capability.detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
