import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

const getToken = vi.fn();
const verifyIdToken = vi.fn();

vi.mock('google-auth-library', () => ({
  OAuth2Client: vi.fn().mockImplementation(() => ({
    getToken,
    verifyIdToken,
  })),
}));

// Imported after the mock so the route picks up the mocked OAuth2Client.
const { app } = await import('../app');
const { prisma } = await import('../db');
const { resetDb } = await import('../test/helpers');

beforeEach(async () => {
  await resetDb();
  getToken.mockReset();
  verifyIdToken.mockReset();
});

function mockGoogleResponse(overrides: Partial<{ email: string; sub: string; refreshToken: string | undefined }> = {}) {
  getToken.mockResolvedValue({
    tokens: {
      id_token: 'fake-id-token',
      access_token: 'fake-access-token',
      refresh_token: overrides.refreshToken === undefined ? 'fake-refresh-token' : overrides.refreshToken,
      expiry_date: Date.now() + 3600_000,
    },
  });
  verifyIdToken.mockResolvedValue({
    getPayload: () => ({
      email: overrides.email ?? 'person@example.com',
      name: 'Person Example',
      picture: 'https://example.com/pic.jpg',
      sub: overrides.sub ?? 'google-sub-123',
    }),
  });
}

describe('POST /api/auth/google/callback', () => {
  it('requires code and redirectUri', async () => {
    const res = await request(app).post('/api/auth/google/callback').send({});
    expect(res.status).toBe(400);
  });

  it('creates a new user on first sign-in and returns a session token', async () => {
    mockGoogleResponse();

    const res = await request(app)
      .post('/api/auth/google/callback')
      .send({ code: 'auth-code', redirectUri: 'https://ext-id.chromiumapp.org/' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTypeOf('string');
    expect(res.body.user.email).toBe('person@example.com');
    expect(res.body.youtubeConnected).toBe(true);

    const stored = await prisma.user.findUniqueOrThrow({ where: { email: 'person@example.com' } });
    expect(stored.googleRefreshToken).toBe('fake-refresh-token');
  });

  it('reuses the existing user and keeps the prior refresh token when Google omits one on re-consent', async () => {
    mockGoogleResponse();
    await request(app)
      .post('/api/auth/google/callback')
      .send({ code: 'auth-code-1', redirectUri: 'https://ext-id.chromiumapp.org/' });

    mockGoogleResponse({ refreshToken: undefined });
    const second = await request(app)
      .post('/api/auth/google/callback')
      .send({ code: 'auth-code-2', redirectUri: 'https://ext-id.chromiumapp.org/' });

    expect(second.status).toBe(200);
    const users = await prisma.user.findMany({ where: { email: 'person@example.com' } });
    expect(users).toHaveLength(1);
    expect(users[0].googleRefreshToken).toBe('fake-refresh-token');
  });

  it('rejects when Google returns no id_token', async () => {
    getToken.mockResolvedValue({ tokens: { access_token: 'x' } });
    const res = await request(app)
      .post('/api/auth/google/callback')
      .send({ code: 'auth-code', redirectUri: 'https://ext-id.chromiumapp.org/' });
    expect(res.status).toBe(400);
  });
});
