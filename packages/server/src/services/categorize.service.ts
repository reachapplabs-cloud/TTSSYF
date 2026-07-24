import { prisma } from '../db';

interface CategoryRule {
  name: string;
  keywords: string[];
}

// Simple, cheap-to-run keyword rules used as the phase-2 default categorizer.
// Swap suggestCategoryName() for an embeddings/LLM-based classifier later —
// callers only depend on getting back a category name or null.
const DEFAULT_CATEGORY_RULES: CategoryRule[] = [
  { name: 'Food & Recipes', keywords: ['recipe', 'cooking', 'food', 'kitchen', 'baking', 'meal', 'dinner', 'breakfast'] },
  { name: 'Fitness & Health', keywords: ['workout', 'fitness', 'gym', 'yoga', 'health', 'exercise', 'training'] },
  { name: 'Travel', keywords: ['travel', 'trip', 'vacation', 'destination', 'explore', 'flight', 'itinerary'] },
  { name: 'Fashion & Beauty', keywords: ['fashion', 'outfit', 'beauty', 'makeup', 'style', 'skincare'] },
  { name: 'Tech', keywords: ['tech', 'coding', 'programming', 'software', 'ai', 'gadget', 'review'] },
  { name: 'Music', keywords: ['music', 'song', 'album', 'concert', 'playlist', 'remix'] },
  { name: 'Home & DIY', keywords: ['diy', 'home', 'decor', 'interior', 'craft', 'renovation'] },
  { name: 'Comedy & Entertainment', keywords: ['funny', 'comedy', 'meme', 'entertainment', 'prank'] },
];

export function suggestCategoryName(text: string): string | null {
  const haystack = text.toLowerCase();
  for (const rule of DEFAULT_CATEGORY_RULES) {
    if (rule.keywords.some((keyword) => haystack.includes(keyword))) {
      return rule.name;
    }
  }
  return null;
}

async function getOrCreateCategory(userId: string, name: string) {
  return prisma.category.upsert({
    where: { userId_name: { userId, name } },
    update: {},
    create: { userId, name },
  });
}

/**
 * Assigns a category to any of the user's items that don't have one yet,
 * based on title/caption keyword matches. Leaves items with no match alone
 * (they show up as "Uncategorized" in the dashboard).
 */
export async function autoCategorizeUncategorizedItems(userId: string) {
  const items = await prisma.savedItem.findMany({
    where: { userId, categoryId: null },
  });

  let categorized = 0;

  for (const item of items) {
    const text = `${item.title ?? ''} ${item.caption ?? ''}`;
    const categoryName = suggestCategoryName(text);
    if (!categoryName) continue;

    const category = await getOrCreateCategory(userId, categoryName);
    await prisma.savedItem.update({
      where: { id: item.id },
      data: { categoryId: category.id },
    });
    categorized += 1;
  }

  return { scanned: items.length, categorized };
}
