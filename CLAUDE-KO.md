# CLAUDE.md (한글 번역)

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 필요한 가이드라인을 제공합니다.

## 프로젝트 개요

**Uable Corporation**은 3D/AR/WebXR 기술 회사로, Next.js 기반의 기업 웹사이트를 통해 몰입형 기술 역량을 선보이고 있습니다. 이 프로젝트는 UI 리팩토링 작업을 완료하고, 현대적인 컴포넌트 아키텍처로 성공적으로 마이그레이션하였습니다.

### 핵심 비즈니스 컨텍스트
- **산업 분야**: 3D/AR/WebXR 기술 솔루션
- **핵심 서비스**: 3D 제품 컨피규레이터, AR 모바일 앱, WebXR 경험
- **기술 스택**: Three.js, React Three Fiber, AR.js, WebXR API
- **상태**: ✅ 레거시 정리 완료 (2025년 9월)

## 개발 명령어

**작업 디렉토리**: 항상 `temp-project/` 디렉토리에서 명령어를 실행하세요

```bash
# 핵심 개발
cd temp-project
npm run dev              # 개발 서버 시작
npm run build            # 프로덕션 빌드
npm run start            # 프로덕션 서버 시작
npm run lint             # ESLint 검증

# Windows 전용 서버 관리
npm run dev-safe         # 개발 시작 전 서버 상태 확인
npm run start-server     # PowerShell 서버 시작
npm run server           # PowerShell 서버 시작 (별칭)
npm run server-bg        # 백그라운드에서 서버 시작
npm run stop-server      # 실행 중인 서버 중지
npm run check-server     # 서버 상태 확인

# SEO & 성능
npm run postbuild        # 빌드 후 사이트맵 생성
```

**중요**: 이 프로젝트는 서버 관리를 위해 Windows PowerShell 스크립트를 사용합니다. 루트가 아닌 `temp-project` 디렉토리에서 항상 개발 명령어를 실행하세요.

## 아키텍처 개요

### 현재 상태 (레거시 정리 후)
```
temp-project/src/
├── app/                 # App Router (Next.js 14)
│   ├── webgl/          # WebGL 갤러리 전용 페이지
│   ├── portfolio/      # 포트폴리오 상세 페이지
│   ├── contact/        # 연락처 양식 페이지
│   └── privacy/        # 개인정보 처리방침 페이지
├── components/
│   ├── primitives/     # 현대적 컴포넌트 시스템 (CVA + Radix)
│   │   ├── Button/     # Button, Badge, Card, Input, Modal 등
│   │   └── index.ts    # 중앙 익스포트
│   ├── ui/             # 특수 컴포넌트 (차트, 컨테이너)
│   ├── layout/         # Header, Footer
│   ├── sections/       # 페이지 섹션 (Hero, Problem, Solution)
│   ├── portfolio/      # 포트폴리오 전용 컴포넌트
│   ├── webgl/          # WebGL 갤러리 컴포넌트
│   └── seo/           # SEO 최적화 컴포넌트
├── contexts/           # React 컨텍스트
│   ├── ThemeContext.tsx      # 3단계 테마 관리 (light/dark/brand)
│   └── MigrationContext.tsx  # 정리 후 단순화
├── data/               # 정적 포트폴리오 데이터
│   └── webgl-gallery.ts # WebGL 번들 관리
├── hooks/              # 사용자 정의 React 훅
├── lib/                # 유틸리티 및 검증
├── design-system/      # 디자인 토큰 및 유틸리티
└── styles/             # 글로벌 스타일
```

## 컴포넌트 아키텍처 (정리 후)

**✅ 완료**: 레거시 UI 마이그레이션이 성공적으로 완료되었습니다. 이제 프로젝트는 통합된 컴포넌트 시스템을 사용합니다.

### 1. 컴포넌트 시스템 구조
모든 UI 컴포넌트는 단일하고 현대적인 아키텍처를 사용합니다:
- **`@/components/primitives/`**: 핵심 컴포넌트 (Button, Badge, Card, Input, Modal 등)
- **`@/components/ui/`**: 특수 컴포넌트 (차트, 컨테이너, 테마 토글)
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

### 3. 주요 아키텍처 결정사항
- **CVA**: 변형 관리를 위한 Class Variance Authority
- **Radix UI**: 완전한 사용자 정의가 가능한 접근성 기본 요소
- **Forward Refs**: 모든 컴포넌트가 ref 전달 지원
- **TypeScript**: 적절한 인터페이스와 완전한 타입 안전성

## 핵심 의존성

### 핵심 스택
- **프레임워크**: Next.js 14.2.13 (App Router)
- **React**: 18.3.1 with TypeScript
- **스타일링**: Tailwind CSS + Framer Motion
- **폼**: React Hook Form + Zod 검증
- **3D/WebGL**: Shapespark WebGL 번들 통합

### UI 아키텍처
- **CVA**: 변형 관리를 위한 Class Variance Authority
- **Radix UI**: 접근성 기본 요소 (Accordion, Dialog, Select, Slot)
- **Tailwind Merge**: cn() 유틸리티를 통한 동적 클래스 병합
- **Lucide React**: 아이콘 시스템
- **Framer Motion**: 애니메이션 및 전환

### SEO & 분석
- **사이트맵**: 자동 생성을 위한 next-sitemap
- **스키마**: 3D/AR/WebXR 키워드에 대한 구조화된 데이터
- **분석**: 네이버 애널리틱스 통합

## 개발 가이드라인

### 1. 컴포넌트 개발
- **핵심 UI 컴포넌트**: CVA + Radix 패턴을 사용하여 `src/components/primitives/`에 추가
- **특수 컴포넌트**: 차트, 컨테이너 등을 위해 `src/components/ui/`에 추가
- **항상 TypeScript 사용**: 적절한 인터페이스와 완전한 타입 안전성
- **CVA 패턴 따르기**: 컴포넌트 변형 및 스타일링을 위해 `cva()` 사용

### 2. 임포트 패턴
```typescript
// 올바른 임포트 패턴
import { Button } from '@/components/primitives/Button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/design-system/utils'

// 변형과 함께 컴포넌트 사용
<Button variant="primary" size="lg">클릭하세요</Button>
```

### 3. 테마 인식 개발
- **세 가지 테마 모두 지원**: light, dark, brand
- **브랜드 테마 클래스 사용**: `bg-brand-primary`, `text-brand-secondary` 등
- **테마 전환 테스트**: 모든 테마 상태에서 컴포넌트가 작동하는지 확인
- **하드코딩된 색상 피하기**: 테마 인식 Tailwind 클래스 사용

### 4. SEO 고려사항
- layout.tsx에서 구조화된 데이터 유지
- 메타 태그에 3D/AR/WebXR 키워드 포함
- 접근성을 위한 시맨틱 HTML 사용
- 한국 시장 최적화 (네이버, 구글 코리아)

### 5. 성능 & WebGL
- **WebGL 번들 지연 로딩**: 3D 경험을 위해 동적 임포트 사용
- **이미지 최적화**: 더 나은 성능을 위해 `OptimizedImage` 컴포넌트 사용
- **모바일 테스트**: WebGL 경험이 모바일 기기에서 작동하는지 확인

## 파일 구조 규칙

### 기본 컴포넌트
```
src/components/primitives/
├── Button/
│   ├── Button.tsx       # CVA가 포함된 메인 컴포넌트
│   └── index.ts         # 깔끔한 익스포트
├── Card/
│   ├── Card.tsx         # 복합 컴포넌트 패턴
│   └── index.ts
```

### 특수 컴포넌트
```
src/components/ui/
├── theme-toggle.tsx       # Light/Dark 테마 전환
├── brand-theme-toggle.tsx # Brand/Light 테마 전환
├── container.tsx          # 레이아웃 컨테이너
├── *-chart.tsx           # 데이터 시각화 (bar, circular, donut 등)
├── service-scroll.tsx     # 스크롤이 있는 서비스 쇼케이스
└── optimized-image.tsx    # 성능 최적화된 이미지
```

## 테마 시스템 아키텍처

### 3단계 테마 시스템
프로젝트는 세 가지 테마를 지원하는 포괄적인 테마 시스템을 구현합니다:
- **Light**: 표준 밝은 모드
- **Dark**: 표준 어두운 모드
- **Brand**: 시 그린 색상 팔레트를 가진 커스텀 브랜드 테마

### 테마 컨텍스트 구조
```typescript
export type Theme = 'light' | 'dark' | 'brand'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void  // 순환: light → dark → brand → light
  mounted: boolean
  isTransitioning: boolean
}
```

### 테마 토글 컴포넌트
1. **ThemeToggle** (`theme-toggle.tsx`): 3단계 순환 토글 (light → dark → brand)
2. **BrandThemeToggle** (`brand-theme-toggle.tsx`): 직접 brand ↔ light 전환

### 브랜드 테마 구현
- **CSS 변수**: `src/styles/brand-theme.css`에 정의
- **색상 팔레트**: 시 그린 (#2E8B57), 어두운 배경 (#1E1E1E), 흰색 텍스트
- **CSS 클래스**: `bg-brand-primary`, `text-brand-primary` 등
- **데이터 속성**: CSS 타게팅을 위한 `[data-theme="brand"]`

### 사용 패턴
```typescript
// 테마 전환
import { useTheme } from '@/contexts/ThemeContext'
const { theme, setTheme, toggleTheme } = useTheme()

// 테마 인식 스타일링
className="bg-white dark:bg-slate-800 bg-brand-darker"
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
3. **홈 갤러리**: 현대적 주거 공간 투어
4. **오피스 공간**: 현대적 사무실 공간 경험
5. **주차장**: 사실적인 지하 주차시설

### WebGL 컴포넌트 사용
- **갤러리 컴포넌트**: 재사용 가능한 갤러리 표시를 위한 `<WebGLGallery />`
- **홈 통합**: "모두 보기" 링크와 함께 첫 3개 번들 표시
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

### 3D/AR/WebGL 특수 컴포넌트
- 시각적 메트릭 차트 (성능 데이터)
- 3D 모델 미리보기 및 갤러리
- 인터랙티브 데모 섹션
- 기술 스택 배지
- **WebGL 갤러리 시스템**: Shapespark 번들을 위한 재사용 가능한 갤러리 컴포넌트
- **WebGL 번들 관리**: WebGL 경험을 위한 중앙화된 데이터 관리

### 한국 시장 최적화
- 네이버 검색 엔진 최적화
- 한국어 구조화된 데이터
- 모바일 우선 반응형 디자인
- 지역 비즈니스 스키마 마크업

## 테스트 및 검증

**정식 테스트 프레임워크 없음** - 다음 검증 방법을 사용하세요:
- **TypeScript**: 타입 검사를 위한 `npx tsc --noEmit`
- **ESLint**: 코드 품질을 위한 `npm run lint`
- **수동 테스트**: 세 가지 테마 상태 모두에서 UI 컴포넌트 테스트
- **SEO 검증**: 변경 후 구조화된 데이터 검증
- **성능**: WebGL 콘텐츠 성능 테스트
- **브라우저 호환성**: 크로스 브라우저 WebGL 테스트

**중요**: 변경사항을 커밋하기 전에 항상 `npm run lint`를 실행하세요.

## 추가 컨텍스트

### 전문 AI 에이전트
이 저장소는 `.cursor/rules/` 디렉토리를 통해 다양한 개발 역할을 위한 전문 AI 에이전트를 포함합니다:
- **dev.mdc**: 구현을 위한 풀스택 개발자 에이전트
- **architect.mdc**: 시스템 아키텍처 전문가
- **analyst.mdc**: 비즈니스 분석 전문가
- **pm.mdc**: 프로젝트 관리 전문가
- **qa.mdc**: 품질 보증 전문가
- **ux-expert.mdc**: UX/UI 디자인 전문가

프로젝트의 전문 분야를 작업할 때 `@{에이전트명}`을 사용하여 특정 에이전트 페르소나를 활성화하세요.

### 문서 구조
- **`docs/architecture.md`**: 전체 시스템 아키텍처
- **`docs/Dark-Light-Mode-Toggle/`**: 테마 시스템 구현 가이드 및 워크플로우
- **`docs/color-system/`**: 브랜드 테마 구현 계획 및 색상 명세
- **`docs/ui-refactoring/`**: UI 컴포넌트 마이그레이션 및 리팩토링 문서
- **`docs/webgl-*`**: WebGL 배포 및 관리 가이드
- **`docs/guides/`**: 개발 가이드 및 모범 사례

### 비즈니스 포커스
- 목표 시장: 네이버 SEO 최적화가 포함된 한국 시장
- 산업: 3D/AR/WebXR 기술 솔루션
- 핵심 가치: 몰입형 기술 쇼케이스 및 고객 확보

## 중요한 프로젝트 가이드라인

### 파일 생성 정책
- **목표 달성에 절대적으로 필요하지 않은 한 파일을 생성하지 마세요**
- **새 파일을 만드는 것보다 기존 파일을 편집하는 것을 항상 선호하세요**
- **문서 파일(*.md)이나 README 파일을 적극적으로 생성하지 마세요** (명시적으로 요청된 경우 제외)
- 사용자가 명시적으로 요청한 경우에만 문서 파일을 생성하세요

### 개발 접근 방식
- `docs/` 디렉토리의 문서화된 구현 패턴을 따르세요
- 새로운 접근 방식을 제안하기 전에 성공적인 구현 예제를 참조하세요
- 복잡한 작업을 추적하고 계획하기 위해 TodoWrite 도구를 자주 사용하세요
- 테마 작업 시 항상 기존의 성공적인 구현을 참조하세요
- **중요**: 컴포넌트 변경사항은 세 가지 테마 상태(light/dark/brand) 모두를 지원해야 합니다
- **파일 위치**: 항상 `temp-project/src/`에서 작업하세요 - 이것이 활성 코드베이스입니다