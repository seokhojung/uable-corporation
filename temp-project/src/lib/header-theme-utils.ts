import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import type { Theme } from '@/contexts/ThemeContext'

/**
 * Header 컴포넌트 전용 안전한 테마 클래스 유틸리티
 * 전략 1: 조건부 className 완전 분할 방식
 */

export interface HeaderThemeClasses {
  // 헤더 메인 배경
  headerBackground: string
  // 네비게이션 텍스트
  navText: string
  navTextHover: string
  navTextActive: string
  // 모바일 메뉴 버튼
  mobileMenuButton: string
  mobileMenuButtonHover: string
  // 모바일 메뉴 오버레이
  mobileMenuOverlay: string
  mobileMenuPanel: string
  // Contact 버튼
  contactButton: string
  contactButtonHover: string
  // 로고 영역
  logoContainer: string
  // 메뉴 아이콘
  menuIcon: string
  // 언더라인 효과
  navUnderline: string
  // 분할선
  divider: string
}

/**
 * 타입 안전성을 보장하는 Header 테마 클래스 생성 함수
 */
const createHeaderThemeClasses = (theme: Theme | undefined): HeaderThemeClasses => {
  // 타입 가드 및 기본값 처리
  if (!theme || !['light', 'dark', 'brand'].includes(theme)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid theme: ${theme}, falling back to 'light'`)
    }
    theme = 'light'
  }

  const themeClassMap: Record<Theme, HeaderThemeClasses> = {
    light: {
      // 헤더 배경 - 라이트 모드
      headerBackground: 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm',

      // 네비게이션 텍스트 - 라이트 모드
      navText: 'text-gray-700',
      navTextHover: 'hover:text-gray-900',
      navTextActive: 'text-gray-900',

      // 모바일 메뉴 버튼 - 라이트 모드
      mobileMenuButton: 'text-gray-600',
      mobileMenuButtonHover: 'hover:text-gray-900',

      // 모바일 메뉴 오버레이 - 라이트 모드
      mobileMenuOverlay: 'bg-white/95 backdrop-blur-lg border-r border-gray-200',
      mobileMenuPanel: 'bg-white',

      // Contact 버튼 - 라이트 모드 (그린 액센트)
      contactButton: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25',
      contactButtonHover: 'hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-500/40',

      // 로고 및 기타
      logoContainer: 'text-gray-900',
      menuIcon: 'text-gray-600',
      navUnderline: 'bg-gradient-to-r from-gray-600 to-gray-800',
      divider: 'divide-gray-200'
    },

    dark: {
      // 헤더 배경 - 다크 모드
      headerBackground: 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/30 shadow-sm',

      // 네비게이션 텍스트 - 다크 모드
      navText: 'text-slate-300',
      navTextHover: 'hover:text-slate-100',
      navTextActive: 'text-slate-100',

      // 모바일 메뉴 버튼 - 다크 모드
      mobileMenuButton: 'text-slate-400',
      mobileMenuButtonHover: 'hover:text-slate-100',

      // 모바일 메뉴 오버레이 - 다크 모드
      mobileMenuOverlay: 'bg-slate-900/95 backdrop-blur-lg border-r border-slate-700',
      mobileMenuPanel: 'bg-slate-900',

      // Contact 버튼 - 다크 모드
      contactButton: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg shadow-slate-500/25',
      contactButtonHover: 'hover:from-slate-700 hover:to-slate-800 hover:shadow-xl hover:shadow-slate-500/40',

      // 로고 및 기타
      logoContainer: 'text-slate-100',
      menuIcon: 'text-slate-400',
      navUnderline: 'bg-gradient-to-r from-slate-300 to-slate-400',
      divider: 'divide-slate-700'
    },

    brand: {
      // 헤더 배경 - 브랜드 모드 (시 그린 테마)
      headerBackground: 'bg-custom-bg-100/90 backdrop-blur-lg border-b border-custom-bg-300/50 shadow-sm',

      // 네비게이션 텍스트 - 브랜드 모드
      navText: 'text-custom-text-200',
      navTextHover: 'hover:text-custom-text-100',
      navTextActive: 'text-custom-text-100',

      // 모바일 메뉴 버튼 - 브랜드 모드
      mobileMenuButton: 'text-custom-text-200',
      mobileMenuButtonHover: 'hover:text-custom-text-100',

      // 모바일 메뉴 오버레이 - 브랜드 모드
      mobileMenuOverlay: 'bg-custom-bg-100/95 backdrop-blur-lg border-r border-custom-bg-300',
      mobileMenuPanel: 'bg-custom-bg-100',

      // Contact 버튼 - 브랜드 모드 (시 그린 그라데이션)
      contactButton: 'bg-gradient-to-r from-primary-100 to-primary-200 text-custom-text-100 shadow-lg shadow-primary-100/25',
      contactButtonHover: 'hover:from-primary-200 hover:to-accent-200 hover:shadow-xl hover:shadow-primary-100/40',

      // 로고 및 기타
      logoContainer: 'text-custom-text-100',
      menuIcon: 'text-custom-text-200',
      navUnderline: 'bg-gradient-to-r from-primary-100 to-primary-200',
      divider: 'divide-custom-bg-300'
    }
  }

  return themeClassMap[theme]
}

/**
 * Header 컴포넌트에서 사용하는 메인 훅
 * SSR 안전성과 성능 최적화가 포함됨
 */
export const useHeaderTheme = (): HeaderThemeClasses => {
  const { theme, mounted } = useTheme()

  // SSR 안전성: 마운트 전에는 기본 테마 사용
  const safeTheme = mounted ? theme : 'light'

  // 성능 최적화: 테마가 변경될 때만 재계산
  const themeClasses = useMemo(() => {
    return createHeaderThemeClasses(safeTheme)
  }, [safeTheme])

  return themeClasses
}

/**
 * 특정 테마의 클래스를 직접 가져오는 유틸리티 함수
 * 컴포넌트 외부에서 사용할 때
 */
export const getHeaderThemeClasses = (theme: Theme): HeaderThemeClasses => {
  return createHeaderThemeClasses(theme)
}