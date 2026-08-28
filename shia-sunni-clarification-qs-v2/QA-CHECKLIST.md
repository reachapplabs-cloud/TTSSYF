# QA Checklist — Completeness Audit

*(v2 — this file is inherited unchanged from v1 and documents the
original `.docx` → v1 transformation. For what has changed since, in v2,
see [`CHANGELOG.md`](CHANGELOG.md).)*

This document is the completeness proof for this compilation. It maps
**every** timestamped message, every untimestamped text block, and every
image in [`source/raw-transcript.md`](source/raw-transcript.md) to the
exact chapter/section it was placed in under [`chapters/`](chapters/).
Nothing in the source was dropped; everything below is accounted for.

Method used: the original `.docx` was converted losslessly (via `pandoc`,
GitHub-flavored Markdown output) with all 9 embedded images extracted at
full original resolution. The resulting text was diffed line-by-line
against this table while building each chapter file. Text content was
copied verbatim (never paraphrased) into chapter files; only navigation,
headings, and "Source:"/"See also:" scaffolding were authored fresh.

## Message-by-message trace

| # | Raw transcript line | Timestamp / block | Placed in |
|---|---|---|---|
| 1 | 22–30 | 24/08/2026, 11:59:07 PM — shiapen link, "oral narrations differ" | Ch.4 §4.1 |
| 2 | 32–36 | 25/08/2026, 12:03:02 AM — reddit + abudawud:4646 links | Ch.4 §4.1 |
| 3 | 38 | 25/08/2026, 12:03:03 AM — "Albani graded it sahih" | Ch.4 §4.1 |
| 4 | 40 | 25/08/2026, 12:03:03 AM — "not shaz, it's kazab" | Ch.4 §4.1 |
| 5 | 42 | 25/08/2026, 12:05:55 AM — editorial/forwarding note | Ch.4 §4.1 (quoted as context) |
| 6 | 44–46 | 25/08/2026, 12:11:03 AM — Khutbah Shiqshiqiyyah / 24:55 / Umar's expedition | Ch.6 §6.1 |
| 7 | 48–208 | 25/08/2026, 12:13:37 AM — "Qur'an Is Incomplete" essay (full, incl. Al-Islam.org attribution footer) | Ch.1 §1.1 |
| 8 | 210 | untimestamped — Sulaim bin Khais / Aban bin Abi Ayyash | Ch.5 §5.5 |
| 9 | 212 | untimestamped — "AI Mode Conversation" on Ali/Haud al-Kawthar | Ch.4 §4.5 |
| 10 | 214 | 25/08/2026, 6:00:30 AM — video 1 link | Ch.6 §6.2 |
| 11 | 216–218 | 25/08/2026, 6:00:30 AM — "Video:" + video 2 link | Ch.6 §6.2 |
| 12 | 220–316 | (untimestamped, follows videos) — 9-item Ghadeer Khumm reference bundle | Ch.6 §6.4 |
| 13 | 318–326 | 25/08/2026, 6:01:15 AM — Umm Salamah/Ahl al-Bayt; Qirtas; cursing Ali; Fadak/Fatima's anger; Imam Ja'far ahadith (5 sub-items in one message) | Split: Ch.5 §5.1, §5.2; Ch.4 §4.2, §4.3; Ch.2 §2.2 |
| 14 | 328 | 25/08/2026, 6:18:59 AM — "ashabi" Haud al-Kawthar question | Ch.4 §4.5 |
| 15 | 330–348 | 25/08/2026, 6:21:18 AM — Ibn Taymiyyah/Ka'b al-Ahbar creation-hadith debate (full quote) | Ch.2 §2.1 |
| 16 | 350 | 25/08/2026, 8:16:39 AM — 7 ahruf / Qur'an completeness / destroyed ahadith | Ch.1 §1.2 (cross-ref Ch.2 §2.3) |
| 17 | 352 | 25/08/2026, 8:23:42 AM — Verse 5:3 Arafah timing | Ch.1 §1.3 |
| 18 | 354–356 | 26/08/2026, 6:57:23 AM — "New evidence" / Aisha-fitnah theory | Ch.4 §4.4, §4.6 |
| 19 | 358–360 | 26/08/2026, 6:57:24 AM — ashara mubashara/Talha hadith + `image5.png` | Ch.4 §4.4 |
| 20 | 362 | 26/08/2026, 2:58:07 PM — Riyad as-Salihin 664 link | Ch.4 §4.7 |
| 21 | 364 | 26/08/2026, 2:58:07 PM — "planning actions" note | Ch.4 §4.7 |
| 22 | 366 | 26/08/2026, 2:58:08 PM — "betrayed uthman... waged war" | Ch.4 §4.7 |
| 23 | 368–372 | 26/08/2026, 2:58:08 PM — share.google link + "Additional references" + abudawud:4646 | Ch.4 §4.7 |
| 24 | 374 | 26/08/2026, 2:58:08 PM — "hasten to the defense of any companion..." | Ch.4 §4.8 |
| 25 | 376–380 | 26/08/2026, 2:58:09 PM — "Their tafseer is more accurate" + `image7.png` + `image6.png` | Ch.4 §4.8 |
| 26 | 382–388 | 26/08/2026, 2:58:10 PM — Bukhari 6582/6787 links + `image9.png` + `image8.png` | Ch.4 §4.5 (links), Ch.4 §4.9 (images) |
| 27 | 390–394 | 26/08/2026, 2:58:10 PM — "not a blanket rule for all" + `image2.png` + `image1.png` | Ch.5 §5.4 |
| 28 | 396 | 26/08/2026, 9:01:45 PM — authenticity-check / edited-message note | Ch.5 §5.4 |
| 29 | 398 | 26/08/2026, 9:03:18 PM — Abu Bakr first-to-accept-Islam question | Ch.4 §4.10 |
| 30 | 400 | 27/08/2026, 8:41:22 AM — Fadak page 89/90 vs. Fatima's sermon | Ch.5 §5.3 |
| 31 | 402–406 | 27/08/2026, 10:30:31 AM — Salawat bid'ah question + `image4.png` + `image3.png` | Ch.3 §3.1 |
| 32 | 408–424 | 27/08/2026, 10:44:40 AM — Proof link + Takeaways + "Q to self: Iqra vs Qul" | Ch.1 §1.4 |
| 33 | 426–428 | 27/08/2026, 12:54:50 PM — al-islam.org link | Ch.7 §7.1 |
| 34 | 430 | 27/08/2026, 12:58:12 PM — al-islam.org printpdf link | Ch.7 §7.2 |

## Image trace (9 of 9 accounted for)

| File | Source line | Caption in source (alt text) | Used in |
|---|---|---|---|
| `image1.png` | 394 | "Imam Ali's (AS --..png" | Ch.5 §5.4 |
| `image2.png` | 392 | "Imam Ali's (AS) ....png" | Ch.5 §5.4 |
| `image3.png` | 406 | "The Argument for Bid'ah:.png" | Ch.3 §3.1 |
| `image4.png` | 404 | "1. The Qur'an: The Command is Specific.png" | Ch.3 §3.1 |
| `image5.png` | 360 | "Core stance on.jpeg" | Ch.4 §4.4 |
| `image6.png` | 380 | "Shia View on Context...png" | Ch.4 §4.8 |
| `image7.png` | 378 | "1. The Shia Perspective (Tafseer Ahl al-.png" | Ch.4 §4.8 |
| `image8.png` | 388 | "Sunni history books do not shy away from.png" | Ch.4 §4.9 |
| `image9.png` | 386 | "1. Companionship Status (Sahabah).png" | Ch.4 §4.9 |

All 9 images are present in [`source/images/`](source/images/) at their
original resolution (copied byte-for-byte from the `.docx`'s embedded
media, no re-compression) and are also embedded inline in
[`source/raw-transcript.md`](source/raw-transcript.md) in their original
document position, in addition to appearing in their assigned chapter.

**Known gap, flagged rather than hidden:** `image8.png`'s captured text
(the "Summary of the Sunni Verdict" table in Ch.4 §4.9) is cut off
mid-sentence at "Major historical platforms like..." — this is where the
original screenshot itself ends; there is no more content to add. Also,
§5.3 (Fadak, page 89/90) names "this sheikh" and a page number but the
source document does not include the book's title/author or an attached
file — flagged in that section rather than guessed at.

## Link inventory (spot-check — every URL in the source appears in a chapter or the raw transcript)

`shiapen.com` distortion article · `reddit.com/r/shia` · `sunnah.com/abudawud:4646` (×2) ·
2× `youtu.be` videos · `share.google/0fw33KS14ps6fhIrx` · `share.google/aimode/EFs69TVMhkQMRfNko` ·
`sunnah.com` Bukhari 6582 · `sunnah.com` Bukhari 6787 · `share.google/aimode/U7wqo74OC0Stkidul` ·
`al-islam.org` (×2)

## Totals

- **34** message/block units traced above — 100% of the timestamped and
  untimestamped content in the source.
- **9 / 9** images placed.
- **7** chapters, covering: Qur'an, Sunnah & Hadith Authenticity, Salah &
  Worship Practices, Sahaba & Disputes Between Companions, Ahlul Bayt/
  Fatima/Fadak, Imamate/Khilafah/Ghadeer Khumm, General Resources.
- The full unedited source remains available at
  [`source/raw-transcript.md`](source/raw-transcript.md) for anyone who
  wants to verify any chapter entry against the original wording directly,
  rather than relying on this table.

## Addendum (28/08/2026) — methodology guardrails and two new items

After the initial compilation, the project owner added three standing
research-methodology principles (rijal grading is not self-authenticating;
no narrator, Abu Hurairah included, is exempt from scrutiny by fame; watch
for *fulan*/*kalima*/*kadha wa kaza*/truncation as possible concealment).
These are **not** part of the original `.docx` — they are new guidance
given directly in conversation, and are tracked separately from the
source-message trace above so the provenance of every claim in this repo
stays distinguishable at a glance:

| Addition | Placed in | Status |
|---|---|---|
| The three guardrail principles themselves | `METHODOLOGY.md` (new file) | Standing rule, applies project-wide |
| Editorial annotation on the Ka'b al-Ahbar/creation-in-seven-days hadith, identifying the isnad as running through Abu Hurairah | `chapters/02-sunnah-and-hadith-authenticity.md`, §2.1 (added as a note beside the existing verbatim quote, which was not altered) | Flagged NEEDS VERIFICATION — open item #1 in `METHODOLOGY.md` |
| New question: Abu Hurairah's "Salah invalidated by dog/donkey/woman" narration and Aisha's (RA) reported rebuke | `chapters/03-salah-and-worship-practices.md`, §3.2 (new section) | Flagged NEEDS VERIFICATION — open item #2 in `METHODOLOGY.md` |

Per `METHODOLOGY.md`'s own rule, both new claims are marked "NEEDS
VERIFICATION" rather than given a specific hadith citation, since this
project has not yet independently confirmed the exact references — that
confirmation is tracked as open research items in `METHODOLOGY.md` for
the "detailed research" phase the project owner indicated is wanted next.

## Addendum (28/08/2026) — priority, status tracking, and answer dossiers

Also added: a priority ranking (P0–P3) and status checklist (⬜/🟨/✅/✅✅)
for each of the 25 trackable questions across Chapters 1–6, a per-chapter
"Chapter Progress" table, a cross-chapter [`TRACKER.md`](TRACKER.md), a
[`RESEARCHER-PROTOCOL.md`](RESEARCHER-PROTOCOL.md) mandating a full source
log and explicit methodology citation for every answer, and an empty
`answers/` dossier per question. None of this is source content — it is
project tooling layered on top, generated consistently from a single data
table so every question's priority/status/answer-link line matches across
its chapter entry, its `TRACKER.md` row, and its dossier file. All 25
dossiers currently start at ⬜ Not Started with every field empty; the
25-question count matches Chapter 7's 2 items and the two cross-reference
sections (§2.3, §6.3) plus the video-links section (§6.2) being marked
N/A rather than tracked, since none of those five are themselves
questions.

## If you find something missing

If you spot a sentence, link, reference, or image from the original
document that isn't reflected in `chapters/`, that is a real gap — please
flag it. The design of this repo (raw transcript kept verbatim + this
trace table) is meant to make such gaps checkable by anyone, not just
assumed away.
