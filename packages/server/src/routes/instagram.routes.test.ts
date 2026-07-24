import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';
import { resetDb, createTestUser } from '../test/helpers';

beforeEach(resetDb);

describe('POST /api/instagram/sync', () => {
  it('requires a non-empty items array', async () => {
    const { token } = await createTestUser();
    const res = await request(app)
      .post('/api/instagram/sync')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [] });
    expect(res.status).toBe(400);
  });

  it('upserts scraped items and is idempotent on re-sync', async () => {
    const { user, token } = await createTestUser();
    const items = [
      {
        shortcode: 'abc123',
        url: 'https://www.instagram.com/p/abc123/',
        caption: 'A great pasta recipe',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        author: 'someuser',
      },
    ];

    const first = await request(app)
      .post('/api/instagram/sync')
      .set('Authorization', `Bearer ${token}`)
      .send({ items });
    expect(first.status).toBe(200);
    expect(first.body.upserted).toBe(1);

    const stored = await prisma.savedItem.findMany({ where: { userId: user.id, source: 'INSTAGRAM' } });
    expect(stored).toHaveLength(1);
    expect(stored[0].externalId).toBe('abc123');

    const second = await request(app)
      .post('/api/instagram/sync')
      .set('Authorization', `Bearer ${token}`)
      .send({ items });
    expect(second.status).toBe(200);

    const stillOne = await prisma.savedItem.findMany({ where: { userId: user.id, source: 'INSTAGRAM' } });
    expect(stillOne).toHaveLength(1);
  });

  it('skips malformed entries missing shortcode/url', async () => {
    const { token } = await createTestUser();
    const res = await request(app)
      .post('/api/instagram/sync')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ caption: 'no shortcode or url here' }] });
    expect(res.status).toBe(200);
    expect(res.body.upserted).toBe(0);
  });
});
