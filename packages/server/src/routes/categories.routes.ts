import { Router } from 'express';
import { prisma } from '../db';
import { AuthedRequest, requireAuth } from '../middleware/auth';

export const categoriesRouter = Router();

categoriesRouter.get('/', requireAuth, async (req: AuthedRequest, res) => {
  const categories = await prisma.category.findMany({
    where: { userId: req.userId },
    include: { _count: { select: { items: true } } },
    orderBy: { name: 'asc' },
  });
  res.json({ categories });
});

categoriesRouter.post('/', requireAuth, async (req: AuthedRequest, res) => {
  const { name, color } = req.body ?? {};
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is required' });
  }

  try {
    const category = await prisma.category.create({
      data: { userId: req.userId!, name: name.trim(), color },
    });
    res.status(201).json({ category });
  } catch {
    res.status(409).json({ error: 'A category with this name already exists' });
  }
});

categoriesRouter.patch('/:id', requireAuth, async (req: AuthedRequest, res) => {
  const { name, color } = req.body ?? {};

  const category = await prisma.category.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!category) return res.status(404).json({ error: 'Category not found' });

  const updated = await prisma.category.update({
    where: { id: category.id },
    data: {
      ...(name ? { name: name.trim() } : {}),
      ...(color !== undefined ? { color } : {}),
    },
  });
  res.json({ category: updated });
});

categoriesRouter.delete('/:id', requireAuth, async (req: AuthedRequest, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!category) return res.status(404).json({ error: 'Category not found' });

  // Items in this category fall back to "Uncategorized" rather than being deleted.
  await prisma.savedItem.updateMany({
    where: { categoryId: category.id },
    data: { categoryId: null },
  });
  await prisma.category.delete({ where: { id: category.id } });
  res.status(204).end();
});
