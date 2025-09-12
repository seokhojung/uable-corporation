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