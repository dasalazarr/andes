#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CALENDAR, getPiece } from "./content-calendar.js";
import { downloadAsset, pollJob, submitJob } from "./higgsfield-client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, "../../../assets/content_factory");

function usage(): void {
  console.log(`andes-content-factory — Pamplona-club editorial calendar

Usage:
  npm run list                       List all pieces (id, format, working title)
  npm run prompt -- <pieceId>        Print the copy-ready Higgsfield prompt for one piece
  npm run generate -- <pieceId>      Submit a real Higgsfield job (requires auth — see higgsfield-client.ts)
  npm run export-metadata            Dump YouTube Video Package metadata for long-form pieces as JSON

Examples:
  npm run prompt -- S1
  npm run generate -- L2
`);
}

function listPieces(): void {
  for (const piece of CALENDAR) {
    console.log(`${piece.id.padEnd(4)} [${piece.format.padEnd(5)}] ${piece.workingTitle}`);
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

async function generate(pieceId: string | undefined): Promise<void> {
  if (!pieceId) {
    console.error("Usage: npm run generate -- <pieceId>");
    process.exitCode = 1;
    return;
  }
  const piece = getPiece(pieceId);
  console.log(`Submitting Higgsfield job for ${piece.id} — ${piece.workingTitle}...`);
  try {
    const { jobId } = await submitJob({ pieceId: piece.id, prompt: piece.script });
    console.log(`Submitted. jobId=${jobId}. Polling...`);
    let status = await pollJob(jobId);
    while (status.status === "queued" || status.status === "rendering") {
      await new Promise((r) => setTimeout(r, 5000));
      status = await pollJob(jobId);
    }
    if (status.status === "failed" || !status.assetUrl) {
      throw new Error(`Job ${jobId} failed`);
    }
    await mkdir(ASSETS_DIR, { recursive: true });
    const dest = path.join(ASSETS_DIR, `${piece.id}.mp4`);
    await downloadAsset(status.assetUrl, dest);
    console.log(`Saved to ${dest}`);
  } catch (err) {
    console.error((err as Error).message);
    console.error(`\nUntil Higgsfield is wired up, use: npm run prompt -- ${piece.id}`);
    process.exitCode = 1;
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
      await generate(arg);
      break;
    case "export-metadata":
      await exportMetadata();
      break;
    default:
      usage();
  }
}

main();
