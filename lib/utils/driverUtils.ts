// 모든 차량 이미지
import McLarenCar from "@/assets/img/car/McLaren/McLaren_Car.webp";
import MercedesCar from "@/assets/img/car/Mercedes/Mercedes_Car.webp";
import RedBullCar from "@/assets/img/car/RedBull/RedBull_Car.webp";
import WilliamsCar from "@/assets/img/car/Williams/Williams_Car.webp";
import FerrariCar from "@/assets/img/car/Ferrari/Ferrari_Car.webp";

// 모든 팀 로고
import McLarenLogo from "@/assets/img/teamLogo/McLaren.webp";
import MercedesLogo from "@/assets/img/teamLogo/Mercedes.svg";
import RedBullLogo from "@/assets/img/teamLogo/RedBull.svg";
import FerrariLogo from "@/assets/img/teamLogo/Ferrari.svg";
import WilliamsLogo from "@/assets/img/teamLogo/Williams.svg";
import AstonMartinLogo from "@/assets/img/teamLogo/Martin.png";
import HaasLogo from "@/assets/img/teamLogo/Haas.svg";
import AlpineLogo from "@/assets/img/teamLogo/Alpine.png";
import KickSauberLogo from "@/assets/img/teamLogo/Kick.svg";
import RacingBullsLogo from "@/assets/img/teamLogo/RacingBulls.png";

// 모든 드라이버 이미지
import MaxVerstappen from "@/assets/img/podium/Max_Podium.png";
import YukiTsunoda from "@/assets/img/driverProfile/RedBull/yuki.webp";
import KimiAntonelli from "@/assets/img/podium/Kimi_Podium4.png";
import GeorgeRussell from "@/assets/img/podium/Russell_Podium.png";
import LandoNorris from "@/assets/img/podium/Norris_Podium.png";
import OscarPiastri from "@/assets/img/podium/Oscar_Podium.png";
import CarlosSainz from "@/assets/img/podium/Saintz_Podium.png";
import AlexAlbon from "@/assets/img/driverProfile/Williams/albon.webp";
import LewisHamilton from "@/assets/img/driverProfile/Ferrari/hamilton.webp";
import CharlesLeclerc from "@/assets/img/driverProfile/Ferrari/leclerc.webp";
import FernandoAlonso from "@/assets/img/driverProfile/AstonMartin/fernando.webp";
import LanceStroll from "@/assets/img/driverProfile/AstonMartin/stroll.webp";
import EstebanOcon from "@/assets/img/driverProfile/Haas/ocon.webp";
import OliverBearman from "@/assets/img/driverProfile/Haas/oliver.webp";
import GabrielBortoleto from "@/assets/img/driverProfile/KickSauber/gabriel.webp";
import NicoHulkenberg from "@/assets/img/driverProfile/KickSauber/niko.webp";
import PierreGasly from "@/assets/img/driverProfile/Alpine/gasly.webp";
import FrancoColapinto from "@/assets/img/driverProfile/Alpine/franco.webp";
import IsackHadjar from "@/assets/img/driverProfile/RacingBulls/isack.webp";
import LiamLawson from "@/assets/img/driverProfile/RacingBulls/lowson.webp";

import LusailCircuit from "@/assets/img/circuit/Qatar_Circuit.avif";
import YasMarinaCircuit from "@/assets/img/circuit/Abu_Dhabi_Circuit.avif";

export const getCircuitImageUrl = (circuit_name: string) => {
  switch (circuit_name) {
    case "lusail":
      return LusailCircuit.src;
    case "yas_marina":
      return YasMarinaCircuit.src;
    default:
      return "";
  }
};

export const getCircuitName = (circuit_name: string) => {
  switch (circuit_name) {
    case "lusail":
      return "루살 서킷";
    case "yas_marina":
      return "야스 마리나 서킷";
    default:
      return "";
  }
};
export const getCar = (driver_number: number) => {
  switch (driver_number) {
    case 4:
    case 81:
      return McLarenCar.src;
    case 63:
    case 12:
      return MercedesCar.src;
    case 1:
    case 33:
      return RedBullCar.src;
    case 55:
      return WilliamsCar.src;
    case 44:
    case 16:
      return FerrariCar.src;

    default:
      return "";
  }
};

export const getDriverName = (driver_number: number) => {
  switch (driver_number) {
    case 1:
      return "막스 베르스타펜";
    case 33:
      return "막스 베르스타펜";
    case 22:
      return "유키 츠노다";
    case 63:
      return "조지 러셀";
    case 12:
      return "키미 안토넬리";
    case 55:
      return "카를로스 사인츠";
    case 23:
      return "알렉스 알본";
    case 44:
      return "루이스 해밀턴";
    case 16:
      return "샤를 르클레르";
    case 14:
      return "페르난도 알론소";
    case 18:
      return "랜스 스트롤";
    case 31:
      return "에스테반 오콘";
    case 87:
      return "올리버 베어먼";
    case 5:
      return "가브리에우 보르툴레투";
    case 27:
      return "니코 휠켄베르그";
    case 10:
      return "피에르 가슬리";
    case 43:
      return "프란코 콜라핀토";
    case 6:
      return "아이작 하자르";
    case 30:
      return "리암 로슨";
    case 81:
      return "오스카 피아스트리";
    case 4:
      return "랜도 노리스";

    default:
      return driver_number.toString();
  }
};

export const getDriverChampionName = (driver_code: string) => {
  switch (driver_code) {
    case "VER":
    case "max_verstappen":
      return "막스 베르스타펜";
    case "TSU":
      return "유키 츠노다";
    case "ANT":
      return "키미 안토넬리";
    case "RUS":
      return "조지 러셀";
    case "NOR":
      return "랜도 노리스";
    case "PIA":
      return "오스카 피아스트리";
    case "SAI":
      return "카를로스 사인츠";
    case "ALB":
      return "알렉스 알본";
    case "HAM":
      return "루이스 해밀턴";
    case "LEC":
      return "샤를 르클레르";
    case "ALO":
      return "페르난도 알론소";
    case "STR":
      return "랜스 스트롤";
    case "OCO":
      return "에스테반 오콘";
    case "BEA":
      return "올리버 베어먼";
    case "BOR":
      return "가브리엘 보르토레토";
    case "HUL":
      return "니코 휠켄베르그";
    case "GAS":
      return "피에르 가슬리";
    case "COL":
      return "프란코 콜라핀토";
    case "HAD":
      return "아이작 하자르";
    case "LAW":
      return "리암 로슨";
    case "DOO":
      return "잭 두한";

    default:
      return "";
  }
};

export const getTeamName = (driver_number: number) => {
  switch (driver_number) {
    case 1:
      return "레드불";
    case 33:
      return "레드불";
    case 22:
      return "레드불";
    case 12:
      return "메르세데스";
    case 63:
      return "메르세데스";
    case 4:
      return "맥라렌";
    case 81:
      return "맥라렌";
    case 55:
      return "윌리엄스";
    case 23:
      return "윌리엄스";
    case 44:
      return "페라리";
    case 16:
      return "페라리";
    case 14:
      return "애스턴 마틴";
    case 18:
      return "애스턴 마틴";
    case 87:
      return "하스";
    case 31:
      return "하스";
    case 5:
      return "킥 자우버";
    case 27:
      return "킥 자우버";
    case 10:
      return "알핀";
    case 43:
      return "알핀";
    case 6:
      return "레이싱 불스";
    case 30:
      return "레이싱 불스";
    default:
      return driver_number.toString();
  }
};

export const getTeamColor = (driver_number: number) => {
  switch (driver_number) {
    // Red Bull
    case 1:
    case 33:
    case 22:
      return "#1E41FF";
    // Mercedes
    case 12:
    case 63:
      return "#00D2BE";
    // McLaren
    case 4:
    case 81:
      return "#FF8000";
    // Ferrari
    case 44:
    case 16:
      return "#DC143C";
    // Williams
    case 55:
    case 23:
      return "#00A3E0";
    // Aston Martin
    case 14:
    case 18:
      return "#006F62";
    // Haas
    case 31:
    case 87:
      return "gray";
    // Kick Sauber
    case 5:
    case 27:
      return "#52C41A";
    // Alpine
    case 10:
    case 43:
      return "#FF009C";
    // Racing Bulls
    case 6:
    case 30:
      return "#e3e3e4";
    default:
      return "#1E293B";
  }
};

export const getConstructorTeamColor = (team_name: string) => {
  switch (team_name) {
    case "Red Bull Racing":
      return "#1E41FF";
    case "Mercedes Formula 1 Team":
      return "#00D2BE";
    case "McLaren Formula 1 Team":
      return "#FF8000";
    case "Scuderia Ferrari":
      return "#DC143C";
    case "Williams Racing":
      return "#00A3E0";
    case "Aston Martin F1 Team":
      return "#006F62";
    case "Haas F1 Team":
      return "gray";
    case "Sauber F1 Team":
      return "#52C41A";
    case "Alpine F1 Team":
      return "#FF009C";
    case "RB F1 Team":
      return "#e3e3e4";
  }
};

export const getTeamLogoUrl = (driver_number: number) => {
  switch (driver_number) {
    case 1:
    case 22:
    case 33:
      return RedBullLogo.src;
    case 12:
    case 63:
      return MercedesLogo.src;
    case 4:
    case 81:
      return McLarenLogo.src;
    case 44:
    case 16:
      return FerrariLogo.src;
    case 55:
    case 23:
      return WilliamsLogo.src;
    case 14:
    case 18:
      return AstonMartinLogo.src;
    case 31:
    case 87:
      return HaasLogo.src;
    case 5:
    case 27:
      return KickSauberLogo.src;
    case 10:
    case 43:
      return AlpineLogo.src;
    case 6:
    case 30:
      return RacingBullsLogo.src;
    default:
      return "";
  }
};

export const getConstructorTeamLogoUrl = (team_name: string) => {
  switch (team_name) {
    case "Red Bull Racing":
      return RedBullLogo.src;
    case "Mercedes Formula 1 Team":
      return MercedesLogo.src;
    case "McLaren Formula 1 Team":
      return McLarenLogo.src;
    case "Scuderia Ferrari":
      return FerrariLogo.src;
    case "Williams Racing":
      return WilliamsLogo.src;
    case "Aston Martin F1 Team":
      return AstonMartinLogo.src;
    case "Haas F1 Team":
      return HaasLogo.src;
    case "Sauber F1 Team":
      return KickSauberLogo.src;
    case "Alpine F1 Team":
      return AlpineLogo.src;
    case "RB F1 Team":
      return RacingBullsLogo.src;
  }
};

export const getConstructorTeamName = (team_name: string) => {
  switch (team_name) {
    case "Red Bull Racing":
      return "레드불";
    case "Mercedes Formula 1 Team":
      return "메르세데스";
    case "McLaren Formula 1 Team":
      return "맥라렌";
    case "Scuderia Ferrari":
      return "페라리";
    case "Williams Racing":
      return "윌리엄스";
    case "Aston Martin F1 Team":
      return "에스턴 마틴";
    case "Haas F1 Team":
      return "하스";
    case "Sauber F1 Team":
      return "킥 자우버";
    case "Alpine F1 Team":
      return "알핀";
    case "RB F1 Team":
      return "레이싱 불스";
    default:
      return team_name;
  }
};

export const getDriverChampionImageUrl = (driver_code: string) => {
  switch (driver_code) {
    case "VER":
      return MaxVerstappen.src;
    case "TSU":
      return YukiTsunoda.src;
    case "ANT":
      return KimiAntonelli.src;
    case "RUS":
      return GeorgeRussell.src;
    case "NOR":
      return LandoNorris.src;
    case "PIA":
      return OscarPiastri.src;
    case "SAI":
      return CarlosSainz.src;
    case "ALB":
      return AlexAlbon.src;
    case "HAM":
      return LewisHamilton.src;
    case "LEC":
      return CharlesLeclerc.src;
    case "ALO":
      return FernandoAlonso.src;
    case "STR":
      return LanceStroll.src;
    case "OCO":
      return EstebanOcon.src;
    case "BEA":
      return OliverBearman.src;
    case "BOR":
      return GabrielBortoleto.src;
    case "HUL":
      return NicoHulkenberg.src;
    case "GAS":
      return PierreGasly.src;
    case "COL":
      return FrancoColapinto.src;
    case "HAD":
      return IsackHadjar.src;
    case "LAW":
      return LiamLawson.src;
    default:
      return "";
  }
};

export const getDriverImageUrl = (driver_number: number) => {
  switch (driver_number) {
    case 1:
    case 33:
      return MaxVerstappen.src;
    case 22:
      return YukiTsunoda.src;
    case 12:
      return KimiAntonelli.src;
    case 63:
      return GeorgeRussell.src;
    case 4:
      return LandoNorris.src;
    case 81:
      return OscarPiastri.src;
    case 55:
      return CarlosSainz.src;
    case 23:
      return AlexAlbon.src;
    case 44:
      return LewisHamilton.src;
    case 16:
      return CharlesLeclerc.src;
    case 14:
      return FernandoAlonso.src;
    case 18:
      return LanceStroll.src;
    case 31:
      return EstebanOcon.src;
    case 87:
      return OliverBearman.src;
    case 5:
      return GabrielBortoleto.src;
    case 27:
      return NicoHulkenberg.src;
    case 10:
      return PierreGasly.src;
    case 43:
      return FrancoColapinto.src;
    case 6:
      return IsackHadjar.src;
    case 30:
      return LiamLawson.src;
    default:
      return "";
  }
};

// KimiAntonelli 이미지를 비교하기 위해 export
export { KimiAntonelli };
