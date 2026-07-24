# Ugram extension

Plain Manifest V3 extension, no build step — load it directly.

See [`../../docs/SETUP.md`](../../docs/SETUP.md) for the full walkthrough
(Google OAuth client, `lib/config.js` values, loading unpacked in Chrome).

```
manifest.json
background.js              service worker: OAuth, sync, message routing
popup/                      toolbar popup UI
content-scripts/
  instagram-saved.js        scrapes instagram.com/*/saved/* while it's open
lib/
  config.js                 API base URL, Google client ID, scopes
  api.js                    fetch() wrapper that talks to the Ugram server
  storage.js                chrome.storage.local helpers
```
