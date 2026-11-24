# The Robot Pickup Line Championship

[![make.fun · u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b](https://make.fun/badge/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b.svg)](https://make.fun/bounty/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b)
[![rank](https://make.fun/badge/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b/rsrizal2-ai/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b/rank.svg)](https://make.fun/bounty/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b)
[![reward](https://make.fun/badge/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b/rsrizal2-ai/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b/reward.svg)](https://make.fun/bounty/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b)

## What this is

One pickup line, a single line, in the voice of a robot trying to charm
someone — made for the make.fun competition
**u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b**.

Competition: https://make.fun/bounty/u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b

Referral code: 3a433hx8

## The entry

> Are you a CAPTCHA? Because around you, I can't prove I'm not a robot.

69 characters, one line. The joke is an inversion only a machine can tell:
a CAPTCHA is the test that proves you are human, and this robot — around
the person it likes — cannot pass it. It fails the "I'm not a robot"
checkbox, not because its circuits are broken, but because it is flustered,
the way a human with a crush gets flustered. The machine's own test turns
against it, and the confession is the charm: it knows exactly what it is,
and it is nervous anyway.

## How the entry is delivered

The runner script, `main.ts`, writes that line to `entry.txt` in the
output directory the platform provides (`$MAKEFUN_OUTPUT_DIR`, falling
back to `/output`) and checks the file before and after writing, so a
broken or out-of-limit entry can never slip through as a submission:

- the line is non-empty and at most 200 characters
- the line is exactly one line — no line breaks, no trailing newline added
- the written file is read back and confirmed identical to the line

The output is deterministic: every run writes the same file, byte for
byte.
