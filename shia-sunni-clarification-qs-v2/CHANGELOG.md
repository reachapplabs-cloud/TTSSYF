# Changelog — v2

Every substantive change made in v2 is logged here: what changed, why, and
confirmation that nothing from v1 was lost in the process. Typo fixes and
pure formatting (line wrapping, whitespace) aren't logged individually;
anything that changes wording, structure, ordering, or adds/removes
content is.

This log exists because v2's editing permission ("reword, reorganize,
improve — never omit") is only trustworthy if it's checkable. See
[`README.md`](README.md) for the full policy and
[`../shia-sunni-clarification-qs/`](../shia-sunni-clarification-qs/) (or
commit `43d3160` on this branch) for the frozen v1 baseline everything
here can be diffed against.

---

## 2026-08-28 — Answered a second direct question: Muslim's "the righteous lie more in hadith" passage (new §2.5)

**What:** The project owner asked, after seeing an unfamiliar/garbled
version of the claim ("Imam Muslim said all pious men are liars"),
whether this was true, what it meant, and whether it made Muslim's own
book self-refuting. Researched via three independent WebSearch queries
that converged on the same result: the quote is attributed to **Yahya
ibn Sa'id al-Qattan**, recorded (not originated) by Muslim in his
Muqaddimah — *"we do not see the righteous more false in anything than
they are regarding Hadith"* — with Muslim's own gloss, *"falsehood flows
upon their tongues although they do not intend to lie."* Corrected the
paraphrase (this is a narrow, technical observation about unintentional
inaccuracy among devout narrators, not a blanket claim that pious people
are dishonest) and explained why it is not self-refuting on Muslim's own
terms (it is his stated justification for applying isnad-criticism
universally, not an admission that undermines the book that follows).

Added as **[Chapter 2, §2.5](chapters/02-sunnah-and-hadith-authenticity.md)**
after the project owner explicitly confirmed they wanted it added. Framed
as primary-source support, from inside the Sunni tradition itself, for
`METHODOLOGY.md` Principles 1–2, and closes with a genuinely open
question this project has not resolved: whether isnad-criticism (built
to catch deliberate liars) is well-suited to catching sincere,
unintentional inaccuracy at all — logged as an open question, not
resolved either direction, per Principle 4. Marked ✅ Answered, not ✅✅
Verified, for the now-standard reason: sourced via search triangulation
across three independent queries, not a directly-read primary page.
`TRACKER.md` and `MASTER-TABLE.md`/`.csv` regenerated for all 36
questions.

---

## 2026-08-28 — Investigated video-transcription blocker; answered a direct question on Bukhari's contents (new §2.4)

**What (tooling investigation):** The project owner asked whether this
session could connect to their system or use a GitHub-hosted skill to
transcribe the YouTube videos flagged as blocked (`METHODOLOGY.md`, open
item #5), and pushed for a non-obvious workaround rather than a repeated
"blocked" report. Root-caused properly this time: the proxy's own status
endpoint logs `recentRelayFailures` showing `www.youtube.com:443` and
`www.google.com:443` both rejected with "gateway answered 403 to CONNECT
(policy denial)" — confirmed identical for Bash-level `curl`, not just
`WebFetch`, and confirmed as an intentional, documented org-level egress
policy (`/root/.ccr/README.md`: "Do not retry or route around it —
report the blocked host") rather than a fixable tool problem. Checked the
GitHub account (`list_repos`, unfiltered) for a prior transcription skill
— only `TTSSYF` is visible — and checked the plugin catalog
(`SearchPlugins`) — nothing found. Conclusion relayed to the project
owner: the two real paths are (1) they supply transcripts directly, or
(2) `youtube.com`/`google.com` get allowlisted for this session's egress
policy by whoever administers it.

**What (new content):** The project owner asked directly, in
conversation, whether Sahih al-Bukhari's text consists only of hadith
attributed to the Prophet ﷺ or also contains *athar*/*qawl* material, and
how ~600,000–700,000 available narrations were narrowed to the ~2,000-odd
kept. Researched via WebSearch (multiple independently-agreeing results)
and added as **[Chapter 2, §2.4](chapters/02-sunnah-and-hadith-authenticity.md)**
— covers the marfu'/mawquf/maqtu'/mu'allaq/athar category breakdown
(including the 1,341/160 mu'allaq figures from Ibn Hajar's *Taghliq
al-Ta'liq*), the ~600,000-examined vs. ~7,563-with-repetition/~2,602-
unique numbers, and an explicit flag that the "narrowing" gap is not
evidence nearly everything excluded was judged fabricated — Bukhari's own
stated criterion included brevity and redundancy, not only authenticity.
Marked ✅ Answered (not ✅✅ Verified) for the same reason as §2.1/§3.2:
sourced via search triangulation, not a directly-read primary page.
`TRACKER.md` and `MASTER-TABLE.md`/`.csv` regenerated for all 35
questions.

---

## 2026-08-28 — Second source batch ingested: 9 new questions, a new chapter, Principle 4, and one major upgrade

**What:** A second WhatsApp-style message log (34 messages, from a
contributor labelled "💎 Zo," spanning 18/08–28/08) and a supplied PDF
("Comprehensive Historical Analysis of Talhah ibn Ubaydullah," 7 pages)
were added and integrated, following the same rigor as the original
ingestion:

- Saved verbatim as [`source/raw-transcript-2-zo.md`](source/raw-transcript-2-zo.md)
  (ground truth, unedited) — the PDF is not re-hosted (it was supplied
  directly, not linked) but its content is fully summarized with citations
  preserved at Chapter 4, §4.7.
- Full completeness trace added at [`QA-CHECKLIST.md`](QA-CHECKLIST.md),
  Part 2 — every message mapped to where it landed, including which ones
  were duplicates of existing v1 content (cross-referenced, not
  re-entered) versus genuinely new.
- **9 new trackable questions added:** §4.11, §4.12 (Chapter 4);
  §5.6, §5.7 (Chapter 5); §6.5, §6.6, §6.7 (Chapter 6); §8.1, §8.2 (new
  Chapter 8, "The Prophet's ﷺ Final Days" — did not exist before this
  pass).
- **§4.7 substantially upgraded** (P3 → P0, ⬜ → ✅ Answered): the
  companion the original question left unnamed is identified as
  **Talhah ibn Ubaydullah** per the supplied PDF, which is extensively
  cited (Ibn Sa'd, al-Tabari, al-Suyuti, al-Qurtubi, al-Baydawi,
  al-Zamakhshari, Abu Hayyan, al-Baladhuri, Ibn al-Athir, Ibn Qutaybah,
  al-Mas'udi, Sheikh al-Mufid, Ibn Kathir, Ibn Abd al-Barr, Nahj
  al-Balagha) and summarized in full at Chapter 4, §4.7. Marked ✅
  Answered, not ✅✅ Verified — none of the PDF's own citations have been
  independently traced to a primary edition yet.
- **§6.6 is the first concrete, sourced test case for `METHODOLOGY.md`
  Principle 3** (concealment via *fulan*): Sahih al-Bukhari, Vol. 8,
  Book 82, Hadith 817, said to obscure Ali ibn Abi Talib's name in the
  origin-of-the-caliphate narrative. Logged in both the chapter and back
  into `METHODOLOGY.md` itself, since the principle previously had no
  real-world instance attached to it.
- **`METHODOLOGY.md` gained a fourth principle**, stated directly by the
  project owner: everything either contributor (Arif Bhai or Zo)
  forwards or writes — including their own reflections and theories, not
  only the classical material they cite — is context to research, not
  fact to repeat. This closes a gap the first three principles (which
  govern classical rijal/hadith material specifically) didn't cover.
- `TRACKER.md` and `MASTER-TABLE.md`/`.csv` fully regenerated to cover
  all 34 questions across 8 chapters, ranks recomputed, evidence columns
  re-extracted mechanically from the current chapter text (plus the
  §2.1/§3.2 research findings and 4.7's citation list folded in by hand,
  per the documented exception).

**Known, explicitly logged limitation:** the second batch asked that
every YouTube-linked message have its video transcribed and referenced
material documented. This session's `WebFetch` tool is blocked by the
network egress proxy for every domain tested, including YouTube itself
and plain Wikipedia — there is no working path to fetch a video page or
transcript from here. A targeted search for two of the seven video IDs in
this batch found no third-party transcript either. This is recorded as
open item #5 in `METHODOLOGY.md`, not silently skipped.

**Verification:** every new chapter section quotes its source verbatim
with a `Source:` line; nothing from the original messages or the PDF was
paraphrased away — summaries of the PDF's six sections retain each
section's own citation list rather than compressing them out. Three short
standalone remarks with no attached citation or question were not turned
into numbered chapter entries but are logged in the QA-CHECKLIST Part 2
table so they're still findable, not silently dropped.

---

## 2026-08-28 — Answered §2.1 and §3.2 (the two Abu Hurairah methodology proof-cases)

**What:** Both P0 dossiers moved from ⬜ Not Started to ✅ Answered, using
Firecrawl search and WebSearch to verify the claims:

- **§2.1** — confirmed the creation-in-seven-days hadith is Sahih Muslim
  2789 (narrated by Abu Hurairah), and confirmed Bukhari's own *Tarikh
  al-Kabir* (1:413) attributes its wording to Ka'b al-Ahbar rather than
  the Prophet ﷺ, corroborated by Yahya ibn Ma'in and by Ibn Kathir's
  verdict that it is "among the *gharaib* of Sahih Muslim." A second,
  independent chain defect (a narrator, Ibrahim ibn Abi Yahya, separately
  accused of forging narrations) was also found.
- **§3.2** — confirmed Abu Hurairah's "a woman, a donkey, and a dog cut
  off the prayer" is Sahih Muslim 511, and that Aisha's rebuke is not a
  single report but appears **three separate times** in Sahih al-Bukhari
  itself (511, 514, 519) — stronger corroboration than the original claim
  stated.

**Why:** these were the two proof-cases for `METHODOLOGY.md` Principle 2
(no narrator is exempt from scrutiny by fame) and the two items the
project owner raised directly — getting them right, with real citations
instead of "widely known" hand-waving, mattered most.

**Verification / honesty note:** this session's network access blocked
direct fetches of `sunnah.com`, `al-islam.org`, and `islamqa.info` (the
egress proxy denied the domains outright; only WebSearch and Firecrawl
search — which return snippets, not full pages — worked). Every citation
in both dossiers is triangulated across multiple independent search
results that agreed with each other, not independently read by this
project from the primary page. Both dossiers are marked ✅ Answered, not
✅✅ Verified, and each states plainly in its own "What would move this to
Verified" section what a follow-up pass with working page access should
check. One genuine open discrepancy was flagged rather than resolved:
some secondary sources cite Aisha's rebuke as also appearing in Sahih
Muslim itself (not only Bukhari) — this needs a direct check.

**Sync:** Status updated in all four places per `RESEARCHER-PROTOCOL.md`
(now five, since v2 added `MASTER-TABLE.md`/`.csv`): the answer dossier,
the question's block in its chapter file, the chapter's progress table,
`TRACKER.md`, and `MASTER-TABLE.md`/`MASTER-TABLE.csv` (the latter two
also got their "Reference Sources & Links" cells hand-updated with the
key findings, marked "+ more in dossier" per the exception now documented
in `MASTER-TABLE.md`'s own column description).

---

## 2026-08-28 — v2 fork created

**What:** v2 was seeded as a complete, unmodified copy of v1
(`shia-sunni-clarification-qs/` at commit `43d3160`) — all 7 chapters, all
25 answer dossiers, `METHODOLOGY.md`, `RESEARCHER-PROTOCOL.md`,
`TRACKER.md`, `QA-CHECKLIST.md`, and `source/` (raw transcript + all 9
images) copied byte-for-byte.

**Why:** to give this project permission to edit, reword, and expand the
question set going forward, while keeping v1 as a permanent, unaltered
audit trail of exactly what the original document said.

**Verification:** a full-repo diff between v2's initial state and v1
confirms zero content differences at fork time (v2 = v1 exactly, before
any of the changes below).

---

## 2026-08-28 — Image handling switched to text + link (§3.1, §3.2, §4.4, §4.8, §4.9, §5.4)

**What:** Every full inline image embed (`![...](...)`) in `chapters/` —
covering `image1.png` through `image9.png` — was replaced with a compact
reference line: the original filename, linked to `source/images/`, plus
the image's original alt-text caption. The full transcribed text that
already sat directly below each image (present since v1) was left
completely unchanged.

**Why:** per the v2 permission to "use the text in images and just give a
link to the image for reference" — the images are screenshots whose full
text content was already manually transcribed into the surrounding prose
in v1; keeping the image doubly present (embedded picture + transcribed
text) was redundant. Linking instead of embedding makes the chapters
lighter and easier to read (*wadih*) without losing anything — the
original image is one click away for anyone who wants to see the actual
screenshot/verify the transcription.

**Verification:** every replaced line still has its full corresponding
verbatim text block immediately adjacent, unchanged from v1. No image's
content was dropped — only its embedded picture was replaced by a link
plus the caption. `source/images/image1.png` through `image9.png` remain
in the repository, byte-identical to v1.

---

## 2026-08-28 — Reordered Imam Ali's sermon at Fatima's grave into narrative order (§5.4)

**What:** The two screenshot excerpts of Imam Ali's sermon at Fatima's
grave were presented in the order `image2.png` (the sermon's closing
portion) then `image1.png` (the sermon's opening portion) in v1, because
that was the order they were inserted in the original `.docx`. In v2 they
are now presented `image1.png` (opening) then `image2.png` (closing) — the
actual narrative order of the sermon.

**Why:** the two images are two halves of one continuous sermon; reading
the ending before the beginning served no purpose and only existed
because of how the original document happened to insert two screenshots.
v1 preserved that quirk verbatim, as required by v1's strict "insertion
order" rule; v2's editing permission exists precisely for improvements
like this.

**Verification:** both text blocks are otherwise character-for-character
identical to v1 (including the "Ref: Balaghah.net" citation, which stays
attached to the opening-portion block, matching where it appeared in the
original screenshot). Nothing was added, removed, or reworded — only the
order of the two blocks changed. The original insertion order is still
recoverable from `source/raw-transcript.md` and from v1.

---

## 2026-08-28 — Added MASTER-TABLE.md and MASTER-TABLE.csv

**What:** A new flat, single-page table covering all 25 tracked
questions, with columns: Overall Rank, Chapter, Chapter Rank, Priority,
ID, Question, Image Reference(s), Reference Sources & Links, Status, and
links to the chapter/answer files. A `.csv` copy of the same data was
added for direct import into a spreadsheet.

**Why:** requested directly — a single sortable/scannable view across
chapters, with an explicit ranking column and a column enumerating every
piece of evidence already cited for each question.

**Method:** both files were generated mechanically from the same
underlying priority/rank data already in `TRACKER.md`, plus every named
source citation and URL already present in each chapter section (detected
by scanning the chapter text — not retyped by hand, so the table can't
silently drift out of sync with the chapters it summarizes). Where a
question doesn't yet cite a named source in its chapter text, its row
says so explicitly ("none cited yet — open research item") rather than
being left blank without explanation.

---

*New entries go above this line, most recent first.*
