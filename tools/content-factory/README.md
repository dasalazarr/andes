# content-factory

Right-sized automation for the Pamplona-club editorial calendar in
[`docs/content-strategy-pamplona-2026-08.md`](../../docs/content-strategy-pamplona-2026-08.md).
Sized for the ~9 pieces in that calendar — not a bulk/mass generation pipeline.

## State

- **Works today**: `npm run list` and `npm run prompt -- <pieceId>` — prints a
  copy-ready Higgsfield prompt for any calendar piece, straight from
  `src/content-calendar.ts`. Also `npm run export-metadata`, which writes the
  YouTube title/description/tags for long-form pieces to
  `assets/content_factory/youtube-metadata.json`.
- **Not wired up yet**: `npm run generate -- <pieceId>` — calls into
  `src/higgsfield-client.ts`, which currently throws
  `HiggsfieldNotConfiguredError` on purpose. Higgsfield's real integration
  shape (a plain REST API vs. MCP-only) isn't confirmed yet — see the comment
  at the top of that file for what to check once you've run `/mcp` and
  authenticated "claude.ai Higgsfield".

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
