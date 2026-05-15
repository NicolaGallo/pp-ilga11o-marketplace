---
name: pp-lega-seriea
description: "The full Deltatre SDP — every Serie A stat, live score, and advanced metric from the official source, plus offline... Trigger phrases: `classifica serie a`, `chi ha segnato oggi in serie a`, `top scorers serie a`, `risultati serie a`, `formation inter milan`, `live scores serie a`, `use lega-seriea-pp-cli`."
author: "Nicola Gallo"
license: "Apache-2.0"
argument-hint: "<command> [args] | install cli|mcp"
allowed-tools: "Read Bash"
metadata:
  openclaw:
    requires:
      bins:
        - lega-seriea-pp-cli
---

# Serie A — Printing Press CLI

## Prerequisites: Install the CLI

This skill drives the `lega-seriea-pp-cli` binary. **You must verify the CLI is installed before invoking any command from this skill.** If it is missing, install it first:

1. Install via the Printing Press installer:
   ```bash
   npx -y @mvanhorn/printing-press install deltatre-sport-data --cli-only
   ```
2. Verify: `lega-seriea-pp-cli --version`
3. Ensure `$GOPATH/bin` (or `$HOME/go/bin`) is on `$PATH`.

If the `npx` install fails before this CLI has a public-library category, install Node or use the category-specific Go fallback after publish.

If `--version` reports "command not found" after install, the install step did not put the binary on `$PATH`. Do not proceed with skill commands until verification succeeds.

lega-seriea-pp-cli talks directly to the same Deltatre Sport Data Platform that powers legaseriea.it — 86 endpoints, no API key required. Get live scores, standings, player xG, match formations, VAR decisions, and tournament simulation in one CLI with offline caching and agent-native JSON output.

## When to Use This CLI

Use lega-seriea-pp-cli when an agent needs accurate, real-time, or historical Serie A data: standings, live scores, player stats, match analysis, or fantasy-focused recommendations. It is the only CLI sourcing data from the official Deltatre SDP API (same as legaseriea.it), so it has the most authoritative data for Italian football. Prefer it over web scraping or third-party APIs for anything involving official Serie A statistics.

## When Not to Use This CLI

Do not activate this CLI for requests that require creating, updating, deleting, publishing, commenting, upvoting, inviting, ordering, sending messages, booking, purchasing, or changing remote state. This printed CLI exposes read-only commands for inspection, export, sync, and analysis.

## Unique Capabilities

These capabilities aren't available in any other tool for this API.

### Local state that compounds
- **`title-race`** — See which teams can still win the Scudetto and how many points they need.

  _Use when an agent needs to answer 'who can still win Serie A' given the current standings and schedule._

  ```bash
  lega-seriea-pp-cli title-race --agent
  ```
- **`fantasy`** — Get the best Serie A XI within a budget using xG, goals, assists, and form data.

  _Use when an agent needs to pick a fantasy Serie A team and wants data-driven player selection._

  ```bash
  lega-seriea-pp-cli fantasy --budget 100 --agent
  ```
- **`form`** — See a team's W/D/L, goals, xG, and KPI across their last N matches in one view.

  _Use when an agent needs to assess a team's recent momentum before predicting a match outcome._

  ```bash
  lega-seriea-pp-cli form --team inter --last 5 --agent
  ```
- **`upsets`** — Find matches where the lower-ranked team won despite the xG favoring the favorite.

  _Use when an agent is analyzing luck vs skill or writing match analysis for a specific round._

  ```bash
  lega-seriea-pp-cli upsets --matchday 37 --agent
  ```
- **`scudetto`** — See the championship probability for any team based on tournament simulation + current standings.

  _Use when an agent needs to give a probabilistic answer to 'will Napoli win the title?'_

  ```bash
  lega-seriea-pp-cli scudetto --team napoli --agent
  ```
- **`derby`** — Get historical head-to-head stats between two clubs across all seasons in the local database.

  _Use when an agent needs historical rivalry context before a big match._

  ```bash
  lega-seriea-pp-cli derby --home juventus --away torino --agent
  ```

### Agent-native plumbing
- **`digest`** — Get a one-command summary of everything that happened in Serie A today: results, scorers, standings changes, VAR events.

  _Use when an agent needs a complete picture of the current Serie A matchday in a single call._

  ```bash
  lega-seriea-pp-cli digest --agent
  ```

## Command Reference

**lega-seriea-pp-cli-health** — Manage deltatre sport data health

- `lega-seriea-pp-cli lega-seriea-pp-cli-health` — List

**football** — Manage football

- `lega-seriea-pp-cli football get` — Get competitions
- `lega-seriea-pp-cli football get-football` — Get project teams
- `lega-seriea-pp-cli football get-football-10` — Get season matchdays
- `lega-seriea-pp-cli football get-football-11` — Get season matches
- `lega-seriea-pp-cli football get-football-12` — Get season matches schedule
- `lega-seriea-pp-cli football get-football-13` — Get stadiums
- `lega-seriea-pp-cli football get-football-14` — Get stages by season
- `lega-seriea-pp-cli football get-football-15` — Get standings by season
- `lega-seriea-pp-cli football get-football-16` — Get season teams
- `lega-seriea-pp-cli football get-football-17` — Get tournament simulation
- `lega-seriea-pp-cli football get-football-18` — Get rosters
- `lega-seriea-pp-cli football get-football-19` — Get coaches
- `lega-seriea-pp-cli football get-football-2` — Get competitions by id
- `lega-seriea-pp-cli football get-football-20` — Get team profile
- `lega-seriea-pp-cli football get-football-21` — Get team roster
- `lega-seriea-pp-cli football get-football-22` — Get season kpi teams
- `lega-seriea-pp-cli football get-football-23` — Get season kpi teams
- `lega-seriea-pp-cli football get-football-24` — Get current season matches
- `lega-seriea-pp-cli football get-football-25` — Get standings over all by season
- `lega-seriea-pp-cli football get-football-26` — Get season advanced stats
- `lega-seriea-pp-cli football get-football-27` — Get player season stats
- `lega-seriea-pp-cli football get-football-28` — Get set piece performance
- `lega-seriea-pp-cli football get-football-29` — Get shot speed rankings
- `lega-seriea-pp-cli football get-football-3` — Get player profiles
- `lega-seriea-pp-cli football get-football-30` — Get team stats
- `lega-seriea-pp-cli football get-football-31` — Get player career by player id
- `lega-seriea-pp-cli football get-football-32` — Get match commentary
- `lega-seriea-pp-cli football get-football-33` — Get group matches
- `lega-seriea-pp-cli football get-football-34` — Get standings by group id
- `lega-seriea-pp-cli football get-football-35` — Get var messages
- `lega-seriea-pp-cli football get-football-36` — Get match action
- `lega-seriea-pp-cli football get-football-37` — Get advanced match events
- `lega-seriea-pp-cli football get-football-38` — Get average formations
- `lega-seriea-pp-cli football get-football-39` — Get match id mapping
- `lega-seriea-pp-cli football get-football-4` — Get multiple season matches
- `lega-seriea-pp-cli football get-football-40` — Get match facts
- `lega-seriea-pp-cli football get-football-41` — Get match preview
- `lega-seriea-pp-cli football get-football-42` — Get match momentum
- `lega-seriea-pp-cli football get-football-43` — Get player advanced stats
- `lega-seriea-pp-cli football get-football-44` — Get player stats
- `lega-seriea-pp-cli football get-football-45` — Get match rankings
- `lega-seriea-pp-cli football get-football-46` — Get shot map
- `lega-seriea-pp-cli football get-football-47` — Get match summary
- `lega-seriea-pp-cli football get-football-48` — Get team advanced stats
- `lega-seriea-pp-cli football get-football-49` — Get match stats
- `lega-seriea-pp-cli football get-football-5` — Get season by id
- `lega-seriea-pp-cli football get-football-50` — Get match tracking heatmap stats
- `lega-seriea-pp-cli football get-football-51` — Get win probability
- `lega-seriea-pp-cli football get-football-52` — Get match feed
- `lega-seriea-pp-cli football get-football-53` — Get match header
- `lega-seriea-pp-cli football get-football-54` — Get match lineups
- `lega-seriea-pp-cli football get-football-55` — Get live match by id
- `lega-seriea-pp-cli football get-football-56` — Get stage matches
- `lega-seriea-pp-cli football get-football-57` — Get groups by stage
- `lega-seriea-pp-cli football get-football-58` — Get player compare stats
- `lega-seriea-pp-cli football get-football-59` — Get player stats by multiple teams
- `lega-seriea-pp-cli football get-football-6` — Get competition seasons by id
- `lega-seriea-pp-cli football get-football-60` — Get players season aggregated stats
- `lega-seriea-pp-cli football get-football-61` — Get season multi stats rankings
- `lega-seriea-pp-cli football get-football-62` — Get team season stats compare
- `lega-seriea-pp-cli football get-football-63` — Get season teams goal breakdown
- `lega-seriea-pp-cli football get-football-64` — Get team season aggregated stats
- `lega-seriea-pp-cli football get-football-65` — Get single team stats
- `lega-seriea-pp-cli football get-football-66` — Get team roster
- `lega-seriea-pp-cli football get-football-67` — Get kpi agg
- `lega-seriea-pp-cli football get-football-68` — Get kpi heatmap
- `lega-seriea-pp-cli football get-football-69` — Get kpi live
- `lega-seriea-pp-cli football get-football-7` — Get fifamatch events
- `lega-seriea-pp-cli football get-football-70` — Get kpi
- `lega-seriea-pp-cli football get-football-71` — Get accumulated standings by stage id
- `lega-seriea-pp-cli football get-football-72` — Get player match breakdown
- `lega-seriea-pp-cli football get-football-73` — Get player penalty stats
- `lega-seriea-pp-cli football get-football-74` — Get kpi action summary
- `lega-seriea-pp-cli football get-football-75` — Get heatmap stats
- `lega-seriea-pp-cli football get-football-76` — Get player stats by id
- `lega-seriea-pp-cli football get-football-77` — Get match heatmap data
- `lega-seriea-pp-cli football get-football-78` — Get match heatmap files
- `lega-seriea-pp-cli football get-football-79` — Get last five matches player expected goal ranking
- `lega-seriea-pp-cli football get-football-8` — Get player profile by season
- `lega-seriea-pp-cli football get-football-80` — Get team expected goal ranking
- `lega-seriea-pp-cli football get-football-81` — Get season player expected goal ranking
- `lega-seriea-pp-cli football get-football-82` — Get season team expected goal ranking
- `lega-seriea-pp-cli football get-football-83` — Get match player heatmap data
- `lega-seriea-pp-cli football get-football-84` — Get match tracking heatmap stats
- `lega-seriea-pp-cli football get-football-9` — Get player multi season stats


### Finding the right command

When you know what you want to do but not which command does it, ask the CLI directly:

```bash
lega-seriea-pp-cli which "<capability in your own words>"
```

`which` resolves a natural-language capability query to the best matching command from this CLI's curated feature index. Exit code `0` means at least one match; exit code `2` means no confident match — fall back to `--help` or use a narrower query.

## Recipes


### Get today's match results

```bash
lega-seriea-pp-cli matches --live --json
```

Returns all in-progress and recently-finished matches with scores and goalscorer info.

### Top scorers with goals and assists

```bash
lega-seriea-pp-cli scorers --json --select players.name,players.goals,players.assists,players.team
```

Compact leaderboard using --select to extract only key fields from the verbose stats payload.

### Full match analysis

```bash
lega-seriea-pp-cli match facts serie-a::Football_Match::840c647126df44c98ae44cdd46e05bb1 --json
```

Match facts, lineups, shot map, and VAR events for a specific match ID.

### Team form over last 5 games

```bash
lega-seriea-pp-cli form --team napoli --last 5 --agent
```

Combines results, xG, and KPI across last 5 matches into one structured view.

### Title race at current matchday

```bash
lega-seriea-pp-cli title-race --agent
```

Projects which teams can still win the Scudetto based on remaining fixtures and current standings.

## Auth Setup

No authentication required.

Run `lega-seriea-pp-cli doctor` to verify setup.

## Agent Mode

Add `--agent` to any command. Expands to: `--json --compact --no-input --no-color --yes`.

- **Pipeable** — JSON on stdout, errors on stderr
- **Filterable** — `--select` keeps a subset of fields. Dotted paths descend into nested structures; arrays traverse element-wise. Critical for keeping context small on verbose APIs:

  ```bash
  lega-seriea-pp-cli lega-seriea-pp-cli-health --agent --select id,name,status
  ```
- **Previewable** — `--dry-run` shows the request without sending
- **Offline-friendly** — sync/search commands can use the local SQLite store when available
- **Non-interactive** — never prompts, every input is a flag
- **Read-only** — do not use this CLI for create, update, delete, publish, comment, upvote, invite, order, send, or other mutating requests

### Response envelope

Commands that read from the local store or the API wrap output in a provenance envelope:

```json
{
  "meta": {"source": "live" | "local", "synced_at": "...", "reason": "..."},
  "results": <data>
}
```

Parse `.results` for data and `.meta.source` to know whether it's live or local. A human-readable `N results (live)` summary is printed to stderr only when stdout is a terminal AND no machine-format flag (`--json`, `--csv`, `--compact`, `--quiet`, `--plain`, `--select`) is set — piped/agent consumers and explicit-format runs get pure JSON on stdout.

## Agent Feedback

When you (or the agent) notice something off about this CLI, record it:

```
lega-seriea-pp-cli feedback "the --since flag is inclusive but docs say exclusive"
lega-seriea-pp-cli feedback --stdin < notes.txt
lega-seriea-pp-cli feedback list --json --limit 10
```

Entries are stored locally at `~/.lega-seriea-pp-cli/feedback.jsonl`. They are never POSTed unless `DELTATRE_SPORT_DATA_FEEDBACK_ENDPOINT` is set AND either `--send` is passed or `DELTATRE_SPORT_DATA_FEEDBACK_AUTO_SEND=true`. Default behavior is local-only.

Write what *surprised* you, not a bug report. Short, specific, one line: that is the part that compounds.

## Output Delivery

Every command accepts `--deliver <sink>`. The output goes to the named sink in addition to (or instead of) stdout, so agents can route command results without hand-piping. Three sinks are supported:

| Sink | Effect |
|------|--------|
| `stdout` | Default; write to stdout only |
| `file:<path>` | Atomically write output to `<path>` (tmp + rename) |
| `webhook:<url>` | POST the output body to the URL (`application/json` or `application/x-ndjson` when `--compact`) |

Unknown schemes are refused with a structured error naming the supported set. Webhook failures return non-zero and log the URL + HTTP status on stderr.

## Named Profiles

A profile is a saved set of flag values, reused across invocations. Use it when a scheduled agent calls the same command every run with the same configuration - HeyGen's "Beacon" pattern.

```
lega-seriea-pp-cli profile save briefing --json
lega-seriea-pp-cli --profile briefing lega-seriea-pp-cli-health
lega-seriea-pp-cli profile list --json
lega-seriea-pp-cli profile show briefing
lega-seriea-pp-cli profile delete briefing --yes
```

Explicit flags always win over profile values; profile values win over defaults. `agent-context` lists all available profiles under `available_profiles` so introspecting agents discover them at runtime.

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 2 | Usage error (wrong arguments) |
| 3 | Resource not found |
| 5 | API error (upstream issue) |
| 7 | Rate limited (wait and retry) |
| 10 | Config error |

## Argument Parsing

Parse `$ARGUMENTS`:

1. **Empty, `help`, or `--help`** → show `lega-seriea-pp-cli --help` output
2. **Starts with `install`** → ends with `mcp` → MCP installation; otherwise → see Prerequisites above
3. **Anything else** → Direct Use (execute as CLI command with `--agent`)

## MCP Server Installation

Install the MCP binary from this CLI's published public-library entry or pre-built release, then register it:

```bash
claude mcp add lega-seriea-pp-mcp -- lega-seriea-pp-mcp
```

Verify: `claude mcp list`

## Direct Use

1. Check if installed: `which lega-seriea-pp-cli`
   If not found, offer to install (see Prerequisites at the top of this skill).
2. Match the user query to the best command from the Unique Capabilities and Command Reference above.
3. Execute with the `--agent` flag:
   ```bash
   lega-seriea-pp-cli <command> [subcommand] [args] --agent
   ```
4. If ambiguous, drill into subcommand help: `lega-seriea-pp-cli <command> --help`.
