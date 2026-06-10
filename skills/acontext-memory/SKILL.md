---
name: acontext-memory
description: Agent skill memory layer using Acontext. Captures learnings from agent runs, stores them as reusable skill files, and retrieves them on subsequent runs. Use when persisting agent knowledge, capturing session learnings, or evolving skills over time.
---

# Acontext — Agent Skills as a Memory Layer

## Overview

Acontext is a skill memory layer for AI agents. It automatically captures learnings from agent runs and stores them as agent skill files — Markdown files you can read, edit, and share across agents, LLMs, and frameworks.

**Philosophy:**
- Plain file, any framework — Skills are Markdown. No embeddings, no API lock-in.
- Progressive disclosure — Agent uses `get_skill` to fetch what it needs by reasoning, not semantic top-k.
- Download as ZIP, reuse anywhere — No vendor lock-in.

## Installation

### 1. Install CLI

```bash
curl -fsSL https://install.acontext.io | sh
```

For system-wide:
```bash
curl -fsSL https://install.acontext.io | sh -s -- --system
```

### 2. Login

```bash
acontext login
```

- Interactive terminal: Opens browser for OAuth
- Non-interactive (CI/agent): Prints URL, then run `acontext login --poll`

### 3. Project Setup

```bash
# List projects
acontext dash projects list

# Create new project
acontext dash projects create --name <project-name> --org <org-id>

# Select existing project
acontext dash projects select --project <project-id> --api-key <sk-ac-...>

# Verify connectivity
acontext dash ping
```

## SDK Usage (Python)

```bash
pip install acontext
```

```python
import os
from acontext import AcontextClient

client = AcontextClient(
    api_key=os.getenv("ACONTEXT_API_KEY"),
)

# Create a learning space and session
space = client.learning_spaces.create()
session = client.sessions.create()
client.learning_spaces.learn(space.id, session_id=session.id)

# Store messages from agent run
client.sessions.store_message(session.id, blob={"role": "user", "content": "..."})
client.sessions.store_message(session.id, blob={"role": "assistant", "content": "..."})

# Wait for learning and list skills
client.learning_spaces.wait_for_learning(space.id, session_id=session.id)
skills = client.learning_spaces.list_skills(space.id)

# Download skills locally
for skill in skills:
    client.skills.download(skill_id=skill.id, path=f"./skills/{skill.name}")
```

## SDK Usage (TypeScript)

```bash
npm install @acontext/acontext
```

## CLI Skill Commands

| Command | Description |
|---------|-------------|
| `acontext skill upload <directory>` | Upload a local skill directory |

```bash
acontext skill upload ./my-skill-dir
acontext skill upload ./my-skill-dir --user alice@example.com
acontext skill upload ./my-skill-dir --api-key sk-ac-xxx
```

The directory must contain a `SKILL.md` with name and description in YAML front-matter.

## Agent Tools (MCP)

| Tool | Description |
|------|-------------|
| `acontext_search_skills` | Search through skill files by keyword |
| `acontext_get_skill` | Read the content of a specific skill file |
| `acontext_session_history` | Get task summaries from recent past sessions |
| `acontext_stats` | Show memory statistics |
| `acontext_learn_now` | Trigger skill learning from current session |

## Configuration (Environment Variables)

| Env Var | Default | Description |
|---------|---------|-------------|
| `ACONTEXT_USER_IDENTIFIER` | `"claude_code"` | User identifier |
| `ACONTEXT_BASE_URL` | `https://api.acontext.app/api/v1` | API base URL |
| `ACONTEXT_LEARNING_SPACE_ID` | auto-created | Explicit Learning Space ID |
| `ACONTEXT_SKILLS_DIR` | `~/.claude/skills` | Where skills are synced |
| `ACONTEXT_AUTO_CAPTURE` | `true` | Store messages after each turn |
| `ACONTEXT_AUTO_LEARN` | `true` | Trigger distillation after sessions |
| `ACONTEXT_MIN_TURNS_FOR_LEARN` | `4` | Min turns before auto-learn |

## Troubleshooting

- **"command not found: acontext"** — Restart shell or `source ~/.bashrc`
- **Login fails** — Ensure internet access; in non-TTY use `acontext login --poll`
- **401 Unauthorized** — Run `acontext dash ping`; re-select project if needed
- **No projects found** — `acontext dash projects create --name my-project --org <org-id>`
