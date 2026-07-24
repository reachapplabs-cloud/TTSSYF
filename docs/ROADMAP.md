# Roadmap

## Phase 1 — Connect & fetch (this scaffold)

- [x] Google OAuth (YouTube `readonly` scope) via the extension
- [x] YouTube sync: playlists + playlist items + liked videos
- [x] Instagram saved-posts scraper (content script) + sync endpoint
- [x] Unified `SavedItem` storage, deduped and idempotent re-sync
- [x] Extension popup: connect accounts, trigger sync, see counts
- [ ] Background/scheduled re-sync (currently manual, triggered from the
      popup or dashboard)
- [ ] Package the extension for the Chrome Web Store (icons are
      placeholders, needs a store listing + review)

## Phase 2 — Organize into boards

- [x] `Category` model + CRUD API
- [x] Rule-based auto-categorizer that runs on sync
- [x] Dashboard boards view (columns per category, move items between them)
- [ ] Replace keyword rules with an embeddings/LLM-based classifier for
      better suggestions
- [ ] Multi-select + bulk move/tag
- [ ] Shareable/public boards (Pinterest-style)
- [ ] Search across saved items (title/caption full-text)

## Later ideas

- Native mobile app (iOS/Android) as an alternative to the extension, using
  an embedded webview for the Instagram scrape step (same approach, just a
  different host shell)
- Notion/Airtable export
- Duplicate detection across platforms (same link saved on both YouTube and
  Instagram)
