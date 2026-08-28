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

---

# Part 2 (v2 only) — Second Source Batch

Added 2026-08-28. This part traces
[`source/raw-transcript-2-zo.md`](source/raw-transcript-2-zo.md) (a
second WhatsApp-style log, from a contributor labelled "💎 Zo") and the
supplied PDF `DOC20260826WA0000.pdf` ("Comprehensive Historical Analysis
of Talhah ibn Ubaydullah") to where each landed. Neither is part of v1 or
the original `.docx` — this part exists only in v2. Per
[`METHODOLOGY.md`](METHODOLOGY.md) Principle 4, everything traced below
is context supplied to this project, not fact certified by it.

## Message-by-message trace (raw-transcript-2-zo.md)

| Timestamp | Content | Placed in |
|---|---|---|
| 18/08, 03:58 | youtu.be/hySeAufRLMM + "if kuliyah answers this it suffices" + nasai:3006 | Ch.7 §7.3 |
| 18/08, 04:04 | acrobat.adobe.com PDF link (undescribed) | Ch.7 §7.4 |
| 18/08, 04:06 | Discord invite | Ch.7 §7.5 |
| 18/08, 14:06 & 15:07 | "All about hadith explanation" video + "5 mins is good" note | Ch.7 §7.6 |
| 19/08, 01:46 | "To check if this is true" + YouTube short | Ch.7 §7.7 |
| 20/08, 12:03 | Sahih al-Bukhari 6830 (Hudood), "came across at random" | Ch.7 §7.8 |
| 26/08, 04:53 | "New evidence" / Aisha-pawn-in-first-fitnah theory | **Duplicate** of Ch.4 §4.4/§4.6 (near-identical wording to `raw-transcript.md`, 26/08/2026 6:57:23–24 AM) — not re-entered as new content |
| 26/08, 08:45 (×2) | "Meaning of muawaiya as a name... 50 references" + shiapen.com link | Ch.4 §4.11 (shiapen link is a duplicate of §4.1's; the naming claim is new) |
| 26/08, 09:11 | "Full video for this" (or6kWCF1rS8) | Ch.4 §4.11 |
| 26/08, 12:05 | "Ali emulates our Prophet..." | Not placed in a chapter — a short standalone devotional remark with no linked question or citation; logged here rather than dropped. |
| 26/08, 13:00–13:11 | Riyad as-Salihin 664 + companion-planning note + "More details in the pdf" + aimode link + abudawud:4646 | Ch.4 §4.7 (same content as `raw-transcript.md` 26/08/2026 2:58:07–08 PM; the "More details in the pdf" line is new and is what the Talhah PDF answers) |
| 26/08, 13:32–13:35 | "Hasten to defense of companions" + Bukhari 6582/6787 + "not a blanket rule" | **Duplicate** of Ch.4 §4.5/§4.8 and Ch.4 §4.9's framing (near-identical wording to `raw-transcript.md`, 26/08/2026 2:58:08–10 PM) — not re-entered as new content |
| 26/08, 20:02 | "Abu Bakr first to accept Islam" question | **Duplicate** of Ch.4 §4.10 (identical wording to `raw-transcript.md`, 26/08/2026 9:03:18 PM) — cross-referenced there |
| 26/08, 21:16 | Abu Sufyan/dynasty theory + aimode link | Ch.4 §4.12 |
| 26/08, 21:18 | "Another sign of coming times" + aimode link | Ch.4 §4.12 |
| 26/08, 21:28–21:29 | Nahjul Balagha Sermon 3 link + reflection | Ch.6 §6.5 |
| 26/08, 21:37 | Nahjul Balagha Sermon 193 link | Ch.6 §6.5 |
| 26/08, 21:43 (×2) | "Muawiya = howling fox/dog", "Yazid = an increase" | Ch.4 §4.11 |
| 26/08, 21:52 | "Al-Sufyani from the same tree" + extended reflection on ahl al-bayt/accountability | Ch.4 §4.12 |
| 26/08, 22:07 | "We don't owe it to anyone to justify their actions..." | Not placed in a chapter — general reflection, no linked citation; logged here. |
| 26/08, 22:09 | "If we ask anyone who has wronged us..." | Not placed in a chapter — general reflection, no linked citation; logged here. |
| 26/08, 22:22 | "Assuming this hadith is true..." + Bukhari 6787 link + Muslim 1978a | Ch.5 §5.7 |
| 26/08, 22:25 | Surah Ash-Shura 40 | Ch.5 §5.7 |
| 27/08, 01:50 | marefateahlebait.com link | Ch.7 §7.10 |
| 27/08, 02:40–03:13 | Poisoning/martyrdom theory + 5 aimode links | Ch.8 §8.1 |
| 27/08, 03:17–03:57 | Extended deathbed-conduct passage (9 messages) + Bukhari 7280 | Ch.8 §8.2 |
| 27/08, 17:03 | "Video about bukhari. Clear contradictions" | Ch.7 §7.9 |
| 28/08, 04:12 | "Attacking the House of Fatimah" link | Ch.5 §5.6 |
| 28/08, 04:23 | Bukhari Vol.8 Book 82 Hadith 817, "fulan" argument | Ch.6 §6.6 |
| 28/08, 04:31 | Umar's "Allah has written for me to say" claim | Ch.6 §6.7 |

**Three short standalone remarks** (26/08 12:05; 26/08 22:07; 26/08
22:09) had no attached citation or distinct question and were not made
into chapter entries — they are logged in the table above, and their
full text remains verbatim and findable in
`source/raw-transcript-2-zo.md`, so they are not lost, only not given
their own numbered question.

## PDF trace (`DOC20260826WA0000.pdf`)

The entire 7-page document ("Comprehensive Historical Analysis of Talhah
ibn Ubaydullah") was read in full. Every section of it (marriage intent,
anti-Uthman letters, Jamal War alliance, assassination by Marwan, the
Sunni/Shia theological framing, the pre-battle letters, the battlefield
confrontation, and the two men's differing fates) is summarized with its
full citation list at
[Chapter 4, §4.7](chapters/04-sahaba-companions-and-disputes.md). No
section of the PDF was omitted.

## Totals for Part 2

- **34 timestamped messages** in `raw-transcript-2-zo.md`, all traced
  above.
- **7 PDF pages**, fully summarized with citations preserved, at §4.7.
- **9 new trackable questions** added (§4.11, §4.12, §5.6, §5.7, §6.5,
  §6.6, §6.7, §8.1, §8.2) plus **one upgraded** (§4.7, P3→P0).
- **8 general-resource items** added to Chapter 7 (§7.3–§7.10).
- **5 YouTube video links** in this batch (plus 2 already known from v1)
  could not be transcribed — see `METHODOLOGY.md`, open item #5.
- Combined with Part 1, this repo tracked **34 research questions**
  across **8 chapters** as of this Part 2 pass — see
  [`TRACKER.md`](TRACKER.md) and [`MASTER-TABLE.md`](MASTER-TABLE.md) for
  the current full board. **Update, same day:** a 35th question (§2.4,
  on Bukhari's contents and compilation numbers) and a 36th (§2.5, on
  Muslim's "the righteous lie more in hadith" passage) were added
  directly from questions the project owner asked in conversation — see
  [`CHANGELOG.md`](CHANGELOG.md) for those entries; neither is traced
  here since neither came from either raw transcript.

---

# Part 3 (v2 only) — Third Source Batch (chronologically earliest)

Added 2026-08-28. This part traces
[`source/raw-transcript-3-zo-early.md`](source/raw-transcript-3-zo-early.md)
— a third WhatsApp-style log, from "💎 Zo" and a second participant
"Home," spanning **17/08–24/08**, chronologically the *earliest*
material in this project (predating both v1's `raw-transcript.md`,
which starts 24/08 23:59, and the second batch). Not part of v1 or the
original `.docx`. Per `METHODOLOGY.md` Principle 4, everything traced
below is context, not fact.

**Notable provenance finding:** the message at 23/08 02:44 in this batch
is word-for-word the opening message of v1's `raw-transcript.md` (there
attributed to "Arif Bhai," dated 24/08 23:59). This batch shows Zo
originated that message roughly a day earlier, in conversation with
Home, before it was forwarded into the group v1 was built from.

## Message-by-message trace

| Timestamp | Content | Placed in |
|---|---|---|
| 17/08, 00:41 | Pro-Umar sanads trace to family/appointed leaders | Ch.4 §4.13; also the origin of `METHODOLOGY.md` Principle 5 |
| 18/08, 01:42 & 20/08, 06:03 | "Here's the reference" video (2sez-8nPtSc) | Ch.7 §7.11 |
| 18/08, 02:11 & 02:44 | "Reference from the other side" video + t=2441 "Proof" (YJoKIEshBMg) | Ch.7 §7.12 |
| 20/08, 04:56–05:09 | Ka'b al-Ahbar/Abu Hurairah isnad-logic questions; "sheikh noor" curriculum question | Ch.2 §2.1 (appended as follow-up) |
| 20/08, 05:15–06:48 | Surah 'Abasa "he frowned" exegesis dispute | Ch.1 §1.5 |
| 20/08, 06:49 | "Pls watch this full video" (yXCMU72z0Ms) | Ch.7 §7.13 |
| 21/08, 19:22–20:24 | Two YouTube channels (@thebelievers112, @hassanallahyari) | Ch.7 §7.14 |
| 21/08, 20:25–23:48 | "Faith over proof" reflection (a friend's view on Qur'an-changed belief, relayed and expanded) | Not placed in a chapter — reflection with no citation or distinct question; logged here, full text remains in the raw transcript. |
| 22/08, 00:09 | "I'll try to start compiling the references" | Organizational note, not placed in a chapter |
| 23/08, 02:44 (×2) | Opening message (shiapen link, "It is alarming") + "enough homework for a month" | **Duplicate** of Ch.4 §4.1 (identical to `raw-transcript.md`'s opening message) — not re-entered; see provenance note above |
| 23/08, 02:47 | "Pen down the position allocated to each of the accused" | Ch.4 §4.13; `METHODOLOGY.md` Principle 5 |
| 23/08, 03:00–03:01 | "Widespread sin, didn't want a righteous leader" + "who introduced the other words using the same sanad" | Ch.4 §4.13 |
| 23/08, 03:03 | "If you tap on the links... shows the pages of the hadith book" | Meta/navigation note, not placed in a chapter |
| 23/08, 03:08 | The original articulation of the fulan/kadha-kaza/kalimat/omission pattern | `METHODOLOGY.md` Principle 3 (provenance correction added) |
| 23/08, 03:25 | "Imams were paid to whitewash" claim | Ch.4 §4.13, explicitly flagged as an unverified interpretive lens, not fact |
| 24/08, 06:27 | "Were you able to go through this link... reconcile via appointed researcher" | Organizational note, not placed in a chapter |
| 24/08, 06:28 & 06:31 | Shiat-al-Ali as first muhaddithin; "Ahl-e-Hadith" Qur'anic-origin claim | Ch.2 §2.6 |
| 24/08, 06:50–06:54 | Reddit link + abudawud:4646 + "not shaz, it's kazab" | **Duplicate** of Ch.4 §4.1 (identical to `raw-transcript.md`'s second/third messages) — not re-entered |
| 24/08, 07:46–07:51 (Home) | Acknowledgment + "putting together a research team... list down all issues in sequence" | Organizational/context note, not placed in a chapter — quoted in full in `README.md`'s project-history context where relevant |

**Five short organizational/meta remarks** (22/08 00:09; 23/08 03:03;
24/08 06:27; 24/08 07:46; 24/08 07:51) and **one extended reflection**
(21/08 20:25–23:48) had no attached citation or distinct research
question and were not made into chapter entries — they remain fully
findable, verbatim, in `source/raw-transcript-3-zo-early.md`, and are
logged in the table above so they are not silently lost.

## Totals for Part 3

- **34 timestamped messages**, all traced above.
- **1 new chapter** section added (Ch.1 §1.5); **1 case study** section
  added (Ch.4 §4.13); **1 new item** (Ch.2 §2.6); **1 case study
  expanded** (Ch.2 §2.1's Ka'b al-Ahbar follow-up); **4 general
  resources** added (Ch.7 §7.11–§7.14).
- **1 new methodology principle** (Principle 5, the money/power trail)
  and **1 provenance correction** (Principle 3's original wording,
  traced to this batch).
- **2 duplicate message groups** identified and cross-referenced rather
  than re-entered, including the notable finding that v1's opening
  message originated in this earlier Zo/Home exchange.
- Combined with Parts 1–2 and the two directly-researched additions
  (§2.4, §2.5), this repo now tracks **39 research questions** across
  **8 chapters** — see [`TRACKER.md`](TRACKER.md) and
  [`MASTER-TABLE.md`](MASTER-TABLE.md) for the current full board.
