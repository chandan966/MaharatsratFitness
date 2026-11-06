"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

type CurrentUser = { id: string; name: string; email: string; role: string; createdAt: string };

export function MemberPanel() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [status, setStatus] = useState("Loading your account…");

  useEffect(() => {
    fetch(API_URL + "/api/auth/me", { credentials: "include" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Please sign in to view your dashboard.");
        setUser(payload.user);
        setStatus("");
      })
      .catch((error: Error) => setStatus(error.message));
  }, []);

  async function logout() {
    await fetch(API_URL + "/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/";
  }

  if (!user) return <div className="surface-card">{status} <Link href="/login">Sign in →</Link></div>;

  return (
    <div>
      <p className="section-kicker">MEMBER AREA</p>
      <h1 className="dashboard-heading">Welcome back, {user.name.split(" ")[0]}.</h1>
      <p className="muted-copy">Your account is ready. Membership purchase and billing will be enabled after payment setup.</p>
      <div className="metric-grid">
        <div className="metric"><small>Membership</small><strong>Choose a plan</strong><Link className="text-link" href="/membership">View memberships →</Link></div>
        <div className="metric"><small>Classes</small><strong>Find your next session</strong><Link className="text-link" href="/schedule">Browse schedule →</Link></div>
        <div className="metric"><small>Profile</small><strong>{user.email}</strong><button className="text-link plain-button" onClick={logout}>Sign out →</button></div>
      </div>
      <div className="surface-card dashboard-card"><h2>Keep your momentum</h2><p>Explore programs, find a class, and book your first session with the team.</p><Link className="button button-small" href="/classes">Explore programs</Link></div>
    </div>
  );
}
