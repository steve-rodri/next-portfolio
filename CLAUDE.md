# steverodri.com

Steve's portfolio: Next.js App Router + Sanity, deployed by Vercel from `main`.
Content is curated in Sanity Studio at `/studio`. Read `PRODUCT.md` (who reads
the site and what it must do) and `DESIGN.md` (the visual system) before
changing anything visible. All public-facing text goes through the
`portfolio-copy` skill in `.claude/skills/`, even one-line tweaks.

## Tooling

- pnpm is the package manager. `pnpm-lock.yaml` is what Vercel builds from;
  install with `pnpm install`. `bun run <script>` is fine once installed.
- `bun test lib` runs the unit tests. `pnpm run lint` and `pnpm run build`
  are the other gates.
- `pnpm run typegen` regenerates Sanity types after a schema change.
- `scripts/` holds one-off Sanity content patches and image pipelines; see
  `scripts/README.md` before reusing one.

## Cloud vs local

Default to a cloud session: claude.ai/code, the Claude app, or `claude --cloud`
from this directory. The sandbox clones from GitHub and
`.claude/hooks/session-start.sh` runs `pnpm install` when `CLAUDE_CODE_REMOTE=true`.
Nothing in `~/.claude` reaches the sandbox; what a session needs lives in this repo.

The build reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
Locally they come from `.env.local`. In the cloud they must be set on the
environment in the claude.ai/code environment dialog. Both are public values
that ship to the browser, not secrets.

Local only: the browser preview via `.claude/launch.json`, the Sanity patch
scripts (`--with-user-token` needs your local Sanity login), and the image
scripts in `scripts/`, which lean on macOS tooling.

Hand-back: cloud pushes `claude/*` branches. Open the PR from the phone, merge,
Vercel deploys `main`, then `git pull` locally.
