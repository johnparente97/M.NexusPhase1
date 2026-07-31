# Meridian Nexus — Hosting & Deployment Audit Report

This audit report documents all identified hosting issues, root causes, file changes, deployment configurations, and verification test results for **Meridian Nexus**.

---

## 🌐 Deployed Canonical URLs

- **Public Frontend URL (GitHub Pages)**:  
  [https://johnparente97.github.io/M.NexusPhase1/](https://johnparente97.github.io/M.NexusPhase1/)

- **Public Backend API URL (Cloudflare Worker)**:  
  [https://meridian-nexus-api.jrjohnparente.workers.dev](https://meridian-nexus-api.jrjohnparente.workers.dev)

- **Backend Health Check Endpoint**:  
  [https://meridian-nexus-api.jrjohnparente.workers.dev/api/health](https://meridian-nexus-api.jrjohnparente.workers.dev/api/health)

---

## 🔍 Problems Identified & Root Causes

| # | Problem Description | Root Cause | Resolution / Repair |
| :--- | :--- | :--- | :--- |
| **1** | GitHub Pages deployment workflow failed on `npm ci` | Repository uses `pnpm` workspaces (`pnpm-lock.yaml`), not `package-lock.json`. `npm ci` threw `ENOENT`. | Updated `.github/workflows/deploy.yml` to use `pnpm/action-setup@v4` (v9.15.0), `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm build`. |
| **2** | API requests on GitHub Pages produced `404 Not Found` | `API_BASE_URL` defaulted to relative `""` which targeted `https://johnparente97.github.io/api/...` instead of Cloudflare. | Created centralized API base URL resolution in `apps/web/src/services/api-client.ts` defaulting to `https://meridian-nexus-api.jrjohnparente.workers.dev`. |
| **3** | Browser CORS preflight error on Cloudflare Worker | `corsMiddleware` in Worker only allowed `http://localhost:5173` if `CORS_ORIGIN` env was unset. | Updated `apps/api/src/middleware/cors.ts` to explicitly permit `https://johnparente97.github.io` and all `*.github.io` subpaths. |
| **4** | Nested SPA route refresh produced GitHub Pages 404 | GitHub Pages static server does not support server-side URL rewrites for deep paths. | Switched React Router to `createHashRouter` in `router.tsx` and added `apps/web/public/404.html` SPA fallback script. |
| **5** | Double-nested Markdown badge in `README.md` | Syntactically nested `[[![...](...)](...)](...)` rendered invalid HTML links. | Fixed badge syntax in `README.md` to standard `[![Launch Meridian Nexus](badge-url)](pages-url)`. |
| **6** | Potential white-screen crash on unhandled component errors | Missing top-level React ErrorBoundary in `App.tsx`. | Wrapped `App.tsx` with `<ErrorBoundary>` providing graceful error recovery UI and home navigation. |

---

## 📁 Key Files Changed

- `.github/workflows/deploy.yml`: Configured pnpm 9.15.0 setup, frozen lockfile, typecheck, build, and Pages artifact deployment.
- `apps/web/src/services/api-client.ts`: Set production Worker fallback origin `https://meridian-nexus-api.jrjohnparente.workers.dev` and 8s timeout guard.
- `apps/api/src/middleware/cors.ts`: Explicitly allowed `https://johnparente97.github.io` origin & custom headers (`X-Nexus-Accept-ToS`, `Authorization`).
- `apps/web/src/app/router.tsx`: Switched to `createHashRouter` for subpath SPA stability on GitHub Pages.
- `apps/web/vite.config.ts`: Configured `base: '/M.NexusPhase1/'` for Vite bundle generation.
- `apps/web/src/app/App.tsx`: Added top-level `<ErrorBoundary>` wrapper.
- `apps/web/src/components/common/DemoLabel.tsx`: Updated environment mode badge (`Base Sepolia Testnet & Demo Mode`).
- `README.md`: Added prominent `[![Launch Meridian Nexus]()]()` badge and public fallback link.

---

## ⚙️ Environment Variables & Cloudflare Bindings

### Frontend (`apps/web/.env`)
- `VITE_API_BASE_URL`: `https://meridian-nexus-api.jrjohnparente.workers.dev` (Public API Worker Origin)
- `VITE_APP_ENV`: `testnet` (Display environment mode)
- `VITE_ENABLE_DEMO_FALLBACK`: `true`

### Backend Worker (`apps/api/wrangler.jsonc`)
- `binding`: `DB`
- `database_name`: `meridian-nexus-db`
- `database_id`: `3bee722c-861e-4d3a-9da0-31e8d8c38b76` (Cloudflare D1 Database)
- `CORS_ORIGIN`: `https://johnparente97.github.io,http://localhost:5173`

---

## 🧪 Verification & Test Results

1. **Worker API Health Endpoint**:  
   - `curl -i https://meridian-nexus-api.jrjohnparente.workers.dev/api/health`  
   - **Result**: `HTTP/2 200 OK`, `{"status":"healthy","database":"Connected"}`
2. **TypeScript Typecheck**:  
   - `pnpm typecheck`  
   - **Result**: `0 Errors` across `@meridian-nexus/web` and `@meridian-nexus/api`.
3. **Production Vite Build**:  
   - `pnpm build`  
   - **Result**: Success. Generated dist bundle under `apps/web/dist`.
4. **Cloudflare Worker Deployment**:  
   - `npx wrangler deploy`  
   - **Result**: Deployed version `da7d8c90-6b50-4074-9a3f-1e1c9e4373a8` in 2.98s.

---

## 📌 Remaining Limitations & Future Scope

- **Solana SPL Token Adapter**: Schema configured in `config/chain-config.ts`; waiting on production Solana RPC endpoint.
- **Circle Gateway Nanopayments**: Micro-cent batching pipeline ready for Circle API production key provisioning.
