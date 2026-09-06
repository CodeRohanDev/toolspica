"use client";

import * as React from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, ADMIN_EMAIL, signOutUser } from "@/lib/firebase";

export type AdminAuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "denied" }
  | { status: "admin"; user: User };

/** Watches Firebase auth state and classifies it against the one allowed admin email. */
export function useAdminAuth(): AdminAuthState {
  const [state, setState] = React.useState<AdminAuthState>({ status: "loading" });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.isAnonymous) {
        setState({ status: "signed-out" });
        return;
      }
      if (user.email === ADMIN_EMAIL) {
        setState({ status: "admin", user });
      } else {
        // Wrong Google account — never leave it signed in, even briefly.
        setState({ status: "denied" });
        signOutUser();
      }
    });
    return unsubscribe;
  }, []);

  return state;
}
