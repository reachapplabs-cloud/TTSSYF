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
