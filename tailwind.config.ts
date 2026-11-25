import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // 한글 본문(IBM Plex Sans KR)과 숫자·영문 제목(Archivo). app/layout.tsx에서 불러옴
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        // 홈 디자인 시험용: 포인트색 없이 무채색 + 팀 색만 쓴다
        paper: "#F7F7F5", // 페이지 배경
        asphalt: "#202328", // 글자, 시상대 받침
        rule: "#DADBDD", // 얇은 구분선
        muted: "#6B6F76", // 보조 글자
        // 메인 액센트 색상 (F1 레드)
        primary: {
          DEFAULT: "#FF3B30",
          light: "#FF5C52",
          dark: "#E6392E",
          glow: "#FF6B5F",
        },
        // 보조 액센트 색상 (화이트)
        secondary: {
          DEFAULT: "#FFFFFF",
          light: "#FFFFFF",
          dark: "#F5F5F5",
        },
        // 배경 색상 (하얀색 계열)
        dark: {
          DEFAULT: "#FFFFFF", // White
          light: "#F5F5F5", // Light Gray
          lighter: "#E5E5E5", // Lighter Gray
        },
        // 기존 호환성을 위한 별칭
        "f1-red": "#FF3B30", // primary로 매핑
        "f1-black": "#0A0A0A", // dark로 매핑
        "f1-gray": "#1A1A1A", // dark-light로 매핑
      },
    },
  },
  plugins: [],
};
export default config;
