# Meridian Nexus — Production Redeployment Checklist

Follow this checklist whenever making future updates to the Meridian Nexus monorepo.

---

## 📋 Pre-Deployment Validation Checklist

- [ ] **1. Run Monorepo Typecheck**
  ```bash
  pnpm typecheck
  ```
  Ensure 0 TypeScript errors across `apps/web` and `apps/api`.

- [ ] **2. Test Production Bundle Build Locally**
  ```bash
  pnpm build
  ```
  Verify that Vite transforms and minifies all assets under `apps/web/dist`.

---

## 🚀 Deployment Steps

### 1. Deploy Frontend (GitHub Pages)
- Simply push any changes on the `main` branch to GitHub:
  ```bash
  git add .
  git commit -m "feat: your feature update"
  git push origin main
  ```
- **Automated Workflow**: `.github/workflows/deploy.yml` will automatically build and publish `apps/web/dist` to:
  👉 **[https://johnparente97.github.io/M.NexusPhase1/](https://johnparente97.github.io/M.NexusPhase1/)**

### 2. Deploy Backend API Worker (Cloudflare Workers)
- If you made changes to `apps/api` (routes, middleware, database queries):
  ```bash
  pnpm deploy:api
  ```
  *(Or `cd apps/api && npx wrangler deploy`)*
- Verify API health endpoint:
  ```bash
  curl -i https://meridian-nexus-api.jrjohnparente.workers.dev/api/health
  ```

---

## 🧪 Post-Deployment Sanity Checks

- [ ] Open **https://johnparente97.github.io/M.NexusPhase1/** in a private/incognito browser window.
- [ ] Test the **Dolphin Free Experience** (`/#/chat/free`) — verify streaming responses work without a wallet.
- [ ] Test **AntSeed Model Marketplace** (`/#/marketplace/models`) — verify pricing per 1M tokens displays.
- [ ] Test **Unified AI Balance & 1% Top-Up** (`/#/balance`) — verify fee calculation breakdown.
- [ ] Test **Spotlight Search (`⌘K`)** — verify instant navigation and action commands.
- [ ] Confirm no 404 asset errors in browser Network inspector.
