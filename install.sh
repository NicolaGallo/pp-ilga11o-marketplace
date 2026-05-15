#!/usr/bin/env bash
# pp-ilga11o-marketplace — installer shim
#
# One-line install:
#   curl -fsSL https://raw.githubusercontent.com/NicolaGallo/pp-ilga11o-marketplace/main/install.sh | bash
#
# Local clone:
#   bash install.sh [flags]

set -euo pipefail

REPO="NicolaGallo/pp-ilga11o-marketplace"

if ! command -v node >/dev/null 2>&1; then
  echo "install: Node.js (>=18) required." >&2
  echo "  macOS:  brew install node" >&2
  echo "  Linux:  https://nodejs.org or nvm" >&2
  exit 1
fi

NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "install: Node $NODE_MAJOR too old. Need Node >=18." >&2
  exit 1
fi

# Local clone path — skip npx round-trip when running from clone
here="$(cd "$(dirname "${BASH_SOURCE[0]:-}")" 2>/dev/null && pwd)" || here=""
if [ -n "$here" ] && [ -f "$here/bin/install.js" ]; then
  exec node "$here/bin/install.js" "$@"
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "install: npx required (ships with Node >=18)." >&2
  exit 1
fi

exec npx -y "github:$REPO" "$@"
