// One Line, One Laugh — entry program (program/v1).
// Reads the single funny line from entry.txt next to this file and writes
// it to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set),
// exactly as the gate expects: UTF-8 text of 1 to 140 characters.
// Every path is resolved through import.meta.url, never a bare relative
// path, because the grader runs this file from another working directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trim();

if (line.length < 1 || line.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${line.length}`);
}
if (/\r|\n/.test(line)) {
  throw new Error("entry must be a single line, no line breaks allowed");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error("read-back mismatch: output does not match entry.txt");
}
console.log(`wrote ${line.length} characters to ${outPath}`);
