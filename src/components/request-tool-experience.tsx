"use client";

import * as React from "react";
import { ArrowBigUp, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getToolRequests,
  submitToolRequest,
  upvoteToolRequest,
  type ToolRequest,
} from "@/lib/tool-requests";

const VOTED_STORAGE_KEY = "toolspica:voted-tool-requests";

function loadVotedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(VOTED_STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveVotedIds(ids: Set<string>) {
  try {
    localStorage.setItem(VOTED_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Private browsing / storage disabled — voting still works, just won't
    // remember across a reload.
  }
}

export function RequestToolExperience() {
  const [requests, setRequests] = React.useState<ToolRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [votedIds, setVotedIds] = React.useState<Set<string>>(new Set());
  const [voteError, setVoteError] = React.useState<string | null>(null);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const refresh = React.useCallback(() => {
    setLoading(true);
    getToolRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    Promise.resolve().then(() => {
      refresh();
      setVotedIds(loadVotedIds());
    });
  }, [refresh]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Tool name is required.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await submitToolRequest(name, description);
      setName("");
      setDescription("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      refresh();
    } catch {
      setFormError("Couldn't submit your request — try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleUpvote(id: string) {
    if (votedIds.has(id)) return;

    // Optimistic: reflect the vote immediately, roll back only if the
    // server actually rejects it (already voted elsewhere, network error).
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, votes: r.votes + 1 } : r))
    );
    setVotedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveVotedIds(next);
      return next;
    });
    setVoteError(null);

    upvoteToolRequest(id).catch(() => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, votes: Math.max(0, r.votes - 1) } : r))
      );
      setVotedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        saveVotedIds(next);
        return next;
      });
      setVoteError(id);
      setTimeout(() => setVoteError((current) => (current === id ? null : current)), 4000);
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Suggest a tool</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tool name — e.g. “Video to GIF converter”"
            maxLength={80}
            aria-label="Tool name"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What should it do? (optional)"
            maxLength={300}
            rows={3}
            aria-label="Tool description"
          />
        </div>
        {formError && <p className="mt-2 text-sm text-destructive">{formError}</p>}
        <Button type="submit" className="mt-4" disabled={submitting}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : submitted ? <Check className="size-4" /> : null}
          {submitted ? "Request submitted" : submitting ? "Submitting..." : "Submit request"}
        </Button>
      </form>

      <div>
        <h2 className="text-lg font-semibold">Most requested</h2>
        {loading ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No requests yet — be the first to suggest one above.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {requests.map((r) => {
              const voted = votedIds.has(r.id);
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4"
                >
                  <button
                    type="button"
                    onClick={() => handleUpvote(r.id)}
                    disabled={voted}
                    aria-label={voted ? "You upvoted this" : "Upvote this request"}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      voted
                        ? "border-brand bg-brand-soft text-brand"
                        : "hover:border-brand/40 hover:text-brand"
                    }`}
                  >
                    <ArrowBigUp className="size-4" fill={voted ? "currentColor" : "none"} />
                    {r.votes}
                  </button>
                  <div className="min-w-0 flex-1">
                    {voteError === r.id && (
                      <p className="mb-0.5 text-xs text-destructive">
                        Vote didn&apos;t go through — try again.
                      </p>
                    )}
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    {r.description && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {r.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
