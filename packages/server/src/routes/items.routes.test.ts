import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';
import { resetDb, createTestUser } from '../test/helpers';

beforeEach(resetDb);

describe('GET /api/items', () => {
  it('requires auth', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(401);
  });

  it('only returns the caller\'s items, filterable by source and category', async () => {
    const { user, token } = await createTestUser();
    const { user: otherUser } = await createTestUser();

    const category = await prisma.category.create({ data: { userId: user.id, name: 'Board A' } });
    await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'yt-1',
        title: 'A video',
        url: 'https://youtube.com/watch?v=yt-1',
        categoryId: category.id,
      },
    });
    await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'INSTAGRAM',
        externalId: 'ig-1',
        caption: 'A post',
        url: 'https://instagram.com/p/ig-1/',
      },
    });
    await prisma.savedItem.create({
      data: {
        userId: otherUser.id,
        source: 'YOUTUBE',
        externalId: 'yt-2',
        title: 'Someone else\'s video',
        url: 'https://youtube.com/watch?v=yt-2',
      },
    });

    const all = await request(app).get('/api/items').set('Authorization', `Bearer ${token}`);
    expect(all.status).toBe(200);
    expect(all.body.items).toHaveLength(2);

    const youtubeOnly = await request(app)
      .get('/api/items?source=YOUTUBE')
      .set('Authorization', `Bearer ${token}`);
    expect(youtubeOnly.body.items).toHaveLength(1);
    expect(youtubeOnly.body.items[0].externalId).toBe('yt-1');

    const byCategory = await request(app)
      .get(`/api/items?categoryId=${category.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(byCategory.body.items).toHaveLength(1);

    const uncategorized = await request(app)
      .get('/api/items?categoryId=none')
      .set('Authorization', `Bearer ${token}`);
    expect(uncategorized.body.items).toHaveLength(1);
    expect(uncategorized.body.items[0].externalId).toBe('ig-1');
  });
});

describe('PATCH /api/items/:id', () => {
  it('reassigns category and rejects items belonging to another user', async () => {
    const { user, token } = await createTestUser();
    const { token: otherToken } = await createTestUser();

    const category = await prisma.category.create({ data: { userId: user.id, name: 'Board A' } });
    const item = await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'yt-1',
        title: 'A video',
        url: 'https://youtube.com/watch?v=yt-1',
      },
    });

    const forbidden = await request(app)
      .patch(`/api/items/${item.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ categoryId: category.id });
    expect(forbidden.status).toBe(404);

    const res = await request(app)
      .patch(`/api/items/${item.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ categoryId: category.id });
    expect(res.status).toBe(200);
    expect(res.body.item.categoryId).toBe(category.id);

    const back = await request(app)
      .patch(`/api/items/${item.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ categoryId: 'none' });
    expect(back.body.item.categoryId).toBeNull();
  });
});

describe('DELETE /api/items/:id', () => {
  it('deletes the item', async () => {
    const { user, token } = await createTestUser();
    const item = await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'yt-1',
        title: 'A video',
        url: 'https://youtube.com/watch?v=yt-1',
      },
    });

    const res = await request(app).delete(`/api/items/${item.id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);

    const found = await prisma.savedItem.findUnique({ where: { id: item.id } });
    expect(found).toBeNull();
  });
});
