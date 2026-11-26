import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The one-line elevator pitch a city pigeon gives investors for its startup.
// The joke is an inversion: the pigeons have already had humans building them
// statues, feeding them daily and cleaning up after them for 300 years without
// ever pitching once — so the raise exists to keep that winning position.
// 167 characters, inside the 1-200 gate.
const LINE =
  "For 300 years, humans have built us statues, fed us daily, and cleaned up after us — and we never pitched them once. We're raising our first round to keep it that way.";

// The gate refuses anything outside 1-200 characters or only whitespace, so
// fail loudly here instead of shipping an invalid entry.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} characters, outside the 1-200 gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and confirm the gate sees exactly the line we checked:
// a write that silently dropped or altered a character would ship an entry
// the judge never saw, so refuse to finish quietly instead.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the checked line");
}
console.log(`wrote /output/entry.txt (${chars} characters)`);
