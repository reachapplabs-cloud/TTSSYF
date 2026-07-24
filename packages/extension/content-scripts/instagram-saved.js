// Runs on instagram.com/*/saved/* pages. There is no public API for a
// user's saved posts, so this reads them the same way the signed-in user's
// own browser already does: straight out of the rendered DOM.
(function () {
  const MAX_SCROLLS = 60;
  const SCROLL_DELAY_MS = 900;
  const BATCH_SIZE = 40;

  const seen = new Set();
  let badge;

  function ensureBadge() {
    if (badge) return badge;
    badge = document.createElement('div');
    badge.style.cssText = [
      'position:fixed', 'bottom:16px', 'right:16px', 'z-index:999999',
      'background:#111827', 'color:#fff', 'font:13px system-ui,sans-serif',
      'padding:10px 14px', 'border-radius:10px', 'box-shadow:0 4px 16px rgba(0,0,0,.3)',
    ].join(';');
    document.body.appendChild(badge);
    return badge;
  }

  function setBadge(text) {
    ensureBadge().textContent = text;
  }

  function extractShortcode(href) {
    const match = href.match(/\/(p|reel)\/([^/?]+)/);
    return match ? match[2] : null;
  }

  function collectVisiblePosts() {
    const anchors = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');
    const found = [];

    anchors.forEach((anchor) => {
      const shortcode = extractShortcode(anchor.getAttribute('href') || '');
      if (!shortcode || seen.has(shortcode)) return;

      const img = anchor.querySelector('img');
      const alt = img?.getAttribute('alt') || '';
      // Grid alt text commonly reads like: "Photo by <name> on <date>. May be ..."
      const authorMatch = alt.match(/(?:Photo|Photo shared|Video) by ([^o]+?) on /i);

      seen.add(shortcode);
      found.push({
        shortcode,
        url: `https://www.instagram.com/p/${shortcode}/`,
        thumbnailUrl: img?.getAttribute('src') || undefined,
        caption: alt || undefined,
        author: authorMatch ? authorMatch[1].trim() : undefined,
      });
    });

    return found;
  }

  function sendBatch(items) {
    if (items.length === 0) return Promise.resolve();
    return chrome.runtime.sendMessage({ type: 'INSTAGRAM_ITEMS_SCRAPED', items });
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run() {
    setBadge('Ugram: scanning your saved posts…');

    let lastHeight = 0;
    let stableCount = 0;
    let pending = [];

    for (let i = 0; i < MAX_SCROLLS && stableCount < 3; i++) {
      const newlyFound = collectVisiblePosts();
      pending.push(...newlyFound);
      setBadge(`Ugram: found ${seen.size} saved posts…`);

      if (pending.length >= BATCH_SIZE) {
        await sendBatch(pending.splice(0, pending.length));
      }

      window.scrollTo(0, document.body.scrollHeight);
      await delay(SCROLL_DELAY_MS);

      const height = document.body.scrollHeight;
      stableCount = height === lastHeight ? stableCount + 1 : 0;
      lastHeight = height;
    }

    // Final pass in case content settled after the last scroll.
    pending.push(...collectVisiblePosts());
    if (pending.length > 0) {
      await sendBatch(pending);
    }

    setBadge(seen.size > 0 ? `Ugram: synced ${seen.size} saved posts ✓` : 'Ugram: no saved posts found');
    setTimeout(() => badge?.remove(), 6000);
  }

  run().catch((err) => {
    console.error('[Ugram] Instagram sync failed', err);
    setBadge('Ugram: sync failed — open the extension popup to retry');
  });
})();
