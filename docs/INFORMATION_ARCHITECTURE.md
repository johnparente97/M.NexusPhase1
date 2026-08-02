# Nexus Information Architecture Specification

## 5 Primary Destinations (Shared Desktop Rail & Mobile Bottom Bar)

1. **Home (`/`)**:
   - Guest Launcher: Minimal hero, central prompt input *"What would you like to accomplish?"*, featured agents.
   - Signed-in Personal Command Center: Continue recent work, active/completed runs, pending approvals, saved items, creator earnings.
2. **Explore (`/explore`)**:
   - Default Category: **Agents**.
   - Categories: Agents, Workflows, Models, Tools, MCP Servers, Data Sources, Storage, Compute.
   - Filters: Maturity, Price Range, Verified Creator, Permission Scopes.
3. **Build (`/build`)**:
   - Merged Creation Suite (Agent Builder & Visual Studio).
   - Guided Mode: Step-by-step wizard with plain-language permission disclosures.
   - Advanced Mode: Visual node graph, prompt editor, JSON schemas, provider routing, MCP tools, cost ceilings.
4. **Activity (`/activity`)**:
   - Task Thread Feed: Queued, Waiting for Approval, Running, Completed, Failed, Refunded, Settled.
   - Detailed progress timeline, agent messages, tool calls, artifacts, itemized receipts.
5. **Library (`/library`)**:
   - Consolidated repository: Saved Agents, Saved Workflows, Uploaded Knowledge, Generated Artifacts, Templates, Connected Tools.

---

## Secondary Workspace Menu (Account / Contextual Menu)

- **Creator Console (`/workspace/creator`)**: Revenue analytics, gross sales, provider costs, Nexus fees, refunds, CSV exports.
- **Team Workspaces (`/workspace/team`)**: Organization management, member roles, shared budgets.
- **Developer Console (`/workspace/developer`)**: API keys, webhooks, schema inspection, MCP integration.
- **Payments & Membership (`/workspace/billing`, `/workspace/membership`)**: USDC balance, Nexus Credits, optional NEX membership tiers.
- **Trust Center (`/trust`)**: Evidence-based platform maturity, provider health, data handling.
- **Documentation (`/docs`)**: Single source of truth product and developer docs.
