/**
 * Higgsfield integration boundary.
 *
 * As of writing, the "claude.ai Higgsfield" MCP connector is installed but not
 * authenticated in this workspace, and MCP tools are only callable from inside
 * a Claude Code conversation — not from an arbitrary standalone Node process.
 * That means there are two honest ways to actually run a job, and this client
 * intentionally does NOT pretend to be a working HTTP integration until one of
 * them is confirmed:
 *
 *   1. Higgsfield exposes a plain REST API (api key based) separate from its
 *      MCP proxy — if so, fill in submitJob/pollJob/downloadAsset below against
 *      the real endpoints once you have API docs/credentials.
 *   2. There is no separate REST API, and generation only happens through the
 *      MCP tool inside a Claude Code session — if so, this script's job is to
 *      print copy-ready prompts (see `generate --dry-run`, the default) for a
 *      human/Claude to paste into the authenticated MCP session, not to POST
 *      anywhere itself.
 *
 * Run `/mcp` → authenticate "claude.ai Higgsfield", then ask Claude Code to
 * inspect the tools that appear and update this file accordingly.
 */

export interface SubmitJobParams {
  pieceId: string;
  prompt: string;
}

export interface SubmitJobResult {
  jobId: string;
}

export interface JobStatus {
  jobId: string;
  status: "queued" | "rendering" | "done" | "failed";
  assetUrl?: string;
}

export class HiggsfieldNotConfiguredError extends Error {
  constructor() {
    super(
      [
        "Higgsfield is not wired up for direct script calls yet.",
        "Run `/mcp` in Claude Code and authenticate \"claude.ai Higgsfield\",",
        "then update tools/content-factory/src/higgsfield-client.ts against the",
        "real tool schema/API before calling submitJob/pollJob/downloadAsset.",
        "Until then, use `npm run prompt -- <pieceId>` to get a copy-ready prompt.",
      ].join(" "),
    );
    this.name = "HiggsfieldNotConfiguredError";
  }
}

export async function submitJob(_params: SubmitJobParams): Promise<SubmitJobResult> {
  throw new HiggsfieldNotConfiguredError();
}

export async function pollJob(_jobId: string): Promise<JobStatus> {
  throw new HiggsfieldNotConfiguredError();
}

export async function downloadAsset(_assetUrl: string, _destPath: string): Promise<void> {
  throw new HiggsfieldNotConfiguredError();
}
