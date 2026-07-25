import { randomUUID } from "node:crypto";
import { GenerationAdapter, RepurposeAdapter } from "./adapters/types.js";
import {
  Avatar,
  DEFAULT_OUTPUT_PROFILE,
  OUTPUT_FORMATS,
  OutputProfile,
  RepurposedPiece,
  Submission,
} from "./types.js";
import { addInsight, learnFromApproval } from "./voiceProfile.js";
import { Notifier } from "./notify.js";

export interface PipelineDeps {
  adapters: GenerationAdapter[];
  repurposeAdapter: RepurposeAdapter;
  notifier: Notifier;
}

/**
 * Orchestrates the core workflow from PRD §5: fan out to the generation
 * lanes (directed by an optional steering note, not just the raw input),
 * hold the submission for human review, then on approval learn the
 * founder's style from the edit, optionally fold in an explicit insight,
 * and fan out into every configured output format.
 */
export class RelayPipeline {
  private submissions = new Map<string, Submission>();

  constructor(private deps: PipelineDeps) {}

  async submit(
    founderId: string,
    rawInput: string,
    avatar: Avatar,
    direction?: string
  ): Promise<Submission> {
    const laneResults = await Promise.all(
      this.deps.adapters.map((adapter) => adapter.generate({ rawInput, avatar, direction }))
    );

    const submission: Submission = {
      id: randomUUID(),
      founderId,
      rawInput,
      direction,
      laneResults,
      status: "in_review",
      createdAt: new Date().toISOString(),
    };

    this.submissions.set(submission.id, submission);
    return submission;
  }

  get(id: string): Submission | undefined {
    return this.submissions.get(id);
  }

  list(founderId: string): Submission[] {
    return [...this.submissions.values()]
      .filter((s) => s.founderId === founderId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async approve(
    id: string,
    mergedDraft: string,
    avatar: Avatar,
    outputProfile: OutputProfile = DEFAULT_OUTPUT_PROFILE,
    approvalInsight?: string
  ): Promise<{ submission: Submission; updatedAvatar: Avatar }> {
    const submission = this.submissions.get(id);
    if (!submission) throw new Error(`Unknown submission: ${id}`);

    const styleUpdated = learnFromApproval(
      avatar,
      submission.laneResults.map((r) => r.content),
      mergedDraft
    );
    const updatedAvatar = approvalInsight ? addInsight(styleUpdated, approvalInsight) : styleUpdated;

    const pieces: RepurposedPiece[] = await Promise.all(
      outputProfile.map(async (formatId) => {
        const format = OUTPUT_FORMATS.find((f) => f.id === formatId);
        if (!format) throw new Error(`Unknown output format: ${formatId}`);
        const content = await this.deps.repurposeAdapter.repurpose({
          approvedDraft: mergedDraft,
          avatar: updatedAvatar,
          formatId: format.id,
          formatDescription: format.description,
        });
        return { format: format.id, content, generatedAt: new Date().toISOString() };
      })
    );

    submission.mergedDraft = mergedDraft;
    submission.approvalInsight = approvalInsight;
    submission.status = "approved";
    submission.approvedAt = new Date().toISOString();
    submission.pieces = pieces;

    await this.deps.notifier.notify({
      founderId: submission.founderId,
      message: `Your draft + ${pieces.length} repurposed piece(s) are ready to review.`,
    });

    return { submission, updatedAvatar };
  }
}
