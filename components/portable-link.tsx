import type { PortableTextMarkComponentProps } from "@portabletext/react"

const linkClass =
  "text-blueprint underline underline-offset-[3px] transition-colors duration-120 ease-out hover:text-blueprint-bright"

function isExternal(href: string) {
  return /^[a-z]+:/i.test(href)
}

/** Link mark for portable text: same tab for site paths, new tab for external URLs. */
export default function PortableLink({
  children,
  value,
}: PortableTextMarkComponentProps<{ _type: "link"; href?: string }>) {
  const href = value?.href ?? "#"
  const external = isExternal(href)
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={linkClass}
    >
      {children}
    </a>
  )
}
