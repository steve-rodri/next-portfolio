import Link from "next/link"
import ActionLink from "@/components/action-link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main id="content" className="mx-auto w-full max-w-[760px] flex-1 px-6">
        <div className="pb-6 pt-8">
          <Link
            href="/"
            className="font-mono text-[13px] text-ink-muted no-underline transition-colors duration-120 ease-out hover:text-ink hover:underline hover:underline-offset-[3px]"
          >
            ← all work
          </Link>
        </div>

        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
          404
        </span>
        <h1 className="mb-0 mt-3.5 text-[54px] font-semibold leading-[1.02] tracking-[-.025em] tight:text-[34px]">
          Page not found
        </h1>
        <p className="mb-0 mt-2.5 max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted">
          There's no page at this address. It may have moved, or the link was
          wrong. Everything current is on the home page.
        </p>

        <div className="flex gap-2.5 pb-10 pt-7">
          <ActionLink href="/" variant="primary" className="px-4 py-[9px] text-sm">
            ← All work
          </ActionLink>
        </div>
      </main>
    </div>
  )
}
