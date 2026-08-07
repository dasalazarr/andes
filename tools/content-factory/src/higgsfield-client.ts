/**
 * Higgsfield integration boundary — confirmed against the real MCP tool
 * catalog (authenticated 2026-08-07). Two things are now settled:
 *
 * 1. There is no separate REST API — generation only happens through the
 *    `claude.ai Higgsfield` MCP tools inside an authenticated Claude Code
 *    session. A standalone Node process cannot call them directly; this file
 *    stays a thin, honest boundary rather than a fake HTTP client.
 * 2. Higgsfield's real surface is a set of NAMED WORKFLOWS
 *    (`get_workflow_instructions`), not a generic "make any video" call.
 *    Relevant ones for this calendar:
 *      - `faceless-channel-video` — narrator-led explainer/documentary/story,
 *        30s-10+min, non-photoreal. Good fit for L1-L3.
 *      - `character-sheet` — consistent persona/reference across generations.
 *        Only useful if a piece needs a repeated AI-generated "character";
 *        our own brand voice deliberately avoids a fixed coach avatar (the
 *        coach is a WhatsApp voice, not an on-screen mascot) — see
 *        content-calendar.ts MASTER_STYLE.
 *      - `ugc-*` flows (ugc-flow, ugc-saas-flow, etc.) — product-review-style
 *        talking-head ads with a real product/URL. Andes has no e-commerce
 *        product page, so these fit poorly except possibly a SaaS-style demo
 *        of the WhatsApp coaching flow itself.
 *      - Nothing in the catalog fits "raw, candid, ambassador-shot phone
 *        footage" — which is exactly the format the content-strategy doc's
 *        own §2 pattern research says wins right now. That's why S1-S6 are
 *        marked `productionMode: "ambassador-filmed"` in content-calendar.ts,
 *        not routed through Higgsfield at all.
 *
 * Practical flow for an "ai-generated" piece:
 *   1. `npm run prompt -- <pieceId>` to get the brief.
 *   2. In a live Claude Code session (Higgsfield authenticated via `/mcp`),
 *      ask Claude to call `get_workflow_instructions` for the piece's
 *      `higgsfieldWorkflow`, then `generate_video`/`generate_image` per that
 *      workflow's own intake, then `jobs_wait`, then save the asset.
 *   3. Generation is metered (credits) — confirm before running each piece;
 *      check `balance` first. `use_unlim` free-trial generations exist but
 *      are opt-in only when explicitly requested — never assume/spend them.
 *
 * This file intentionally has no exported functions: there is nothing here
 * a standalone script can correctly call. Automating further would mean
 * building an actual MCP client in this script, which is unnecessary — the
 * generation already happens from inside this same Claude Code session.
 */

export {};
