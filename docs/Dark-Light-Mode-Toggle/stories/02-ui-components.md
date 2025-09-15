# Phase 2: UI 컴포넌트 구현

**예상 소요시간**: 65분  
**난이도**: 중급  

## 개요 (2025-09-15 업데이트)

테마 토글 버튼과 관련 UI 컴포넌트를 구현합니다. CVA 패턴을 활용한 현대적 컴포넌트 시스템을 구축합니다.

**⚠️ 레거시 제거 완료**: MigrationContext 어댑터 시스템은 제거되었으며, 모든 컴포넌트는 `@/components/primitives/` 구조를 직접 사용합니다.

## 🔗 전제조건

✅ **Phase 1 완료 확인 필수**
- [ ] Tailwind `darkMode: 'class'` 설정 완료
- [ ] ThemeContext 구현 및 정상 동작 확인
- [ ] No-Flash 스크립트 적용 및 테스트 완료
- [ ] 기존 페이지가 다크 테마로 정상 표시됨

---

## Story 3: 테마 토글 버튼 컴포넌트 구현

### 🎯 목표 (현재 상태)
- ✅ CVA 패턴 기반 테마 토글 버튼 구현 완료
- ✅ 단일 컴포넌트 시스템으로 통합 완료
- ✅ 접근성 및 애니메이션 적용 완료

### ⏱️ 예상 소요시간
40분

### 📋 구현 단계

#### 3.1 필요 패키지 설치 확인

**터미널**: `temp-project/`

```bash
# CVA 및 관련 패키지 설치 확인
npm list class-variance-authority clsx tailwind-merge lucide-react

# 없으면 설치
npm install class-variance-authority clsx tailwind-merge lucide-react
```

#### 3.2 새로운 테마 토글 (Primitives)

**파일**: `temp-project/src/components/primitives/ThemeToggle/ThemeToggle.tsx` (신규)

```typescript
'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

/**
 * 테마 토글 버튼 변형 정의
 */
const themeToggleVariants = cva(
  // 기본 클래스
  [
    'inline-flex items-center justify-center rounded-md',
    'text-sm font-medium ring-offset-background',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-105 active:scale-95',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gray-100 text-gray-900 hover:bg-gray-200',
          'dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
          'border border-gray-200 dark:border-slate-600',
        ],
        ghost: [
          'hover:bg-gray-100 hover:text-gray-900',
          'dark:hover:bg-slate-800 dark:hover:text-slate-100',
        ],
        outline: [
          'border border-gray-300 bg-transparent hover:bg-gray-50',
          'dark:border-slate-600 dark:hover:bg-slate-800',
        ],
        floating: [
          'bg-white shadow-lg border border-gray-200 hover:shadow-xl',
          'dark:bg-slate-800 dark:border-slate-700',
        ],
      },
      size: {
        sm: 'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
      },
      iconSize: {
        sm: '[&>svg]:h-3 [&>svg]:w-3',
        default: '[&>svg]:h-4 [&>svg]:w-4',
        lg: '[&>svg]:h-5 [&>svg]:w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      iconSize: 'default',
    },
  }
)

/**
 * ThemeToggle Props 인터페이스
 */
interface ThemeToggleProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeToggleVariants> {
  /** 추가 CSS 클래스 */
  className?: string
  /** 커스텀 라이트 모드 아이콘 */
  lightIcon?: React.ReactNode
  /** 커스텀 다크 모드 아이콘 */
  darkIcon?: React.ReactNode
  /** 아이콘 애니메이션 비활성화 */
  disableAnimation?: boolean
}

/**
 * 새로운 테마 토글 버튼 컴포넌트
 */
export const ThemeToggle = ({ 
  variant, 
  size, 
  iconSize,
  className, 
  lightIcon,
  darkIcon,
  disableAnimation = false,
  ...props 
}: ThemeToggleProps) => {
  const { theme, toggleTheme, mounted } = useTheme()

  // SSR 중에는 기본 아이콘 표시 (다크 모드 아이콘)
  if (!mounted) {
    return (
      <button 
        className={cn(themeToggleVariants({ variant, size, iconSize }), className)}
        disabled
        aria-label="테마 설정 로딩 중..."
        data-testid="theme-toggle-loading"
        {...props}
      >
        <Sun className={cn(
          'transition-transform duration-200',
          disableAnimation ? '' : 'rotate-0 scale-100'
        )} />
      </button>
    )
  }

  const isDark = theme === 'dark'
  const nextTheme = isDark ? '라이트' : '다크'
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(themeToggleVariants({ variant, size, iconSize }), className)}
      aria-label={`${nextTheme} 모드로 전환`}
      aria-pressed={isDark}
      title={`현재: ${isDark ? '다크' : '라이트'} 모드 (클릭하여 ${nextTheme} 모드로 전환)`}
      role="switch"
      aria-checked={isDark}
      data-testid="theme-toggle"
      {...props}
    >
      {isDark ? (
        lightIcon || (
          <Sun 
            className={cn(
              'text-yellow-500 transition-all duration-200',
              disableAnimation ? '' : 'rotate-0 scale-100 hover:rotate-12'
            )} 
            aria-hidden="true"
          />
        )
      ) : (
        darkIcon || (
          <Moon 
            className={cn(
              'text-slate-700 dark:text-slate-300 transition-all duration-200',
              disableAnimation ? '' : 'rotate-0 scale-100 hover:-rotate-12'
            )}
            aria-hidden="true"
          />
        )
      )}
      
      {/* 스크린 리더용 텍스트 */}
      <span className="sr-only">
        현재 {isDark ? '다크' : '라이트'} 모드, {nextTheme} 모드로 전환하려면 클릭하세요
      </span>
    </button>
  )
}

/**
 * 테마 토글 버튼 컴포넌트 (기본 export)
 */
ThemeToggle.displayName = 'ThemeToggle'
export type { ThemeToggleProps }
```

#### 3.3 유틸리티 함수 확인/구현

**파일**: `temp-project/src/lib/utils.ts` (확인 또는 신규)

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 테마 관련 유틸리티
 */
export const themeUtils = {
  /**
   * 테마에 따른 클래스 선택
   */
  getThemeClass: (lightClass: string, darkClass: string, theme: 'light' | 'dark') => {
    return theme === 'light' ? lightClass : darkClass
  },
  
  /**
   * 조건부 테마 클래스 적용
   */
  themeVariant: (baseClass: string, lightVariant?: string, darkVariant?: string) => {
    return cn(
      baseClass,
      lightVariant && `light:${lightVariant}`,
      darkVariant && `dark:${darkVariant}`
    )
  }
}
```

#### 3.4 어댑터 패턴 구현

**파일**: `temp-project/src/components/ui/theme-toggle.tsx` (신규)

```typescript
'use client'

import { useMigrationContext } from '@/contexts/MigrationContext'
import { ThemeToggle as NewThemeToggle } from '@/components/primitives/ThemeToggle/ThemeToggle'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

/**
 * Legacy 테마 토글 Props
 */
interface LegacyThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Legacy 테마 토글 (기존 스타일 유지)
 */
const LegacyThemeToggle = ({ className, size = 'md' }: LegacyThemeToggleProps) => {
  const { theme, toggleTheme, mounted } = useTheme()

  const sizeClasses = {
    sm: 'h-8 w-8 p-1.5',
    md: 'h-10 w-10 p-2',
    lg: 'h-12 w-12 p-2.5'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  if (!mounted) {
    return (
      <button 
        className={cn(
          'rounded-lg bg-slate-700 transition-colors',
          sizeClasses[size],
          className
        )}
        disabled
        aria-label="테마 설정 로딩 중..."
        data-testid="theme-toggle-legacy-loading"
      >
        <Sun className={cn('text-yellow-500', iconSizes[size])} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2',
        'active:scale-95 hover:scale-105',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`현재: ${theme === 'light' ? '라이트' : '다크'} 모드`}
      data-testid="theme-toggle-legacy"
    >
      {theme === 'light' ? (
        <Moon className={cn('text-slate-300 transition-transform', iconSizes[size])} />
      ) : (
        <Sun className={cn('text-yellow-500 transition-transform', iconSizes[size])} />
      )}
    </button>
  )
}

/**
 * 어댑터 컴포넌트 Props
 */
interface ThemeToggleProps {
  className?: string
  variant?: 'default' | 'ghost' | 'outline' | 'floating'
  size?: 'sm' | 'default' | 'lg'
  // Legacy props 지원
  legacySize?: 'sm' | 'md' | 'lg'
}

/**
 * 테마 토글 어댑터 컴포넌트
 * MigrationContext에 따라 새로운 또는 레거시 컴포넌트 렌더링
 */
export const ThemeToggle = ({ legacySize, size, ...props }: ThemeToggleProps) => {
  const { isMigrated } = useMigrationContext()
  
  // 마이그레이션된 경우 새로운 컴포넌트 사용
  if (isMigrated('ThemeToggle')) {
    return <NewThemeToggle size={size} {...props} />
  }
  
  // 레거시 컴포넌트 사용
  return <LegacyThemeToggle size={legacySize || 'md'} {...props} />
}

ThemeToggle.displayName = 'ThemeToggle'
export type { ThemeToggleProps }
```

#### 3.5 컴포넌트 Index 파일

**파일**: `temp-project/src/components/primitives/ThemeToggle/index.ts` (신규)

```typescript
/**
 * ThemeToggle 컴포넌트 exports
 */
export { ThemeToggle } from './ThemeToggle'
export type { ThemeToggleProps } from './ThemeToggle'
```

### ✅ Story 3 완료 기준

- [ ] CVA 패키지 설치 및 설정 완료
- [ ] `ThemeToggle.tsx` 새로운 컴포넌트 구현됨
- [ ] CVA 변형 시스템 정상 동작
- [ ] 어댑터 패턴 적용됨
- [ ] Legacy 컴포넌트 정상 동작
- [ ] 아이콘 전환 애니메이션 적용됨
- [ ] 접근성 속성 설정됨 (aria-label, title, role)
- [ ] SSR 안전 패턴 적용됨
- [ ] TypeScript 타입 에러 없음
- [ ] 테스트 데이터 속성 추가됨 (data-testid)

---

## Story 4: 헤더에 테마 토글 버튼 통합

### 🎯 목표
- 기존 헤더 컴포넌트에 테마 토글 버튼 추가
- 모바일/데스크톱 반응형 지원
- 기존 네비게이션과 조화로운 배치

### ⏱️ 예상 소요시간
25분

### 📋 구현 단계

#### 4.1 헤더 컴포넌트 수정

**파일**: `temp-project/src/components/layout/header.tsx` (수정)

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

/**
 * 네비게이션 아이템 타입
 */
interface NavItem {
  href: string
  label: string
  external?: boolean
}

/**
 * 네비게이션 아이템 목록
 */
const navItems: NavItem[] = [
  { href: '/', label: '홈' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/contact', label: '문의하기' },
  { href: 'https://befunweb.vercel.app/', label: '컨피규레이터', external: true },
]

/**
 * 메인 헤더 컴포넌트
 */
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              onClick={closeMobileMenu}
            >
              Uable
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            {/* 테마 토글 버튼 - Feature Flag 제어 */}
            {isThemeSystemEnabled && (
              <ThemeToggle 
                variant="ghost" 
                size="default"
                className="hidden sm:inline-flex"
                data-testid="desktop-theme-toggle"
              />
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* 모바일용 테마 토글 - Feature Flag 제어 */}
              {isThemeSystemEnabled && (
                <div className="px-3 py-2 flex items-center justify-between border-t border-gray-200 dark:border-slate-700 mt-2 pt-2">
                  <span className="text-base font-medium text-slate-700 dark:text-slate-300">
                    테마 설정
                  </span>
                  <ThemeToggle 
                    variant="default" 
                    size="sm" 
                    data-testid="mobile-theme-toggle"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
```

### ✅ Story 4 완료 기준

- [ ] 헤더에 테마 토글 버튼 추가됨
- [ ] 데스크톱에서 우측 상단에 적절히 배치됨
- [ ] 모바일 메뉴에 테마 설정 섹션 추가됨
- [ ] 기존 네비게이션 레이아웃 유지됨
- [ ] 버튼 클릭 시 테마 전환 정상 동작
- [ ] 모바일 반응형 지원됨
- [ ] Feature Flag로 활성화/비활성화 가능함
- [ ] 접근성 개선됨 (aria-label, 키보드 네비게이션)
- [ ] 테스트 데이터 속성 추가됨

---

## 🧪 Phase 2 통합 테스트

### 테스트 시나리오

#### 1. 기본 기능 테스트
- [ ] 페이지 로드 시 토글 버튼 표시 확인
- [ ] 버튼 클릭 시 즉시 테마 전환 확인
- [ ] 페이지 새로고침 후 설정 유지 확인

#### 2. MigrationContext 테스트
```javascript
// 개발자 도구에서 실행하여 컴포넌트 전환 테스트
const { migrateComponent, rollbackComponent } = useMigrationContext()

// 새 컴포넌트로 전환
migrateComponent('ThemeToggle')

// 레거시 컴포넌트로 롤백
rollbackComponent('ThemeToggle')
```

#### 3. 반응형 테스트
- [ ] 데스크톱: 우측 네비게이션에 버튼 표시
- [ ] 모바일: 햄버거 메뉴 내 테마 설정 표시
- [ ] 태블릿: 적절한 중간 크기 대응

#### 4. 접근성 테스트
- [ ] 키보드로 토글 버튼 접근 가능
- [ ] Tab 순서 논리적
- [ ] 스크린 리더 호환성 (aria-label 확인)

---

## 🎯 Phase 2 완료 후 Next Steps

Phase 2 완료 후 다음 단계로 진행하세요:

**다음 Phase**: **[03-migration-system.md](./03-migration-system.md)** - 점진적 마이그레이션 시스템 구현