import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db, ensureAnonymousUser } from "@/lib/firebase";

export type ToolRequestStatus = "open" | "planned" | "done";

export interface ToolRequest {
  id: string;
  name: string;
  description: string | null;
  votes: number;
  status: ToolRequestStatus;
  createdAt: Timestamp | null;
}

const COLLECTION = "toolRequests";
const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 300;

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function getToolRequests(): Promise<ToolRequest[]> {
  const q = query(collection(db, COLLECTION), orderBy("votes", "desc"), limit(100));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      description: data.description ?? null,
      votes: data.votes,
      status: (data.status ?? "open") as ToolRequestStatus,
      createdAt: data.createdAt ?? null,
    };
  });
}

export async function submitToolRequest(rawName: string, rawDescription: string): Promise<void> {
  const name = rawName.trim().slice(0, MAX_NAME_LENGTH);
  const description = rawDescription.trim().slice(0, MAX_DESCRIPTION_LENGTH);
  if (!name) throw new Error("Tool name is required.");

  await ensureAnonymousUser();

  const payload: Record<string, unknown> = {
    name,
    nameNormalized: normalizeName(name),
    votes: 1,
    voters: {},
    status: "open",
    createdAt: serverTimestamp(),
  };
  if (description) payload.description = description;

  await addDoc(collection(db, COLLECTION), payload);
}

/**
 * Atomic: adds this user's uid to the request's `voters` map and increments
 * `votes` in the same document write, so Firestore rules can fully validate
 * both the "haven't voted yet" check and the arithmetic in one pass.
 */
export async function upvoteToolRequest(requestId: string): Promise<void> {
  const user = await ensureAnonymousUser();
  const requestRef = doc(db, COLLECTION, requestId);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(requestRef);
    if (!snap.exists()) {
      throw new Error("This request no longer exists.");
    }
    const data = snap.data();
    const voters = (data.voters ?? {}) as Record<string, boolean>;
    if (voters[user.uid]) {
      throw new Error("You've already voted for this.");
    }
    transaction.update(requestRef, {
      votes: (data.votes as number) + 1,
      [`voters.${user.uid}`]: true,
    });
  });
}

/** Admin-only — Firestore rules reject this for anyone but the admin account. */
export async function updateRequestStatus(requestId: string, status: ToolRequestStatus): Promise<void> {
  await updateDoc(doc(db, COLLECTION, requestId), { status });
}

/** Admin-only — Firestore rules reject this for anyone but the admin account. */
export async function deleteToolRequest(requestId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, requestId));
}
