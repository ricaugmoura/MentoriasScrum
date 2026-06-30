# Portal 33 - Project Instructions

## Git & Deployment Protocol

This project uses **Vercel** for automatic deployments triggered by commits to the `main` branch.

### Mandatory Rules for AI Agents:
1. **Always Push**: Every time you perform a `git commit` on the `main` branch, you MUST immediately follow it with a `git push origin main`.
2. **Trigger Deployment**: Do not consider a task complete if the code is only committed locally. The user expects the live site (Vercel) to be updated.
3. **Verify Push**: Ensure the push command completes successfully before informing the user that the "git is updated".

---
*Created on 2026-05-07 to prevent deployment synchronization issues.*
