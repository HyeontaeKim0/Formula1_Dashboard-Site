import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-white via-gray-50 to-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                <span className="text-primary font-extrabold text-lg">F1</span>
              </div>
              <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
                F1 Dashboard
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              포뮬러1 레이스 일정, 결과, 순위, 드라이버 정보를 한눈에
              확인하세요.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-gray-900 mb-4">
              빠른 링크
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/schedule"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  일정
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  결과
                </Link>
              </li>
              <li>
                <Link
                  href="/standings"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  순위
                </Link>
              </li>
              <li>
                <Link
                  href="/drivers"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  드라이버
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-white mb-4">
              정보
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  문의 · 제안
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary transition-all duration-300 inline-block hover:translate-x-1 font-medium"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-xs text-center leading-relaxed font-medium">
            This website is not officially affiliated with Formula 1®, Formula
            One Management, Formula One World Championship™ or any other related
            companies. F1®, FORMULA 1®, FORMULA ONE®, FORMULA ONE WORLD
            CHAMPIONSHIP™ and related logos are registered trademarks of Formula
            One Licensing B.V.
          </p>
          <p className="text-gray-500 text-xs text-center mt-4 font-medium">
            All race data and statistics on this site are provided with
            reference to official Formula 1® materials. While we strive for
            accuracy, please refer to F1.com for official records.
          </p>
        </div>
      </div>
    </footer>
  );
}
