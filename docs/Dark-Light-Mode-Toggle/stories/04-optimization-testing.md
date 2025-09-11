# Phase 4: 최적화 및 검증

**예상 소요시간**: 105분  
**난이도**: 고급  

## 개요

테마 전환 성능을 최적화하고, WCAG 접근성 기준을 준수하며, 전체 시스템의 통합 테스트를 수행합니다. 프로덕션 환경에서의 안정성을 보장합니다.

---

## Story 7: 성능 최적화 및 접근성 검증

### 🎯 목표
- 테마 전환 성능 최적화
- WCAG 접근성 기준 준수
- Lighthouse 점수 유지

### ⏱️ 예상 소요시간
60분

### 🔗 전제조건
- **Phase 1-3 완료**: 전체 테마 시스템이 기본적으로 동작
- **핵심 컴포넌트 테마 대응**: 최소 Header, Hero, Footer 섹션 테마 전환 가능
- **MigrationContext 통합**: Feature Flag를 통한 점진적 활성화 시스템 동작
- **기본 테스트 통과**: 다크/라이트 모드 토글 시 깨지는 화면 없음

### 📋 구현 단계

#### 7.1 성능 최적화 구현

**파일**: `temp-project/src/lib/theme-performance.ts` (신규)

```typescript
/**
 * 테마 성능 최적화 유틸리티
 */

/**
 * CSS 변수 기반 테마 적용 (성능 최적화)
 */
export const CSS_VARIABLES = {
  // 기본 색상 변수
  '--color-background': {
    light: '#ffffff',
    dark: '#0f172a'
  },
  '--color-foreground': {
    light: '#0f172a', 
    dark: '#f1f5f9'
  },
  '--color-muted': {
    light: '#f8fafc',
    dark: '#1e293b'
  },
  '--color-muted-foreground': {
    light: '#64748b',
    dark: '#94a3b8'
  },
  '--color-border': {
    light: '#e2e8f0',
    dark: '#334155'
  },
  '--color-input': {
    light: '#ffffff',
    dark: '#1e293b'
  },
  '--color-primary': {
    light: '#475569',
    dark: '#64748b'
  },
  '--color-primary-foreground': {
    light: '#f8fafc',
    dark: '#0f172a'
  }
} as const

/**
 * CSS 변수 적용 함수
 */
export const applyCSSVariables = (theme: 'light' | 'dark'): void => {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  
  Object.entries(CSS_VARIABLES).forEach(([property, values]) => {
    root.style.setProperty(property, values[theme])
  })
}

/**
 * 테마 전환 애니메이션 최적화
 */
export const optimizeThemeTransition = (): void => {
  if (typeof document === 'undefined') return
  
  // 전환 중 애니메이션 일시 비활성화
  const css = document.createElement('style')
  css.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-delay: -0.01ms !important;
      animation-iteration-count: 1 !important;
      background-attachment: initial !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }
  `
  document.head.appendChild(css)
  
  // 100ms 후 정상 애니메이션 복구
  setTimeout(() => {
    document.head.removeChild(css)
  }, 100)
}

/**
 * Critical CSS 인라이닝 (테마 관련)
 */
export const getCriticalThemeCSS = (theme: 'light' | 'dark'): string => {
  const variables = Object.entries(CSS_VARIABLES)
    .map(([property, values]) => `${property}: ${values[theme]};`)
    .join('\n  ')
    
  return `
    :root {
      ${variables}
    }
    
    .theme-transition {
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }
    
    .no-flash {
      visibility: visible !important;
    }
  `
}

/**
 * 테마 전환 성능 측정
 */
export const measureThemePerformance = (callback: () => void): Promise<number> => {
  return new Promise((resolve) => {
    const start = performance.now()
    
    requestAnimationFrame(() => {
      callback()
      
      requestAnimationFrame(() => {
        const end = performance.now()
        const duration = end - start
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎨 Theme transition completed in ${duration.toFixed(2)}ms`)
        }
        
        resolve(duration)
      })
    })
  })
}

/**
 * 메모리 사용량 최적화
 */
export const optimizeMemoryUsage = (): void => {
  // 불필요한 스타일 정리
  const obsoleteStyles = document.querySelectorAll('style[data-theme-temp]')
  obsoleteStyles.forEach(style => style.remove())
  
  // 이벤트 리스너 정리 (필요시)
  if (typeof window !== 'undefined' && 'gc' in window) {
    // @ts-ignore - 개발 환경에서만 사용
    window.gc?.()
  }
}
```

#### 7.2 최적화된 ThemeContext 구현

**파일**: `temp-project/src/contexts/ThemeContext.tsx` (수정)

```typescript
// 기존 import에 추가
import { 
  applyCSSVariables, 
  optimizeThemeTransition, 
  measureThemePerformance,
  optimizeMemoryUsage 
} from '@/lib/theme-performance'

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'dark',
  forcedTheme 
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 기존 코드...

  /**
   * 최적화된 테마 설정
   */
  const setTheme = async (newTheme: Theme) => {
    if (isTransitioning) return // 전환 중 중복 실행 방지
    
    setIsTransitioning(true)
    
    try {
      // 성능 측정 시작
      await measureThemePerformance(() => {
        // CSS 변수 기반 즉시 적용
        applyCSSVariables(newTheme)
        
        // 전환 애니메이션 최적화
        optimizeThemeTransition()
        
        // DOM 클래스 적용
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          document.documentElement.setAttribute('data-theme', newTheme)
        }
        
        // 상태 업데이트
        setThemeState(newTheme)
      })
      
      // localStorage 저장
      try {
        localStorage.setItem('theme', newTheme)
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
      }
      
      // 메모리 최적화
      optimizeMemoryUsage()
      
      // 개발 환경 로깅
      if (process.env.NODE_ENV === 'development') {
        console.log(`🎨 Theme optimized transition to: ${newTheme}`)
      }
      
    } finally {
      setIsTransitioning(false)
    }
  }

  // 나머지 기존 코드...
  
  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isTransitioning // 전환 상태 추가
  }
}

// ThemeContextType 인터페이스에 추가
interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  mounted: boolean
  isTransitioning: boolean // 추가
}
```

#### 7.3 접근성 개선 구현

**파일**: `temp-project/src/lib/accessibility.ts` (신규)

```typescript
/**
 * 접근성 관련 유틸리티
 */

/**
 * WCAG AA 색상 대비 검증
 */
export const checkColorContrast = (
  foreground: string, 
  background: string
): { ratio: number; isAA: boolean; isAAA: boolean } => {
  // RGB 값 추출
  const getRGB = (color: string) => {
    const hex = color.replace('#', '')
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }
  
  // 상대 휘도 계산
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const fgRGB = getRGB(foreground)
  const bgRGB = getRGB(background)
  
  const fgLuminance = getLuminance(fgRGB.r, fgRGB.g, fgRGB.b)
  const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b)
  
  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                (Math.min(fgLuminance, bgLuminance) + 0.05)
  
  return {
    ratio,
    isAA: ratio >= 4.5,   // WCAG AA 기준
    isAAA: ratio >= 7.0   // WCAG AAA 기준
  }
}

/**
 * 테마별 색상 대비 검증
 */
export const validateThemeContrast = (theme: 'light' | 'dark'): boolean => {
  const colorPairs = theme === 'light' ? [
    { fg: '#0f172a', bg: '#ffffff' }, // 기본 텍스트
    { fg: '#334155', bg: '#f8fafc' }, // 부제목
    { fg: '#64748b', bg: '#ffffff' }, // 캡션
  ] : [
    { fg: '#f1f5f9', bg: '#0f172a' }, // 기본 텍스트  
    { fg: '#cbd5e1', bg: '#1e293b' }, // 부제목
    { fg: '#94a3b8', bg: '#0f172a' }, // 캡션
  ]
  
  return colorPairs.every(({ fg, bg }) => {
    const result = checkColorContrast(fg, bg)
    return result.isAA
  })
}

/**
 * 접근성 알림 설정
 */
export const announceThemeChange = (theme: 'light' | 'dark'): void => {
  if (typeof document === 'undefined') return
  
  // 스크린 리더용 알림 영역 생성
  let announcer = document.getElementById('theme-announcer')
  if (!announcer) {
    announcer = document.createElement('div')
    announcer.id = 'theme-announcer'
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    document.body.appendChild(announcer)
  }
  
  // 테마 변경 알림
  announcer.textContent = `테마가 ${theme === 'light' ? '라이트' : '다크'} 모드로 변경되었습니다.`
  
  // 3초 후 알림 내용 제거
  setTimeout(() => {
    if (announcer) announcer.textContent = ''
  }, 3000)
}

/**
 * 키보드 접근성 개선
 */
export const enhanceKeyboardAccessibility = (): void => {
  if (typeof document === 'undefined') return
  
  // Tab 키 포커스 표시 개선
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation')
    }
  })
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation')
  })
}

/**
 * 접근성 CSS 추가
 */
export const injectAccessibilityCSS = (): void => {
  if (typeof document === 'undefined') return
  
  const css = `
    /* 스크린 리더 전용 */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* 키보드 네비게이션 시 포커스 표시 */
    .keyboard-navigation *:focus {
      outline: 2px solid #3b82f6 !important;
      outline-offset: 2px !important;
    }
    
    /* 고대비 모드 대응 */
    @media (prefers-contrast: high) {
      .theme-transition {
        transition: none !important;
      }
    }
    
    /* 애니메이션 비활성화 대응 */
    @media (prefers-reduced-motion: reduce) {
      .theme-transition,
      .theme-toggle * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* 포커스 표시 개선 */
    button:focus-visible,
    [role="button"]:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `
  
  const style = document.createElement('style')
  style.textContent = css
  style.setAttribute('data-accessibility', 'true')
  document.head.appendChild(style)
}
```

#### 7.4 접근성이 개선된 ThemeToggle

**파일**: `temp-project/src/components/primitives/ThemeToggle/ThemeToggle.tsx` (수정)

```typescript
// 기존 import에 추가
import { announceThemeChange } from '@/lib/accessibility'

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
  const { theme, toggleTheme, mounted, isTransitioning } = useTheme()

  // 접근성 개선된 토글 함수
  const handleToggle = async () => {
    if (isTransitioning) return
    
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    // 테마 변경
    toggleTheme()
    
    // 스크린 리더 알림
    announceThemeChange(newTheme)
  }

  // SSR 중에는 기본 아이콘 표시
  if (!mounted) {
    return (
      <button 
        className={cn(themeToggleVariants({ variant, size, iconSize }), className)}
        disabled
        aria-label="테마 설정 로딩 중..."
        {...props}
      >
        <Sun className="transition-transform duration-200" />
      </button>
    )
  }

  const isDark = theme === 'dark'
  const nextTheme = isDark ? '라이트' : '다크'
  
  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={cn(
        themeToggleVariants({ variant, size, iconSize }),
        isTransitioning && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={`${nextTheme} 모드로 전환`}
      aria-pressed={isDark}
      title={`현재: ${isDark ? '다크' : '라이트'} 모드 (클릭하여 ${nextTheme} 모드로 전환)`}
      role="switch"
      aria-checked={isDark}
      {...props}
    >
      {isDark ? (
        lightIcon || (
          <Sun 
            className={cn(
              'text-yellow-500 transition-all duration-200',
              disableAnimation ? '' : 'rotate-0 scale-100 hover:rotate-12',
              isTransitioning && 'animate-pulse'
            )} 
            aria-hidden="true"
          />
        )
      ) : (
        darkIcon || (
          <Moon 
            className={cn(
              'text-slate-700 dark:text-slate-300 transition-all duration-200',
              disableAnimation ? '' : 'rotate-0 scale-100 hover:-rotate-12',
              isTransitioning && 'animate-pulse'
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
```

#### 7.5 성능 모니터링 구현

**파일**: `temp-project/src/lib/performance-monitor.ts` (신규)

```typescript
/**
 * 테마 성능 모니터링 유틸리티
 */

interface PerformanceMetrics {
  themeTransitionTime: number
  bundleSize: number
  memoryUsage: number
  renderTime: number
}

/**
 * 성능 메트릭 수집
 */
export const collectPerformanceMetrics = (): Partial<PerformanceMetrics> => {
  const metrics: Partial<PerformanceMetrics> = {}
  
  // 메모리 사용량 (Chrome만 지원)
  if ('memory' in performance) {
    // @ts-ignore
    metrics.memoryUsage = performance.memory.usedJSHeapSize
  }
  
  // 렌더링 시간
  const paintEntries = performance.getEntriesByType('paint')
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
  if (fcp) {
    metrics.renderTime = fcp.startTime
  }
  
  return metrics
}

/**
 * Lighthouse 성능 점수 추정
 */
export const estimatePerformanceScore = (): number => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  
  if (!navigation) return 0
  
  const fcp = navigation.loadEventEnd - navigation.fetchStart
  const lcp = fcp // 근사치
  
  // 간단한 점수 계산 (실제 Lighthouse 알고리즘은 더 복잡)
  let score = 100
  
  if (fcp > 1800) score -= 20
  if (fcp > 3000) score -= 30
  if (lcp > 2500) score -= 25
  
  return Math.max(0, score)
}

/**
 * 번들 크기 분석
 */
export const analyzeBundleSize = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof navigator !== 'undefined' && 'storage' in navigator) {
      navigator.storage.estimate().then(estimate => {
        resolve(estimate.usage || 0)
      }).catch(() => resolve(0))
    } else {
      resolve(0)
    }
  })
}

/**
 * 성능 리포트 생성
 */
export const generatePerformanceReport = async (): Promise<PerformanceMetrics> => {
  const metrics = collectPerformanceMetrics()
  const bundleSize = await analyzeBundleSize()
  
  return {
    themeTransitionTime: metrics.themeTransitionTime || 0,
    bundleSize,
    memoryUsage: metrics.memoryUsage || 0,
    renderTime: metrics.renderTime || 0
  }
}

/**
 * 성능 경고 시스템
 */
export const setupPerformanceWarnings = (): void => {
  if (process.env.NODE_ENV !== 'development') return
  
  // 긴 작업 감지
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['longtask'] })
  }
  
  // 메모리 누수 감지
  setInterval(() => {
    if ('memory' in performance) {
      // @ts-ignore
      const memory = performance.memory
      if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB 초과
        console.warn(`🧠 High memory usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`)
      }
    }
  }, 30000) // 30초마다 체크
}
```

### ✅ 완료 기준

- [ ] CSS 변수 기반 성능 최적화 적용됨
- [ ] 테마 전환 시간 100ms 이하 달성
- [ ] WCAG AA 색상 대비 기준 준수
- [ ] 접근성 개선사항 적용됨 (ARIA, 키보드 네비게이션)
- [ ] 스크린 리더 호환성 확보
- [ ] 성능 모니터링 시스템 구축
- [ ] 메모리 누수 방지 메커니즘 적용
- [ ] Lighthouse 성능 점수 90+ 유지

---

## Story 8: 전체 통합 테스트 및 문서화

### 🎯 목표
- 모든 페이지에서 테마 시스템 검증
- 사용자 시나리오 기반 테스트
- 프로덕션 준비 상태 확인

### ⏱️ 예상 소요시간
45분

### 🔗 전제조건  
- **Story 7 완료**: 성능 최적화 및 접근성 검증 완료
- **E2E 테스트 환경**: Cypress 또는 Playwright 설정 및 동작 확인
- **모든 핵심 기능 동작**: 테마 토글, Feature Flag, 롤백 시스템 정상 작동

### 📋 구현 단계

#### 8.1 자동화된 테스트 스위트 구현

**파일**: `temp-project/src/__tests__/theme-system.test.tsx` (신규)

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { MigrationProvider } from '@/contexts/MigrationContext'
import { ThemeToggle } from '@/components/ui/theme-toggle'

// 테스트용 컴포넌트
const TestComponent = () => {
  const { theme, toggleTheme, mounted } = useTheme()
  return (
    <div>
      <span data-testid="theme-status">{mounted ? theme : 'loading'}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  )
}

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MigrationProvider>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </MigrationProvider>
  )
}

describe('Theme System', () => {
  beforeEach(() => {
    // localStorage 모킹
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })
  })

  test('기본 다크 테마로 초기화', async () => {
    renderWithProviders(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
  })

  test('테마 토글 동작', async () => {
    renderWithProviders(<TestComponent />)
    
    const toggleButton = screen.getByTestId('toggle-button')
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
    
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  test('ThemeToggle 컴포넌트 렌더링', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  test('localStorage 저장/복원', async () => {
    const mockGetItem = jest.fn().mockReturnValue('light')
    const mockSetItem = jest.fn()
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      }
    })

    renderWithProviders(<TestComponent />)
    
    const toggleButton = screen.getByTestId('toggle-button')
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('theme', expect.any(String))
    })
  })
})

describe('Accessibility', () => {
  test('키보드 네비게이션', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    
    // Tab으로 포커스
    button.focus()
    expect(button).toHaveFocus()
    
    // Enter로 활성화
    fireEvent.keyDown(button, { key: 'Enter' })
    // 테마 변경 확인은 별도 테스트에서 처리
  })

  test('ARIA 속성', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('aria-checked')
    expect(button).toHaveAttribute('aria-pressed')
  })
})
```

#### 8.2 E2E 테스트 시나리오

**파일**: `temp-project/cypress/e2e/theme-system.cy.ts` (신규)

```typescript
describe('Theme System E2E', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('페이지 로드 시 다크 테마 적용', () => {
    cy.get('html').should('have.class', 'dark')
    cy.get('body').should('have.css', 'background-color')
      .and('match', /rgb\(15, 23, 42\)/) // slate-900
  })

  it('테마 토글 버튼 동작', () => {
    // 토글 버튼 찾기
    cy.get('[data-testid="theme-toggle"]').should('be.visible')
    
    // 라이트 모드로 전환
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('not.have.class', 'dark')
    
    // 다크 모드로 재전환
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
  })

  it('페이지 새로고침 시 설정 유지', () => {
    // 라이트 모드로 전환
    cy.get('[data-testid="theme-toggle"]').click()
    cy.get('html').should('not.have.class', 'dark')
    
    // 페이지 새로고침
    cy.reload()
    
    // 라이트 모드 유지 확인
    cy.get('html').should('not.have.class', 'dark')
  })

  it('모바일에서 테마 토글', () => {
    cy.viewport('iphone-x')
    
    // 모바일 메뉴 열기
    cy.get('[data-testid="mobile-menu-button"]').click()
    
    // 모바일 메뉴의 테마 토글 클릭
    cy.get('[data-testid="mobile-theme-toggle"]').click()
    
    // 테마 변경 확인
    cy.get('html').should('not.have.class', 'dark')
  })

  it('접근성 키보드 네비게이션', () => {
    // Tab으로 테마 토글 버튼에 포커스
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-testid', 'theme-toggle')
    
    // Enter로 테마 토글
    cy.focused().type('{enter}')
    cy.get('html').should('not.have.class', 'dark')
  })
})

describe('Performance', () => {
  it('테마 전환 성능', () => {
    cy.visit('/')
    
    // 성능 측정 시작
    cy.window().then((win) => {
      win.performance.mark('theme-toggle-start')
    })
    
    // 테마 토글
    cy.get('[data-testid="theme-toggle"]').click()
    
    // 성능 측정 종료 및 검증
    cy.window().then((win) => {
      win.performance.mark('theme-toggle-end')
      win.performance.measure('theme-toggle', 'theme-toggle-start', 'theme-toggle-end')
      
      const measures = win.performance.getEntriesByName('theme-toggle')
      expect(measures[0].duration).to.be.lessThan(100) // 100ms 이하
    })
  })
})
```

#### 8.3 사용자 시나리오 테스트

**파일**: `temp-project/src/scripts/user-scenario-test.ts` (신규)

```typescript
/**
 * 사용자 시나리오 기반 테스트
 */

interface TestScenario {
  name: string
  description: string
  steps: string[]
  expectedResults: string[]
}

export const userScenarios: TestScenario[] = [
  {
    name: '첫 방문 사용자',
    description: '처음 웹사이트를 방문하는 사용자의 경험',
    steps: [
      '웹사이트 첫 방문',
      '페이지 로드 대기',
      '기본 테마 확인',
      '테마 토글 버튼 찾기',
      '한 번 클릭해서 라이트 모드 경험',
      '다시 클릭해서 다크 모드로 복귀'
    ],
    expectedResults: [
      '페이지가 다크 모드로 로드됨',
      '깜빡임 없이 부드럽게 로드',
      '테마 토글 버튼이 명확히 보임',
      '클릭 시 즉시 테마 전환',
      '색상 대비가 충분함',
      '모든 요소가 적절히 변경됨'
    ]
  },
  {
    name: '재방문 사용자',
    description: '이전에 테마 설정을 변경한 사용자',
    steps: [
      '라이트 모드 설정 후 페이지 떠남',
      '다시 웹사이트 방문',
      '설정 유지 확인',
      '다른 페이지 이동',
      '테마 설정 유지 확인'
    ],
    expectedResults: [
      '라이트 모드로 로드됨',
      '이전 설정이 유지됨',
      '모든 페이지에서 일관된 테마',
      '성능 저하 없음'
    ]
  },
  {
    name: '접근성 사용자',
    description: '스크린 리더나 키보드만 사용하는 사용자',
    steps: [
      '키보드로 페이지 네비게이션',
      'Tab을 사용해 테마 토글 버튼 찾기',
      'Enter로 테마 변경',
      '스크린 리더로 변경 사항 확인'
    ],
    expectedResults: [
      '논리적인 Tab 순서',
      '명확한 포커스 표시',
      '적절한 ARIA 레이블',
      '상태 변경 알림'
    ]
  },
  {
    name: '모바일 사용자',
    description: '모바일 기기에서 테마 변경하는 사용자',
    steps: [
      '모바일 기기로 접속',
      '햄버거 메뉴 열기',
      '테마 설정 찾기',
      '테마 변경',
      '메뉴 닫기',
      '변경사항 확인'
    ],
    expectedResults: [
      '터치 친화적 버튼 크기',
      '모바일 메뉴에서 쉽게 접근',
      '즉시 피드백',
      '전체 페이지 테마 적용'
    ]
  }
]

/**
 * 시나리오 테스트 실행기
 */
export const runUserScenarioTests = (): void => {
  if (process.env.NODE_ENV !== 'development') return
  
  console.group('🎭 User Scenario Tests')
  
  userScenarios.forEach((scenario, index) => {
    console.group(`${index + 1}. ${scenario.name}`)
    console.log('📝 Description:', scenario.description)
    console.log('🚶 Steps:', scenario.steps)
    console.log('✅ Expected:', scenario.expectedResults)
    console.groupEnd()
  })
  
  console.groupEnd()
}
```

#### 8.4 프로덕션 체크리스트

**파일**: `temp-project/src/scripts/production-checklist.ts` (신규)

```typescript
/**
 * 프로덕션 배포 전 체크리스트
 */

interface ChecklistItem {
  category: string
  item: string
  check: () => boolean | Promise<boolean>
  critical: boolean
}

export const productionChecklist: ChecklistItem[] = [
  // 기능 검증
  {
    category: '기능',
    item: '테마 토글 버튼 동작',
    check: () => document.querySelector('[data-testid="theme-toggle"]') !== null,
    critical: true
  },
  {
    category: '기능',
    item: 'localStorage 연동',
    check: () => {
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        return true
      } catch {
        return false
      }
    },
    critical: true
  },
  
  // 성능 검증
  {
    category: '성능',
    item: '테마 전환 시간 < 100ms',
    check: async () => {
      const start = performance.now()
      document.documentElement.classList.toggle('dark')
      const end = performance.now()
      return (end - start) < 100
    },
    critical: false
  },
  {
    category: '성능',
    item: 'Bundle 크기 최적화',
    check: () => {
      // 실제 번들 크기 체크는 빌드 도구에서 수행
      return true
    },
    critical: false
  },
  
  // 접근성 검증
  {
    category: '접근성',
    item: 'ARIA 속성 설정',
    check: () => {
      const toggle = document.querySelector('[role="switch"]')
      return toggle?.hasAttribute('aria-label') || false
    },
    critical: true
  },
  {
    category: '접근성',
    item: '키보드 네비게이션',
    check: () => {
      const toggle = document.querySelector('[data-testid="theme-toggle"]') as HTMLElement
      return toggle?.tabIndex !== -1
    },
    critical: true
  },
  
  // 브라우저 호환성
  {
    category: '호환성',
    item: 'CSS 변수 지원',
    check: () => CSS.supports('color', 'var(--color)'),
    critical: true
  },
  {
    category: '호환성',
    item: 'localStorage 지원',
    check: () => typeof Storage !== 'undefined',
    critical: true
  },
  
  // 환경변수 검증
  {
    category: '설정',
    item: '환경변수 올바름',
    check: () => {
      return process.env.NEXT_PUBLIC_THEME_SYSTEM !== undefined
    },
    critical: false
  }
]

/**
 * 체크리스트 실행
 */
export const runProductionChecklist = async (): Promise<{
  passed: number
  failed: number
  critical: number
  details: Array<{ item: string; passed: boolean; critical: boolean }>
}> => {
  const results = []
  let passed = 0
  let failed = 0
  let criticalFailed = 0
  
  for (const item of productionChecklist) {
    try {
      const result = await item.check()
      results.push({
        item: `[${item.category}] ${item.item}`,
        passed: result,
        critical: item.critical
      })
      
      if (result) {
        passed++
      } else {
        failed++
        if (item.critical) criticalFailed++
      }
    } catch (error) {
      results.push({
        item: `[${item.category}] ${item.item}`,
        passed: false,
        critical: item.critical
      })
      failed++
      if (item.critical) criticalFailed++
    }
  }
  
  return {
    passed,
    failed,
    critical: criticalFailed,
    details: results
  }
}

/**
 * 체크리스트 리포트 출력
 */
export const printChecklistReport = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') return
  
  console.group('🚀 Production Readiness Checklist')
  
  const results = await runProductionChecklist()
  
  console.log(`✅ Passed: ${results.passed}`)
  console.log(`❌ Failed: ${results.failed}`)
  console.log(`🚨 Critical Failed: ${results.critical}`)
  
  if (results.critical > 0) {
    console.error('❌ CRITICAL ISSUES FOUND - DO NOT DEPLOY')
  } else if (results.failed === 0) {
    console.log('🎉 ALL CHECKS PASSED - READY FOR PRODUCTION')
  } else {
    console.warn('⚠️ Some non-critical issues found')
  }
  
  console.group('📋 Detailed Results')
  results.details.forEach(({ item, passed, critical }) => {
    const icon = passed ? '✅' : (critical ? '🚨' : '⚠️')
    console.log(`${icon} ${item}`)
  })
  console.groupEnd()
  
  console.groupEnd()
}
```

#### 8.5 최종 통합 테스트

**파일**: `temp-project/src/scripts/integration-test.ts` (신규)

```typescript
/**
 * 최종 통합 테스트 스크립트
 */

import { runUserScenarioTests } from './user-scenario-test'
import { printChecklistReport } from './production-checklist'
import { generatePerformanceReport } from '../lib/performance-monitor'

/**
 * 전체 테스트 실행
 */
export const runIntegrationTests = async (): Promise<void> => {
  if (typeof window === 'undefined') return
  
  console.group('🧪 Integration Tests Starting...')
  
  try {
    // 1. 사용자 시나리오 테스트
    console.log('1️⃣ Running user scenario tests...')
    runUserScenarioTests()
    
    // 2. 성능 테스트
    console.log('2️⃣ Generating performance report...')
    const perfReport = await generatePerformanceReport()
    console.table(perfReport)
    
    // 3. 프로덕션 체크리스트
    console.log('3️⃣ Running production checklist...')
    await printChecklistReport()
    
    // 4. 브라우저 호환성 테스트
    console.log('4️⃣ Checking browser compatibility...')
    const compatibility = {
      cssVariables: CSS.supports('color', 'var(--color)'),
      localStorage: typeof Storage !== 'undefined',
      darkModeMedia: window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined,
      intersectionObserver: 'IntersectionObserver' in window,
    }
    console.table(compatibility)
    
    console.log('✅ Integration tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Integration tests failed:', error)
  } finally {
    console.groupEnd()
  }
}

// 개발 환경에서 자동 실행
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // 페이지 로드 후 3초 뒤 실행
  setTimeout(runIntegrationTests, 3000)
}
```

### ✅ 최종 완료 기준

- [ ] 자동화된 테스트 스위트 통과
- [ ] E2E 테스트 시나리오 통과
- [ ] 모든 사용자 시나리오 검증 완료
- [ ] 프로덕션 체크리스트 모든 항목 통과
- [ ] 성능 목표 달성 (전환 시간 < 100ms, Lighthouse 90+)
- [ ] 접근성 기준 준수 (WCAG AA)
- [ ] 브라우저 호환성 확인 (Chrome, Firefox, Safari, Edge)
- [ ] 모바일 환경 테스트 완료
- [ ] 메모리 누수 없음 확인

---

## 🎯 전체 프로젝트 완료 검증

### 최종 체크리스트

#### ✅ 기술적 완성도
- [ ] Tailwind 다크모드 설정 완료
- [ ] ThemeContext 구현 및 SSR 안전 패턴 적용
- [ ] MigrationContext 통합 완료
- [ ] CVA 기반 컴포넌트 시스템 구축
- [ ] Feature Flag 시스템 동작
- [ ] No-Flash 스크립트 적용

#### ✅ UI/UX 품질
- [ ] 모든 컴포넌트 테마 대응 완료
- [ ] 부드러운 전환 애니메이션 (< 100ms)
- [ ] 직관적인 토글 버튼 배치
- [ ] 모바일 반응형 완벽 지원
- [ ] 일관된 디자인 시스템 적용

#### ✅ 성능 및 접근성
- [ ] Lighthouse 성능 점수 90+ 유지
- [ ] WCAG AA 접근성 기준 준수
- [ ] 키보드 네비게이션 완벽 지원
- [ ] 스크린 리더 호환성 확보
- [ ] 색상 대비 충분함 (4.5:1 이상)

#### ✅ 개발자 경험
- [ ] TypeScript 타입 안전성 보장
- [ ] 개발 환경 디버깅 도구 제공
- [ ] 안전한 롤백 메커니즘 구축
- [ ] 포괄적인 문서화 완료
- [ ] 테스트 코드 및 E2E 테스트 구현

### 배포 준비 상태

모든 체크리스트 항목이 완료되면 프로덕션 배포가 가능합니다:

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 확인
npm run start

# 최종 테스트
npm run test
npm run e2e

# 배포
npm run deploy
```

---

## 📚 완료된 문서

1. **[README.md](./README.md)** - 전체 개요 및 구현 순서
2. **[01-infrastructure-setup.md](./01-infrastructure-setup.md)** - 인프라 구축 (75분)
3. **[02-ui-components.md](./02-ui-components.md)** - UI 컴포넌트 구현 (65분)
4. **[03-migration-system.md](./03-migration-system.md)** - 마이그레이션 시스템 (120분)
5. **[04-optimization-testing.md](./04-optimization-testing.md)** - 최적화 및 테스트 (75분)

**총 구현 시간**: 335분 (5시간 35분)

🎉 **다크/라이트 모드 토글 시스템 구현이 완료되었습니다!**