# quizapp_front
Quiz App Frontend using React.js




assets/: 이미지, 폰트 등 정적 파일 보관
components/:
common/: 버튼, 입력 필드 등 재사용 가능한 UI 컴포넌트
layout/: 헤더, 푸터, 사이드바 등 레이아웃 컴포넌트
hooks/: 커스텀 훅 보관 (예: useForm, useAuth 등)
pages/: 각 라우트에 해당하는 페이지 컴포넌트
services/: API 통신 로직
store/: 전역 상태 관리 (Redux/Context API)
styles/: 전역 스타일 설정
utils/: 유틸리티 함수들
constants/: 상수 정의
현재 프로젝트의 개선점:

현재 모든 컴포넌트가 components/ 폴더에 있는데, 성격에 따라 common/과 layout/으로 분리하면 좋습니다.
CSS 파일들을 styles/ 디렉토리로 이동하면 스타일 관리가 더 용이해집니다.
API 호출이나 비즈니스 로직은 services/ 폴더로 분리하는 것이 좋습니다.
이러한 구조는:

코드의 재사용성 향상
유지보수 용이성 증가
팀 협업 시 코드 이해도 향상
확장성 개선
등의 이점을 제공합니다. 프로젝트의 규모와 요구사항에 따라 이 구조를 적절히 수정하여 사용하시면 됩니다.
