import { Router } from 'express';
import { prisma } from '../db';
import { AuthedRequest, requireAuth } from '../middleware/auth';

export const meRouter = Router();

meRouter.get('/', requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      youtubeConnected: Boolean(user.googleRefreshToken),
    },
  });
});
