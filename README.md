# 🌌 Meridian Nexus — Phase 1 Functional MVP

Meridian Nexus is a premium, outcome-first AI workflow marketplace where users can discover, configure, and execute trusted AI workflows safely, with simulated secure payments powered by the Meridian network.

<div align="center" style="margin: 24px 0;">
  <a href="http://localhost:5173" target="_blank" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/LAUNCH_LOCAL_MVP-http%3A%2F%2Flocalhost%3A5173-6366f1?style=for-the-badge&logo=rocket&logoColor=white" alt="Launch Local MVP Button" height="40" />
  </a>
</div>

---

## 🚀 Quick Start Guide

Follow these simple steps to launch the entire monorepo locally:

### 1. Start the Development Servers
Run the following command at the root directory of the project to boot up both the **Vite React Frontend** and the **Cloudflare Hono Worker API** concurrently:
```bash
npm run dev
```

* **Vite React Frontend**: [http://localhost:5173](http://localhost:5173) (Proxies `/api/*` requests to the backend)
* **Cloudflare Hono Worker**: [http://localhost:8787](http://localhost:8787)

### 2. Database Maintenance (Optional)
If you ever want to reset, re-migrate, or re-seed the local D1 SQLite database, helper scripts are available at the root:
```bash
# Re-apply migrations schema
npm run db:migrate:local

# Re-seed with 15 workflows and demo reviews
npm run db:seed:local
```

---

## 🛠️ Monorepo Architecture

The workspace is structured as a Turborepo monorepo:

* `/packages/shared-types` — Common interfaces, enums, and API payload contracts.
* `/packages/validation` — Zod verification schemas and dynamic form parsed validator builders.
* `/apps/api` — Cloudflare Hono Worker managing database transactions and Gemini AI completions.
* `/apps/web` — Premium dark-first React client styled with vanilla Tailwind CSS.
