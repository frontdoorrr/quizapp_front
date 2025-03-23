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
REACT_APP_API_BASE_URL=http://localhost:80
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

2. 개발 서버 시작
```bash
npm start
```

기본적으로 3000번 포트에서 실행되며, 다른 포트를 사용하려면 `.env` 파일에서 `PORT` 환경변수를 설정하세요:
```
PORT=3001
```

## 배포 자동화 (CI/CD)

이 프로젝트는 GitHub Actions를 사용하여 배포 자동화가 구성되어 있습니다.

### 브랜치 전략

1. **main (또는 master)**
   - 프로덕션 배포 브랜치
   - 배포할 때만 머지
   - main 브랜치에 push되면 자동으로 프로덕션 환경에 배포

2. **develop**
   - 개발 및 QA 브랜치
   - 모든 기능 브랜치(feature branches)가 머지됨
   - develop에 push되면 자동으로 스테이징 환경에 배포

3. **feature/* (예: feature/login-page)**
   - 각 기능 개발을 위한 브랜치
   - 완료 후 develop 브랜치에 병합

4. **release (선택 사항)**
   - 주요 릴리스를 위한 브랜치
   - develop에서 만들어져서 QA 진행 후 main으로 병합

### 배포 프로세스

GitHub Actions 워크플로우(`.github/workflows/deploy.yml`)가 다음과 같이 구성되어 있습니다:

1. **빌드 단계**
   - 코드 체크아웃
   - Node.js 설정
   - 의존성 설치
   - 테스트 실행
   - 애플리케이션 빌드 (브랜치에 따라 다른 환경 변수 적용)

2. **스테이징 배포 (develop 브랜치)**
   - AWS S3 버킷에 배포
   - CloudFront 캐시 무효화

3. **프로덕션 배포 (main 브랜치)**
   - 프로덕션 AWS S3 버킷에 배포
   - 프로덕션 CloudFront 캐시 무효화

### 필요한 GitHub Secrets

워크플로우가 제대로 작동하려면 GitHub 저장소에 다음 Secrets를 설정해야 합니다:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `STAGING_API_URL`
- `PROD_API_URL`
- `STAGING_S3_BUCKET`
- `PRODUCTION_S3_BUCKET`
- `STAGING_CLOUDFRONT_ID`
- `PRODUCTION_CLOUDFRONT_ID`

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
