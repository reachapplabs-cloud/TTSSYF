const KEYS = ['token', 'user', 'youtubeConnected', 'lastYoutubeSync', 'lastInstagramSync'];

export async function getState() {
  return chrome.storage.local.get(KEYS);
}

export async function setState(partial) {
  return chrome.storage.local.set(partial);
}

export async function clearState() {
  return chrome.storage.local.clear();
}
