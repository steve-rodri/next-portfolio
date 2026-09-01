import type { PersonalInfoQueryResult } from "@/types/sanity"

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
}

export default function ContactBand({
  personalInfo,
}: {
  personalInfo: NonNullable<PersonalInfoQueryResult>
}) {
  return (
    <section className="mt-auto flex flex-col gap-3 bg-surface-band px-10 py-11 tight:p-6 tight:py-9">
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        Get in touch
      </span>
      <a
        href={`mailto:${personalInfo.email}`}
        className="text-[34px] font-semibold leading-[1.02] tracking-[-.025em] text-ink-strong no-underline transition-colors duration-120 ease-out hover:text-blueprint-bright tight:break-all tight:text-[21px]"
      >
        {personalInfo.email}
      </a>
      <div className="mt-3 flex items-center gap-4 text-[13px]">
        {personalInfo.socialLinks?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blueprint-bright no-underline hover:underline hover:underline-offset-[3px]"
          >
            {SOCIAL_LABELS[link.platform ?? "other"] ?? "Website"} ↗︎
          </a>
        ))}
        <span className="ml-auto font-mono text-[11px] text-ink-faint">
          © {new Date().getFullYear()} {personalInfo.name.toLowerCase()}
        </span>
      </div>
    </section>
  )
}
