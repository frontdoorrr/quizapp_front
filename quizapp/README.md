# Genius Game Korea - Quiz Application

## 프로젝트 소개
이 프로젝트는 React를 사용하여 구축된 퀴즈 애플리케이션입니다. 사용자들이 다양한 퀴즈를 풀고 진행 상황을 추적할 수 있습니다.

## 주요 기능
- 사용자 인증 (로그인/회원가입)
- 퀴즈 플레이
- 랭킹 시스템
- 프로필 관리
- 이메일 구독
- 반응형 디자인

## 기술 스택
- Frontend: React.js
- Styling: CSS
- 상태 관리: React Context API
- 라우팅: React Router
- API 통신: Fetch API
- 아이콘: React Icons

## 프로젝트 구조
```
quizapp/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── config.js
│   │   └── services/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ranking/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Login.js
│   │   ├── Profile.js
│   │   └── Ranking.js
│   ├── styles/
│   │   └── *.css
│   └── App.js
├── .env
└── package.json
```

## 설치 및 실행 방법
1. 저장소 클론
```bash
git clone [repository-url]
cd quizapp
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정:
```
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_COMPANY_NAME=Genius Game Korea
REACT_APP_COMPANY_EMAIL=geniusgamekorea@gmail.com
REACT_APP_INSTAGRAM_HANDLE=genius_game_korea
REACT_APP_YOUTUBE_HANDLE=GeniusGame-korea
```

4. 개발 서버 실행
```bash
npm start
```

## 배포 방법
1. 빌드 스크립트 실행
```bash
./build.sh
```

2. 프로덕션 서버 시작
```bash
serve -s build
```

기본적으로 3000번 포트에서 실행되며, 다른 포트를 사용하려면:
```bash
serve -s build -l 포트번호
```

## 환경 설정
- 개발 환경: `.env.development`
- 프로덕션 환경: `.env.production`
- 테스트 환경: `.env.test`

## 컴포넌트 구조
- `Layout`: 전체 레이아웃 구조 (Navbar, Footer)
- `Auth`: 인증 관련 컴포넌트
- `Common`: 재사용 가능한 공통 컴포넌트
- `Ranking`: 랭킹 시스템 관련 컴포넌트

## 스타일 가이드
- BEM 명명 규칙 사용
- 반응형 디자인 (768px, 480px 브레이크포인트)
- CSS 변수 활용 (테마 색상, 폰트 등)

## 기여 방법
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 라이센스
 2025 Genius Game Korea. All rights reserved.
