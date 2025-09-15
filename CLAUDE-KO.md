# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 프로젝트 개요

**Uable Corporation**은 몰입형 기술 역량을 보여주는 Next.js 기반 기업 웹사이트를 운영하는 3D/AR/WebXR 기술 회사입니다. 프로젝트는 UI 리팩토링 이니셔티브를 완료하여 현대적인 컴포넌트 아키텍처로 성공적으로 마이그레이션하였습니다.

### 주요 비즈니스 컨텍스트
- **산업**: 3D/AR/WebXR 기술 솔루션
- **핵심 서비스**: 3D 제품 구성기, AR 모바일 앱, WebXR 경험
- **타겟 스택**: Three.js, React Three Fiber, AR.js, WebXR API
- **상태**: ✅ 레거시 정리 완료 (2025년 9월)

## 개발 명령어

```bash
# 개발
cd temp-project
npm run dev              # 개발 서버 시작
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
npm run lint             # ESLint 검증

# Windows 전용 서버 관리
npm run dev-safe         # 개발 전 서버 상태 확인
npm run start-server     # PowerShell 서버 시작
npm run server           # PowerShell 서버 시작 (별칭)
npm run server-bg        # 백그라운드에서 서버 시작
npm run stop-server      # 실행 중인 서버 중지
npm run check-server     # 서버 상태 확인

# SEO 및 성능
npm run postbuild        # 빌드 후 사이트맵 생성
```

## 아키텍처 개요

### 현재 상태 (레거시 정리 후)
```
temp-project/src/
├── app/                 # App Router (Next.js 14)
│   ├── webgl/          # WebGL 갤러리 전용 페이지
│   ├── portfolio/      # 포트폴리오 상세 페이지
│   ├── contact/        # 문의 폼 페이지
│   └── privacy/        # 개인정보처리방침 페이지
├── components/
│   ├── primitives/     # 현대적 컴포넌트 시스템 (CVA + Radix)
│   │   ├── Button/     # Button, Badge, Card, Input, Modal 등
│   │   └── index.ts    # 중앙 집중식 내보내기
│   ├── ui/             # 특수 목적 컴포넌트 (차트, 컨테이너)
│   ├── layout/         # Header, Footer
│   ├── sections/       # 페이지 섹션 (Hero, Problem, Solution)
│   ├── portfolio/      # 포트폴리오 전용 컴포넌트
│   ├── webgl/          # WebGL 갤러리 컴포넌트
│   └── seo/           # SEO 최적화 컴포넌트
├── contexts/           # React 컨텍스트
│   ├── ThemeContext.tsx      # 다크/라이트 모드 관리
│   └── MigrationContext.tsx  # 정리 후 단순화됨
├── data/               # 정적 포트폴리오 데이터
│   └── webgl-gallery.ts # WebGL 번들 관리
├── hooks/              # 커스텀 React 훅
├── lib/                # 유틸리티 및 검증
├── design-system/      # 디자인 토큰 및 유틸리티
└── styles/             # 글로벌 스타일
```

## 컴포넌트 아키텍처 (정리 후)

**✅ 완료됨**: 레거시 UI 마이그레이션이 성공적으로 완료되었습니다. 프로젝트는 이제 통합된 컴포넌트 시스템을 사용합니다.

### 1. 컴포넌트 시스템 구조
모든 UI 컴포넌트가 이제 단일한 현대적 아키텍처를 사용합니다:
- **`@/components/primitives/`**: 핵심 컴포넌트 (Button, Badge, Card, Input, Modal 등)
- **`@/components/ui/`**: 특수 목적 컴포넌트 (차트, 컨테이너, 테마 토글)
- 임포트 패턴: `import { Button } from '@/components/primitives/Button'`

### 2. 컴포넌트 표준
```typescript
// CVA 기반 컴포넌트 패턴
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  }
})

interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean  // 다형성 컴포넌트 지원
}
```

### 3. 주요 아키텍처 결정 사항
- **CVA**: 변형 관리를 위한 Class Variance Authority
- **Radix UI**: 완전한 커스터마이징이 가능한 접근성 우선 기본 요소
- **Forward Refs**: 모든 컴포넌트가 ref 전달 지원
- **TypeScript**: 적절한 인터페이스를 통한 완전한 타입 안전성

## 주요 의존성

### 핵심 스택
- **프레임워크**: Next.js 14.2.13 (App Router)
- **React**: TypeScript와 함께 사용하는 18.3.1
- **스타일링**: Tailwind CSS + Framer Motion
- **폼**: React Hook Form + Zod 검증
- **3D/WebGL**: Shapespark WebGL 번들 통합

### UI 아키텍처
- **CVA**: 변형 관리를 위한 Class Variance Authority
- **Radix UI**: 접근성 우선 기본 요소 (Accordion, Dialog, Select, Slot)
- **Tailwind Merge**: cn() 유틸리티를 통한 동적 클래스 병합
- **Lucide React**: 아이콘 시스템
- **Framer Motion**: 애니메이션 및 전환 효과

### SEO 및 분석
- **사이트맵**: 자동 생성을 위한 next-sitemap
- **스키마**: 3D/AR/WebXR 키워드를 위한 구조화된 데이터
- **분석**: Naver Analytics 통합

## 개발 가이드라인

### 1. 컴포넌트 개발
- **핵심 UI 컴포넌트**: CVA + Radix 패턴을 사용하여 `src/components/primitives/`에 추가
- **특수 목적 컴포넌트**: 차트, 컨테이너 등을 위해 `src/components/ui/`에 추가
- **항상 TypeScript 사용**: 적절한 인터페이스를 통한 완전한 타입 안전성
- **CVA 패턴 따르기**: 컴포넌트 변형 및 스타일링을 위해 `cva()` 사용

### 2. 임포트 패턴
```typescript
// 올바른 임포트 패턴
import { Button } from '@/components/primitives/Button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/design-system/utils'

// 변형과 함께하는 컴포넌트 사용
<Button variant="primary" size="lg">클릭하세요</Button>
```

### 3. SEO 고려사항
- layout.tsx에서 구조화된 데이터 유지
- 메타 태그에 3D/AR/WebXR 키워드 포함
- 접근성을 위한 시맨틱 HTML 사용
- 한국 시장 최적화 (네이버, 구글 코리아)

## 파일 구조 규칙

### 기본 컴포넌트
```
src/components/primitives/
├── Button/
│   ├── Button.tsx       # CVA를 사용하는 메인 컴포넌트
│   └── index.ts         # 깔끔한 내보내기
├── Card/
│   ├── Card.tsx         # 복합 컴포넌트 패턴
│   └── index.ts
```

### 특수 목적 컴포넌트
```
src/components/ui/
├── theme-toggle.tsx     # 테마 전환
├── container.tsx        # 레이아웃 컨테이너
├── *-chart.tsx         # 데이터 시각화
```

## WebGL 통합 아키텍처

### WebGL 번들 시스템
```typescript
interface WebGLBundle {
  id: string
  title: string
  description: string
  path: string
  thumbnail?: string
  tags: string[]
  status: 'active' | 'development' | 'disabled'
}
```

### 현재 WebGL 경험
1. **웹툰 스튜디오**: 창작 작업공간 3D 환경
2. **청우 F&B 쇼룸**: 크루즈 테마 가상 쇼룸
3. **홈 갤러리**: 현대적인 주거 공간 투어
4. **오피스 공간**: 현대적인 사무실 공간 경험
5. **주차장**: 현실적인 지하 주차 시설

### WebGL 컴포넌트 사용법
- **갤러리 컴포넌트**: 재사용 가능한 갤러리 표시를 위한 `<WebGLGallery />`
- **홈 통합**: "모두 보기" 링크와 함께 처음 3개 번들 표시
- **전용 페이지**: 완전한 WebGL 경험 쇼케이스를 위한 `/webgl`
- **헤더 네비게이션**: 메인 네비게이션 메뉴를 통한 직접 접근

## 비즈니스 도메인 지식

### 포트폴리오 데이터 구조
```typescript
interface PortfolioItem {
  id: string
  title: string
  description: string
  longDescription: string
  images: string[]
  videoUrl?: string
  tags: string[]
  metrics?: VisualMetric[]
  projectDetails: ProjectDetail[]
}
```

### 3D/AR/WebGL 특화 컴포넌트
- 시각적 메트릭 차트 (성능 데이터)
- 3D 모델 미리보기 및 갤러리
- 인터랙티브 데모 섹션
- 기술 스택 배지
- **WebGL 갤러리 시스템**: Shapespark 번들을 위한 재사용 가능한 갤러리 컴포넌트
- **WebGL 번들 관리**: WebGL 경험을 위한 중앙 집중식 데이터 관리

### 한국 시장 최적화
- 네이버 검색 엔진 최적화
- 한국어 구조화된 데이터
- 모바일 우선 반응형 디자인
- 지역 비즈니스 스키마 마크업

## 테스트 전략

- TypeScript 타입 검사를 통한 컴포넌트 테스트
- UI 컴포넌트에 대한 시각적 회귀 테스트
- 변경 후 SEO 구조화된 데이터 검증
- 3D/WebGL 콘텐츠에 대한 성능 테스트
- WebGL 호환성을 위한 크로스 브라우저 테스트

## 추가 컨텍스트

### 전문 에이전트
이 저장소에는 다양한 개발 역할(dev, architect, analyst 등)을 위한 전문 AI 에이전트가 `.cursor/rules/` 디렉토리를 통해 포함되어 있습니다. 프로젝트의 특정 측면에서 작업할 때 참조할 수 있습니다.

### 문서화
- **`docs/`**: 아키텍처, 명세서, 구현 가이드를 포함한 종합적인 프로젝트 문서
- **아키텍처 문서**: 레거시 정리 후 최신 아키텍처 정보
- **WebGL 통합**: 3D 경험 구현을 위한 상세 가이드

### 비즈니스 포커스
- 타겟 시장: 네이버 SEO 최적화를 통한 한국 시장
- 산업: 3D/AR/WebXR 기술 솔루션
- 핵심 가치: 몰입형 기술 쇼케이스 및 클라이언트 확보