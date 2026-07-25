import { GenerationInput, GenerationResult, LaneId } from "../types.js";

/**
 * Everything a real provider integration needs to implement. Swap a mock
 * adapter for a real one (Claude, GPT, Perplexity, ...) by implementing
 * this interface — nothing else in the engine, server, or UI changes.
 */
export interface GenerationAdapter {
  lane: LaneId;
  providerLabel: string;
  generate(input: GenerationInput): Promise<GenerationResult>;
}

/** Adapter for the repurposing step: approved draft -> one output format. */
export interface RepurposeAdapter {
  providerLabel: string;
  repurpose(args: {
    approvedDraft: string;
    voiceProfile: GenerationInput["voiceProfile"];
    formatId: string;
    formatDescription: string;
  }): Promise<string>;
}
