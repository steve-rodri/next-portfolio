import Link from "next/link"
import type React from "react"

const variants = {
  primary:
    "bg-blueprint text-blueprint-foreground font-medium transition-colors duration-120 ease-out hover:bg-blueprint-bright",
  ghost:
    "border border-line-strong text-ink transition-colors duration-120 ease-out hover:border-blueprint hover:text-blueprint-bright",
}

export default function ActionLink({
  href,
  variant,
  className = "",
  children,
}: {
  href: string
  variant: keyof typeof variants
  className?: string
  children: React.ReactNode
}) {
  const external = href.startsWith("http")
  const staticFile = /\.[a-z0-9]+$/i.test(href)
  const base = `inline-flex items-center justify-center rounded-[3px] no-underline ${variants[variant]} ${className}`
  if (external || staticFile) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  )
}
