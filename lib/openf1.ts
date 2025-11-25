// McLaren
import Piastri from "../assets/img/driverProfile/McLaren/piastri.webp";
import Norris from "../assets/img/driverProfile/McLaren/norris.webp";
import McLarenLogo from "../assets/img/teamLogo/McLaren.webp";

// Aston Martin
import Stroll from "../assets/img/driverProfile/AstonMartin/stroll.webp";
import Alonso from "../assets/img/driverProfile/AstonMartin/fernando.webp";
import AstonMartinLogo from "../assets/img/teamLogo/Martin.png";

// Red Bull
import Verstappen from "../assets/img/driverProfile/RedBull/max.webp";
import Tsunoda from "../assets/img/driverProfile/RedBull/yuki.webp";

import RedBullLogo from "../assets/img/teamLogo/RedBull.svg";
// Ferrari
import Hamilton from "../assets/img/driverProfile/Ferrari/hamilton.webp";
import Leclerc from "../assets/img/driverProfile/Ferrari/leclerc.webp";
import FerrariLogo from "../assets/img/teamLogo/Ferrari.svg";
// Mercedes
import Russell from "../assets/img/driverProfile/Mercedes/george.webp";
import Kimi from "../assets/img/driverProfile/Mercedes/kimi.webp";
import MercedesLogo from "../assets/img/teamLogo/Mercedes.svg";
// Williams
import Sainz from "../assets/img/driverProfile/Williams/sainz.webp";
import Albon from "../assets/img/driverProfile/Williams/albon.webp";
import WilliamsLogo from "../assets/img/teamLogo/Williams.svg";
// Haas
import Ocon from "../assets/img/driverProfile/Haas/ocon.webp";
import Oliver from "../assets/img/driverProfile/Haas/oliver.webp";
import HaasLogo from "../assets/img/teamLogo/Haas.svg";
// Alpine
import Gasly from "../assets/img/driverProfile/Alpine/gasly.webp";
import Franco from "../assets/img/driverProfile/Alpine/franco.webp";
import AlpineLogo from "../assets/img/teamLogo/Alpine.png";
// Kick Sauber
import Niko from "../assets/img/driverProfile/KickSauber/niko.webp";
import Gabriel from "../assets/img/driverProfile/KickSauber/gabriel.webp";
import KickSauberLogo from "../assets/img/teamLogo/Kick.svg";
// Racing bulls
import Isack from "../assets/img/driverProfile/RacingBulls/isack.webp";
import Liam from "../assets/img/driverProfile/RacingBulls/lowson.webp";
import RacingBullsLogo from "../assets/img/teamLogo/RacingBulls.png";

import type { Driver, OpenF1Driver } from "@/lib/types/types";

export type { Driver, OpenF1Driver } from "@/lib/types/types";

// 팀 로고 URL 매핑
const teamLogoMap: Record<string, string> = {
  "Red Bull Racing": RedBullLogo.src || "",
  McLaren: McLarenLogo.src || "",
  Ferrari: FerrariLogo.src || "",
  Mercedes: MercedesLogo.src || "",
  "Aston Martin": AstonMartinLogo.src || "",
  "Kick Sauber": KickSauberLogo.src || "",
  Alpine: AlpineLogo.src || "",
  Williams: WilliamsLogo.src || "",
  "Haas F1 Team": HaasLogo.src || "",
  "Racing Bulls": RacingBullsLogo.src || "",
};

// 팀 이름 한글 매핑
const teamNameMap: Record<string, string> = {
  "Red Bull Racing": "레드불",
  McLaren: "맥라렌",
  Ferrari: "페라리",
  Mercedes: "메르세데스",
  "Aston Martin": "에스턴 마틴",
  Alpine: "알핀",
  "Haas F1 Team": "하스",
  Williams: "윌리엄스",
  RB: "RB",
  "Kick Sauber": "킥 자우버",
  "Racing Bulls": "레이싱 불스",
};

// 국가 코드 한글 매핑
const countryCodeMap: Record<string, string> = {
  NED: "네덜란드",
  GBR: "영국",
  AUS: "오스트레일리아",
  MCO: "모나코",
  ESP: "스페인",
  CAN: "캐나다",
  DEN: "덴마크",
  JPN: "일본",
  CHN: "중국",
  THA: "태국",
  GER: "독일",
  FIN: "핀란드",
};

// 드라이버 얼굴 사진 맵
const driverHeadshotMap: Record<string, string> = {
  "Max VERSTAPPEN": Verstappen.src || "",
  "Max Verstappen": Verstappen.src || "",
  "Charles LECLERC": Leclerc.src || "",
  "Charles Leclerc": Leclerc.src || "",
  "Lewis HAMILTON": Hamilton.src || "",
  "Lewis Hamilton": Hamilton.src || "",
  "George RUSSELL": Russell.src || "",
  "George Russell": Russell.src || "",
  "Carlos SAINZ": Sainz.src || "",
  "Carlos Sainz": Sainz.src || "",
  "Carlos Sainz Jr.": Sainz.src || "",
  "Lando NORRIS": Norris.src || "",
  "Lando Norris": Norris.src || "",

  "Fernando ALONSO": Alonso.src || "",
  "Fernando Alonso": Alonso.src || "",
  "Esteban OCON": Ocon.src || "",
  "Esteban Ocon": Ocon.src || "",
  "Pierre GASLY": Gasly.src || "",
  "Pierre Gasly": Gasly.src || "",
  "Yuki TSUNODA": Tsunoda.src || "",
  "Yuki Tsunoda": Tsunoda.src || "",
  "Oscar PIASTRI": Piastri.src || "",
  "Oscar Piastri": Piastri.src || "",
  "Lance STROLL": Stroll.src || "",
  "Lance Stroll": Stroll.src || "",
  "Nico HULKENBERG": Niko.src || "",
  "Nico Hulkenberg": Niko.src || "",
  "Franco COLAPINTO": Franco.src || "",
  "Franco Colapinto": Franco.src || "",
  "Isack HADJAR": Isack.src || "",
  "Isack Hadjar": Isack.src || "",
  "Alexander ALBON": Albon.src || "",
  "Alexander Albon": Albon.src || "",
  "Gabriel BORTOLETO": Gabriel.src || "",
  "Gabriel Bortoleto": Gabriel.src || "",
  "Oliver BEARMAN": Oliver.src || "",
  "Oliver Bearman": Oliver.src || "",
  "Kimi ANTONELLI": Kimi.src || "",
  "Kimi Antonelli": Kimi.src || "",
  "Liam LAWSON": Liam.src || "",
  "Liam Lawson": Liam.src || "",
};

// 드라이버 이름 한글 번역 맵
const driverNameMap: Record<string, string> = {
  "Max VERSTAPPEN": "막스 베르스타펜",
  "Max Verstappen": "막스 베르스타펜",
  "Charles LECLERC": "샤를 르클레르",
  "Charles Leclerc": "샤를 르클레르",
  "Lewis HAMILTON": "루이스 해밀턴",
  "Lewis Hamilton": "루이스 해밀턴",
  "George RUSSELL": "조지 러셀",
  "George Russell": "조지 러셀",
  "Carlos SAINZ": "카를로스 사인츠",
  "Carlos Sainz": "카를로스 사인츠",
  "Carlos Sainz Jr.": "카를로스 사인츠",
  "Lando NORRIS": "랜도 노리스",
  "Lando Norris": "랜도 노리스",
  "Sergio PEREZ": "세르히오 페레즈",
  "Sergio Perez": "세르히오 페레즈",
  "Fernando ALONSO": "페르난도 알론소",
  "Fernando Alonso": "페르난도 알론소",
  "Esteban OCON": "에스테반 오콘",
  "Esteban Ocon": "에스테반 오콘",
  "Pierre GASLY": "피에르 가슬리",
  "Pierre Gasly": "피에르 가슬리",
  "Yuki TSUNODA": "유키 츠노다",
  "Yuki Tsunoda": "유키 츠노다",
  "Oscar PIASTRI": "오스카 피아스트리",
  "Oscar Piastri": "오스카 피아스트리",
  "Lance STROLL": "랜스 스트롤",
  "Lance Stroll": "랜스 스트롤",
  "Nico HULKENBERG": "니코 휠켄베르그",
  "Nico Hulkenberg": "니코 휠켄베르그",
  "Franco COLAPINTO": "프란코 콜라핀토",
  "Franco Colapinto": "프란코 콜라핀토",
  "Isack HADJAR": "아이작 하자르",
  "Isack Hadjar": "아이작 하자르",
  "Alexander ALBON": "알렉산더 알본",
  "Alexander Albon": "알렉산더 알본",
  "Gabriel BORTOLETO": "가브리엘 보르토레토",
  "Gabriel Bortoleto": "가브리엘 보르토레토",
  "Oliver BEARMAN": "올리버 베어먼",
  "Oliver Bearman": "올리버 베어먼",
  "Kimi ANTONELLI": "키미 안토넬리",
  "Kimi Antonelli": "키미 안토넬리",
  "Liam LAWSON": "리암 로슨",
  "Liam Lawson": "리암 로슨",
};

// 드라이버 이름 번역 함수
export function translateDriverName(name: string): string {
  return driverNameMap[name] || name;
}

// 드라이버 얼굴 사진 가져오기
export function getDriverHeadshot(name: string): string {
  return driverHeadshotMap[name] || "";
}

// OpenF1 API에서 드라이버 목록 가져오기
export async function getDriversFromOpenF1(
  sessionKey: string = "latest"
): Promise<OpenF1Driver[]> {
  try {
    const response = await fetch(
      `https://api.openf1.org/v1/drivers?session_key=${sessionKey}`,
      {
        next: { revalidate: 3600 }, // 1시간마다 재검증
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch drivers: ${response.statusText}`);
    }

    const data: OpenF1Driver[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching drivers from OpenF1:", error);
    return [];
  }
}

// OpenF1 드라이버 데이터를 앱 형식으로 변환
export function transformOpenF1Driver(
  driver: OpenF1Driver,
  position: number = 0,
  points: number = 0,
  wins: number = 0,
  podiums: number = 0
): Driver {
  const teamColor =
    `#${driver.team_colour}` === `#00A1E8`
      ? `#eb78ff`
      : `#${driver.team_colour}`;
  const teamName = teamNameMap[driver.team_name] || driver.team_name;
  const nationality =
    countryCodeMap[driver.country_code] || driver.country_code;

  const translatedName = translateDriverName(driver.full_name);
  const driverHeadshot = getDriverHeadshot(driver.full_name);

  return {
    driverName: translatedName,
    driverCode: driver.name_acronym,
    team: teamName,
    teamColor: teamColor,
    teamLogoUrl: teamLogoMap[driver.team_name] || "",
    driverImageUrl: driverHeadshot || "",
    points: points,
    wins: wins,
    podiums: podiums,
    position: position,
    nationality: nationality,
    driverNumber: driver.driver_number,
    countryCode: driver.country_code,
  };
}

// 세션 키 가져오기 (최신 세션)
export async function getLatestSessionKey(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.openf1.org/v1/sessions?session_key=latest",
      {
        next: { revalidate: 3600 }, // 1시간마다 재검증
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      return data[0].session_key?.toString() || "latest";
    }
    return "latest";
  } catch (error) {
    console.error("Error fetching latest session:", error);
    return "latest";
  }
}
