import ActionLink from "@/components/action-link"
import { formatPeriod, padCount } from "@/lib/format"
import type {
  ExperiencesQueryResult,
  PersonalInfoQueryResult,
} from "@/types/sanity"

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
}

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
      {label}
    </span>
  )
}

function NavItem({
  href,
  label,
  count,
  tone,
}: {
  href: string
  label: string
  count: string
  tone: "active" | "muted"
}) {
  const color = tone === "active" ? "text-ink" : "text-ink-muted"
  return (
    <a
      href={href}
      className={`flex items-baseline justify-between no-underline transition-colors duration-120 ease-out hover:text-blueprint-bright ${color}`}
    >
      <span>{label}</span>
      <span className="font-mono text-[11px] text-ink-faint">{count}</span>
    </a>
  )
}

export default function Rail({
  personalInfo,
  experiences,
  featuredCount,
  otherCount,
}: {
  personalInfo: NonNullable<PersonalInfoQueryResult>
  experiences: ExperiencesQueryResult
  featuredCount: number
  otherCount: number
}) {
  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-10 overflow-y-auto border-r border-line px-7 pb-8 pt-10 narrow:static narrow:h-auto narrow:gap-6 narrow:border-b narrow:border-r-0 tight:px-6">
      <div className="flex flex-col gap-3.5">
        <h1 className="text-[30px] font-semibold leading-[1.02] tracking-[-.025em]">
          {personalInfo.name.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </h1>
        <span className="font-mono text-[11px] font-medium tracking-[.02em] text-ink-faint">
          {personalInfo.role}
        </span>
        <p className="m-0 hidden text-sm leading-[1.6] text-ink-muted narrow:block">
          {personalInfo.bio}
        </p>
      </div>

      <nav className="flex flex-col gap-[9px] text-sm narrow:hidden">
        <NavItem
          href="#work"
          label="Featured work"
          count={padCount(featuredCount)}
          tone="active"
        />
        <NavItem
          href="#other"
          label="Other work"
          count={padCount(otherCount)}
          tone="muted"
        />
        <NavItem href="#stack" label="Stack" count="—" tone="muted" />
        <NavItem href="#about" label="About" count="—" tone="muted" />
      </nav>

      <div className="flex flex-col gap-3.5 narrow:hidden">
        <Eyebrow label="Experience" />
        <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[13.5px]">
          {experiences.map((experience, index) => (
            <div key={experience._id} className="contents">
              <span>{experience.company}</span>
              <span className="font-mono text-[11px] text-ink-faint">
                {formatPeriod(experience.period)}
              </span>
              <span
                className={`col-span-full text-[12.5px] text-ink-muted ${index < experiences.length - 1 ? "mb-2.5" : ""}`}
              >
                {experience.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-[9px]">
        <Eyebrow label="Contact" />
        <a
          href={`mailto:${personalInfo.email}`}
          className="break-all text-sm text-ink underline decoration-line-strong underline-offset-[3px] transition-colors duration-120 ease-out hover:text-blueprint-bright hover:decoration-blueprint-bright"
        >
          {personalInfo.email}
        </a>
        {personalInfo.location && (
          <span className="text-[13px] text-ink-muted">
            {personalInfo.location}
          </span>
        )}
        <div className="mt-1 flex gap-4 text-[13px]">
          {personalInfo.socialLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted no-underline transition-colors duration-120 ease-out hover:text-ink hover:underline hover:underline-offset-[3px]"
            >
              {SOCIAL_LABELS[link.platform ?? "other"] ?? "Website"} ↗
            </a>
          ))}
        </div>
        <div className="mt-4 flex gap-2.5">
          <ActionLink
            href="/Steven_Rodriguez_Resume.pdf"
            variant="primary"
            className="flex-1 px-3.5 py-[9px] text-sm"
          >
            Download résumé
          </ActionLink>
          <ActionLink
            href="#work"
            variant="ghost"
            className="hidden flex-1 px-3.5 py-[9px] text-sm narrow:inline-flex"
          >
            View work
          </ActionLink>
        </div>
      </div>
    </aside>
  )
}
