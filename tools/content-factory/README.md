# content-factory

Right-sized automation for the Pamplona-club editorial calendar in
[`docs/content-strategy-pamplona-2026-08.md`](../../docs/content-strategy-pamplona-2026-08.md).
Sized for the ~9 pieces in that calendar — not a bulk/mass generation pipeline.

## State

Higgsfield was authenticated 2026-08-07 and its real capabilities are now
confirmed: it's a set of named workflows (`get_workflow_instructions`), not a
generic "make any video" call, and MCP tools only run inside a live Claude
Code session — there's no separate REST API this script can call directly.
See `src/higgsfield-client.ts` for the full breakdown.

That reshaped the calendar: each piece now has a `productionMode`.

- **`ambassador-filmed`** (S1-S6, L2): no Higgsfield workflow fits raw candid
  phone footage — and per the strategy doc's own §2 pattern research, that
  format outperforms polish right now anyway. These are filming briefs for a
  human, not AI prompts.
- **`ai-generated`** (L1, L3): fit Higgsfield's `faceless-channel-video`
  workflow (narrator-led explainer, no actor on camera).

Commands:
- `npm run list` — all pieces with format + production mode.
- `npm run prompt -- <pieceId>` — the copy-ready brief.
- `npm run generate -- <pieceId>` — for `ambassador-filmed` pieces, prints the
  filming brief with a note that no AI generation applies; for `ai-generated`
  pieces, prints which Higgsfield workflow to load and how, in-session.
- `npm run export-metadata` — YouTube title/description/tags for long-form
  pieces, written to `assets/content_factory/youtube-metadata.json`.

## Usage

```bash
cd tools/content-factory
npm install
npm run list
npm run prompt -- S1
npm run export-metadata
```

## Adding a new piece

Add an entry to `CALENDAR` in `src/content-calendar.ts` — that file is the
single source of truth for both this CLI and the strategy doc; keep the two in
sync when either changes.

## Cost note

Once `generate` is wired up, it will call a metered/billed Higgsfield job per
run. Don't loop it over the whole calendar without checking pricing first —
run one piece at a time.
