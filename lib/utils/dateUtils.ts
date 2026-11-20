// Jolpica 일정은 UTC(예: date "2026-03-06", time "01:30:00Z")로 내려온다.
// 한국 시간으로 바꿔서 "3월 6일 (금) - 오전 10:30" 형태로 보여준다.
const kstFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h12",
});

export function formatKst(date?: string | null, time?: string | null): string {
  if (!date) return "";
  if (!time) return date;

  // 시간대 표기가 없으면 UTC로 간주한다 (없는 채로 파싱하면 실행 환경의 로컬 시간으로 해석됨)
  const iso = /(Z|[+-]\d{2}:?\d{2})$/.test(time) ? time : `${time}Z`;
  const parsed = new Date(`${date}T${iso}`);
  if (Number.isNaN(parsed.getTime())) return `${date} ${time}`;

  const parts = Object.fromEntries(
    kstFormatter.formatToParts(parsed).map((p) => [p.type, p.value]),
  );
  return `${parts.month}월 ${parts.day}일 (${parts.weekday}) - ${parts.dayPeriod} ${parts.hour}:${parts.minute}`;
}
