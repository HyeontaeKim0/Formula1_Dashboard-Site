## 개요

 - 포뮬러1 레이스 일정, 결과, 순위, 드라이버 정보를 한눈에 볼 수 있는 대시보드 웹 애플리케이션입니다.
 - A dashboard web application that provides a quick, at-a-glance view of Formula 1 race schedule, results, rankings, and driver information.

<img width="1280" height="320" alt="MainTitle" src="https://github.com/user-attachments/assets/9b8e29fe-6f4e-457d-883b-a6c0157c8bd7" />
<img width="1508" height="734" alt="image" src="https://github.com/user-attachments/assets/b5f80f09-7c4c-4f96-93cb-d8d783c07fd9" />
<br/>



## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 주요 기능

- 📅 다가오는 레이스 일정 (upcoming race schedule)
- 🏁 최근 레이스 결과 (the results of the latest race)
- 🏆 챔피언십 순위 (드라이버/컨스트럭터) [Championship Ranking (Driver/Construtor)]
- 📱 반응형 디자인 (responsive design)
  
### Comming Soon
- 📰 최신 뉴스 (the latest news)
- 🌓 다크 모드 지원 (dark mod)
- 🗣️ 커뮤니티 (cummunity)


## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
formula1_Dashboard/
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 홈 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   ├── Navbar.tsx              # 상단 네비게이션
│   ├── Footer.tsx              # 푸터
│   ├── UpcomingRaces.tsx       # 다가오는 레이스
│   ├── RaceResults.tsx         # 레이스 결과
│   ├── ChampionshipStandings.tsx # 챔피언십 순위
│   └── NewsSection.tsx         # 뉴스 섹션
├── public/             # 정적 파일
└── package.json
```

## 디자인 특징

- F1 공식 컬러 팔레트 사용 (#E10600)
- 다크 테마 기반 디자인
- 카드 기반 레이아웃
- 호버 효과 및 전환 애니메이션
- 모바일 반응형 네비게이션

## 참고 사이트

이 프로젝트는 [F1 BoxBox](https://f1-boxbox.com/ko)를 참고하여 제작되었습니다.

## 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.
