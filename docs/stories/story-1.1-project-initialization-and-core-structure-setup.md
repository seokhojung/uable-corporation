# Story 1.1: 프로젝트 초기화 및 핵심 구조 설정

## 개요 (Overview)

이 스토리는 Uable Corporation 웹사이트의 기술적 기반을 구축하는 첫 번째 단계입니다. Next.js 프로젝트를 초기화하고, TypeScript, Tailwind CSS, Framer Motion 등 핵심 기술 스택을 설정하며, 프로젝트의 기본 구조와 개발 환경을 완성합니다.

## 사용자 스토리 (User Story)

**As a** 개발팀  
**I want to** Next.js 기반의 완전한 기술적 기반을 구축하고  
**So that** 안정적이고 확장 가능한 웹사이트 개발을 시작할 수 있다

## 기능적 요구사항 (Functional Requirements)

### 1. 프로젝트 초기화
- [ ] Next.js 14+ 프로젝트 생성
- [ ] TypeScript 설정 및 구성
- [ ] ESLint 및 Prettier 설정
- [ ] Git 저장소 초기화

### 2. 핵심 의존성 설치
- [ ] Tailwind CSS 설정
- [ ] Framer Motion 설치 및 구성
- [ ] Lucide React 아이콘 라이브러리 설치
- [ ] React Hook Form 설치

### 3. 프로젝트 구조 설정
- [ ] 디렉토리 구조 생성
- [ ] 기본 컴포넌트 구조 설정
- [ ] 유틸리티 함수 구조 설정
- [ ] 타입 정의 구조 설정

### 4. 개발 환경 구성
- [ ] 환경 변수 설정
- [ ] 개발 서버 설정
- [ ] 빌드 스크립트 설정
- [ ] 배포 준비 설정

## 비기능적 요구사항 (Non-Functional Requirements)

### 성능 (Performance)
- [ ] 초기 페이지 로드 시간 < 2초
- [ ] 번들 크기 최적화
- [ ] 이미지 최적화 설정

### 접근성 (Accessibility)
- [ ] WCAG AA 준수 준비
- [ ] 키보드 네비게이션 지원 준비
- [ ] 스크린 리더 지원 준비

### 보안 (Security)
- [ ] 기본 보안 헤더 설정
- [ ] CSP (Content Security Policy) 설정
- [ ] 환경 변수 보안 설정

## 기술적 명세 (Technical Specifications)

### 1. 프로젝트 초기화

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest uable-corporation --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. package.json 의존성

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### 3. 프로젝트 구조

```
src/
├── app/                    # App Router 구조
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── globals.css        # 글로벌 스타일
│   └── favicon.ico        # 파비콘
├── components/             # 재사용 가능한 컴포넌트
│   ├── ui/                # 기본 UI 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── sections/          # 페이지 섹션 컴포넌트
├── lib/                   # 유틸리티 및 설정
│   ├── utils.ts           # 유틸리티 함수
│   ├── constants.ts       # 상수 정의
│   └── types.ts           # 타입 정의
├── styles/                # 스타일 관련 파일
│   └── design-tokens.ts   # 디자인 토큰
└── public/                # 정적 파일
    ├── images/            # 이미지 파일
    └── icons/             # 아이콘 파일
```

### 4. TypeScript 설정 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. Tailwind CSS 설정 (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### 6. 기본 레이아웃 컴포넌트 (src/app/layout.tsx)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uable Corporation',
  description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
  keywords: ['웹 개발', '디지털 솔루션', 'Uable Corporation'],
  authors: [{ name: 'Uable Corporation' }],
  creator: 'Uable Corporation',
  publisher: 'Uable Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://uable-corporation.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Uable Corporation',
    description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
    url: 'https://uable-corporation.com',
    siteName: 'Uable Corporation',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uable Corporation',
    description: '혁신적인 디지털 솔루션을 제공하는 Uable Corporation입니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
```

### 7. 글로벌 스타일 (src/app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply text-primary-900 bg-white;
  }
  
  * {
    @apply border-border;
  }
}

@layer components {
  .container {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }
  
  .btn {
    @apply inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800;
  }
  
  .btn-secondary {
    @apply bg-white text-primary-900 border border-primary-200 hover:bg-primary-50 active:bg-primary-100;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .text-pretty {
    text-wrap: pretty;
  }
}
```

### 8. 기본 홈페이지 (src/app/page.tsx)

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uable Corporation - 혁신적인 디지털 솔루션',
  description: 'Uable Corporation은 혁신적인 디지털 솔루션을 제공하여 비즈니스의 성장을 돕습니다.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="container py-12">
        <h1 className="text-4xl font-bold text-center">
          Uable Corporation
        </h1>
        <p className="text-center mt-4 text-lg text-primary-600">
          개발 준비 중입니다...
        </p>
      </div>
    </main>
  )
}
```

## 테스트 기준 (Testing Criteria)

### 단위 테스트
- [ ] 프로젝트 초기화 테스트
- [ ] TypeScript 컴파일 테스트
- [ ] Tailwind CSS 스타일 테스트
- [ ] 기본 컴포넌트 렌더링 테스트

### 통합 테스트
- [ ] 개발 서버 실행 테스트
- [ ] 빌드 프로세스 테스트
- [ ] 라우팅 테스트
- [ ] 메타데이터 설정 테스트

### 성능 테스트
- [ ] 초기 로드 시간 측정
- [ ] 번들 크기 분석
- [ ] Core Web Vitals 측정

## 예상 소요 시간 (Estimated Time)

- **총 예상 시간**: 4-6시간
- **설정 및 초기화**: 2-3시간
- **구조 설정**: 1-2시간
- **테스트 및 검증**: 1시간

## 의존성 (Dependencies)

- Node.js 18+ 설치 필요
- Git 저장소 설정 필요
- 개발 환경 준비 완료

## 위험 요소 (Risks)

### 기술적 위험
- **의존성 충돌**: 패키지 버전 호환성 문제
- **빌드 오류**: TypeScript 설정 오류
- **성능 이슈**: 초기 번들 크기 과다

### 완화 방안
- 패키지 버전 고정 및 호환성 검증
- 단계별 설정 및 테스트
- 번들 분석 및 최적화

## 완료 기준 (Definition of Done)

- [x] Next.js 프로젝트가 성공적으로 초기화됨
- [x] TypeScript 설정이 완료되고 컴파일 오류 없음
- [x] Tailwind CSS가 정상적으로 작동함
- [x] 기본 레이아웃이 렌더링됨
- [x] 개발 서버가 정상적으로 실행됨
- [x] 빌드 프로세스가 성공적으로 완료됨
- [x] ESLint 및 Prettier가 정상적으로 작동함
- [x] Git 저장소가 초기화되고 첫 커밋이 완료됨
- [x] 프로젝트 구조가 설계대로 생성됨
- [x] 기본 컴포넌트가 정상적으로 렌더링됨

## 현재 상태 (Current Status)

**스토리 1.1 완료됨** - 모든 완료 기준이 충족되었습니다.

### 구현된 기능:
- ✅ Next.js 15.4.5 프로젝트 초기화
- ✅ TypeScript 설정 및 컴파일 오류 해결
- ✅ Tailwind CSS 설정 및 스타일 적용
- ✅ Framer Motion 애니메이션 통합
- ✅ 기본 레이아웃 (Header, Footer) 구현
- ✅ 반응형 디자인 적용
- ✅ 접근성 고려 (키보드 네비게이션, ARIA 속성)
- ✅ 메타데이터 설정
- ✅ 프로젝트 구조 설정

### 다음 단계:
스토리 1.2 (글로벌 레이아웃 및 디자인 시스템 기반 구축)로 진행할 준비가 완료되었습니다. 