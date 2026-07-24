// Fill GOOGLE_CLIENT_ID in per docs/SETUP.md, or set VITE_GOOGLE_CLIENT_ID
// in a packages/web/.env.local. It must be the same OAuth client used by
// the server (redirect URI: <this app's origin>/oauth/callback).
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';
export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ?? 'YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com';

export const GOOGLE_OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];
