# Prototype 1 Report

## Scope
- Repaired the Day 11 scene into one shared canvas with four continuous strata.
- Removed the separate results column and kept evidence in the same spatial field as the explanatory structure.
- Added a static review mode at `?state=final&review=static`.

## Files Changed
- `app/prototype1.tsx`
- `app/globals.css`
- `app/layout.tsx`

## Visual Notes
- The structure now renders as one central scene body instead of a card-and-sidebar layout.
- Four strata are present in the final state and in static review.
- Evidence 5-8 remain in the same canvas as the body, with replication lag visible in the open field.
- The claimed boundary contracts in the final state.

## Validation
- `npm run lint` passed.
- `npm run build` passed.
- Local browser capture completed on `http://127.0.0.1:3049`.

## Remaining Risk
- The capture process uses Chromium through the global Playwright CLI rather than a project-local test runner.
