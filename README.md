# 두솔 (Dusol) - 청년 주택 관리 서비스

> React + TypeScript + Monorepo 아키텍처로 구축된 웹 애플리케이션

## 📋 프로젝트 개요

두솔은 청년층을 위한 주택 관리 서비스 입니다. **청년들이 쉽게 주택을 찾고 관리할 수 있는 사용자 서비스**와 **주택 관리업체를 위한 SaaS 관리 도구**로 구성되어 있습니다. 각 서비스는 독립적인 애플리케이션으로 분리되어 각각의 역할에 최적화된 UI/UX를 제공합니다.

### 🎯 주요 기능

#### 👤 사용자 서비스 (청년 주택 찾기)
- **🏡 청년 주택 검색 및 상세보기**: 무한 스크롤과 필터링을 통한 효율적인 주택 탐색
- **📝 입주 신청**: 실시간 입주 신청 및 상태 추적
- **🚪 퇴실 신청**: 편리한 퇴실 신청 프로세스
- **❤️ 찜 목록**: 관심 주택 저장 및 관리
- **💬 채널톡 챗봇**: 24시간 고객 상담 자동화 및 문의 처리
- **👤 프로필 관리**: 개인정보 및 계정 설정
- **🔐 인증 시스템**: JWT 기반 보안 인증

#### 🛠️ 관리자 SaaS (주택 관리업체용)
- **📊 대시보드**: 실시간 통계 및 현황 모니터링
- **🏠 주택 관리**: 주택 등록, 수정, 삭제 및 상세 관리
- **📋 입주 관리**: 입주 신청 승인/거부 및 상세 관리
- **🚪 퇴실 관리**: 퇴실 신청 처리 및 정산
- **👥 청년 회원 관리**: 회원 정보 조회 및 관리
- **⚙️ 시스템 설정**: 플랫폼 전체 설정 관리

## 🏗️ 기술 아키텍처

### Frontend Stack
- **React 18** + **TypeScript**: 타입 안정성과 현대적 개발 경험
- **React Router v7**: 최신 클라이언트 사이드 라우팅
- **Styled Components**: 컴포넌트 기반 CSS-in-JS 스타일링
- **Recoil**: 효율적인 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱
- **React Spring**: 부드러운 애니메이션 효과

### Monorepo 아키텍처
```
packages/
├── consts/          # 상수 정의
├── hooks/           # 커스텀 훅
├── services/        # API 서비스 레이어
├── states/          # 전역 상태 관리
├── styles/          # 테마 및 스타일 시스템
├── types/           # TypeScript 타입 정의
├── ui/              # 재사용 가능한 UI 컴포넌트
└── utils/           # 유틸리티 함수
```

### DevOps & Infrastructure
- **Docker**: 컨테이너화된 배포
- **Docker Compose**: 멀티 서비스 오케스트레이션
- **Nginx**: 리버스 프록시 및 정적 파일 서빙
- **AWS ECR**: 컨테이너 이미지 레지스트리
- **Multi-stage Build**: 최적화된 프로덕션 빌드

### 개발 도구
- **Vite**: 빠른 개발 서버 및 번들링
- **ESLint + Prettier**: 코드 품질 및 일관성
- **TypeScript**: 정적 타입 검사
- **NPM Workspaces**: 모노레포 의존성 관리

## 🚀 주요 기술적 특징

### 1. **확장 가능한 Monorepo 구조**
- 패키지별 독립적인 의존성 관리
- 코드 재사용성 극대화
- 타입 안전성 보장

### 2. **현대적인 상태 관리**
- Recoil을 통한 효율적인 전역 상태 관리
- React Query를 활용한 서버 상태 캐싱
- 커스텀 훅을 통한 로직 재사용

### 3. **반응형 디자인 시스템**
- 모바일 우선 반응형 디자인
- 일관된 디자인 시스템 구축
- 접근성을 고려한 UI/UX

### 4. **보안 및 성능 최적화**
- JWT 기반 인증 시스템
- 토큰 자동 갱신

### 5. **개발자 경험 (DX) 향상**
- TypeScript를 통한 타입 안정성
- 자동화된 코드 포맷팅 및 린팅


## 🛠️ 설치 및 실행

### Prerequisites
- Node.js 18+
- NPM 9+
- Docker & Docker Compose

### 개발 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd dusol-web-repository-version2

# 의존성 설치
npm install

# 개발 서버 실행 (사용자 웹)
npm run dev-user-service

# 개발 서버 실행 (관리자 웹)
npm run dev-admin-service
```

### 프로덕션 빌드

```bash
# 전체 빌드
npm run build:all

# 개별 빌드
npm run build:user    # 사용자 웹
npm run build:admin   # 관리자 웹
```

### Docker 배포

```bash
# Docker Compose로 전체 스택 실행
docker-compose up -d

# 개별 서비스 빌드
docker build -f Dockerfile.user -t dusol-user .
docker build -f Dockerfile.admin -t dusol-admin .
```

## 📁 프로젝트 구조

```
dusol-web-repository-version2/
├── apps/
│   ├── user-web/           # 청년 주택 찾기 서비스
│   │   ├── src/
│   │   │   ├── components/ # 사용자 컴포넌트
│   │   │   ├── pages/      # 사용자 페이지
│   │   │   └── services/   # 사용자 API
│   │   └── package.json
│   └── admin-web/          # 관리업체용 SaaS
│       ├── src/
│       │   ├── components/ # 관리자 컴포넌트
│       │   ├── pages/      # 관리자 페이지
│       │   └── services/   # 관리자 API
│       └── package.json
├── packages/               # 공유 패키지들
│   ├── consts/            # 상수 정의
│   ├── hooks/             # 커스텀 훅
│   ├── services/          # API 서비스
│   ├── states/            # 상태 관리
│   ├── styles/            # 스타일 시스템
│   ├── types/             # 타입 정의
│   ├── ui/                # UI 컴포넌트
│   └── utils/             # 유틸리티
├── docker-compose.yml     # Docker 오케스트레이션
├── Dockerfile.user        # 사용자 웹 컨테이너
├── Dockerfile.admin       # 관리자 웹 컨테이너
└── package.json          # 루트 패키지 설정
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: 두솔 그라데이션 (#ee2368 → #f46b1f → #fdde28)


### 타이포그래피
- **Font Family**: Pretendard (한글 최적화)
- **Font Weights**: Regular, Medium, SemiBold, Bold
- **Font Sizes**: 9px ~ 40px (체계적인 스케일)

### 반응형 브레이크포인트
- **Mobile**: 320px ~ 768px
- **Desktop**: 769 ~ 1200px+

## 🔧 개발 가이드

### 코드 스타일
- **TypeScript**: strict 모드 활성화
- **Prettier**: 일관된 코드 포맷팅
- **컴포넌트**: 함수형 컴포넌트 + 훅 사용

### Git 컨벤션
- **feat**: 새로운 기능
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅
- **refactor**: 코드 리팩토링

## 📈 개발 기여 내용

### 구현한 주요 기능
- **✅ 사용자 웹 애플리케이션**: 청년 주택 검색, 입주/퇴실 신청, 찜목록 관리
- **✅ 관리자 SaaS**: 주택 관리, 입주/퇴실 승인, 대시보드 구현
- **✅ 채널톡 챗봇**: 고객 상담 자동화 및 문의 처리 시스템
- **✅ 공통 패키지**: 재사용 가능한 UI 컴포넌트 및 유틸리티 모듈
- **✅ 인증 시스템**: JWT 기반 로그인/회원가입 구현
- **✅ 반응형 디자인**: 모바일/데스크톱 대응 UI/UX

### 기술적 성과
- **Monorepo 아키텍처**: 8개 공유 패키지로 코드 재사용성 극대화
- **채널톡 챗봇 통합**: API 연동을 통한 고객 상담 자동화 시스템 구축
- **Docker 컨테이너화**: 멀티 스테이지 빌드로 최적화된 배포 환경
- **타입 안정성**: TypeScript strict 모드로 런타임 에러 최소화

## 👥 프로젝트 참여 경험

**두솔(주)** 계약직 개발자로서 참여한 프로젝트입니다. 현대적인 웹 개발 베스트 프랙티스를 적용하여 개발에 기여했습니다.

### 담당 업무
- **Frontend 개발**: React + TypeScript 기반 사용자/관리자 웹 애플리케이션 개발
- **아키텍처 설계**: Monorepo 구조 설계 및 패키지 모듈화
- **UI/UX 구현**: 반응형 디자인 시스템 구축 및 컴포넌트 개발
- **DevOps**: Docker 컨테이너화 및 배포 환경 구축

### 주요 기술 스택
- **Frontend**: React, TypeScript, Styled Components
- **State Management**: Recoil, React Query
- **Build Tools**: Vite, ESLint, Prettier
- **DevOps**: Docker, Docker Compose, Nginx
- **Cloud**: AWS ECR
- **Chatbot**: 워크플로우 및 ALF를 통한 고객 상담 자동화

---

## 링크
> 서비스: [링크](https://dosoul-lounge.kr)

> Figma: [링크](https://www.figma.com/design/evggCRumh7C93Ubp6wDHEQ/%EB%91%90%EC%86%94-UI?node-id=2001-11&t=TQ1Octtqf95M48AP-1)


