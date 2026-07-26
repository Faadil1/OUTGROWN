# Deployment Instructions

## Current Status

✓ Code validated (lint & build pass)
✓ Commit created: `feat: publish Day 11 unresolved coherence spike` (c5ecf47)
✓ Branch: `feat/technical-spike`
⏳ GitHub repository: Ready to push
⏳ Vercel deployment: Ready to deploy

## Next Steps

### 1. Create GitHub Repository

Visit https://github.com/new and create:
- **Repository name:** `day11-unresolved-coherence`
- **Description:** Technical spike for hypothesis-testing reasoning instrument
- **Visibility:** Public
- **Initialize without README** (already have one)

### 2. Push to GitHub

```bash
cd C:\Users\fboussari\day11-spike

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/day11-unresolved-coherence.git

# Push feature branch
git branch -M feat/technical-spike
git push -u origin feat/technical-spike
```

**Result:** Feature branch pushed, ready for preview

### 3. Deploy to Vercel

**Option A: GitHub Web Integration (Recommended)**
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Authorize GitHub
4. Select `day11-unresolved-coherence`
5. Framework preset: Next.js (auto-detected)
6. Deploy
7. Preview URL will be assigned

**Option B: Vercel CLI (if installed)**
```bash
cd C:\Users\fboussari\day11-spike
vercel --prod
```

## Files Excluded from Git

These remain in the working directory but are ignored:

- `CAUSAL_INTEGRITY_CHECKLIST.md` (audit documentation)
- `SPIKE_DELIVERY.md` (audit documentation)
- `SPIKE_README.md` (audit documentation)
- `TEST_REPORT.md` (audit documentation)
- `FINAL_VERIFICATION.md` (audit documentation)
- `FINAL_INTERACTION_TEST.md` (audit documentation)
- `AUDIT_REPORT.md` (audit documentation)
- `REVISION_SUMMARY.md` (audit documentation)
- `start-dev.ps1` (development helper)
- `.next/` (build directory)
- `node_modules/` (dependencies)
- `dev-server.log` (dev server log)

## Pre-Deployment Verification

✓ Lint: PASS (zero errors)
✓ Build: PASS (production ready)
✓ Browser: Page loads correctly
✓ Initial state: All elements present
✓ No secrets exposed: Verified
✓ No local paths: Verified
✓ Development label added: "Technical interaction spike — visual direction not final"
✓ Review controls: Collapsed section with deterministic state links
✓ README updated: ✓

## Commit Details

```
Hash: c5ecf47
Branch: feat/technical-spike
Message: feat: publish Day 11 unresolved coherence spike
Files: 9 changed, 457 insertions(+), 82 deletions(-)
```

## Expected Vercel Deployment

- URL pattern: `day11-unresolved-coherence.vercel.app`
- Branch: `feat/technical-spike` (preview deployment)
- Auto-redeploys on push to branch
- Free tier (no paid services)

## Final Report Values

Once deployment is complete, provide:

```
GitHub Repository URL:     https://github.com/[USERNAME]/day11-unresolved-coherence
Branch Pushed:            feat/technical-spike
Commit Hash:              c5ecf47
Live Preview URL:         [Vercel provides this]
Files Excluded from Git:  (Listed above in .gitignore)
Lint Result:              ✓ PASS
Build Result:             ✓ PASS
Browser Verification:     ✓ Initial state loads correctly
Secrets Exposed:          None
Local Paths Exposed:      None
```

---

## Troubleshooting

**If GitHub push fails:**
- Verify `gh auth login` or git credentials are configured
- Check SSH key if using SSH remote
- Ensure repository is created and empty

**If Vercel deployment fails:**
- Check Next.js is detected (should be auto)
- Verify environment variables (none required for this spike)
- Check build logs in Vercel dashboard

**If preview URL doesn't load:**
- Wait 2-3 minutes for initial deployment
- Check Vercel dashboard for build status
- Verify no errors in build logs
