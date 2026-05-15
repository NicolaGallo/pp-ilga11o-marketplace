#!/usr/bin/env node
// pp-ilga11o-marketplace — installer
//
// Local clone:  node bin/install.js
// curl|bash:    delegated from install.sh → npx -y github:NicolaGallo/pp-ilga11o-marketplace

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const child_process = require('child_process');

const REPO = 'NicolaGallo/pp-ilga11o-marketplace';
const PLUGIN_NAME = 'pp-lega-seriea';
const MARKETPLACE_NAME = 'pp-ilga11o-marketplace';

const AGENT_FILES = [
  'serie-a-analyst.md',
  'serie-a-scout.md',
  'serie-a-reporter.md',
  'serie-a-predictor.md',
];

// ── Utils ──────────────────────────────────────────────────────────────────

function hasCmd(cmd) {
  try {
    const which = process.platform === 'win32' ? 'where' : 'which';
    child_process.execSync(`${which} ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

function run(cmd, args, dryRun) {
  if (dryRun) { console.log(`  [dry-run] ${cmd} ${args.join(' ')}`); return 0; }
  const r = child_process.spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  return r.status || 0;
}

function capture(cmd, args) {
  const r = child_process.spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'ignore'], shell: process.platform === 'win32' });
  return (r.stdout || '').toString();
}

function ok(msg)   { console.log(`  ✓ ${msg}`); }
function fail(msg) { console.error(`  ✗ ${msg}`); }
function note(msg) { console.log(`  · ${msg}`); }

// ── Args ───────────────────────────────────────────────────────────────────

const args = process.argv.slice(2).filter(a => a !== '--');
const dryRun    = args.includes('--dry-run');
const force     = args.includes('--force');
const uninstall = args.includes('--uninstall') || args.includes('-u');
const help      = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`
pp-ilga11o-marketplace installer

  node bin/install.js [flags]

Flags:
  --dry-run     Show what would happen without doing it
  --force       Overwrite existing files
  --uninstall   Remove installed files
  -h, --help    Show this help

Install via curl:
  curl -fsSL https://raw.githubusercontent.com/${REPO}/main/install.sh | bash
`);
  process.exit(0);
}

// ── Paths ──────────────────────────────────────────────────────────────────

const configDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const agentsDir = path.join(configDir, 'agents');
const repoRoot  = path.resolve(__dirname, '..');

// ── Uninstall ──────────────────────────────────────────────────────────────

if (uninstall) {
  console.log('Uninstalling pp-ilga11o-marketplace...\n');

  if (hasCmd('claude')) {
    const installed = capture('claude', ['plugin', 'list']);
    if (installed.includes(PLUGIN_NAME)) {
      run('claude', ['plugin', 'uninstall', `${PLUGIN_NAME}@${MARKETPLACE_NAME}`], dryRun);
      ok(`removed claude plugin ${PLUGIN_NAME}`);
    } else {
      note('claude plugin not installed — skipping');
    }
  }

  for (const f of AGENT_FILES) {
    const dest = path.join(agentsDir, f);
    if (fs.existsSync(dest)) {
      if (!dryRun) fs.unlinkSync(dest);
      ok(`removed agent ${f}`);
    }
  }

  console.log('\nDone.');
  process.exit(0);
}

// ── Install ────────────────────────────────────────────────────────────────

console.log('Installing pp-ilga11o-marketplace...\n');

let anyFailed = false;

// 1. Claude Code plugin
if (hasCmd('claude')) {
  console.log('→ Claude Code detected');

  const installed = capture('claude', ['plugin', 'list']);
  if (installed.includes(PLUGIN_NAME) && !force) {
    note(`plugin ${PLUGIN_NAME} already installed (--force to reinstall)`);
  } else {
    const r1 = run('claude', ['plugin', 'marketplace', 'add', REPO], dryRun);
    const r2 = run('claude', ['plugin', 'install', `${PLUGIN_NAME}@${MARKETPLACE_NAME}`], dryRun);
    if (r1 === 0 && r2 === 0) ok(`installed skill ${PLUGIN_NAME}`);
    else { fail(`claude plugin install failed`); anyFailed = true; }
  }
} else {
  fail('claude not found in PATH — skill not installed');
  note('install Claude Code: https://claude.ai/code');
  anyFailed = true;
}

// 2. Agents → ~/.claude/agents/
console.log('\n→ Installing agents');
const agentSrcDir = path.join(repoRoot, 'agents');

if (!fs.existsSync(agentSrcDir)) {
  fail(`agents dir not found at ${agentSrcDir} — skipping`);
  anyFailed = true;
} else {
  if (!dryRun) fs.mkdirSync(agentsDir, { recursive: true });

  for (const f of AGENT_FILES) {
    const src  = path.join(agentSrcDir, f);
    const dest = path.join(agentsDir, f);
    if (!fs.existsSync(src)) { fail(`agent ${f} not found — skipping`); continue; }
    if (fs.existsSync(dest) && !force) { note(`skipped ${f} (exists; --force to overwrite)`); continue; }
    if (!dryRun) fs.copyFileSync(src, dest);
    ok(`installed agent ${f} → ${dest}`);
  }
}

// ── Done ───────────────────────────────────────────────────────────────────

console.log('');
if (anyFailed) {
  console.log('Done (with errors). Re-run after fixing issues above.');
  process.exit(1);
} else {
  console.log('Done.');
  console.log('');
  console.log('Skill:  /pp-lega-seriea in Claude Code');
  console.log('Agents: serie-a-analyst, serie-a-scout, serie-a-reporter, serie-a-predictor');
}
