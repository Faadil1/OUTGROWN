# Causal Integrity Checklist for Spike

## Pre-Implementation Verification

All 11 epistemic risks identified in Day 11 design must be verified in the spike.

---

## Risk 1: Correlation Presented as Causation

**Requirement:** Hypothesis uses "explains," not "caused"

- [x] Copy says "explains the degradation," not "causes"
- [x] No causal arrows in UI (no → symbols)
- [x] Prediction is locked before observation (prevents retroactive reasoning)
- [x] Test reveals whether prediction held

**Status:** MITIGATED

---

## Risk 2: Chronology Presented as Proof

**Requirement:** No claims of proof; timeline is context

- [x] No word "proof" or "proves" anywhere
- [x] No dismissal of later events as "secondary"
- [x] Unresolved observations remain visible
- [x] Status never becomes "ROOT CAUSE FOUND"
- [x] Investigation remains OPEN

**Status:** MITIGATED

---

## Risk 3: Prediction Written After Evidence Is Known

**Requirement:** Prediction is user-authored, locked, irreversible

- [x] Prediction text is visible before commitment
- [x] User clicks "Commit & test prediction" (explicit action)
- [x] Prediction is locked (button becomes disabled)
- [x] Lock is irreversible (cannot edit after)
- [x] Evidence only appears after lock

**Status:** MITIGATED

---

## Risk 4: Partial Contradiction Treated as Total Falsification

**Requirement:** Status shows both SUPPORTED and INSUFFICIENT

- [x] Status badge shows: ◐ SUPPORTED + INSUFFICIENT
- [x] Hypothesis remains dark and solid (not faded, not red)
- [x] Supporting evidence remains visually connected
- [x] Unresolved evidence is separate group
- [x] Copy says "part of the incident" (not "was wrong")

**Status:** MITIGATED

---

## Risk 5: Rollback Treated as Perfect Experiment

**Requirement:** Recovery expectations are realistic

- [x] Prediction says "recovery consistent with this mechanism" (not instant)
- [x] Replication lag recovery time is acknowledged as slow
- [x] No assumption that post-rollback = clean baseline
- [x] No phrase "unrelated to the deployment"
- [x] Unresolved observations not labeled "definitely different cause"

**Status:** MITIGATED

---

## Risk 6: Visual Prominence Treated as Truth

**Requirement:** Hierarchy reflects epistemic priority, not truth

- [x] Hypothesis is prominent because it's being tested
- [x] Unresolved observations are equally prominent as supporting evidence
- [x] Copy says "team claim, not system fact"
- [x] Status badge change is visible and prominent
- [x] No visual hierarchy implying truth

**Status:** MITIGATED

---

## Risk 7: Individual Blame

**Requirement:** Hypothesis framed as team reasoning

- [x] No "you failed," "you missed," "you overlooked"
- [x] Copy uses neutral language
- [x] No comparison to "what the system knows"
- [x] Prediction step makes reasoning transparent
- [x] Unresolved observations presented as new information

**Status:** MITIGATED

---

## Risk 8: False Relief

**Requirement:** Investigation remains visibly open

- [x] Final status is OPEN INVESTIGATION (not RESOLVED)
- [x] No language suggesting "mostly done"
- [x] Unresolved observations are prominent
- [x] Next action is "Reopen the investigation"
- [x] Message says "remain unresolved"

**Status:** MITIGATED

---

## Risk 9: Hidden Uncertainty

**Requirement:** Prediction includes explicit uncertainty

- [x] Prediction says "consistent with this mechanism" (not exact)
- [x] Evidence shown as observations (not certainties)
- [x] Copy uses "should," "suggests," "consistent with"
- [x] No phrase "the system knows"
- [x] Unresolved observations labeled UNEXPLAINED

**Status:** MITIGATED

---

## Risk 10: Unexplained Evidence Disappearing

**Requirement:** Unresolved observations remain visible

- [x] Unresolved section is visible in final state
- [x] Each observation has its own card
- [x] Investigation status is visible
- [x] Next steps include "reopen the investigation"
- [x] User cannot dismiss unresolved observations

**Status:** MITIGATED

---

## Risk 11: A New Cause Being Implied

**Requirement:** System does not suggest a new cause

- [x] No "Suggested causes" section appears
- [x] No pattern matching or historical comparison
- [x] Copy does not link unresolved observations to each other
- [x] Final action is "Reopen the investigation" (user chooses)
- [x] No "true cause" revealed

**Status:** MITIGATED

---

## Spike-Specific Verifications

### Motion Design

- [x] Evidence emerges progressively (not all at once)
- [x] Matched evidence settles visually
- [x] Divergence evidence approaches but doesn't attach
- [x] Status transition is smooth (not jarring)
- [x] No explosions, shattering, or dramatic reveals

### Accessibility

- [x] Keyboard navigation works (Tab, Enter)
- [x] Reduced motion removes all animations
- [x] Screen reader gets live region announcement
- [x] Focus indicators visible
- [x] All information present without animation

### Copy Verification

- [x] No forbidden phrases (root cause, proved, caused by, AI detected)
- [x] Language is precise and calm
- [x] No accusatory language
- [x] No false relief
- [x] No hidden uncertainty

### Visual Verification

- [x] Blue for supported (checkmark ✓)
- [x] Orange for divergence (~)
- [x] Grey for unresolved (?)
- [x] No red/green distinction
- [x] Dark, neutral hypothesis card

---

## Spike Execution Checklist

### Build Verification

- [x] TypeScript compiles without errors
- [x] Next.js build succeeds
- [x] No warnings or deprecations
- [x] Production build passing

### Browser Testing

**Desktop (Chrome, Firefox, Safari, Edge):**
- [ ] Page loads at localhost:3000
- [ ] All three states render correctly
- [ ] Motion is smooth (60fps)
- [ ] Buttons are clickable
- [ ] Query parameters work (?state=...)
- [ ] Text is readable at all sizes
- [ ] Colors are distinct

**Mobile (390px width):**
- [ ] Layout is single column
- [ ] Cards stack vertically
- [ ] Buttons are full-width
- [ ] Text is readable
- [ ] No horizontal scrolling
- [ ] Touch targets are 44px+

**Zoom (200%):**
- [ ] Content fits in viewport
- [ ] Text remains readable
- [ ] Buttons remain clickable
- [ ] No clipping or overflow

### Keyboard Navigation

- [ ] Tab moves focus through elements
- [ ] Enter activates buttons
- [ ] Space toggles state (if applicable)
- [ ] Focus indicator is visible (3px outline)
- [ ] Reading order is logical

### Reduced Motion

- [ ] All animations are instant
- [ ] Information layout unchanged
- [ ] No information hidden
- [ ] User can still interact
- [ ] Text announces state changes

### Screen Reader (NVDA)

- [ ] Page title is announced
- [ ] Headings structure is clear
- [ ] Evidence list is announced
- [ ] Live region announces changes
- [ ] Buttons are clearly labeled
- [ ] No missing alt text or labels

### Color Vision Deficiency

- [ ] Blue evidence is distinguishable
- [ ] Orange evidence is distinguishable
- [ ] Grey evidence is distinguishable
- [ ] Text labels make colors unnecessary
- [ ] Checkmarks and symbols visible

---

## Causal Integrity Results

### Before Running Spike

All 11 risks are mitigated at design level. Implementation must verify:

1. Copy contains no forbidden phrases
2. Motion follows grammar rules
3. Visual hierarchy is correct
4. Accessibility features work
5. All three states are reachable

### After Running Spike

- [ ] Lint: No errors or warnings
- [ ] TypeScript: Fully typed, no `any`
- [ ] Build: Production build succeeds
- [ ] Browser: Renders correctly (3+ browsers tested)
- [ ] Keyboard: All navigation works
- [ ] Reduced motion: Animations instant
- [ ] Screen reader: Announcements clear
- [ ] Copy: No forbidden phrases found
- [ ] Visual: Motion is purposeful
- [ ] States: All three states work
- [ ] Causal integrity: All 11 risks verified

---

## Final Gate Decision

**PASS if:**
- All 11 risks remain mitigated
- All browser tests pass
- All accessibility tests pass
- Build succeeds
- No forbidden phrases in copy
- Motion follows grammar

**NEEDS REVISION if:**
- Any causal risk is violated
- Browser issues found
- Accessibility failures
- Build errors
- Forbidden phrases found
- Motion doesn't teach

---

## Sign-Off

This checklist must be completed before recommending:
- **READY FOR VISUAL DIRECTION** (all checks pass)
- **NEEDS SPIKE REVISION** (any check fails)
