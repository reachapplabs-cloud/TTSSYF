import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '../db';
import { resetDb, createTestUser } from '../test/helpers';
import { autoCategorizeUncategorizedItems, suggestCategoryName } from './categorize.service';

beforeEach(resetDb);

describe('suggestCategoryName', () => {
  it('matches a known keyword', () => {
    expect(suggestCategoryName('My favorite pasta recipe')).toBe('Food & Recipes');
    expect(suggestCategoryName('Full body workout routine')).toBe('Fitness & Health');
  });

  it('is case-insensitive', () => {
    expect(suggestCategoryName('BEST TRAVEL DESTINATIONS 2026')).toBe('Travel');
  });

  it('returns null when nothing matches', () => {
    expect(suggestCategoryName('asdkjqwoe random text with no keywords')).toBeNull();
  });
});

describe('autoCategorizeUncategorizedItems', () => {
  it('assigns a category to matching uncategorized items and leaves others alone', async () => {
    const { user } = await createTestUser();

    const matching = await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'vid-1',
        title: 'Easy weeknight pasta recipe',
        url: 'https://youtube.com/watch?v=vid-1',
      },
    });
    const nonMatching = await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'vid-2',
        title: 'Completely unrelated gibberish zzz',
        url: 'https://youtube.com/watch?v=vid-2',
      },
    });

    const result = await autoCategorizeUncategorizedItems(user.id);
    expect(result.scanned).toBe(2);
    expect(result.categorized).toBe(1);

    const updatedMatching = await prisma.savedItem.findUniqueOrThrow({ where: { id: matching.id } });
    const updatedNonMatching = await prisma.savedItem.findUniqueOrThrow({ where: { id: nonMatching.id } });

    expect(updatedMatching.categoryId).not.toBeNull();
    expect(updatedNonMatching.categoryId).toBeNull();

    const category = await prisma.category.findUniqueOrThrow({ where: { id: updatedMatching.categoryId! } });
    expect(category.name).toBe('Food & Recipes');
  });

  it('reuses an existing category instead of creating a duplicate', async () => {
    const { user } = await createTestUser();
    await prisma.category.create({ data: { userId: user.id, name: 'Food & Recipes' } });
    await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'INSTAGRAM',
        externalId: 'post-1',
        caption: 'Amazing baking tips',
        url: 'https://instagram.com/p/post-1/',
      },
    });

    await autoCategorizeUncategorizedItems(user.id);

    const categories = await prisma.category.findMany({ where: { userId: user.id, name: 'Food & Recipes' } });
    expect(categories).toHaveLength(1);
  });

  it('does not touch items that already have a category', async () => {
    const { user } = await createTestUser();
    const category = await prisma.category.create({ data: { userId: user.id, name: 'Custom Board' } });
    await prisma.savedItem.create({
      data: {
        userId: user.id,
        source: 'YOUTUBE',
        externalId: 'vid-3',
        title: 'A recipe video',
        url: 'https://youtube.com/watch?v=vid-3',
        categoryId: category.id,
      },
    });

    const result = await autoCategorizeUncategorizedItems(user.id);
    expect(result.scanned).toBe(0);
  });
});
