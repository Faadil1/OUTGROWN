# OUTGROWN — Technical Interaction Spike

A reasoning instrument for recognizing when an explanation remains supported but no longer accounts for the full incident.

## Memory Hook

**"The evidence outgrew the explanation."**

Teams believe they understand an incident. This spike lets them test whether their explanation accounts for all the evidence.

## Core Interaction

**Three states:**

1. **Before Commitment** — User sees hypothesis, supporting observations, and a testable prediction
2. **Evidence Reveal** — User commits; post-rollback evidence appears progressively (3.5 seconds)
3. **Final State** — Hypothesis status changes to SUPPORTED + INSUFFICIENT; investigation reopens

**The signature moment:** User commits to a prediction, evidence appears that partially matches and partially diverges, the hypothesis loses its claim to completeness without disappearing.

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000` (or uses next available port).

## Build & Lint

```bash
npm run lint    # TypeScript + ESLint
npm run build   # Production build
npm run dev     # Development server
```

## Current Status

**Technical Spike:** ✓ Complete  
**Interaction Flow:** ✓ Verified (code-level)  
**Visual Direction:** Not final — awaiting design review  

## Limitations

- Single fixed scenario (database degradation incident)
- No dark mode toggle (system preference only)
- No multi-incident comparison
- No backend (static only)
- No export/sharing (spike scope)

## Review Controls

Open the "Review controls" section at the bottom of the page to:
- See current state
- Access deterministic state links (before | reveal | final)

## Important

This is a technical spike for interaction logic, not the final visual design. The epistemic logic and information architecture are locked; visual refinement is pending.

## Deploy

Deployed to Vercel (preview URL in progress).

## Causal Integrity

All 11 epistemic risks from the product design are mitigated in this spike:
- No correlation presented as causation
- No new cause revealed
- No proof language
- No blame or false relief
- Investigation remains intentionally open


