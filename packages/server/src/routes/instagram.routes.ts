import { Router } from 'express';
import { prisma } from '../db';
import { AuthedRequest, requireAuth } from '../middleware/auth';
import { autoCategorizeUncategorizedItems } from '../services/categorize.service';

export const instagramRouter = Router();

interface ScrapedInstagramItem {
  shortcode: string;
  url: string;
  caption?: string;
  thumbnailUrl?: string;
  author?: string;
  savedAt?: string;
}

/**
 * Receives saved-post items scraped by the extension's Instagram content
 * script (there is no public API for a user's saved posts) and stores them.
 *
 * Body: { items: ScrapedInstagramItem[] }
 */
instagramRouter.post('/sync', requireAuth, async (req: AuthedRequest, res) => {
  const items: ScrapedInstagramItem[] = Array.isArray(req.body?.items) ? req.body.items : [];

  if (items.length === 0) {
    return res.status(400).json({ error: 'items array is required and must be non-empty' });
  }

  let upserted = 0;

  for (const item of items) {
    if (!item.shortcode || !item.url) continue;

    await prisma.savedItem.upsert({
      where: {
        userId_source_externalId: {
          userId: req.userId!,
          source: 'INSTAGRAM',
          externalId: item.shortcode,
        },
      },
      update: {
        caption: item.caption,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        author: item.author,
        sourceCollection: 'Saved',
        savedAt: item.savedAt ? new Date(item.savedAt) : undefined,
      },
      create: {
        userId: req.userId!,
        source: 'INSTAGRAM',
        externalId: item.shortcode,
        caption: item.caption,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        author: item.author,
        sourceCollection: 'Saved',
        savedAt: item.savedAt ? new Date(item.savedAt) : null,
      },
    });
    upserted += 1;
  }

  const categorized = await autoCategorizeUncategorizedItems(req.userId!);
  res.json({ received: items.length, upserted, ...categorized });
});
