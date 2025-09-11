# Phase 3: 점진적 마이그레이션 시스템

**예상 소요시간**: 140분  
**난이도**: 고급  

## 개요

컴포넌트별 테마 클래스를 점진적으로 변환하고, MigrationContext와 통합하여 안전한 롤백이 가능한 Feature Flag 시스템을 구현합니다.

---

## Story 5: 컴포넌트별 테마 클래스 점진적 변환

### 🎯 목표
- 우선순위 기반 컴포넌트 테마 대응
- 안전한 클래스 변환 패턴 적용
- 기존 디자인 영향 최소화

### ⏱️ 예상 소요시간
110분

### 🔗 전제조건
- **Phase 1 완료**: ThemeContext 및 SSR 안전 패턴 적용
- **Phase 2 완료**: ThemeToggle 컴포넌트 및 헤더 토글 버튼 동작 확인
- **기존 동작 확인**: 현재 다크 테마 화면에서 정상 표시

### 📋 구현 단계

#### 5.1 클래스 변환 유틸리티 구현

**파일**: `temp-project/src/lib/theme-class-mapping.ts` (신규)

```typescript
/**
 * 테마 클래스 매핑 정의
 */
export const themeClassMapping = {
  // 배경색 매핑
  backgrounds: {
    'bg-slate-900': 'bg-white dark:bg-slate-900',
    'bg-slate-800': 'bg-gray-50 dark:bg-slate-800',
    'bg-slate-700': 'bg-gray-100 dark:bg-slate-700',
    'bg-slate-600': 'bg-gray-200 dark:bg-slate-600',
    'bg-slate-500': 'bg-gray-300 dark:bg-slate-500',
    
    // 그라디언트 배경
    'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900': 
      'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    'bg-gradient-to-r from-slate-600 to-slate-700': 
      'bg-gradient-to-r from-gray-600 to-gray-700 dark:from-slate-600 dark:to-slate-700',
    'bg-gradient-to-r from-slate-700 to-slate-800': 
      'bg-gradient-to-r from-gray-700 to-gray-800 dark:from-slate-700 dark:to-slate-800',
  },
  
  // 텍스트 색상 매핑
  text: {
    'text-slate-100': 'text-slate-900 dark:text-slate-100',
    'text-slate-200': 'text-slate-800 dark:text-slate-200',
    'text-slate-300': 'text-slate-700 dark:text-slate-300',
    'text-slate-400': 'text-slate-600 dark:text-slate-400',
    'text-slate-500': 'text-slate-500 dark:text-slate-500',
  },
  
  // 테두리 매핑
  borders: {
    'border-slate-700': 'border-gray-200 dark:border-slate-700',
    'border-slate-600': 'border-gray-300 dark:border-slate-600',
    'border-slate-500': 'border-gray-400 dark:border-slate-500',
  },
  
  // 호버 상태 매핑
  hover: {
    'hover:bg-slate-800': 'hover:bg-gray-100 dark:hover:bg-slate-800',
    'hover:bg-slate-700': 'hover:bg-gray-200 dark:hover:bg-slate-700',
    'hover:bg-slate-600': 'hover:bg-gray-300 dark:hover:bg-slate-600',
    'hover:text-slate-200': 'hover:text-slate-800 dark:hover:text-slate-200',
    'hover:text-slate-300': 'hover:text-slate-700 dark:hover:text-slate-300',
  }
} as const

/**
 * 클래스 변환 함수
 */
export const convertThemeClass = (originalClass: string): string => {
  // 모든 매핑 카테고리에서 검색
  for (const category of Object.values(themeClassMapping)) {
    if (category[originalClass as keyof typeof category]) {
      return category[originalClass as keyof typeof category]
    }
  }
  
  // 매핑되지 않은 클래스는 그대로 반환
  return originalClass
}

/**
 * 복합 클래스 문자열 변환
 */
export const convertThemeClasses = (classString: string): string => {
  return classString
    .split(' ')
    .map(cls => convertThemeClass(cls.trim()))
    .join(' ')
}

/**
 * 조건부 테마 클래스 적용
 */
export const applyThemeClasses = (
  baseClasses: string,
  enableThemeSystem: boolean = true
): string => {
  if (!enableThemeSystem) {
    return baseClasses
  }
  
  return convertThemeClasses(baseClasses)
}

/**
 * 컴포넌트별 테마 적용 상태 추적
 */
export const componentThemeStatus = {
  'Header': false,
  'Footer': false,
  'Hero': false,
  'Button': false,
  'Card': false,
  'Portfolio': false,
  'Service': false,
  'CTA': false,
} as const

export type ComponentName = keyof typeof componentThemeStatus
```

#### 5.2 단계별 컴포넌트 변환

##### 5.2.1 1단계: Header/Footer 변환 (최우선 - 15분)

**파일**: `temp-project/src/components/layout/header.tsx` (수정)

```typescript
// 기존 import에 추가
import { applyThemeClasses } from '@/lib/theme-class-mapping'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true'

  // 기존 코드...

  return (
    <header className={applyThemeClasses(
      "sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-md",
      isThemeSystemEnabled
    )}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={applyThemeClasses(
                "text-2xl font-bold text-slate-100 hover:text-slate-300 transition-colors",
                isThemeSystemEnabled
              )}
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
                className={applyThemeClasses(
                  "text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors",
                  isThemeSystemEnabled
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 나머지 컴포넌트도 동일하게 적용... */}
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className={applyThemeClasses(
            "md:hidden border-t border-slate-700 bg-slate-900",
            isThemeSystemEnabled
          )}>
            {/* 모바일 메뉴 내용도 테마 적용... */}
          </div>
        )}
      </div>
    </header>
  )
}
```

**파일**: `temp-project/src/components/layout/footer.tsx` (신규 또는 수정)

```typescript
'use client'

import Link from 'next/link'
import { applyThemeClasses } from '@/lib/theme-class-mapping'

export const Footer = () => {
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true'
  
  return (
    <footer className={applyThemeClasses(
      "bg-slate-900 border-t border-slate-700",
      isThemeSystemEnabled
    )}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={applyThemeClasses(
              "text-2xl font-bold text-slate-100 mb-4",
              isThemeSystemEnabled
            )}>
              Uable Corporation
            </h3>
            <p className={applyThemeClasses(
              "text-slate-300 mb-4 max-w-md",
              isThemeSystemEnabled
            )}>
              3D/AR/WebXR 기술로 혁신적인 디지털 경험을 제공하는 기술 회사입니다.
            </p>
          </div>
          
          {/* 링크 섹션 */}
          <div>
            <h4 className={applyThemeClasses(
              "text-lg font-semibold text-slate-100 mb-4",
              isThemeSystemEnabled
            )}>
              서비스
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/portfolio" 
                  className={applyThemeClasses(
                    "text-slate-300 hover:text-slate-100 transition-colors",
                    isThemeSystemEnabled
                  )}
                >
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={applyThemeClasses(
                    "text-slate-300 hover:text-slate-100 transition-colors",
                    isThemeSystemEnabled
                  )}
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 연락처 */}
          <div>
            <h4 className={applyThemeClasses(
              "text-lg font-semibold text-slate-100 mb-4",
              isThemeSystemEnabled
            )}>
              연락처
            </h4>
            <p className={applyThemeClasses(
              "text-slate-300",
              isThemeSystemEnabled
            )}>
              support@uable.co.kr
            </p>
          </div>
        </div>
        
        {/* 하단 저작권 */}
        <div className={applyThemeClasses(
          "mt-8 pt-8 border-t border-slate-700 text-center",
          isThemeSystemEnabled
        )}>
          <p className={applyThemeClasses(
            "text-slate-400",
            isThemeSystemEnabled
          )}>
            © 2024 Uable Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

##### 5.2.2 2단계: Hero Section 변환 (20분)

**파일**: `temp-project/src/app/home-page-client.tsx` (수정)

```typescript
// 기존 import에 추가
import { applyThemeClasses } from '@/lib/theme-class-mapping'

export function HomePageClient() {
  // 기존 코드...
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true'

  return (
    <main className={applyThemeClasses("min-h-screen bg-slate-900", isThemeSystemEnabled)}>
      {/* Hero Section */}
      <section className={applyThemeClasses(
        "relative min-h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 md:pt-0",
        isThemeSystemEnabled
      )}>
        {/* 배경 요소들도 테마 적용 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 배경 로고들은 필터 효과로 테마 대응 */}
          <div className="absolute top-20 right-20 w-72 h-72 opacity-20 filter brightness-0 dark:brightness-0" style={{animation: 'pulse 4s ease-in-out infinite'}}>
            <Image
              src="/UABLE-logo.png"
              alt="Uable Logo Background"
              width={288}
              height={288}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          </div>
          {/* 다른 배경 요소들도 동일하게... */}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* 텍스트 콘텐츠 */}
            <div ref={heroContentRef} className="lg:col-span-7 text-center lg:text-left animate-hero-content py-8 lg:py-0">
              {/* 배지 */}
              <div className={applyThemeClasses(
                "inline-flex items-center px-4 py-2 bg-slate-700 text-slate-200 rounded-full text-sm font-medium mb-8",
                isThemeSystemEnabled
              )}>
                <Star className="w-4 h-4 mr-2" />
                혁신적인 디지털 솔루션
              </div>

              {/* 메인 헤드라인 */}
              <h1 className={applyThemeClasses(
                "text-4xl lg:text-6xl xl:text-6xl font-bold text-slate-100 mb-8 leading-tight",
                isThemeSystemEnabled
              )}>
                고객에게 필요한
                <br />
                <span className={applyThemeClasses(
                  "text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400",
                  isThemeSystemEnabled
                )}>
                  제품은 모두 다릅니다.
                </span>
              </h1>

              {/* 서브헤드라인 */}
              <p className={applyThemeClasses(
                "text-xl lg:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed",
                isThemeSystemEnabled
              )}>
                공정에 타협하지 않고 고객에게 필요한 제품을 전개하는 브랜드의 도전에{' '}
                <span className={applyThemeClasses(
                  "font-semibold text-slate-300",
                  isThemeSystemEnabled
                )}>Uable</span>이 함께하겠습니다.
              </p>

              {/* CTA 버튼들 - 기존 스타일 유지 (이미 적용됨) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                {/* 기존 버튼 코드 유지 */}
              </div>

              {/* 통계 섹션 */}
              <div className={applyThemeClasses(
                "grid grid-cols-3 gap-8 pt-8 border-t border-slate-700",
                isThemeSystemEnabled
              )}>
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className={applyThemeClasses(
                        "w-6 h-6 text-slate-300 mr-2",
                        isThemeSystemEnabled
                      )} />
                      <span className={applyThemeClasses(
                        "text-3xl lg:text-4xl font-bold text-slate-100",
                        isThemeSystemEnabled
                      )}>
                        {/* CountUp 컴포넌트는 그대로 유지 */}
                      </span>
                    </div>
                    <p className={applyThemeClasses(
                      "text-sm text-slate-300 font-medium",
                      isThemeSystemEnabled
                    )}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 시각적 요소는 기존 유지 */}
            <div ref={heroVisualRef} className="lg:col-span-5 relative animate-hero-visual py-8 lg:py-0 min-h-[200px] lg:min-h-auto">
              {/* ServiceScroll 컴포넌트는 그대로 유지 */}
            </div>
          </div>
        </div>
      </section>

      {/* 나머지 섹션들도 동일한 패턴으로 적용... */}
    </main>
  )
}
```

##### 5.2.3 3단계: Button/Card 컴포넌트 변환 (25분)

**파일**: `temp-project/src/components/ui/button.tsx` (수정)

```typescript
// CVA variants에 라이트 모드 추가
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-slate-600 text-slate-100 hover:bg-slate-700 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-700",
        destructive: "bg-red-500 text-slate-100 hover:bg-red-600 dark:bg-red-500 dark:text-slate-100 dark:hover:bg-red-600",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-800",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        link: "text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

**파일**: `temp-project/src/components/ui/card.tsx` (신규 또는 수정)

```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

##### 5.2.4 4단계: Portfolio, Service 섹션 변환 (30분)

기존 `home-page-client.tsx`의 나머지 섹션들에 동일한 패턴 적용:

```typescript
{/* 서비스 소개 섹션 */}
<section className={applyThemeClasses(
  "py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
  isThemeSystemEnabled
)}>
  {/* 내부 컨텐츠도 모두 테마 적용 */}
</section>

{/* 포트폴리오 섹션 */}
<section ref={portfolioSectionRef} className={applyThemeClasses(
  "py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-portfolio-section",
  isThemeSystemEnabled
)}>
  {/* 내부 컨텐츠 테마 적용 */}
</section>

{/* 나머지 섹션들도 동일하게... */}
```

### ✅ 완료 기준 (5.2단계)

- [ ] Header 컴포넌트 테마 대응 완료
- [ ] Footer 컴포넌트 테마 대응 완료  
- [ ] Hero Section 테마 대응 완료
- [ ] Button 컴포넌트 라이트 모드 variants 추가
- [ ] Card 컴포넌트 테마 대응 완료
- [ ] Portfolio 섹션 테마 적용
- [ ] Service 섹션 테마 적용
- [ ] 모든 섹션에서 다크/라이트 모드 전환 정상 동작
- [ ] 라이트 모드에서 충분한 대비와 가독성 확보
- [ ] Feature Flag로 테마 시스템 활성화/비활성화 가능

---

## Story 6: MigrationContext 통합 및 Feature Flag 구현

### 🎯 목표
- 테마 시스템을 MigrationContext에 통합
- 환경변수 기반 Feature Flag 구현
- 안전한 롤백 메커니즘 구축

### ⏱️ 예상 소요시간
30분

### 📋 구현 단계

#### 6.1 MigrationContext 확장

**파일**: `temp-project/src/contexts/MigrationContext.tsx` (수정)

```typescript
// 기존 코드에 추가
useEffect(() => {
  // 기존 Phase 설정...

  // 테마 시스템 Feature Flag
  if (process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true') {
    setMigratedComponents(prev => {
      const newSet = new Set(prev)
      newSet.add('ThemeToggle')
      newSet.add('ThemeSystem')
      return newSet
    })
  }

  // 테마 토글 버튼 개별 제어
  if (process.env.NEXT_PUBLIC_THEME_TOGGLE_MIGRATED === 'true') {
    setMigratedComponents(prev => {
      const newSet = new Set(prev)
      newSet.add('ThemeToggle')
      return newSet
    })
  }
}, [forceNewUI])

// getMigrationStatus 함수 수정
const getMigrationStatus = (): Record<string, boolean> => {
  const components = ['Button', 'Badge', 'Input', 'Card', 'ThemeToggle', 'ThemeSystem']
  return components.reduce((acc, component) => ({
    ...acc,
    [component]: isMigrated(component)
  }), {})
}
```

#### 6.2 환경변수 기반 Feature Flag 확장

**파일**: `temp-project/.env.local` (수정)

```bash
# 테마 시스템 전체 제어
NEXT_PUBLIC_THEME_SYSTEM=true

# 개별 컴포넌트 제어
NEXT_PUBLIC_THEME_TOGGLE_MIGRATED=true

# 개발 환경 전용 설정
NEXT_PUBLIC_FORCE_LIGHT_MODE=false
NEXT_PUBLIC_FORCE_DARK_MODE=false

# 디버깅 모드
NEXT_PUBLIC_THEME_DEBUG=false
```

#### 6.3 조건부 테마 적용 훅 구현

**파일**: `temp-project/src/hooks/useConditionalTheme.ts` (신규)

```typescript
'use client'

import { useMigrationContext } from '@/contexts/MigrationContext'
import { applyThemeClasses } from '@/lib/theme-class-mapping'

/**
 * 조건부 테마 적용 훅
 */
export const useConditionalTheme = () => {
  const { isMigrated } = useMigrationContext()
  
  const isThemeSystemEnabled = isMigrated('ThemeSystem') || 
                              process.env.NEXT_PUBLIC_THEME_SYSTEM === 'true'
  
  /**
   * 컴포넌트별 테마 클래스 적용
   */
  const getThemeClasses = (
    originalClasses: string,
    componentName?: string
  ): string => {
    // 특정 컴포넌트가 마이그레이션되지 않은 경우 원본 유지
    if (componentName && !isMigrated(componentName)) {
      return originalClasses
    }
    
    return applyThemeClasses(originalClasses, isThemeSystemEnabled)
  }
  
  /**
   * 강제 테마 모드 확인
   */
  const getForcedTheme = (): 'light' | 'dark' | null => {
    if (process.env.NEXT_PUBLIC_FORCE_LIGHT_MODE === 'true') return 'light'
    if (process.env.NEXT_PUBLIC_FORCE_DARK_MODE === 'true') return 'dark'
    return null
  }
  
  /**
   * 디버그 모드 확인
   */
  const isDebugMode = process.env.NEXT_PUBLIC_THEME_DEBUG === 'true'
  
  return {
    isThemeSystemEnabled,
    getThemeClasses,
    getForcedTheme,
    isDebugMode,
    isMigrated
  }
}
```

#### 6.4 컴포넌트별 조건부 적용

**파일**: `temp-project/src/components/layout/header.tsx` (수정)

```typescript
// 기존 import 대신 새로운 훅 사용
import { useConditionalTheme } from '@/hooks/useConditionalTheme'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getThemeClasses, isThemeSystemEnabled } = useConditionalTheme()

  return (
    <header className={getThemeClasses(
      "sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-md",
      "Header"
    )}>
      {/* 나머지 컴포넌트도 동일하게 적용 */}
      
      {/* 테마 토글 버튼 조건부 렌더링 */}
      {isThemeSystemEnabled && (
        <ThemeToggle variant="ghost" size="default" className="hidden sm:inline-flex" />
      )}
    </header>
  )
}
```

#### 6.5 테마 시스템 상태 모니터링

**파일**: `temp-project/src/components/dev/ThemeDebugger.tsx` (신규)

```typescript
'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useMigrationContext } from '@/contexts/MigrationContext'
import { useConditionalTheme } from '@/hooks/useConditionalTheme'

/**
 * 개발 환경용 테마 디버거
 */
export const ThemeDebugger = () => {
  const { theme, mounted } = useTheme()
  const { getMigrationStatus } = useMigrationContext()
  const { isThemeSystemEnabled, isDebugMode } = useConditionalTheme()
  
  // 프로덕션이나 디버그 모드가 아닌 경우 렌더링하지 않음
  if (process.env.NODE_ENV === 'production' || !isDebugMode) {
    return null
  }
  
  const migrationStatus = getMigrationStatus()
  
  return (
    <div className="fixed bottom-4 left-4 bg-slate-800 border border-slate-600 rounded-lg p-4 text-xs text-slate-300 z-50 max-w-sm">
      <div className="font-bold mb-3 text-yellow-400">🎨 Theme Debug Panel</div>
      
      {/* 테마 상태 */}
      <div className="mb-3">
        <div className="font-semibold mb-1">Current State:</div>
        <div>Theme: <span className="text-green-400">{mounted ? theme : 'SSR'}</span></div>
        <div>Mounted: <span className="text-green-400">{mounted ? 'Yes' : 'No'}</span></div>
        <div>System Enabled: <span className="text-green-400">{isThemeSystemEnabled ? 'Yes' : 'No'}</span></div>
      </div>
      
      {/* 마이그레이션 상태 */}
      <div className="mb-3">
        <div className="font-semibold mb-1">Migration Status:</div>
        {Object.entries(migrationStatus).map(([component, migrated]) => (
          <div key={component} className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${migrated ? 'bg-green-500' : 'bg-gray-500'}`} />
            <span>{component}: {migrated ? 'New' : 'Legacy'}</span>
          </div>
        ))}
      </div>
      
      {/* 환경 변수 */}
      <div>
        <div className="font-semibold mb-1">Environment:</div>
        <div className="text-xs opacity-75">
          THEME_SYSTEM: {process.env.NEXT_PUBLIC_THEME_SYSTEM || 'false'}
        </div>
        <div className="text-xs opacity-75">
          THEME_TOGGLE: {process.env.NEXT_PUBLIC_THEME_TOGGLE_MIGRATED || 'false'}
        </div>
      </div>
    </div>
  )
}
```

#### 6.6 Layout에 디버거 추가

**파일**: `temp-project/src/app/layout.tsx` (수정)

```typescript
import { ThemeDebugger } from '@/components/dev/ThemeDebugger'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      {/* No-Flash 스크립트 */}
      <body suppressHydrationWarning>
        <MigrationProvider>
          <ThemeProvider>
            {children}
            
            {/* 개발 환경 디버거 */}
            <ThemeDebugger />
          </ThemeProvider>
        </MigrationProvider>
      </body>
    </html>
  )
}
```

### ✅ 완료 기준

- [ ] ThemeToggle과 ThemeSystem이 MigrationContext에 등록됨
- [ ] 환경변수로 테마 시스템 제어됨
- [ ] useConditionalTheme 훅 정상 동작
- [ ] 컴포넌트별 조건부 테마 적용 가능
- [ ] MigrationDebugger에서 테마 관련 상태 확인됨
- [ ] Feature Flag 비활성화 시 레거시 스타일 유지됨
- [ ] 개발 환경에서 ThemeDebugger 표시됨

### 🐛 트러블슈팅

**문제**: 환경변수가 적용되지 않음
```bash
# 해결: 개발 서버 재시작
npm run dev
```

**문제**: 컴포넌트별 마이그레이션이 동작하지 않음
```typescript
// 해결: 컴포넌트명 정확히 확인
const { isMigrated } = useMigrationContext()
console.log('Component migrated:', isMigrated('ThemeToggle'))
```

---

## 🧪 통합 테스트

### 테스트 시나리오

1. **Feature Flag 테스트**
   ```bash
   # .env.local에서 설정 변경 후 테스트
   NEXT_PUBLIC_THEME_SYSTEM=false # 레거시 스타일 유지
   NEXT_PUBLIC_THEME_SYSTEM=true  # 테마 시스템 활성화
   ```

2. **컴포넌트별 마이그레이션 테스트**
   - [ ] Header만 마이그레이션된 상태
   - [ ] 일부 컴포넌트만 테마 적용된 상태
   - [ ] 전체 컴포넌트 마이그레이션된 상태

3. **롤백 테스트**
   ```typescript
   // 개발자 도구에서 실행
   const { rollbackComponent } = useMigrationContext()
   rollbackComponent('ThemeSystem') // 즉시 레거시로 복귀
   ```

4. **디버깅 도구 확인**
   - [ ] ThemeDebugger 표시됨
   - [ ] 실시간 상태 업데이트
   - [ ] 환경변수 값 정확히 표시

---

## 📚 다음 단계

점진적 마이그레이션 시스템 구현이 완료되면 다음 단계로 진행하세요:

- **[04-optimization-testing.md](./04-optimization-testing.md)** - 성능 최적화 및 전체 통합 테스트

---

## 🔍 참고 자료

- [Feature Flags Best Practices](https://docs.launchdarkly.com/home/flags)
- [React Context Pattern](https://react.dev/reference/react/createContext)
- [Gradual Migration Strategies](https://martinfowler.com/articles/break-monolith-into-microservices.html)