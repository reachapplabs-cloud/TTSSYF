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

## No claim in the answer text goes uncited — inline `[R#]` tags

**Added 2026-08-29, at the project owner's explicit instruction: a
reference list at the bottom of a dossier is not enough on its own — the
prose of the Answer itself must show, sentence by sentence, which
reference backs which claim.** A confidence-tagged list that a reader
has to manually match back to the paragraph above it is not fully
traceable; an abbreviation is fine, a full citation inline every time is
not required, but every factual claim needs *some* marker tying it to
its source.

The convention every dossier under `answers/` now follows:

1. Number every entry in **References** (renamed from "Supporting
   Documentation & Proofs") `R1`, `R2`, `R3`, ... in the order it's first
   cited.
2. In the Answer's prose (Weighing it / the Shia position / the Sunni
   position, or whatever section structure the question uses), append
   the matching `[R#]` tag immediately after each claim that reference
   supports — including when the same reference is invoked again in a
   later paragraph or a different panel.
3. A claim with no reference to attach is a sign either that it needs
   one (go find it, or mark the gap explicitly) or that it's this
   dossier's own reasoning/inference rather than a sourced fact, in
   which case say so in words ("this dossier's own inference," "an
   interpretive step, not a citation") rather than leaving it looking
   uncited by omission.
4. `[R#]` tags may repeat across the Weighing it / Shia / Sunni sections
   freely — the same reference often supports more than one section's
   argument, and re-tagging it each time is expected, not redundant.

## What a confidence tag actually measures

**Added 2026-08-29, after the project owner flagged a grading
inconsistency and this project confirmed, by directly testing it with
`WebFetch`, that its network access to sunnah.com, al-islam.org,
wikishia.net, and even plain Wikipedia is genuinely blocked at the
network egress proxy level (`EGRESS_BLOCKED`), not a self-imposed or
imagined restriction.** A confidence tag grades how sure this project is
that *this specific citation* (an exact hadith number, page, or wording)
is accurate, not how strong or important the claim is. Use exactly one
of these four phrasings to open a Reference entry's confidence sentence,
so the wording stays machine-parseable for the public document as well
as human-readable:

- **`High confidence.`** Either (a) directly verifiable without needing
  a blocked primary database — the Qur'an's own text, or a claim already
  established in this project's own prior research — or (b) two or more
  independent `WebSearch` queries converged on the same specific fact or
  number with no contradicting result found anywhere. Convergent
  independent search corroboration is real evidence, not a consolation
  grade below what a primary-page read would give — a primary-page read
  isn't available this session, so this is the strongest evidence this
  project can actually produce, and should be graded like it.
- **`Medium confidence.`** The substance of the claim is supported by
  search results, but either only one source was found, or independent
  results showed minor variation (e.g. differing hadith-count figures)
  without contradicting the core claim.
- **`Low confidence, citation not pinned.`** The underlying claim, event,
  or report is solidly attested, but a specific citation detail (exact
  hadith number, page, wording) could not be pinned to one unambiguous
  reference this session, often because a source repeats the same
  material under more than one number or placement. This is a
  bibliographic gap, not a credibility problem with the underlying fact
  — don't undersell a well-attested claim just because the modern
  numbering is fuzzy.
- **`Unverified, not independently checked.`** This claim has not been
  checked against any source this session at all, or the only source
  found is itself contested, single-chain, or otherwise shaky. This is a
  real evidentiary gap in the argument, and reads meaningfully weaker
  than the citation-precision case above even though the public document
  colors both the same (red, "low or below" — see below).

The public artifact colors confidence in exactly three tiers (green =
high, gold = medium, red = everything at or below low confidence), so
`Low confidence, citation not pinned` and `Unverified, not independently
checked` render as the same color by design. The distinction is carried
in the label text itself, which is why the exact phrasing above matters:
a reader who taps the reference should immediately see which kind of gap
they're looking at, not just a generic "low confidence."

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
| ✅ Answered | Answer + documentation written | Full Source Consultation Log complete per the rules above; Methodology Applied filled in; every claim in the Answer's prose carries an inline `[R#]` tag per the rule above |
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
