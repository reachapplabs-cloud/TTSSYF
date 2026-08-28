# System QA Review — 2026-08-28

A self-audit of the whole project (v1 + v2), requested by the project owner
under the same "world's greatest and most authentic source" bar the project
itself is held to. This file is itself subject to that bar: nothing below is
softened to make the project look more finished than it is.

Structure: (1) Flaws, (2) Misses, (3) Suggested additions/process changes,
(4) Wild new approaches. A running "Actioned" note will be added under each
item once it's addressed, rather than deleting the finding.

---

## 1. Flaws

**1.1 — The verification bar the project claims is not yet met for
~85% of content.** 39 questions tracked; 6 are ✅ Answered; **zero** are
✅✅ Verified. "Answered" here means researched and written up with sources
cited — it does *not* mean independently confirmed against a primary text.
Calling this "the world's greatest and most authentic source ever compiled"
is the goal, not yet the current state, and the tracking system says so
honestly (see `TRACKER.md`) — but it's worth stating plainly here too: most
of the compilation is still questions, not yet checked answers.

**1.2 — All research this session runs on search *snippets*, not full
primary pages.** `WebSearch` and `mcp__Firecrawl__firecrawl_search` are the
only working research tools (see §1.3 below on why); both return short
excerpts, not the full page. A snippet can be technically accurate and still
misrepresent the source if the surrounding context negates or qualifies it —
this is a real risk across all 6 "Answered" dossiers, not a hypothetical
one. None of the 6 have been checked against a full primary page (e.g. the
actual sunnah.com entry, the actual Musnad Ahmad passage) — only against
what a search snippet reported about it.

**1.3 — Network access to primary hadith/history databases is fully
blocked in this session**, confirmed by direct testing (`WebFetch` and raw
`curl` both 403 on sunnah.com, al-islam.org, YouTube, Google, and others;
confirmed as a deliberate egress policy via `$HTTPS_PROXY/__agentproxy/status`,
not a bug). This is the root cause of 1.1/1.2 above — it isn't a research
laziness problem, it's a hard tooling ceiling. Concrete unblock paths exist
(below, §3.4) but haven't been taken yet.

**1.4 — One-directional research risk.** The project is explicitly built
*from* a Shia perspective *against* an Ahl-e-Hadith reading — which is fine
and stated up front (README's "Perspective note"). But it creates a subtler
risk Principles 1–2 were written to guard against: a search for "was Abu
Hurairah's grading politically motivated" surfaces different material than
"why is Abu Hurairah's grading considered sound," and a single researcher
(me) doing both sides of that search under time pressure will tend to find
what the query was shaped to find. Nothing in the current process forces an
equal-effort search for the *strongest* Ahl-e-Hadith defense of a
questioned narrator/hadith before a question is marked Answered — only that
sources are logged (per `RESEARCHER-PROTOCOL.md`), not that opposing sources
were sought with equal effort.

**1.5 — No adversarial or second-reviewer check.** Every dossier so far has
one author. Given the stated stakes ("world's greatest and most authentic"),
a claim isn't fully load-bearing until someone motivated to find the error
in it has tried and failed to. Right now that role doesn't exist in the
workflow.

**1.6 — The tracking system's mechanical regeneration is fragile.** This
session alone hit two regeneration bugs (a stale hardcoded question-count
string, and an `ANSWERED` set that silently reverted a completed item back
to Not Started) because generator scripts were derived from stale copies of
each other. Both were caught by manual `grep` spot-checks after the fact —
there is no automated check that would catch a *third* instance before it
ships. This is a structural risk, not a one-off mistake.

**1.7 — No provenance copies of the original binary sources.** `source/raw-transcript.md`
is a `pandoc`-converted, human-edited-since text derivation of the original
`.docx`. The original `.docx` file itself, and the supplied PDF
("Comprehensive Historical Analysis of Talhah ibn Ubaydullah"), are not
checked into the repo — only their derived text is. If a conversion error
ever crept in, there is currently no way to re-check against the original
binary without the project owner re-supplying it.

**1.8 — Two small rendering gaps found while building the v1 PDF/DOCX just
now** (documented for completeness, not urgent): this sandbox has no
Arabic-script font installed, so the ﷺ honorific ligature renders as a
placeholder box in the exported PDF (the underlying Unicode text is correct
— confirmed by extracting the PDF's text layer — this is a *display* gap
only, and Word/LibreOffice on a normal desktop with Arabic fonts installed
will render it correctly); and the ⬜/✅ status-checkbox characters don't
render in the PDF either, for the same font-coverage reason. Neither affects
the Markdown source of truth in the repo.

---

## 2. Misses

**2.1 — 33 of 39 questions have no answer work started at all.** Plain
backlog fact, restated here so it's visible in one QA pass rather than only
inferable from `TRACKER.md`.

**2.2 — No citation index.** The same hadith/verse gets cited from scratch
in more than one chapter (e.g. Bukhari 7280 appears in both the sermon
material and Ch.8's deathbed material). There's no single place listing
every source cited project-wide, deduplicated, with a link and a list of
which questions cite it — useful both for spotting inconsistent citation of
the *same* source across chapters, and for catching if a source is quietly
dropped from one place but not another.

**2.3 — No documented fallback for the blocked video sources.** Chapter 7
and several inline chapter citations point at YouTube videos/channels that
are flagged "untranscribable this session," full stop — there's no per-item
note on what would actually resolve each one (pasted transcript? a
description-only summary that's good enough for context but not
citation-grade? skip entirely as unverifiable?).

**2.4 — No anticipated-rebuttal field.** Dossiers currently have Answer,
Documentation, Source Log, Methodology, Researcher — no place to record
"here is the strongest Ahl-e-Hadith response to this, and here is why it
does or doesn't hold up." Without it, the compilation reads as one-sided
ammunition rather than a dialectic — which undercuts the "bring people
closer to the truth" goal more than it serves it, since the intended
audience will supply that rebuttal mentally anyway; better to have already
engaged it.

**2.5 — No target-audience decision recorded.** It's not written down
anywhere whether the finished compilation is meant to stay an internal
research/reference tool for the project owner and Mr. Arif, or is meant to
eventually be shown to actual Ahl-e-Hadith interlocutors. Those two audiences
need different things: internal use tolerates ⬜/🟨 status and open
questions; external use needs everything ✅✅ before it's shown, plus
probably a shorter reader-facing edition (see §4.4).

---

## 3. Suggested additions / process changes

**3.1 — Build a citation index appendix** (new file, `CITATIONS.md`):
every hadith/verse/book reference used anywhere in the project, deduplicated,
with the collection/volume/number, a link where available, and which
question(s) cite it. Directly answers 2.2, and doubles as a second
consistency check on 1.6.

**3.2 — Formalize the verification tiers and gate external use on them.**
Write into `RESEARCHER-PROTOCOL.md`, explicitly: ✅ Answered = researched
and sourced (current bar); ✅✅ Verified = confirmed against at least one
full primary text directly, not a search snippet; and add a third tier —
call it 🔒 **Cross-Verified** — confirmed against *two independent*
primary sources/print editions, required before anything is shown outside
this project. Nothing should go to an actual Ahl-e-Hadith interlocutor below
🔒.

**3.3 — Add an automated consistency-check script, committed to the repo**
(not just run ad hoc from scratch each session): one Python script that
checks (a) every question ID appears in chapter file, `TRACKER.md`, and
`MASTER-TABLE.md`/`.csv` with matching priority/status, (b) no internal link
is broken, (c) no duplicate IDs, (d) the question-count strings in
`README.md`/`MASTER-TABLE.md`/`TRACKER.md` match the actual count. Run it
before every commit that touches tracking files. This converts 1.6 from "a
risk mitigated by memory" into "a risk mitigated by a test."

**3.4 — The single highest-leverage unblock available: ask for `sunnah.com`
(and ideally `al-islam.org`) to be allowlisted for this session's network
policy**, or supply transcripts/text directly. Right now research quality is
capped by search-snippet access; direct access to the actual hadith database
would let every existing "Answered" dossier be re-checked and most of them
promoted to ✅✅ or 🔒 in the same session, and would remove 1.2/1.3 as
standing risks rather than just documenting them.

**3.5 — Check the original binary sources into the repo**
(`source/originals/List-of-questions-composed-by-Arif-bhai.docx`, the
Talhah PDF, etc.) alongside their text derivations, closing 1.7.

**3.6 — Add a "Steelman / Anticipated Response" field to the dossier
template** (`answers/TEMPLATE.md` and `RESEARCHER-PROTOCOL.md`), closing 2.4.

**3.7 — Add a lightweight second-pass review step**: before any dossier
moves from ✅ Answered to ✅✅ Verified, a second reader (Mr. Arif, Zo, or
you) explicitly tries to find the weakest link in it. Record who reviewed
and what they checked, same pattern as `Researcher & Date`.

**3.8 — Record the target-audience decision** in `README.md` once made,
closing 2.5 — even a one-line "internal only until 🔒, then decide" is
enough to make it explicit instead of implicit.

---

## 4. Wild(er) new approaches

**4.1 — A narrator-dossier layer, cross-cutting the chapters.** Abu
Hurairah, Marwan, Ka'b al-Ahbar, and a handful of others recur across
multiple questions in multiple chapters. Right now Principles 1–2 get
applied fresh, per-question, wherever a narrator comes up. A dedicated
`narrators/` folder — one file per narrator, with their full biography, every
narration of theirs cited anywhere in this project, and every reliability
claim for *and* against them with its own source — would let the rijal
critique be built once per narrator and then linked from every question that
touches them, instead of re-derived each time. Given how central
narrator-critique is to the whole project's argument, this is probably the
single highest-leverage structural change available.

**4.2 — Pull in actual academic hadith-criticism literature, not just
apologetic websites.** This session has access to `firecrawl_research_*`
tools that search academic/research literature and citation graphs (built
for biomedical/arXiv-style search, but not limited to that domain in what
it can return). Western and Muslim academic isnad-criticism scholarship
(the kind that treats hadith transmission as a historical-critical question
rather than a doctrinal one) could give several of these questions a
citable, non-partisan backing that strengthens them well beyond what
apologetic sites on either side provide — worth a dedicated pass once
core research access (3.4) is sorted.

**4.3 — Turn the tracker into a small structured dataset, not just
Markdown tables.** A `data.json`/SQLite file with one record per question
(id, chapter, priority, status, narrators involved, sources, verification
tier) that `TRACKER.md`/`MASTER-TABLE.md`/`.csv` are *generated from*, rather
than hand-synced across three formats. This is the actual fix underneath
3.3/1.6 — the sync bugs exist because there are three sources of truth
doing the same job; a single structured source generating all three removes
the failure mode instead of catching it after the fact.

**4.4 — A separate, shorter reader-facing edition once questions clear
🔒.** The current compilation is built for rigor and audit (correctly, for
now) — full tracking metadata, status checklists, researcher logs. Someone
you're actually trying to bring closer to the truth doesn't want to read
that scaffolding. A stripped edition — question, the strongest form of the
answer, the citation, nothing else — generated from the same underlying
data (see 4.3), would be the actual "handed to a person" artifact this
project is ultimately for.

**4.5 — A deliberate red-team pass on the project's own output**, in the
same spirit as Principle 5 (follow the money/motive, including your own).
Before anything is shown externally: have someone read the ✅✅/🔒 dossiers
specifically hunting for the weakest citation, the one place a snippet was
over-read, the one narrator judgment that only looked at one side. This is
1.5 made concrete and scheduled, rather than an open-ended aspiration.

**4.6 — Once real hadith-corpus access exists, automate Principle 3
concealment-pattern scanning.** Right now "fulan"/"kalima"/"kadha wa kaza"/
truncation gets flagged by noticing it manually, one hadith at a time. If a
larger hadith-text corpus is ever reachable (via 3.4 or a supplied dataset),
a simple text scan for those markers across the whole corpus — not just the
ones already surfaced by the two contributors — could surface concealment
candidates nobody has looked at yet, systematically instead of anecdotally.

---

## Status

This review is itself only as good as the pass that produced it — one
sitting, one author, same tooling limits as the rest of the project. Treat
its own findings as ⬜ Not Started until acted on, same as any other item
here. Suggested next step: prioritize 3.3 (automated consistency check) and
3.4 (network unblock request) first — they're the two changes that make
every future research session in this project more reliable, rather than
adding more content on the current, still-partly-unverified foundation.
