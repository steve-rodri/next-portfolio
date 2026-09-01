const sizes = {
  md: "px-[11px] py-[3px]",
  sm: "px-2.5 py-[2px]",
}

const base =
  "rounded-full border border-line bg-surface-inset font-mono text-[11px] lowercase text-ink-muted"

export default function TagPill({
  label,
  href,
  size = "md",
}: {
  label: string
  href?: string | null
  size?: keyof typeof sizes
}) {
  const className = `${base} ${sizes[size]}`
  if (!href) return <span className={className}>{label}</span>

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${className} no-underline transition-colors duration-120 ease-out hover:border-blueprint-bright hover:text-blueprint-bright`}
    >
      {label}
    </a>
  )
}
