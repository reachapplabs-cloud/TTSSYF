# Shia–Sunni Clarification Questions (for an Ahl-e-Hadith Group) — v2

A consolidated, chapter-organized compilation of clarification questions —
with their full references, proofs, and images — that are intended to be
put to an Ahl-e-Hadith group, argued from a Shia perspective. This is a
private research/reference compilation, not a published polemic; it was
assembled to make sure every question, reference, and image from the
original source material is preserved, findable, and checkable, none of
it silently dropped or altered.

## This is v2 — the living, editable version

**v1 is frozen and saved** at
[`shia-sunni-clarification-qs/`](../shia-sunni-clarification-qs/) in this
same repository (commit `43d3160` on this branch is its exact state).
Every question, reference, and image in v1 is byte-for-byte verbatim from
the original `.docx` — nothing there was ever reworded, and it stays that
way permanently as the audit trail.

**v2 (this folder) has different, explicitly wider permissions:**

- Questions **may be reworded, clarified, merged, or split** for
  readability — v1 no longer has to be quoted word-for-word here.
- **New questions may be added** as research surfaces them.
- Images may be represented as **transcribed text + a link to the
  original image** (in `source/images/`, shared with v1) instead of being
  re-embedded in full — see each chapter's "Source images" notes.
- **The one absolute constraint carried over unchanged: nothing may be
  omitted, only improved.** Every question, reference, and image present
  in v1 must still be findable somewhere in v2 — reworded, reorganized, or
  relocated is fine; dropped is not. Any content added in v2 that isn't
  in v1 stays clearly marked as new (matching the pattern already
  established for the two Abu Hurairah items in §2.1/§3.2).
- **`METHODOLOGY.md`'s three guardrail principles still apply without
  exception** — rijal grading isn't self-authenticating, no narrator is
  exempt by fame, and concealment patterns (*fulan*/*kalima*/*kadha wa
  kaza*/truncation) get flagged. v2's extra editing freedom is about
  presentation, not about relaxing what counts as evidence.
- Every substantive change made under this policy is logged in
  [`CHANGELOG.md`](CHANGELOG.md) — v2 stays auditable even while it's
  editable.

**Perspective note, so the framing is explicit for anyone reading this
later:** the questions below are written from the standpoint that the
Shia position is correct and are posed *to* an Ahl-e-Hadith (Sunni)
group as a challenge. That framing has been kept intact — it has not
been softened, neutralized, or rewritten as "balanced." Some of the
supporting material (e.g. the Qur'an-completeness essay in Chapter 1) is
itself a rebuttal of an accusation commonly made against Shia Muslims,
so it argues the opposite direction on that one point; it is included
verbatim regardless, because the source included it.

## Read this first: [`METHODOLOGY.md`](METHODOLOGY.md)

This project runs under five non-negotiable guardrail principles set by
the project owner: (1) *rijal* (narrator) grading — including "Sahihain"
status itself — is never taken as automatically true, in either direction
(a narrator called reliable, or one called a liar/forgetful, both get
scrutinized rather than deferred to, since either verdict can be
politically motivated); (2) no narrator is exempt from scrutiny on the
strength of fame, Abu Hurairah included; (3) Bukhari's (or any
collector's) use of *fulan*, *kalima*, *kadha wa kaza*, or silent
truncation is flagged as a possible sign of concealment, not passed over;
(4) everything either contributor forwards or writes — including their
own reflections and theories, not only the classical material they cite
— is context to research, not fact to repeat; (5) a sudden appointment to
power or position, a reversal from exile, or leniency for a grave offense
is treated as a red flag worth investigating for incentive, not a neutral
biographical footnote. Full detail, including worked examples for each
and the running list of open research items, is in
[`METHODOLOGY.md`](METHODOLOGY.md) — read it before treating anything in
`chapters/` as a settled conclusion rather than a compiled question.

## How this repo is organized

```
shia-sunni-clarification-qs-v2/
├── README.md              — this file
├── CHANGELOG.md            — log of every substantive edit/addition made
│                             in v2 (required by the v2 editing policy
│                             above — v2 stays auditable while editable)
├── METHODOLOGY.md          — read first: the guardrail principles this
│                             whole project runs under (unchanged from v1)
├── RESEARCHER-PROTOCOL.md  — mandatory process for answering a question:
│                             log every source, cite precisely, apply the
│                             methodology explicitly
├── TRACKER.md              — master board: every question, ranked by
│                             priority, across all chapters
├── MASTER-TABLE.md          — same 25 questions as one flat table: rank,
├── MASTER-TABLE.csv          chapter, priority, question, image
│                             reference(s), and every reference source/
│                             link — .csv version for Excel/Sheets
├── QA-CHECKLIST.md         — completeness audit inherited from v1: every
│                             source message, link, and image mapped to
│                             where it landed
├── source/
│   ├── raw-transcript.md   — the ENTIRE original v1 document, verbatim,
│   │                         unedited, in original order
│   ├── raw-transcript-2-zo.md — a second source batch (v2 only, added
│   │                         2026-08-28), same verbatim-ground-truth
│   │                         treatment
│   ├── raw-transcript-3-zo-early.md — a third source batch (v2 only,
│   │                         added 2026-08-28) — chronologically the
│   │                         earliest material in the project, 17/08-
│   │                         24/08, predating v1's own opening message
│   └── images/             — all 9 original images, full resolution
├── chapters/
│   ├── 01-quran.md
│   ├── 02-sunnah-and-hadith-authenticity.md
│   ├── 03-salah-and-worship-practices.md
│   ├── 04-sahaba-companions-and-disputes.md
│   ├── 05-ahlul-bayt-fatima-and-fadak.md
│   ├── 08-the-prophets-final-days.md (new in v2)
│   ├── 06-imamate-khilafah-and-ghadeer-khumm.md
│   └── 07-general-resources.md
└── answers/                — one dossier per question: Answer, Supporting
    ├── TEMPLATE.md            Documentation & Proofs, full Source
    ├── 01-quran/              Consultation Log, Methodology Applied,
    ├── 02-sunnah-.../         Researcher & Date — mirrors chapters/ 1:1
    ├── ... (one folder per chapter, one file per question)
```

**Start with the chapter you need**, or with [`MASTER-TABLE.md`](MASTER-TABLE.md)
for a single-page, sortable view of all 25 questions with their rank,
priority, image references, and cited sources in one row each. Each
chapter question still carries a `Source:` line pointing back to the
exact message in `source/raw-transcript.md`, even where the wording has
since been improved — the provenance trail is not optional just because
the wording is now editable.

**If you ever doubt whether something was left out or changed**, go to
[`QA-CHECKLIST.md`](QA-CHECKLIST.md) for the original v1 completeness
audit, and [`CHANGELOG.md`](CHANGELOG.md) for everything that's changed
since — between the two, every question, reference, and image should be
traceable from the original `.docx` all the way to its current form here.

**If you want an honest assessment of the project itself** — not the
source questions, the project — see
[`SYSTEM-QA-REVIEW.md`](SYSTEM-QA-REVIEW.md): flaws, gaps, suggested
process changes, and further-out ideas, including a plain statement of how
much of this compilation is actually verified yet (as of 2026-08-28: not
much — 0 of 39 questions are ✅✅ Verified) and why.

## Tracking, priority, and answers

Every question in Chapters 1–6 and 8 (39 in total, as of 2026-08-28)
now carries:

- A **priority** (P0 = foundational, down to P3 = not yet researchable —
  see [`TRACKER.md`](TRACKER.md) for the full ranking and the reasoning
  behind it), shown right under the question heading in its chapter and
  again in that chapter's **Chapter Progress** table at the top of the
  file.
- A **status checklist** (⬜ Not Started → 🟨 In Progress → ✅ Answered →
  ✅✅ Verified), shown in the same three places: the question itself, the
  chapter's progress table, and [`TRACKER.md`](TRACKER.md)'s master board.
- A dedicated **answer dossier** under [`answers/`](answers/) (mirroring
  `chapters/` folder-for-folder) with slots for the Answer, Supporting
  Documentation & Proofs (precise citations — collection, volume, page or
  hadith number, link), a full Source Consultation Log (every source
  examined, including ones ruled out — not just the ones that ended up
  cited), the Methodology Applied, and the Researcher & Date.

**Start here:** [`TRACKER.md`](TRACKER.md) for the prioritized worklist,
[`RESEARCHER-PROTOCOL.md`](RESEARCHER-PROTOCOL.md) for the required
process before marking anything ✅ Answered. All dossiers currently start
empty (⬜ Not Started) — the chapters compile the questions; the answers
are the next phase of work.

## Chapters

1. **[The Qur'an](chapters/01-quran.md)** — completeness of the Qur'an,
   the seven *ahruf*, the timing of Surah al-Ma'idah 5:3, textual
   transmission standards.
2. **[Sunnah & Hadith Authenticity](chapters/02-sunnah-and-hadith-authenticity.md)**
   — hadith grading, inclusion/exclusion from Bukhari and Muslim, why
   Ahl al-Bayt narrations are said to be neglected.
3. **[Salah & Worship Practices](chapters/03-salah-and-worship-practices.md)**
   — whether the common *Salawat* formula (including the companions) is
   a later addition.
4. **[Sahaba & Disputes Between Companions](chapters/04-sahaba-companions-and-disputes.md)**
   — the Muawiyah narration, the Qirtas incident, cursing Ali from the
   pulpit, the Haud al-Kawthar "ashabi" hadith, the Battle of the
   Camel/first fitnah (including Talhah ibn Ubaydullah, identified via a
   supplied PDF), Marwan's record, who was first to accept Islam, and the
   Muawiya/Yazid/Abu Sufyan naming and dynasty theory.
5. **[Ahlul Bayt, Fatima & Fadak](chapters/05-ahlul-bayt-fatima-and-fadak.md)**
   — who counts as Ahl al-Bayt, the Fadak inheritance dispute, the
   "Attacking the House of Fatimah" incident, Fatima's grievance, and
   Ali's sermon at her grave.
6. **[Imamate, Khilafah & Ghadeer Khumm](chapters/06-imamate-khilafah-and-ghadeer-khumm.md)**
   — Khutbah ash-Shiqshiqiyyah and Sermon 193, the khalifa dispute, the
   nine-source Ghadeer Khumm reference bundle, the "fulan" concealment
   case study (Bukhari Vol.8 Book 82 Hadith 817), and Umar's claim of
   divine sanction.
7. **[General Resources](chapters/07-general-resources.md)** — reference
   links not tied to one specific question.
8. **[The Prophet's ﷺ Final Days](chapters/08-the-prophets-final-days.md)**
   *(new in v2)* — the poisoning/martyrdom theory, and companions'
   conduct at the deathbed including the Qirtas request and Sahih
   al-Bukhari 7280.

## Editorial rules followed in v2

(For the research/source-critical guardrails — how narrators and hadith
themselves should be weighed — see [`METHODOLOGY.md`](METHODOLOGY.md)
instead; this section is only about how the compilation itself is edited.)

- **Nothing present in v1 may be omitted — only reworded, reorganized, or
  improved.** As of this fork, every question, reference, and image
  matches v1 exactly (v2 was seeded as a full copy); the only changes made
  so far are presentational (see [`CHANGELOG.md`](CHANGELOG.md)) — full
  screenshots replaced with transcribed text + an image link where the
  text was already fully captured, and one image pair reordered into
  narrative reading order. No wording, reference, or citation has been
  cut.
- Chapter groupings remain an organizational choice, same as v1 — the
  source itself has no chapters. New questions, if added, should go in
  whichever chapter fits, or a new chapter if none does.
- Where the source itself was incomplete or ambiguous (e.g. a screenshot
  cut off mid-sentence, or a reference to "this sheikh" without a named
  source), that gap stays flagged explicitly rather than filled in with a
  guess, unless and until research (via `RESEARCHER-PROTOCOL.md`) actually
  resolves it.
- The original forwarding note is preserved as context (Chapter 4, §4.1):
  *"I am forwarding as received. The language used by the person asking
  may be disturbing but this is expected and we should not take offence
  but rather be patient and concentrate on our job at hand."*
- Every edit beyond a typo fix gets a line in [`CHANGELOG.md`](CHANGELOG.md)
  — what changed, why, and (if applicable) that it was verified against
  v1/`source/raw-transcript.md` to confirm nothing was lost in the edit.

## Source

Built from `List of questions composed by Arif bhai.docx`, converted
losslessly to Markdown (via `pandoc`) with all embedded images extracted
at original resolution. See [`source/raw-transcript.md`](source/raw-transcript.md)
for the unedited full text.
