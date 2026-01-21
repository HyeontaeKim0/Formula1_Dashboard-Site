import type { RaceResultItem, RaceResultResponse } from "@/lib/types/types"; 

const defaultDriverResultChartData: RaceResultItem[] = [];

export async function getDriverResultChartData(year: number, round: number): Promise<RaceResultItem[]> {
  try {
    const url = `https://f1api.dev/api/${year}/${round}/race?`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // 1시간마다 재검증
    });
    
    if (!response.ok) {
      return defaultDriverResultChartData;
    }
    
    const data: RaceResultResponse = await response.json();
    
    // API 응답이 배열인 경우
    if (Array.isArray(data)) {
      return data;
    }
    
    // API 응답이 래핑된 객체인 경우
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if ('results' in data && Array.isArray(data.results)) {
        return data.results;
      }
      if ('races' in data) {
        if (data.races && typeof data.races === 'object' && 'results' in data.races && Array.isArray(data.races.results)) {
          return data.races.results;
        }
        // races가 배열인 경우
        if (Array.isArray(data.races) && data.races.length > 0 && 'results' in data.races[0]) {
          const results = (data.races[0] as any).results;
          if (Array.isArray(results)) {
            return results;
          }
        }
      }
    }
    
    return defaultDriverResultChartData;
  } catch (error) {
    return defaultDriverResultChartData;
  }
}