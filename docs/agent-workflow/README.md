# How I work with AI agents

AI agents alone do not produce reliable, scalable, or secure code. They become reliable when you define the rules, constraints, tools, and verification gates they work under. This folder documents the setup I use, curated: the working configuration lives in my local environment; this is the engineering behind it.

## The cycle

Standard software engineering practices, applied to agent work:

| Phase | Practice | Gate |
|---|---|---|
| **DEFINE** | Requirements elicitation: interview until goal, non-goals, and acceptance criteria are written | Confirmed design doc |
| **PLAN** | Change control: the agent plans in plan mode, where the harness blocks file writes | Explicit human approval |
| **BUILD** | Execute the approved plan, nothing else | Plan completed |
| **VERIFY** | Quality gate: run real checks, record commands and outputs | Evidence, or no claim of done |
| **SHIP** | Audit trail: append the facts to a log; the human runs git | Log entry |

Two rules carry the system:

- **Evidence before claims.** "It works" only counts next to the command that proves it.
- **The human owns state.** No agent-run git, deploys, or account changes. The agent prepares exact commands; I execute them.

## Least privilege, by design

Agent autonomy has to be proportional to the verification behind it. Teams that merge thousands of agent PRs have tests, CI, branch protection, and review on every one. This is a solo setup without that infrastructure yet, so the gates are manual on purpose. Each limit has a defined exit:

| Limit today | Unlocked by |
|---|---|
| Human runs all git | Branch protection + CI on every push |
| No agent-opened PRs | A test suite CI can run per PR |
| No agent deploys | Preview deploys with automated smoke checks |
| No subagents by default | Orchestration proven on low-risk tasks first |

## Tooling

- **Harness:** [Claude Code](https://claude.com/claude-code), [OpenCode](https://opencode.ai).
- **MCP servers per project, never by default.** Here: chrome-devtools (Lighthouse, performance traces, mobile emulation), isolated profile. Other projects: Supabase, n8n, GA4. Each server is an attack surface and has to justify itself.
- **Skills: a pruned set.** Process skills from superpowers, cycle skills adapted from agent-skills. Catalogs are never installed wholesale.

## Sources

Adapted with criteria, not copied:

- [obra/superpowers](https://github.com/obra/superpowers): process backbone (TDD, systematic debugging, verification discipline). Installed as a plugin.
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills): the Define-to-Ship structure. Curated subset only.
- [pstack](https://github.com/cursor/plugins/tree/main/pstack): studied as a reference standard. Not installed; it targets the Cursor harness.

What none of these provide is project-specific rules with numbers. That is the point of [`CLAUDE.example.md`](./CLAUDE.example.md): the curated rules file for this repository, performance budget included.
