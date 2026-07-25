import { Avatar, AvatarIdea } from "./types.js";

/**
 * "Replicate and build more" (PRD §5.7): once there's enough Avatar built
 * up, propose new content ideas straight from the accumulated insights —
 * no fresh input required. Still ends at human direction/approval, same as
 * any other submission (PRD §6) — this is a reusable asset, not autopilot.
 *
 * Deliberately rule-based like the other mock adapters (see
 * adapters/mockAdapters.ts) — a real implementation would prompt a model
 * with the full insights bank and ask for genuinely novel angles.
 */
export function generateIdeasFromAvatar(avatar: Avatar, count = 3): AvatarIdea[] {
  if (avatar.insights.length === 0) {
    return [];
  }

  const now = new Date().toISOString();
  const insights = [...avatar.insights].reverse().slice(0, count);

  return insights.map((insight) => ({
    headline: insight.length > 80 ? `${insight.slice(0, 77)}…` : insight,
    angle: `Unpack why this is true, with a specific example — not the general case, the one only you have.`,
    generatedAt: now,
  }));
}
