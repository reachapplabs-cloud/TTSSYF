# Researcher Protocol

*(v2 copy, unchanged from v1 — this process applies to any answer written
in v2's `answers/` dossiers exactly as it did in v1.)*

**This document is mandatory reading before answering any question in this
repository.** The project owner's stated intent is for this compilation to
become the most authentic, rigorously-sourced report of its kind — not a
polemic that quotes selectively to win an argument. That standard is only
as good as the discipline behind each individual answer. Nothing below is
optional, and nothing below may be skipped to save time.

## Before you start

1. Read [`METHODOLOGY.md`](METHODOLOGY.md) in full. Its three guardrail
   principles govern how every source in this project is weighed:
   - *Rijal* grading (a narrator called reliable, or called a liar/weak of
     memory) is never accepted automatically in either direction.
   - No narrator is exempt from scrutiny by reputation — including Abu
     Hurairah, Bukhari, or anyone else however celebrated.
   - A collector's use of *fulan*, *kalima*, *kadha wa kaza*, or silent
     truncation is flagged as a possible sign of concealment, not passed
     over.
2. Read the chapter section for the question you're answering — the
   verbatim question and its original supporting material live there, not
   in the answer dossier. Do not start from the dossier alone.
3. Read [`QA-CHECKLIST.md`](QA-CHECKLIST.md) if you need to confirm exactly
   what the source document did and didn't say — it traces every message
   in the original transcript to where it landed.

## The non-negotiable rule: log every source, not just the ones you cite

This is the single most important rule in this protocol, and the one most
likely to be shortcut under time pressure. **Do not skip it.**

A citation list that only shows the sources supporting the final answer is
not a research record — it's a highlight reel. It hides exactly the kind
of selective use of evidence this project exists to correct for (see
`METHODOLOGY.md`'s framing of rijal criticism as sometimes politically
motivated — the only way to catch that kind of bias in your *own* work is
to force yourself to write down what you looked at and rejected, not only
what you kept).

Every answer dossier's **Full Source Consultation Log** must include:

- **Every primary source examined** — every hadith collection, tafsir,
  history, or rijal work you opened while researching the question — even
  if it turned out irrelevant or you decided not to use it.
- **Every source that contradicted your eventual answer**, clearly marked
  as such, with your reasoning for why you did or didn't weight it in the
  final Answer.
- **Every source that was inconclusive** — didn't clearly support or
  contradict — rather than silently dropping it because it wasn't useful.
- **Both Sunni and Shia sourcing**, where the question touches a disputed
  point between them — a one-sided source list is not acceptable on a
  question that is, by construction, about a disagreement between two
  traditions.

Use this exact marking convention in the log (already scaffolded into
every dossier under `answers/`):

- `✅ Used` — cited in the Answer / Supporting Documentation
- `⚠️ Consulted, not used` — checked, didn't clearly support or contradict
- `❌ Ruled out` — checked and found unreliable, irrelevant, or contrary to
  the eventual answer

Each entry needs a one-line reason. "Not relevant" is not a reason;
"discusses a different verse" is.

## Citation standard

Every claim in **Supporting Documentation & Proofs** needs a precise
locator, not a vague reference:

- Collection/book name, and edition if it affects numbering
- Volume and page number where the source uses them
- Hadith number where the collection has one
- A direct link where one exists (sunnah.com, al-islam.org, etc.)
- The isnad/narrator chain where relevant to the question (per
  `METHODOLOGY.md`, Principle 1 — you cannot apply the rijal-scrutiny rule
  without knowing who is in the chain)

"It's a famous hadith" or "widely reported" is not a citation. If you
cannot pin the exact reference, say so explicitly and mark the item
`NEEDS VERIFICATION` rather than presenting it as settled — this project's
own additions are held to the same standard it applies to the sources it's
critiquing.

## State your methodology explicitly

Every dossier's **Methodology Applied** section must say, in plain
language, which of the three `METHODOLOGY.md` principles you invoked and
how — not just "methodology followed" as a checkbox. For example:

> Principle 1 applied to Narrator X: classical rijal works grade him
> *thiqah* (reliable), but this project checked whether that grading came
> from a scholar operating under [dynasty/period] before accepting it
> without further scrutiny; found [conclusion].

If a question doesn't cleanly map to one of the three principles, say why
— don't leave the section blank on the assumption it doesn't apply.

## Bias discipline

- Present the strongest form of the opposing view before rebutting it —
  not a weakened version of it.
- When Sunni and Shia sources disagree on a fact (not an interpretation),
  both accounts belong in the Supporting Documentation, not just the one
  that supports the expected conclusion.
- If, after research, the evidence does not clearly support the framing
  implied by the original question, say so plainly in the Answer. A
  dossier that reaches "inconclusive" or "the source material doesn't
  hold up" is a successful piece of research, not a failed one — this
  project is not graded on confirming the premise of every question.

## Status states and what moves a question between them

| Status | Meaning | Requirement to reach it |
|---|---|---|
| ⬜ Not Started | Default state | — |
| 🟨 In Progress | Actively being researched | Researcher name/date entered |
| ✅ Answered | Answer + documentation written | Full Source Consultation Log complete per the rules above; Methodology Applied filled in |
| ✅✅ Verified | A second pass has independently checked the sourcing | A different researcher (or the same researcher after a genuine cooling-off re-read) has re-checked every citation in Supporting Documentation against its primary source and confirmed the log is complete |

Do not mark a question ✅ Answered with an empty or partial Source
Consultation Log. Do not mark a question ✅✅ Verified without a second,
independent pass.

When you change a question's status, update it in **three places** so they
stay in sync: the answer dossier (`answers/<chapter>/<id>.md`), the
question's entry in its chapter file (`chapters/<chapter>.md`), and the
row in [`TRACKER.md`](TRACKER.md). If they ever disagree, the answer
dossier is authoritative — fix the other two to match it.

## If you find something the original compilation got wrong

If research on a question reveals that the chapter's framing, an
attributed quote, or a citation carried in `source/raw-transcript.md` is
itself mistaken (a misattributed hadith, a wrong verse number, a
misidentified book): **do not edit the verbatim source or chapter text.**
Record the discrepancy in the relevant answer dossier's Answer section,
citing your evidence, and flag it prominently. The verbatim record stays
intact as the historical record of what was originally claimed; the
correction lives in the research layer built on top of it.
