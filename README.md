# pp-ilga11o-marketplace

Serie A toolkit for Claude Code. Powered by the official [Deltatre SDP API](https://github.com/NicolaGallo/lega-seriea-pp-cli) — same source as legaseriea.it.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/NicolaGallo/pp-ilga11o-marketplace/main/install.sh | bash
```

Requires Node ≥18. Safe to re-run.

## What You Get

### Skill: `pp-lega-seriea`

Invoke with `/pp-lega-seriea` in Claude Code. 86 endpoints, no API key.

- Live scores, standings, match facts
- Player xG, advanced stats, shot maps
- VAR decisions, match commentary
- Title race, tournament simulation, fantasy XI

### Agents

| Agent | Use for |
|-------|---------|
| `serie-a-analyst` | Match analysis, xG, tactics, VAR |
| `serie-a-scout` | Player scouting, fantacalcio picks |
| `serie-a-reporter` | Matchday digest, results, scorers |
| `serie-a-predictor` | Title race, Scudetto probability, match prediction |

## Prerequisites

The skill drives `lega-seriea-pp-cli`. Install it first:

```bash
go install github.com/NicolaGallo/lega-seriea-pp-cli/cmd/lega-seriea-pp-cli@latest
export PATH="$HOME/go/bin:$PATH"
```

Verify: `lega-seriea-pp-cli --version`

## Manual Install (Claude Code only, no curl)

```bash
claude plugin marketplace add NicolaGallo/pp-ilga11o-marketplace
claude plugin install pp-lega-seriea@pp-ilga11o-marketplace
```

Then copy agents manually:

```bash
cp agents/*.md ~/.claude/agents/
```

## Uninstall

```bash
curl -fsSL https://raw.githubusercontent.com/NicolaGallo/pp-ilga11o-marketplace/main/install.sh | bash -s -- --uninstall
```
