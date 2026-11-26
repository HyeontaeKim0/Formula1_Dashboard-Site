import Image from "next/image";
import type { PodiumDriver } from "@/lib/types/types";

function getName(driver: PodiumDriver) {
  return driver.driverName?.trim() || driver.driverCode || "Driver";
}

// 팀 색 하나로 배경 그라데이션과 거대한 번호 색을 만든다 (팀마다 색을 따로 정하지 않는다)
function darken(color: string, percent: number) {
  return `color-mix(in srgb, ${color} ${percent}%, #000)`;
}

function PodiumBanner({
  driver,
  featured = false,
}: {
  driver: PodiumDriver;
  featured?: boolean;
}) {
  const color = driver.teamColor || "#202328";

  return (
    <div
      className={`relative isolate overflow-hidden text-white ${
        featured
          ? "min-h-[260px] sm:min-h-[380px]"
          : "min-h-[200px] sm:min-h-[260px]"
      }`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${darken(color, 45)} 0%, ${darken(color, 80)} 45%, ${color} 100%)`,
      }}
    >
      {/* 거대한 드라이버 번호: 선수 뒤에 깔린다 */}
      {driver.driverNumber != null && (
        <span
          aria-hidden
          className={`pointer-events-none absolute right-[6%] top-1/2 -translate-y-1/2 select-none font-display font-extrabold italic leading-none [font-stretch:125%] ${
            featured
              ? "text-[10rem] sm:text-[18rem]"
              : "text-[5.5rem] sm:text-[11rem]"
          }`}
          style={{ color: darken(color, 40) }}
        >
          {driver.driverNumber}
        </span>
      )}

      {/* 선수 컷아웃: 오른쪽 아래에 선다 */}
      {driver.imageUrl && (
        <div
          className={`absolute bottom-0 right-0 h-full ${
            featured ? "w-[62%] sm:w-[55%]" : "w-[64%] sm:w-[58%]"
          }`}
        >
          <Image
            src={driver.imageUrl}
            alt={getName(driver)}
            fill
            className="object-contain object-bottom"
            sizes={
              featured
                ? "(max-width: 640px) 62vw, 560px"
                : "(max-width: 640px) 30vw, 360px"
            }
            // 첫 화면에서 가장 크게 보이는 1위 사진만 우선 로드
            priority={featured}
          />
        </div>
      )}

      {!featured && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/60 to-transparent sm:hidden"
        />
      )}

      {/* 이름과 정보: 왼쪽 */}
      <div
        className={`relative z-10 flex h-full flex-col justify-end ${
          featured
            ? "min-h-[260px] p-5 sm:min-h-[380px] sm:p-10"
            : "min-h-[200px] p-3 sm:min-h-[260px] sm:p-7"
        }`}
      >
        <p
          className={`font-display font-extrabold leading-none [font-stretch:125%] ${
            featured ? "text-4xl sm:text-6xl" : "text-xl sm:text-4xl"
          }`}
        >
          P{driver.position}
        </p>
        <p
          className={`mt-2 break-words font-display font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:125%] ${
            featured ? "text-3xl sm:text-5xl" : "text-base sm:text-3xl"
          }`}
        >
          {getName(driver)}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 text-[11px] font-medium text-white/85 sm:mt-3 sm:text-sm">
          <span>{driver.team}</span>
          {driver.driverNumber != null && (
            <span
              className={`border-l border-white/40 pl-3 ${featured ? "" : "hidden sm:inline"}`}
            >
              {driver.driverNumber}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function PodiumStage({
  podiumData,
}: {
  podiumData: PodiumDriver[];
}) {
  const winner = podiumData.find((d) => d.position === 1);
  const others = [2, 3]
    .map((pos) => podiumData.find((d) => d.position === pos))
    .filter((d): d is PodiumDriver => Boolean(d));

  return (
    <section aria-label="최근 레이스 시상대">
      {winner && <PodiumBanner driver={winner} featured />}
      {others.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {others.map((driver) => (
            <PodiumBanner key={driver.position} driver={driver} />
          ))}
        </div>
      )}
    </section>
  );
}
