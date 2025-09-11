# Phase 1: 인프라 구축

**예상 소요시간**: 85분  
**난이도**: 중급  

## 개요

다크/라이트 모드 토글을 위한 기반 인프라를 구축합니다. Tailwind 설정, ThemeContext 구현, SSR 안전 패턴을 적용하여 안정적인 테마 시스템의 토대를 마련합니다.

---

## Story 1: Tailwind 다크모드 설정 및 No-Flash 스크립트 구현

### 🎯 목표
- Tailwind CSS 다크모드 활성화
- SSR 안전 No-Flash 스크립트 구현
- 기존 디자인 영향 없이 인프라 구축

### ⏱️ 예상 소요시간
35분

### 📋 구현 단계

#### 1.1 Tailwind 설정 업데이트

**파일**: `temp-project/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  // 다크모드 활성화: 'media' 대신 'class' 사용
  darkMode: 'class',
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // 기존 설정 유지
      colors: {
        // 테마 대응 색상 확장 (필요시)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  
  plugins: [],
}

export default config
```

#### 1.2 No-Flash 스크립트 추가

**파일**: `temp-project/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uable Corporation',
  description: '3D/AR/WebXR 기술 솔루션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* No-Flash 스크립트: 페이지 로드 시 깜빡임 방지 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme')
                  if (!theme) {
                    // 기본값은 다크 모드 (기존 디자인 유지)
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'
                  }
                  document.documentElement.classList.toggle('dark', theme === 'dark')
                  document.documentElement.setAttribute('data-theme', theme)
                } catch (e) {
                  // localStorage 접근 실패시 다크 모드 기본 적용
                  document.documentElement.classList.add('dark')
                  document.documentElement.setAttribute('data-theme', 'dark')
                }
              })()
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
```

#### 1.3 환경변수 설정

**파일**: `temp-project/.env.local`

```bash
# 테마 시스템 활성화 플래그
NEXT_PUBLIC_THEME_SYSTEM=true

# 개발 환경에서 새 UI 강제 활성화 (선택사항)
NEXT_PUBLIC_NEW_UI=false
```

### ✅ 완료 기준

- [ ] `tailwind.config.ts`에 `darkMode: 'class'` 추가됨
- [ ] `layout.tsx`에 No-Flash 스크립트 적용됨
- [ ] 기존 페이지가 동일하게 표시됨 (다크 테마 유지)
- [ ] 개발자 도구에서 `<html class="dark" data-theme="dark">` 확인됨
- [ ] 콘솔 에러 없음
- [ ] 페이지 새로고침 시 깜빡임 없음

### 🔗 다음 단계 전제조건

이 Story 완료 후 확인해야 할 사항:
- Tailwind 다크모드 클래스 시스템 정상 동작
- No-Flash 스크립트로 인한 페이지 로드 깜빡임 제거 확인
- ThemeContext 준비 완료 (다음 Phase 2 진행 가능)

### 🐛 트러블슈팅

**문제**: 페이지 로드 시 깜빡임 발생
```typescript
// 해결: suppressHydrationWarning 추가
<html lang="ko" suppressHydrationWarning>
<body suppressHydrationWarning>
```

**문제**: localStorage 접근 에러
```javascript
// 해결: try-catch로 안전하게 처리
try {
  var theme = localStorage.getItem('theme')
} catch (e) {
  var theme = 'dark' // 기본값
}
```

---

## Story 2: ThemeContext 및 SSR 안전 훅 구현

### 🎯 목표
- 테마 상태 관리 Context 구현
- MigrationContext와 연동
- SSR 안전 테마 훅 구현

### ⏱️ 예상 소요시간
50분

### 📋 구현 단계

#### 2.1 ThemeContext 구현

**파일**: `temp-project/src/contexts/ThemeContext.tsx` (신규)

```typescript
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * 테마 타입 정의
 */
export type Theme = 'light' | 'dark'

/**
 * ThemeContext 인터페이스
 */
interface ThemeContextType {
  /** 현재 테마 */
  theme: Theme
  /** 테마 설정 */
  setTheme: (theme: Theme) => void
  /** 테마 토글 */
  toggleTheme: () => void
  /** 클라이언트 마운트 상태 */
  mounted: boolean
}

/**
 * ThemeContext 생성
 */
const ThemeContext = createContext<ThemeContextType | null>(null)

/**
 * ThemeProvider Props
 */
interface ThemeProviderProps {
  children: ReactNode
  /** 기본 테마 (SSR 시 사용) */
  defaultTheme?: Theme
  /** 강제 테마 설정 (테스트용) */
  forcedTheme?: Theme
}

/**
 * 테마 상태 관리 Provider
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'dark',
  forcedTheme 
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // 클라이언트 마운트 처리
  useEffect(() => {
    setMounted(true)
    
    // 강제 테마가 설정된 경우
    if (forcedTheme) {
      setThemeState(forcedTheme)
      return
    }
    
    // localStorage에서 테마 복원
    try {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeState(savedTheme)
        applyTheme(savedTheme)
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
    }
  }, [forcedTheme])

  /**
   * 테마 적용 함수
   */
  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  /**
   * 테마 설정
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    
    // localStorage에 저장
    try {
      localStorage.setItem('theme', newTheme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
    
    // 개발 환경 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎨 Theme changed to: ${newTheme}`)
    }
  }

  /**
   * 테마 토글
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    mounted
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme 훅
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * 클라이언트 전용 테마 정보 반환
 */
export const useClientTheme = () => {
  const { theme, mounted } = useTheme()
  return mounted ? theme : 'dark' // SSR 시 기본값
}

/**
 * 마운트 상태만 확인하는 훅
 */
export const useIsMounted = () => {
  const { mounted } = useTheme()
  return mounted
}
```

#### 2.2 SSR 안전 유틸리티 구현

**파일**: `temp-project/src/lib/theme-utils.ts` (신규)

```typescript
import type { Theme } from '@/contexts/ThemeContext'

/**
 * 테마 스토리지 키
 */
export const THEME_STORAGE_KEY = 'theme'

/**
 * 테마 속성명
 */
export const THEME_ATTRIBUTE = 'data-theme'

/**
 * 초기 테마 감지 (클라이언트 전용)
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch (error) {
    console.warn('localStorage access failed:', error)
  }
  
  // 시스템 설정 확인 (기본값은 다크)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'dark' // 기존 디자인 유지를 위해 기본값 다크
}

/**
 * 테마 적용 함수
 */
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return
  
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
}

/**
 * 테마 저장 함수
 */
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Failed to save theme:', error)
  }
}

/**
 * 시스템 테마 변경 감지
 */
export const watchSystemTheme = (callback: (theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }
  
  mediaQuery.addEventListener('change', handler)
  
  // 클린업 함수 반환
  return () => mediaQuery.removeEventListener('change', handler)
}
```

#### 2.3 Provider 통합

**파일**: `temp-project/src/app/layout.tsx` (수정)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { MigrationProvider } from '@/contexts/MigrationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uable Corporation',
  description: '3D/AR/WebXR 기술 솔루션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* No-Flash 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme')
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'
                  }
                  document.documentElement.classList.toggle('dark', theme === 'dark')
                  document.documentElement.setAttribute('data-theme', theme)
                } catch (e) {
                  document.documentElement.classList.add('dark')
                  document.documentElement.setAttribute('data-theme', 'dark')
                }
              })()
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200`}
        suppressHydrationWarning
      >
        <MigrationProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </MigrationProvider>
      </body>
    </html>
  )
}
```

### ✅ 완료 기준

- [ ] `ThemeContext.tsx` 파일 생성됨
- [ ] `theme-utils.ts` 유틸리티 구현됨
- [ ] Provider 체인 올바르게 구성됨
- [ ] SSR 안전 패턴 적용됨
- [ ] 콘솔 에러 없음
- [ ] 기존 페이지 정상 동작
- [ ] `useTheme` 훅 사용 가능
- [ ] localStorage 연동 동작

### 🔗 Phase 2 진행 전제조건

이 Phase 완료 후 다음이 확인되어야 Phase 2 진행 가능:
- [ ] `useTheme()` 훅이 정상적으로 현재 테마 상태 반환
- [ ] `toggleTheme()` 함수가 동작하여 HTML 클래스 변경 확인
- [ ] localStorage에 테마 설정이 정상적으로 저장/복원
- [ ] SSR 환경에서 Hydration mismatch 에러 없음

### 🐛 트러블슈팅

**문제**: Hydration mismatch 에러
```typescript
// 해결: mounted 상태로 클라이언트 렌더링 제어
const { mounted } = useTheme()
if (!mounted) return <DefaultTheme />
```

**문제**: useContext 에러
```typescript
// 해결: Provider 체인 확인
<MigrationProvider>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</MigrationProvider>
```

---

## 🧪 통합 테스트

### 테스트 시나리오

1. **페이지 첫 로드**
   - [ ] 다크 테마로 표시됨
   - [ ] 깜빡임 없음
   - [ ] `<html class="dark">` 적용됨

2. **localStorage 테스트**
   ```javascript
   // 개발자 도구에서 실행
   localStorage.setItem('theme', 'light')
   location.reload() // 라이트 테마로 로드되어야 함
   ```

3. **Context 동작 확인**
   ```typescript
   // 임시 컴포넌트로 테스트
   const TestComponent = () => {
     const { theme, toggleTheme, mounted } = useTheme()
     return (
       <div>
         <p>Current theme: {theme}</p>
         <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
         <button onClick={toggleTheme}>Toggle</button>
       </div>
     )
   }
   ```

### 성능 검증

```bash
# 개발 서버 실행
cd temp-project
npm run dev

# Lighthouse 실행 (성능 저하 없는지 확인)
npx lighthouse http://localhost:3000 --only-categories=performance
```

---

## 📚 다음 단계

인프라 구축이 완료되면 다음 단계로 진행하세요:

- **[02-ui-components.md](./02-ui-components.md)** - 테마 토글 버튼 및 UI 컴포넌트 구현

### 🚧 Phase 2 진행 전 필수 확인사항

1. **Context 동작 테스트**
   ```typescript
   // 임시 테스트 컴포넌트 생성하여 확인
   const { theme, toggleTheme, mounted } = useTheme()
   console.log('Current theme:', theme, 'Mounted:', mounted)
   ```

2. **Tailwind 클래스 동작 확인**
   ```bash
   # 개발자 도구에서 확인
   document.documentElement.classList.contains('dark') // true여야 함
   ```

3. **localStorage 연동 확인**
   ```javascript
   localStorage.setItem('theme', 'light')
   location.reload() // 라이트 모드로 로드되어야 함
   ```

---

## 🔍 참고 자료

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Next.js SSR 패턴](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Context 패턴](https://react.dev/reference/react/createContext)