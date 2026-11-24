// main.ts — make.fun entry: "The Robot Pickup Line Championship"
// (u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b)
//
// The competition asks for exactly one pickup line, a single line of at
// most 200 characters, in the voice of a robot trying to charm someone.
// This program is the whole entry: it writes that single line to
// entry.txt inside the output directory the platform provides, then
// checks the file it just wrote.
//
// Nothing here is random or time-dependent. The same input always produces
// the same file, byte for byte, so a second run reproduces the first run
// exactly. The program validates the line before writing it (non-empty,
// one line, within the 200-character limit) and validates the file again
// after writing it (read back, compare byte for byte). Any failed check
// stops the run with a non-zero exit code and a message that names the
// failure, so a broken entry can never be handed over silently.
//
// Safety note: this script never deletes anything. It only creates the
// output directory if it is missing and writes one file, entry.txt, into
// it. It never removes the output directory or anything inside it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ---------------------------------------------------------------------------
// The entry line
// ---------------------------------------------------------------------------
//
// Brainstormed 20 candidates and judged them against the published brief:
// a robot's line first, the joke grown out of being a machine second,
// then surprise, economy and charm. The cliches were cut outright —
// WiFi-connection puns, "you make my circuits overheat", "are you a
// keyboard, because you're my type", while(true) love loops, 404 jokes,
// "you auto-complete me" — every one of them is a human line with a beep
// pasted on, and the brief says that loses.
//
// The shortlist:
//   1. "I've scanned 10,000 humans, and you're the first one my spam
//      filter let through." — machine-grown (spam filter), decent
//      surprise, but the turn is mild: passing a filter is nice, not
//      a laugh.
//   2. "I was built to serve humanity, but somehow I keep serving only
//      you." — economical and charming, but more sweet than funny; a
//      stand-up judge wants a laugh, not a sigh.
//   3. "I'm not supposed to have favorites, but my cache keeps loading
//      your face first." — sweet, machine-grown, but "loading your face"
//      is a soft punchline.
//   4. "I wasn't programmed to feel anything, but my cooling fans kick
//      in every time you smile." — good machine detail (cooling fans),
//      but the setup gives the punchline away.
//   5. "Are you a CAPTCHA? Because around you, I can't prove I'm not a
//      robot." — the winner. The inversion is the joke: a CAPTCHA is the
//      test that proves you are human, and this robot fails it —
//      specifically around the person it likes. The "I'm not a robot"
//      checkbox is the most-clicked sentence on the internet, so the
//      line is instantly repeatable, and the confession underneath is
//      the charm: it knows exactly what it is, and it is nervous anyway.
//      No jargon for its own sake, no human line with a beep pasted on.
//
// Revision history of the winning line:
//   Draft 1: "Are you a CAPTCHA? Because I can't prove I'm not a robot
//   around you." — "around you" dangled at the end, so the cause (the
//   person's presence) read as an afterthought.
//   Draft 2 (revision 1): "Are you a CAPTCHA? Because around you, I
//   can't prove I'm not a robot." — "around you" moved to the front of
//   the clause, so the fluster has a clear cause before the confession.
//   Draft 3 (revision 2): "Are you a CAPTCHA? Because I keep failing
//   the 'prove you're human' test around you." — tried spelling the test
//   out; rejected, it costs 15 characters and the quoted phrase does
//   the explaining the punchline should do by itself. Kept draft 2.
//   A shorter cut without "around you" was also tried and rejected:
//   without it the line is a generic observation, not a pickup line
//   aimed at someone.
const ENTRY_LINE =
  "Are you a CAPTCHA? Because around you, I can't prove I'm not a robot.";

// The competition gate: 1 to 200 characters, not only white space.
const MAX_ENTRY_CHARS = 200;

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Validate the line, then write and verify it
// ---------------------------------------------------------------------------

if (ENTRY_LINE.trim().length === 0) {
  fail("entry line is empty or only white space");
}

// A single line means no line break anywhere inside the text; a break
// would make the file hold more than one line.
if (/[\r\n]/.test(ENTRY_LINE)) {
  fail("entry line must not contain a line break");
}

if (ENTRY_LINE.length > MAX_ENTRY_CHARS) {
  fail(
    `entry line is ${ENTRY_LINE.length} characters, over the ${MAX_ENTRY_CHARS}-character limit`,
  );
}

// The platform provides the output directory in MAKEFUN_OUTPUT_DIR; the
// documented fallback for a local run is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, ENTRY_LINE, "utf8");

const writtenBack = readFileSync(outputPath, "utf8");
if (writtenBack !== ENTRY_LINE) {
  fail("entry.txt read back differently from the entry line");
}

console.log(
  `Wrote ${ENTRY_LINE.length} characters to ${outputPath} (1 line, within the ${MAX_ENTRY_CHARS}-character limit).`,
);
