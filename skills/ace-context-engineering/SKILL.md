---
name: ace-context-engineering
description: Evolve agent contexts through Agentic Context Engineering (ACE). Uses a Generator-Reflector-Curator loop to accumulate, refine, and organize strategies as structured playbooks. Apply this to continually learn from GRC analysis tasks and improve over time without fine-tuning.
---

# ACE — Agentic Context Engineering

## Overview

ACE enables language models to self-improve by treating contexts as **evolving playbooks** that accumulate, refine, and organize strategies through generation, reflection, and curation. Unlike approaches that suffer from brevity bias and context collapse, ACE introduces structured, incremental updates guided by a grow-and-refine principle.

## Three-Role Architecture

### 1. Generator
Produces reasoning trajectories for new queries, surfacing both effective strategies and recurring pitfalls.

### 2. Reflector
Separates evaluation and insight extraction from curation. Evaluates outcomes, identifies what worked/failed, and extracts insights.

### 3. Curator
Converts lessons into structured **delta updates** with helpful/harmful counters, using deterministic merging with de-duplication and pruning.

This design prevents **context collapse** — where iterative rewriting erodes details over time.

## Playbook Format

The evolved context (playbook) follows this structure:

```markdown
## STRATEGIES & INSIGHTS
[str-00001] helpful=5 harmful=0 :: Always verify data types before processing
[str-00002] helpful=3 harmful=1 :: Consider edge cases in financial data

## FORMULAS & CALCULATIONS
[cal-00003] helpful=8 harmful=0 :: NPV = Σ(Cash Flow / (1+r)^t)

## COMMON MISTAKES TO AVOID
[mis-00004] helpful=6 harmful=0 :: Don't forget timezone conversions

## DOMAIN PATTERNS
[pat-00005] helpful=4 harmful=0 :: NIST controls often cross-reference multiple families
```

Each bullet has:
- **ID**: `[section_slug-00000]` for tracking
- **Counts**: `helpful=X harmful=Y` updated by Reflector
- **Content**: `:: actual advice or strategy`

## The ACE Loop Applied to GRC Analysis

### Step 1: Generate
Run the GRC analysis task (e.g., assess a framework, map controls, review a policy).

### Step 2: Reflect
After completion, evaluate:
- Did the mapping correctly identify all relevant controls?
- Were there false positives or missed gaps?
- What domain knowledge helped or was missing?

### Step 3: Curate
Apply structured delta updates to the playbook:

```
ADD [str-00006] helpful=1 harmful=0 :: When mapping HIPAA to CSF, check both technical and administrative safeguards
INCREMENT [str-00001] helpful  :: (Strategy was used and succeeded)
INCREMENT [str-00002] harmful  :: (Strategy was used but led to wrong mapping)
PRUNE [mis-00004]              :: (harmful/total > 0.4 after 10+ observations)
```

## Incremental Delta Updates

**Key principle**: Never rewrite the full playbook. Apply localized edits:

| Operation | When | Example |
|-----------|------|---------|
| ADD | New insight discovered | `[str-new] helpful=1 :: ...` |
| INCREMENT helpful | Strategy led to success | `helpful=5 → helpful=6` |
| INCREMENT harmful | Strategy caused error | `harmful=1 → harmful=2` |
| MERGE | Two bullets overlap | Combine, sum counters |
| PRUNE | `harmful/(helpful+harmful) > threshold` | Remove bullet |
| REFINE | Partial success, needs nuance | Edit content, reset counters |

## Practical Usage for Quisitive GRC

### Initialize a GRC Playbook

```markdown
## FRAMEWORK MAPPING STRATEGIES
[str-00001] helpful=0 harmful=0 :: Start with NIST CSF 2.0 functions as the universal taxonomy
[str-00002] helpful=0 harmful=0 :: Map CIS Controls via Implementation Groups for maturity staging

## CONTROL ASSESSMENT PATTERNS
[pat-00001] helpful=0 harmful=0 :: Cross-reference control families across frameworks before declaring coverage
[pat-00002] helpful=0 harmful=0 :: A single document can satisfy multiple controls if it addresses all required elements

## COMMON MISTAKES TO AVOID
[mis-00001] helpful=0 harmful=0 :: Don't assume a control is covered just because a related policy exists — verify specificity
[mis-00002] helpful=0 harmful=0 :: Don't conflate organizational controls with technical controls in maturity scoring
```

### After Each Analysis Session

1. **Record outcomes**: Which assessments were accurate vs. corrected
2. **Reflect**: What strategies applied, what was missing
3. **Curate**: Apply delta updates to the GRC playbook
4. **Persist**: Save updated playbook for next session

### Evolution Triggers

- Every 5 completed GRC tasks → Run full playbook review
- After client correction → Immediate delta update
- Monthly → Prune bullets with < 2 helpful uses

## Configuration

| Parameter | Recommended | Description |
|-----------|-------------|-------------|
| `curator_frequency` | 1 (every task) | How often to curate |
| `playbook_token_budget` | 80000 | Max playbook size |
| `prune_threshold` | 0.4 | Harmful ratio to remove |
| `min_observations` | 5 | Min uses before pruning |

## Modes

- **Offline**: Train on historical assessments, build initial playbook
- **Online**: Evolve playbook during live client work
- **Eval-only**: Test playbook quality without modification

## Reference

- Paper: [Agentic Context Engineering](https://arxiv.org/abs/2510.04618)
- Code: [github.com/ace-agent/ace](https://github.com/ace-agent/ace)
- Blog: [Medium article](https://medium.com/@bingqian/agentic-context-engineering-teaching-language-models-to-learn-from-experience-706c31a872ca)
