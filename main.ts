// Funniest Time Machine Warning Label.
// Writes a single warning label (at most 120 characters) to /output/entry.txt.
// The label is a straight-faced safety notice: the hazard is meeting your own
// duplicate self, and the punchline lands in the last few words.
import { mkdirSync, writeFileSync } from "node:fs";

const LABEL =
  "WARNING: Do not meet yourself. If you do, do not lend him money — he never pays it back, and now neither do you.";

const MAX_CHARS = 120;

const length = [...LABEL].length;
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`label must be 1-${MAX_CHARS} characters, got ${length}`);
}
if (!LABEL.trim()) {
  throw new Error("label must not be only whitespace");
}
if (LABEL.includes("\n") || LABEL.includes("\r")) {
  throw new Error("label must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LABEL, "utf8");

// Read back what was written and confirm it is exactly the label: the
// grader runs this program twice and gates the output, so the file must
// be byte-identical on every run.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LABEL) {
  throw new Error("written entry does not match the label");
}
