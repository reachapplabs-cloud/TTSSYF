import {
  Avatar,
  AvatarIdea,
  LaneDefinition,
  OutputFormatDefinition,
  Submission,
  VoiceSampleResult,
} from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request to ${path} failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  lanes: () => request<{ lanes: LaneDefinition[] }>("/lanes"),
  outputFormats: () => request<{ formats: OutputFormatDefinition[] }>("/output-formats"),
  getAvatar: () => request<Avatar>("/avatar"),
  addInsight: (insight: string) =>
    request<Avatar>("/avatar/insights", {
      method: "POST",
      body: JSON.stringify({ insight }),
    }),
  avatarIdeas: () => request<{ ideas: AvatarIdea[] }>("/avatar/ideas"),
  submit: (rawInput: string, direction?: string) =>
    request<Submission>("/submissions", {
      method: "POST",
      body: JSON.stringify({ rawInput, direction }),
    }),
  getSubmission: (id: string) => request<Submission>(`/submissions/${id}`),
  approve: (id: string, mergedDraft: string, insight?: string) =>
    request<Submission>(`/submissions/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ mergedDraft, insight }),
    }),
  voiceSample: (rawInput: string) =>
    request<VoiceSampleResult>("/voice-sample", {
      method: "POST",
      body: JSON.stringify({ rawInput }),
    }),
};
