import {
  DEFAULT_OUTPUT_PROFILE,
  emptyVoiceProfile,
  OutputProfile,
  VoiceProfile,
} from "@relay/engine";

/**
 * In-memory store for the MVP — no auth, single demo founder. Swap for a
 * real DB-backed store behind the same shape when phase 2 adds accounts
 * (see docs/05-ROADMAP.md).
 */
class InMemoryStore {
  private voiceProfiles = new Map<string, VoiceProfile>();
  private outputProfiles = new Map<string, OutputProfile>();

  getVoiceProfile(founderId: string): VoiceProfile {
    if (!this.voiceProfiles.has(founderId)) {
      this.voiceProfiles.set(founderId, emptyVoiceProfile(founderId));
    }
    return this.voiceProfiles.get(founderId)!;
  }

  setVoiceProfile(founderId: string, profile: VoiceProfile): void {
    this.voiceProfiles.set(founderId, profile);
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
