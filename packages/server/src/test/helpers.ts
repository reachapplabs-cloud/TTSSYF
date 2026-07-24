import { prisma } from '../db';
import { signAuthToken } from '../utils/jwt';

export async function resetDb() {
  await prisma.savedItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}

export async function createTestUser(overrides: Partial<{ email: string; googleRefreshToken: string }> = {}) {
  const user = await prisma.user.create({
    data: {
      email: overrides.email ?? `user-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
      name: 'Test User',
      googleRefreshToken: overrides.googleRefreshToken,
    },
  });
  const token = signAuthToken({ userId: user.id });
  return { user, token };
}
