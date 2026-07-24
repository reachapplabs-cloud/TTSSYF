import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../db';
import { env } from '../env';
import { signAuthToken } from '../utils/jwt';

export const authRouter = Router();

/**
 * Exchanges a Google OAuth authorization code (obtained by the extension via
 * chrome.identity.launchWebAuthFlow, or by the web dashboard via a standard
 * redirect flow) for tokens, upserts the User, and returns a Ugram session JWT.
 *
 * Body: { code: string, redirectUri: string }
 */
authRouter.post('/google/callback', async (req, res) => {
  const { code, redirectUri } = req.body ?? {};

  if (!code || !redirectUri) {
    return res.status(400).json({ error: 'code and redirectUri are required' });
  }
  if (!env.googleClientId || !env.googleClientSecret) {
    return res.status(500).json({ error: 'Server is missing Google OAuth configuration' });
  }

  try {
    const client = new OAuth2Client(env.googleClientId, env.googleClientSecret, redirectUri);
    const { tokens } = await client.getToken(code);

    if (!tokens.id_token) {
      return res.status(400).json({ error: 'Google did not return an id_token' });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: env.googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ error: 'Google account has no email on file' });
    }

    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: {
        name: payload.name ?? undefined,
        avatarUrl: payload.picture ?? undefined,
        googleId: payload.sub,
        googleAccessToken: tokens.access_token ?? undefined,
        // Google only returns a refresh_token on the first consent; keep the
        // existing one on subsequent logins instead of clobbering it with undefined.
        ...(tokens.refresh_token ? { googleRefreshToken: tokens.refresh_token } : {}),
        googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
      },
      create: {
        email: payload.email,
        name: payload.name,
        avatarUrl: payload.picture,
        googleId: payload.sub,
        googleAccessToken: tokens.access_token ?? undefined,
        googleRefreshToken: tokens.refresh_token ?? undefined,
        googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
      },
    });

    const token = signAuthToken({ userId: user.id });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl },
      youtubeConnected: Boolean(user.googleRefreshToken),
    });
  } catch (err) {
    console.error('Google OAuth exchange failed', err);
    res.status(401).json({ error: 'Failed to authenticate with Google' });
  }
});
