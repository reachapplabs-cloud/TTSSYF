import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';
import { resetDb, createTestUser } from '../test/helpers';

beforeEach(resetDb);

describe('POST /api/categories', () => {
  it('creates a category and rejects duplicate names for the same user', async () => {
    const { token } = await createTestUser();

    const created = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Travel' });
    expect(created.status).toBe(201);
    expect(created.body.category.name).toBe('Travel');

    const duplicate = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Travel' });
    expect(duplicate.status).toBe(409);
  });

  it('rejects a missing name', async () => {
    const { token } = await createTestUser();
    const res = await request(app).post('/api/categories').set('Authorization', `Bearer ${token}`).send({});
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/categories/:id', () => {
  it('unassigns items instead of deleting them', async () => {
    const { user, token } = await createTestUser();
    const category = await prisma.category.create({ data: { userId: user.id, name: 'Travel' } });
    const item = await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'yt-1',
        title: 'A video',
        url: 'https://youtube.com/watch?v=yt-1',
        categoryId: category.id,
      },
    });

    const res = await request(app).delete(`/api/categories/${category.id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);

    const updatedItem = await prisma.savedItem.findUniqueOrThrow({ where: { id: item.id } });
    expect(updatedItem.categoryId).toBeNull();

    const found = await prisma.category.findUnique({ where: { id: category.id } });
    expect(found).toBeNull();
  });
});

describe('GET /api/categories', () => {
  it('includes item counts and only the caller\'s categories', async () => {
    const { user, token } = await createTestUser();
    const { user: otherUser } = await createTestUser();

    const category = await prisma.category.create({ data: { userId: user.id, name: 'Travel' } });
    await prisma.category.create({ data: { userId: otherUser.id, name: 'Not mine' } });
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

    const res = await request(app).get('/api/categories').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.categories).toHaveLength(1);
    expect(res.body.categories[0]._count.items).toBe(1);
  });
});
