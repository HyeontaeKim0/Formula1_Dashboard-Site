import type { Sessions } from "@/lib/types/types";

export async function getSessions(countryName: string): Promise<Sessions[]> {
  try {
    const response = await fetch(
      `https://api.openf1.org/v1/sessions?country_name=${countryName}&session_name=Sprint&year=${new Date().getFullYear()}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.statusText}`);
    }
    const data: Sessions[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
}
