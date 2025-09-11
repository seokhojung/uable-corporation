'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  applyCSSVariables, 
  optimizeThemeTransition, 
  measureThemePerformance,
  optimizeMemoryUsage 
} from '@/lib/theme-performance'

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
  /** 테마 전환 중 상태 */
  isTransitioning: boolean
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
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 클라이언트 마운트 처리
  useEffect(() => {
    console.log('🔄 ThemeProvider useEffect 실행됨')
    
    // 강제 테마가 설정된 경우
    if (forcedTheme) {
      setThemeState(forcedTheme)
      setMounted(true)
      console.log('✅ mounted 상태를 true로 설정함 (강제 테마)')
      return
    }
    
    // No-Flash 스크립트의 결과를 읽어서 동기화
    try {
      // No-Flash 스크립트가 이미 설정한 data-theme 속성을 읽음
      const currentTheme = document.documentElement.getAttribute('data-theme') as Theme
      if (currentTheme && (currentTheme === 'light' || currentTheme === 'dark')) {
        console.log('📖 No-Flash 스크립트에서 테마 복원:', currentTheme)
        setThemeState(currentTheme)
      } else {
        // localStorage에서 직접 읽기 (fallback)
        const savedTheme = localStorage.getItem('theme') as Theme
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          console.log('📖 localStorage에서 테마 복원:', savedTheme)
          setThemeState(savedTheme)
          applyCSSVariables(savedTheme)
          document.documentElement.classList.toggle('dark', savedTheme === 'dark')
          document.documentElement.setAttribute('data-theme', savedTheme)
        } else {
          console.log('📖 기본 다크 테마 적용')
          setThemeState('dark')
          applyCSSVariables('dark')
          document.documentElement.classList.add('dark')
          document.documentElement.setAttribute('data-theme', 'dark')
        }
      }
    } catch (error) {
      console.warn('Failed to load theme:', error)
      setThemeState('dark')
      applyCSSVariables('dark')
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
    
    setMounted(true)
    console.log('✅ mounted 상태를 true로 설정함')
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
   * 최적화된 테마 설정
   */
  const setTheme = async (newTheme: Theme) => {
    console.log('🎨 setTheme called with:', newTheme)
    if (isTransitioning) {
      console.log('⚠️ Theme transition already in progress, skipping')
      return // 전환 중 중복 실행 방지
    }
    
    setIsTransitioning(true)
    
    try {
      console.log('🔄 Starting theme change process...')
      // 성능 측정 시작
      await measureThemePerformance(() => {
        // CSS 변수 기반 즉시 적용
        console.log('📝 Applying CSS variables for theme:', newTheme)
        applyCSSVariables(newTheme)
        
        // 전환 애니메이션 최적화
        optimizeThemeTransition()
        
        // DOM 클래스 적용
        if (typeof document !== 'undefined') {
          console.log('🏷️ Before DOM update - classList:', document.documentElement.classList.toString())
          document.documentElement.classList.toggle('dark', newTheme === 'dark')
          document.documentElement.setAttribute('data-theme', newTheme)
          console.log('✅ After DOM update - classList:', document.documentElement.classList.toString())
          console.log('🎯 data-theme attribute:', document.documentElement.getAttribute('data-theme'))
        }
        
        // 상태 업데이트
        console.log('📊 Updating theme state to:', newTheme)
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

  /**
   * 테마 토글
   */
  const toggleTheme = () => {
    console.log('🔄 toggleTheme called - current theme:', theme)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('⚡ Toggling to new theme:', newTheme)
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isTransitioning
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