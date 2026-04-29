# ACE Integration Roadmap For Continuous Improvement

Date: 2026-04-29

This roadmap translates practical patterns from the ACE repository (Generator/Reflector/Curator loop, strict structured output, delta updates, and failure logging) into the GRC Agent architecture.

## Observed ACE Patterns To Reuse

From the `ace-agent/ace` repository, the most relevant patterns for this platform are:

1. Three-role loop:
- Generator creates an answer
- Reflector diagnoses what was helpful/harmful
- Curator performs targeted incremental updates

2. Strict structured outputs:
- JSON-only response schemas for machine-safe post-processing

3. Incremental deltas instead of full rewrites:
- Additive updates preserve prior institutional knowledge and reduce context drift

4. Failure-aware logging:
- Parse failures and empty-response failures are captured as explicit artifacts

5. Feedback counters:
- Helpful/harmful counters provide reinforcement signals for later curation

## Mapping To GRC Agent

### Current Implementation Added In This Revision

- `ImprovementPlaybookService` captures runtime-error and documentation-gap lessons as reusable insights
- Insight feedback endpoint allows helpful/harmful reinforcement
- `DocumentationGapService` emits structured uncovered-control findings
- Error middleware writes unhandled errors into the improvement stream

### Recommended Next-Phase Enhancements

1. Generator phase extension:
- During policy/procedure generation, include relevant improvement insights as retrieval context

2. Reflector phase extension:
- After policy gap analysis, auto-score generated content quality against prior failure patterns

3. Curator phase extension:
- Apply structured delta updates to a persistent recommendation playbook keyed by framework and control families

4. Confidence and rollback:
- Keep versioned snapshots of recommendation playbooks and support rollback if harmful feedback rises

5. Evaluation runner:
- Add scheduled batch evaluation using representative policy/procedure corpora and compare recommendation quality trends

## Suggested Data Model Evolution

Add these optional fields to future improvement insights:

- `confidence`: numeric confidence score
- `appliedCount`: number of times used in generation
- `outcomeMetrics`: success/failure rates after application
- `supersedes`: links to obsolete insight IDs

## Operational Loop Proposal

1. Ingest client artifacts
2. Generate or refine policy/procedure
3. Run gap analysis and documentation coverage analysis
4. Capture insights for recurring misses and runtime faults
5. Reinforce insights with user feedback (helpful/harmful)
6. Use high-performing insights first in future generations

## Guardrails

- Keep all generated curation updates schema-validated before persistence
- Tag each insight with framework/control context for traceability
- Never overwrite prior insights blindly; use append-only deltas with versioning
- Treat repeated harmful insights as candidates for quarantine and review
