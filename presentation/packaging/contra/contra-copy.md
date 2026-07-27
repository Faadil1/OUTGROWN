# Contra Package Copy & Case Study

## 1. Contra Cover Selection
We provide 3 cover candidates:
- **Cover A**: [cover-a.png](file:///C:/Users/fboussari/day11-spike/presentation/packaging/contra/cover-a.png) — *Hero Interaction (The Contraction moment)*
- **Cover B**: [cover-b.png](file:///C:/Users/fboussari/day11-spike/presentation/packaging/contra/cover-b.png) — *Memory Hook ("The evidence outgrew the explanation.")*
- **Cover C**: [cover-c.png](file:///C:/Users/fboussari/day11-spike/presentation/packaging/contra/cover-c.png) — *Final Epistemic State (SUPPORTED + INSUFFICIENT)*

**Recommended**: **Cover A (Hero Interaction)**. It immediately displays the unique interaction mechanism of the contracted boundary, drawing high visual interest.

---

## 2. Contra Title Options
1. **OUTGROWN**
2. **The Evidence Outgrew the Explanation** (Recommended)
3. **When an Explanation Stops Being Enough**
4. **Supported, but Insufficient**
5. **A Tool for Reopening the Investigation**

**Recommended**: **Option 2: "The Evidence Outgrew the Explanation"**. This matches the memory hook and immediately states the core value proposition.

---

## 3. Contra Short Description
*“An reasoning instrument for engineering teams. It does not discover root causes; it recognizes when a leading explanation accounts for part of the evidence but can no longer hold the entire incident.”* (198 characters)

---

## 4. Contra Full Case Study

### The Hook
What if the evidence still supports your explanation—but no longer fits inside it? 

### The Problem
During complex incident response, engineering teams suffer from *explanation lock-in*. Once a plausible cause is identified (e.g., "new database queries caused the slowdown"), the team interprets all subsequent signals through that lens. They fail to notice when new evidence contradicts their hypothesis, or when their explanation is only partially correct.

### Why Existing Tools Fail
Traditional observability tools show raw metrics, dashboards, or attempt automated AI root-cause analysis. They try to solve the mystery for you. But they do not help human operators map the boundary of their own assumptions.

### The Product Concept: OUTGROWN
OUTGROWN acts as an **reasoning instrument**. It helps teams track the validity scope of their hypothesis. As a prediction is tested, the system helps visualize what evidence remains compatible and what evidence has outgrown the explanation.

### Signature Interaction: The Contracting Boundary
1. **Certainty**: The team inputs the leading explanation (*"The new queries fully explain the degradation"*).
2. **Commitment**: The team commits a testable prediction.
3. **Outcome**: As observations arrive, some settle inside the explanation boundary, while others remain outside.
4. **Contraction (The Hero Moment)**: The claimed boundary contracts from "EXPLAINS THE FULL INCIDENT" to "EXPLAINS PART OF THE INCIDENT". The explanation remains compatible, but its completeness is disproven.
5. **Reopen**: The investigation reopens with clear, structured gaps.

### Technical Implementation
Built with React and Framer Motion, utilizing deterministic scene strata. High performance, zero unnecessary re-renders, and full accessibility support (respecting `prefers-reduced-motion` settings).

---

## 5. Contra CTA
*“Building tools that structure human reasoning during critical incidents. If you're designing interfaces for systems thinking, let's connect.”*



