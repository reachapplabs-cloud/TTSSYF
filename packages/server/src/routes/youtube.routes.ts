import { Router } from 'express';
import { prisma } from '../db';
import { AuthedRequest, requireAuth } from '../middleware/auth';
import { syncYoutubeForUser } from '../services/youtube.service';
import { autoCategorizeUncategorizedItems } from '../services/categorize.service';

export const youtubeRouter = Router();

youtubeRouter.post('/sync', requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  try {
    const result = await syncYoutubeForUser(user);
    const categorized = await autoCategorizeUncategorizedItems(user.id);
    res.json({ ...result, ...categorized });
  } catch (err) {
    console.error('YouTube sync failed', err);
    const message = err instanceof Error ? err.message : 'YouTube sync failed';
    res.status(400).json({ error: message });
  }
});
