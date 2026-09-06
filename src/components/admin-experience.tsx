"use client";

import * as React from "react";
import { LogOut, Trash2, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/use-admin-auth";
import { signInAdminWithGoogle, signOutUser } from "@/lib/firebase";
import {
  getToolRequests,
  updateRequestStatus,
  deleteToolRequest,
  type ToolRequest,
  type ToolRequestStatus,
} from "@/lib/tool-requests";

const STATUS_LABEL: Record<ToolRequestStatus, string> = {
  open: "Open",
  planned: "Planned",
  done: "Done",
};

const STATUS_STYLE: Record<ToolRequestStatus, string> = {
  open: "bg-muted text-muted-foreground",
  planned: "bg-amber-500/10 text-amber-700",
  done: "bg-emerald-500/10 text-emerald-700",
};

function SignInGate({ denied }: { denied: boolean }) {
  const [signingIn, setSigningIn] = React.useState(false);

  async function handleSignIn() {
    setSigningIn(true);
    try {
      await signInAdminWithGoogle();
    } catch {
      // Popup closed / blocked — nothing to recover, just let them retry.
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-10 text-center">
      {denied && (
        <p className="flex items-center gap-2 text-sm text-destructive">
          <ShieldAlert className="size-4" />
          That Google account isn&apos;t authorized for this dashboard.
        </p>
      )}
      <h1 className="text-lg font-semibold">Admin sign-in</h1>
      <Button onClick={handleSignIn} disabled={signingIn}>
        {signingIn && <Loader2 className="size-4 animate-spin" />}
        Continue with Google
      </Button>
    </div>
  );
}

export function AdminExperience() {
  const auth = useAdminAuth();
  const [requests, setRequests] = React.useState<ToolRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busyId, setBusyId] = React.useState<string | null>(null);

  const refresh = React.useCallback(() => {
    setLoading(true);
    getToolRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (auth.status === "admin") {
      Promise.resolve().then(refresh);
    }
  }, [auth.status, refresh]);

  if (auth.status === "loading") {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (auth.status === "signed-out" || auth.status === "denied") {
    return <SignInGate denied={auth.status === "denied"} />;
  }

  async function handleStatusChange(id: string, status: ToolRequestStatus) {
    setBusyId(id);
    const previous = requests;
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await updateRequestStatus(id, status);
    } catch {
      setRequests(previous);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    const previous = requests;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    try {
      await deleteToolRequest(id);
    } catch {
      setRequests(previous);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Admin</h1>
          <p className="text-sm text-muted-foreground">Signed in as {auth.user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOutUser()}>
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Tool requests</h2>
        {loading ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No requests yet.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {requests.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                <span className="w-10 shrink-0 text-center text-sm font-semibold">{r.votes}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.name}</p>
                  {r.description && (
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
                  )}
                </div>
                <select
                  value={r.status}
                  disabled={busyId === r.id}
                  onChange={(e) => handleStatusChange(r.id, e.target.value as ToolRequestStatus)}
                  className={`shrink-0 rounded-lg border-none px-2.5 py-1.5 text-xs font-medium ${STATUS_STYLE[r.status]}`}
                >
                  {(Object.keys(STATUS_LABEL) as ToolRequestStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={busyId === r.id}
                  onClick={() => handleDelete(r.id)}
                  aria-label={`Delete ${r.name}`}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
