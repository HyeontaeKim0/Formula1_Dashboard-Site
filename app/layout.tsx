import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, Archivo } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";

const plex = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false, // 한글은 글자 범위별로 나뉘어 내려오므로 선로딩하지 않는다
  variable: "--font-sans",
});
// wdth 축이 있는 가변 글꼴: 숫자를 넓게(expanded) 보여줄 때 font-stretch를 쓴다
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "F1 Dashboard",
  description: "포뮬러1 레이스 일정, 결과, 순위, 드라이버 정보를 한눈에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${plex.variable} ${archivo.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen min-w-0 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
