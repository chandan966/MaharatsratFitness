"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

type Overview = { members: number; activeSubscriptions: number; todayBookings: number; pendingMessages: number };

export function AdminPanel() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [message, setMessage] = useState("Loading dashboard…");

  useEffect(() => {
    fetch(API_URL + "/api/admin/overview", { credentials: "include" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Please sign in as an administrator.");
        setOverview(payload);
        setMessage("");
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  return (
    <div>
      <p className="section-kicker">ADMIN AREA</p>
      <h1 className="dashboard-heading">Club overview</h1>
      {message && <div className="surface-card">{message} <Link href="/login">Sign in →</Link></div>}
      {overview && <div className="metric-grid">
        <div className="metric"><small>Members</small><strong>{overview.members.toLocaleString("en-IN")}</strong></div>
        <div className="metric"><small>Active memberships</small><strong>{overview.activeSubscriptions.toLocaleString("en-IN")}</strong></div>
        <div className="metric"><small>Bookings today</small><strong>{overview.todayBookings.toLocaleString("en-IN")}</strong></div>
        <div className="metric"><small>Messages to review</small><strong>{overview.pendingMessages.toLocaleString("en-IN")}</strong></div>
      </div>}
      <div className="surface-card dashboard-card"><h2>Management modules</h2><p>The schema and role protection are ready for member, trainer, class, booking, payment, review, and content management screens.</p><Link className="text-link" href="/schedule">View class schedule →</Link></div>
    </div>
  );
}
