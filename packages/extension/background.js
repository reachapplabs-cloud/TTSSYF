import { GOOGLE_CLIENT_ID, YOUTUBE_OAUTH_SCOPES } from './lib/config.js';
import { apiFetch } from './lib/api.js';
import { getState, setState, clearState } from './lib/storage.js';

async function connectGoogle() {
  const redirectUri = chrome.identity.getRedirectURL();

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  // access_type=offline + prompt=consent guarantee a refresh_token so the
  // server can sync YouTube in the background later, not just while the
  // extension popup happens to be open.
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  authUrl.searchParams.set('scope', YOUTUBE_OAUTH_SCOPES.join(' '));

  const resultUrl = await chrome.identity.launchWebAuthFlow({
    url: authUrl.toString(),
    interactive: true,
  });
  if (!resultUrl) {
    throw new Error('Google sign-in was cancelled');
  }

  const code = new URL(resultUrl).searchParams.get('code');
  if (!code) {
    throw new Error('Google did not return an authorization code');
  }

  const data = await apiFetch('/api/auth/google/callback', {
    method: 'POST',
    body: { code, redirectUri },
  });

  await setState({
    token: data.token,
    user: data.user,
    youtubeConnected: data.youtubeConnected,
  });
  return data;
}

async function syncYoutube() {
  const { token } = await getState();
  if (!token) throw new Error('Connect your Google account first');

  const result = await apiFetch('/api/youtube/sync', { method: 'POST', token });
  await setState({ lastYoutubeSync: { ...result, at: Date.now() } });
  return result;
}

async function syncInstagramItems(items) {
  const { token } = await getState();
  if (!token) throw new Error('Connect your Google account first');

  const result = await apiFetch('/api/instagram/sync', {
    method: 'POST',
    token,
    body: { items },
  });
  await setState({ lastInstagramSync: { ...result, at: Date.now() } });
  return result;
}

async function openInstagramSaved() {
  await chrome.tabs.create({ url: 'https://www.instagram.com/' });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message?.type) {
        case 'CONNECT_GOOGLE':
          sendResponse({ ok: true, data: await connectGoogle() });
          break;
        case 'SYNC_YOUTUBE':
          sendResponse({ ok: true, data: await syncYoutube() });
          break;
        case 'OPEN_INSTAGRAM_SAVED':
          await openInstagramSaved();
          sendResponse({ ok: true });
          break;
        case 'INSTAGRAM_ITEMS_SCRAPED':
          sendResponse({ ok: true, data: await syncInstagramItems(message.items) });
          break;
        case 'SIGN_OUT':
          await clearState();
          sendResponse({ ok: true });
          break;
        case 'GET_STATE':
          sendResponse({ ok: true, data: await getState() });
          break;
        default:
          sendResponse({ ok: false, error: `Unknown message type: ${message?.type}` });
      }
    } catch (err) {
      sendResponse({ ok: false, error: err instanceof Error ? err.message : String(err) });
    }
  })();
  return true; // keep the message channel open for the async sendResponse above
});
