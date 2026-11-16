// 서킷 상세 정보 (Jolpica는 제공하지 않아 직접 관리)
// 키는 Jolpica circuitId. 5개 값이 모두 있는 서킷만 화면에 통계가 표시됨.
export interface CircuitDetail {
  firstParticipationYear: number; // 첫 개최 연도
  circuitLength: string; // km, 예: "5.412"
  corners: number; // 코너 수
  lapRecord: string; // 예: "1:12.345"
  fastestLapTeamId: string; // 랩 기록 팀 (화면에 그대로 표시)
}

// 2026 캘린더 circuitId:
// albert_park, shanghai, suzuka, miami, villeneuve, monaco, catalunya,
// red_bull_ring, silverstone, spa, hungaroring, zandvoort, monza, madring,
// baku, sepang, marina_bay, americas, rodriguez, interlagos, vegas,
// losail, yas_marina
export const CIRCUIT_DETAILS: Record<string, CircuitDetail> = {};
