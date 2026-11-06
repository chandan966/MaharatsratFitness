"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export function BookButton({ scheduleId, disabled = false }: { scheduleId: string; disabled?: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function book() {
    setMessage("");
    setBusy(true);
    try {
      const response = await fetch(API_URL + "/api/bookings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduleId })
      });
      const payload = await response.json();
      if (response.status === 401) {
        router.push("/login?next=/schedule");
        return;
      }
      if (!response.ok) {
        setMessage(payload.error || "Booking could not be completed.");
        return;
      }
      setMessage("You're booked. See you in class!");
    } catch {
      setMessage("Could not reach the API. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="booking-action"><button className="button button-small" onClick={book} disabled={disabled || busy}>{busy ? "Booking…" : disabled ? "Full" : "Book"}</button>{message && <span role="status">{message}</span>}</div>;
}
