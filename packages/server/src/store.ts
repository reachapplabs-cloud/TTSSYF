import { Avatar, DEFAULT_OUTPUT_PROFILE, emptyAvatar, OutputProfile } from "@relay/engine";

/**
 * In-memory store for the MVP — no auth, single demo founder. Swap for a
 * real DB-backed store behind the same shape when phase 2 adds accounts
 * (see docs/05-ROADMAP.md).
 */
class InMemoryStore {
  private avatars = new Map<string, Avatar>();
  private outputProfiles = new Map<string, OutputProfile>();

  getAvatar(founderId: string): Avatar {
    if (!this.avatars.has(founderId)) {
      this.avatars.set(founderId, emptyAvatar(founderId));
    }
    return this.avatars.get(founderId)!;
  }

  setAvatar(founderId: string, avatar: Avatar): void {
    this.avatars.set(founderId, avatar);
  }

  getOutputProfile(founderId: string): OutputProfile {
    return this.outputProfiles.get(founderId) ?? DEFAULT_OUTPUT_PROFILE;
  }

  setOutputProfile(founderId: string, profile: OutputProfile): void {
    this.outputProfiles.set(founderId, profile);
  }
}

export const store = new InMemoryStore();
export const DEMO_FOUNDER_ID = "demo-founder";
