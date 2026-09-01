const sizes = {
  md: "px-[11px] py-[3px]",
  sm: "px-2.5 py-[2px]",
}

export default function TagPill({
  label,
  size = "md",
}: {
  label: string
  size?: keyof typeof sizes
}) {
  return (
    <span
      className={`rounded-full border border-line bg-surface-inset font-mono text-[11px] lowercase text-ink-muted ${sizes[size]}`}
    >
      {label}
    </span>
  )
}
