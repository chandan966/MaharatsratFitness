export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export async function getApiData<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(API_URL + "/api" + path, { cache: "no-store" });
    if (!response.ok) return null;
    const payload = await response.json();
    return (payload.data ?? payload) as T;
  } catch {
    return null;
  }
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}
