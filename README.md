# OUTGROWN â€” Technical Interaction Spike

A reasoning instrument for recognizing when an explanation remains supported but no longer accounts for the full incident.

## Memory Hook

**"The evidence outgrew the explanation."**

Teams believe they understand an incident. OUTGROWN lets them test whether their explanation accounts for all the evidence.

## Core Interaction

**Three states:**

1. **Before Commitment** â€” User sees hypothesis, supporting observations, and a testable prediction
2. **Evidence Reveal** â€” User commits; post-rollback evidence appears progressively (3.5 seconds)
3. **Final State** â€” Hypothesis status changes to SUPPORTED + INSUFFICIENT; investigation reopens

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

**Technical Spike:** âœ“ Complete  
**Interaction Flow:** âœ“ Verified (code-level)  
**Visual Direction:** Not final â€” awaiting design review  

## Limitations

- Single fixed scenario (database degradation incident)
- No dark mode toggle (system preference only)
- No multi-incident comparison
- No backend (static only)
- No export/sharing (scope);

## Review Controls

Open the "Review controls" section at the bottom of the page to:
- See current state
- Access deterministic state links (before | reveal | final)

## Important

OUTGROWN is an instrument for testing explanatory sufficiency. The epistemic logic and information architecture are locked; the product presentation is normalized.

## Deploy

Deployed to Vercel (preview URL in progress).

## Causal Integrity

All 11 epistemic risks from the product design are mitigated in this product:
- No correlation presented as causation
- No new cause revealed
- No proof language
- No blame or false relief
- Investigation remains intentionally open




