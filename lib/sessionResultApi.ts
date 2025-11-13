import { getLatestSessionKey } from "./openf1";
import type { SessionResult } from "@/lib/types/types";

export async function getSessionResults(): Promise<SessionResult[]> {
  const sessionKey = await getLatestSessionKey();
  try {
    const response = await fetch(
      `https://api.openf1.org/v1/session_result?session_key=${sessionKey}&position<=3`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch session results: ${response.statusText}`
      );
    }
    const data: SessionResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching session results:", error);
    return [];
  }
}
