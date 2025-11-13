import type { Meeting } from "@/lib/types/types";

export async function getMeetings(
  year: number,
  countryName: string
): Promise<Meeting[]> {
  try {
    const response = await fetch(
      `https://api.openf1.org/v1/meetings?year=${year}&country_name=${countryName}`,
      {
        next: { revalidate: 3600 }, // 1시간마다 재검증
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch meetings: ${response.statusText}`);
    }
    const data: Meeting[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return [];
  }
}
