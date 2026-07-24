import { Router } from 'express';
import { prisma } from '../db';
import { AuthedRequest, requireAuth } from '../middleware/auth';

export const itemsRouter = Router();

itemsRouter.get('/', requireAuth, async (req: AuthedRequest, res) => {
  const { source, categoryId, search } = req.query as {
    source?: 'YOUTUBE' | 'INSTAGRAM';
    categoryId?: string;
    search?: string;
  };

  const items = await prisma.savedItem.findMany({
    where: {
      userId: req.userId,
      ...(source ? { source } : {}),
      ...(categoryId ? { categoryId: categoryId === 'none' ? null : categoryId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { caption: { contains: search } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: [{ savedAt: 'desc' }, { createdAt: 'desc' }],
  });

  res.json({ items });
});

itemsRouter.patch('/:id', requireAuth, async (req: AuthedRequest, res) => {
  const { categoryId } = req.body ?? {};

  const item = await prisma.savedItem.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const updated = await prisma.savedItem.update({
    where: { id: item.id },
    data: { categoryId: categoryId === 'none' ? null : categoryId },
    include: { category: true },
  });

  res.json({ item: updated });
});

itemsRouter.delete('/:id', requireAuth, async (req: AuthedRequest, res) => {
  const item = await prisma.savedItem.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!item) return res.status(404).json({ error: 'Item not found' });

  await prisma.savedItem.delete({ where: { id: item.id } });
  res.status(204).end();
});
