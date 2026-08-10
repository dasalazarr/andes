#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CALENDAR, getPiece } from "./content-calendar.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, "../../../assets/content_factory");

function usage(): void {
  console.log(`andes-content-factory — Pamplona-club editorial calendar

Usage:
  npm run list                       List all pieces (id, format, production mode, working title)
  npm run prompt -- <pieceId>        Print the copy-ready brief for one piece
  npm run generate -- <pieceId>      Print how to actually produce this piece
                                      (Higgsfield workflow to run in-session, or
                                      "film this" if no workflow fits — see
                                      higgsfield-client.ts for why)
  npm run export-metadata            Dump YouTube Video Package metadata for long-form pieces as JSON

Examples:
  npm run prompt -- S1
  npm run generate -- L1
`);
}

function listPieces(): void {
  for (const piece of CALENDAR) {
    console.log(
      `${piece.id.padEnd(4)} [${piece.format.padEnd(5)}] [${piece.productionMode.padEnd(18)}] ${piece.workingTitle}`,
    );
  }
}

function printPrompt(pieceId: string | undefined): void {
  if (!pieceId) {
    console.error("Usage: npm run prompt -- <pieceId>");
    process.exitCode = 1;
    return;
  }
  const piece = getPiece(pieceId);
  console.log(`# ${piece.id} — ${piece.workingTitle}\n`);
  console.log(piece.script);
  console.log(`\nCTA: ${piece.cta}`);
}

function generate(pieceId: string | undefined): void {
  if (!pieceId) {
    console.error("Usage: npm run generate -- <pieceId>");
    process.exitCode = 1;
    return;
  }
  const piece = getPiece(pieceId);
  console.log(`# ${piece.id} — ${piece.workingTitle}\n`);
  if (piece.productionMode === "ambassador-filmed") {
    console.log(
      "No Higgsfield workflow fits raw candid phone footage — this piece is meant to be " +
        "filmed by an ambassador, not AI-generated (see higgsfield-client.ts for why).\n",
    );
    console.log("Filming brief:\n");
    console.log(piece.script);
  } else {
    console.log(`Higgsfield workflow: ${piece.higgsfieldWorkflow}\n`);
    console.log(
      "This script does not call Higgsfield directly (MCP tools only run inside a live " +
        "Claude Code session). In that session, with Higgsfield authenticated via /mcp, ask " +
        `Claude to load get_workflow_instructions({ workflow: "${piece.higgsfieldWorkflow}" }) ` +
        "and run it with the brief below. Check `balance` first — generation is metered.\n",
    );
    console.log("Generation brief:\n");
    console.log(piece.script);
  }
}

async function exportMetadata(): Promise<void> {
  const withPackage = CALENDAR.filter((p) => p.youtubePackage);
  await mkdir(ASSETS_DIR, { recursive: true });
  const dest = path.join(ASSETS_DIR, "youtube-metadata.json");
  await writeFile(dest, JSON.stringify(withPackage, null, 2));
  console.log(`Wrote metadata for ${withPackage.length} piece(s) to ${dest}`);
}

async function main(): Promise<void> {
  const [, , cmd, arg] = process.argv;
  switch (cmd) {
    case "list":
      listPieces();
      break;
    case "prompt":
      printPrompt(arg);
      break;
    case "generate":
      generate(arg);
      break;
    case "export-metadata":
      await exportMetadata();
      break;
    default:
      usage();
  }
}

main();
