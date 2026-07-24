import { getState } from '../lib/storage.js';

const app = document.getElementById('app');
const errorEl = document.getElementById('error');

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.toggle('hidden', !message);
}

function formatSyncSummary(sync, kind) {
  if (!sync) return `Not synced yet`;
  const when = new Date(sync.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (kind === 'youtube') {
    return `${sync.items} videos from ${sync.playlists} playlists · ${when}`;
  }
  return `${sync.upserted} saved posts · ${when}`;
}

async function send(type, extra = {}) {
  const response = await chrome.runtime.sendMessage({ type, ...extra });
  if (!response?.ok) {
    throw new Error(response?.error || 'Something went wrong');
  }
  return response.data;
}

async function render() {
  showError('');
  const state = await getState();

  if (!state.token || !state.user) {
    app.innerHTML = `
      <p class="muted">Connect your Google account to start pulling in your YouTube playlists and Liked videos.</p>
      <button id="connect-google">Connect YouTube (Google)</button>
    `;
    document.getElementById('connect-google').addEventListener('click', onConnectGoogle);
    return;
  }

  app.innerHTML = `
    <div class="user">
      ${state.user.avatarUrl ? `<img src="${state.user.avatarUrl}" alt="" />` : ''}
      <div>
        <div class="name">${state.user.name || state.user.email}</div>
        <div class="email">${state.user.email}</div>
      </div>
    </div>

    <div class="card">
      <h2>YouTube</h2>
      <div class="row">
        <button id="sync-youtube">Sync now</button>
      </div>
      <div class="status">${formatSyncSummary(state.lastYoutubeSync, 'youtube')}</div>
    </div>

    <div class="card">
      <h2>Instagram</h2>
      <div class="row">
        <button id="open-instagram" class="secondary">Open Instagram Saved</button>
      </div>
      <div class="status">${formatSyncSummary(state.lastInstagramSync, 'instagram')}</div>
      <div class="status">Go to your profile → Saved — Ugram syncs automatically while that page is open.</div>
    </div>

    <div class="footer">
      <button id="sign-out" class="link">Sign out</button>
    </div>
  `;

  document.getElementById('sync-youtube').addEventListener('click', onSyncYoutube);
  document.getElementById('open-instagram').addEventListener('click', onOpenInstagram);
  document.getElementById('sign-out').addEventListener('click', onSignOut);
}

async function withButtonBusy(button, label, fn) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = label;
  try {
    await fn();
  } catch (err) {
    showError(err instanceof Error ? err.message : String(err));
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

async function onConnectGoogle(e) {
  await withButtonBusy(e.target, 'Connecting…', async () => {
    await send('CONNECT_GOOGLE');
    await render();
  });
}

async function onSyncYoutube(e) {
  await withButtonBusy(e.target, 'Syncing…', async () => {
    await send('SYNC_YOUTUBE');
    await render();
  });
}

async function onOpenInstagram(e) {
  await withButtonBusy(e.target, 'Opening…', async () => {
    await send('OPEN_INSTAGRAM_SAVED');
  });
}

async function onSignOut() {
  await send('SIGN_OUT');
  await render();
}

render();
