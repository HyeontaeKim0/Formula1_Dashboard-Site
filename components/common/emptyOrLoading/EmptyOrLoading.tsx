import NotFound from "@/components/common/notFound/NotFound";

export default function EmptyOrLoading({
  isLoading,
  colSpan,
  mobile = false,
}: {
  isLoading: boolean;
  colSpan?: number;
  mobile?: boolean;
}) {
  const content = isLoading ? (
    <NotFound text="결과 데이터 로딩 중..." type="loading" />
  ) : (
    <NotFound
      text="경기 전이거나 없는 세션이에요. 데이터가 계속 안 보이면 잠시 후 다시 시도해주세요."
      type="notFound"
    />
  );

  if (mobile) {
    return <div className="py-4">{content}</div>;
  }

  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-3 text-center text-sm sm:py-4">
        {content}
      </td>
    </tr>
  );
}
