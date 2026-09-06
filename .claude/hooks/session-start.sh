#!/bin/bash
# SessionStart hook: prepare a cloud sandbox. No-op in local sessions.
#
# Cloud sessions (claude.ai/code, the Claude app, `claude --cloud`) clone
# the repo fresh, so node_modules is missing. Nothing in ~/.claude travels
# to the sandbox; anything the session needs must be installed here.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

install_deps() {
  if [ -d "$CLAUDE_PROJECT_DIR/node_modules" ]; then
    return 0
  fi
  (cd "$CLAUDE_PROJECT_DIR" && pnpm install --frozen-lockfile)
}

install_deps || echo "session-start.sh: pnpm install failed (continuing)" >&2
