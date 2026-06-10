---
name: memskill-evolving
description: Meta-memory skill that learns HOW to remember, not what to remember. Uses MemSkill framework concepts to evolve memory strategies through task feedback. Captures what kinds of memory to extract, how to focus, and what to preserve or forget — enabling self-improving agent memory.
---

# MemSkill — Self-Evolving Memory Skills

## Overview

MemSkill is a framework for learning and evolving memory skills for long-horizon agents. It replaces static, hand-designed memory operations with a data-driven loop where skills are learned, refined, and reused from task feedback.

**Key Insight:** The skills evolved are NOT experiential memory themselves. They are **meta-memory** that focuses on:
- What kinds of memory to extract
- How to remember and where to focus
- What to preserve or forget

This is why they are called *memory skills* — they capture the **way/skill of remembering**, not the remembered content itself.

## Core Architecture

### Three Components

1. **Controller** — Selects which skills to apply per context span
2. **Executor** — Applies selected skills to construct memory
3. **Designer** — Mines hard cases to refine/propose new skills

### The Loop

```
Task Feedback → Hard Case Mining → Skill Refinement → Better Memory → Better Task Performance
```

## Principles for Self-Evolving Memory

### 1. Skill-Conditioned Memory Construction

Compose a small set of relevant skills for each span and construct memories in one pass:

```
[context span] → Controller selects top-K skills → Executor builds memory
```

### 2. Skill Evolution from Hard Cases

Periodically mine challenging examples to:
- Refine existing skills that underperform
- Propose new skills for uncovered patterns
- Prune skills with high harmful-to-helpful ratios

### 3. Reusable Skill Bank

Maintain a shared, evolving bank that supports transfer across tasks:

```
Skill Bank:
├── [skill-001] Extract temporal relationships → helpful=12 harmful=1
├── [skill-002] Track entity state changes   → helpful=8  harmful=0
├── [skill-003] Identify causal chains       → helpful=15 harmful=2
└── [skill-004] Preserve numerical details   → helpful=6  harmful=3
```

## Applying MemSkill Patterns to Agent Work

### Pattern: Strategy Accumulation

When completing tasks, capture what worked as evolving strategies:

```markdown
## STRATEGIES
[str-001] helpful=5 harmful=0 :: When parsing compliance docs, extract control IDs first
[str-002] helpful=3 harmful=1 :: Group related controls by domain before mapping
```

### Pattern: Failure-Driven Evolution

After task failures, mine the failure for new skills:

1. Identify what went wrong
2. Check if existing skills should have prevented it
3. If yes → increment harmful counter on that skill
4. If no → propose new skill to cover the gap

### Pattern: Incremental Delta Updates

Don't rewrite entire memory — apply localized edits:

```
BEFORE: [str-001] helpful=3 :: Extract control IDs from headers
AFTER:  [str-001] helpful=3 :: Extract control IDs from headers AND inline references
```

### Pattern: Helpful/Harmful Counters

Track skill effectiveness with counters:
- **helpful**: Times the skill led to correct outcomes
- **harmful**: Times the skill led to errors or confusion
- **Prune threshold**: Remove skills where `harmful / (helpful + harmful) > 0.4`

## Session Integration

### After Each Task

1. Record outcome (success/failure)
2. Note which strategies were applied
3. Update helpful/harmful counters
4. If failure → add to hard case pool

### Periodic Evolution (Every N Tasks)

1. Review hard case pool
2. For each hard case:
   - Did existing skills apply? → Update counters
   - Gap identified? → Propose new skill
3. Prune low-performing skills
4. Save updated skill bank

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `action_top_k` | Skills selected per step | 3 |
| `designer_freq` | Evolve every N tasks | 5 |
| `designer_max_changes` | Max changes per evolution cycle | 3 |
| `prune_threshold` | Harmful ratio to trigger removal | 0.4 |
| `min_observations` | Min uses before pruning eligible | 5 |

## Reference

- Paper: [MemSkill: Learning and Evolving Memory Skills](https://arxiv.org/abs/2602.02474)
- Code: [github.com/ViktorAxelsen/MemSkill](https://github.com/ViktorAxelsen/MemSkill)
- Weights: [HuggingFace collection](https://huggingface.co/collections/XaiverZ/memskill)
