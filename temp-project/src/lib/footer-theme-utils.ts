import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import type { Theme } from '@/contexts/ThemeContext'

/**
 * Footer 컴포넌트 전용 안전한 테마 클래스 유틸리티
 * 전략 1: 조건부 className 완전 분할 방식
 */

export interface FooterThemeClasses {
  // 푸터 메인 배경
  footerBackground: string
  // 회사 정보 영역
  companyTitle: string
  companySubtitle: string
  companyDescription: string
  // 연락처 정보
  contactText: string
  contactTextHover: string
  contactIconBackground: string
  // 링크 섹션
  linkText: string
  linkTextHover: string
  linkTitle: string
  // 소셜 미디어
  socialIconBackground: string
  socialIconHover: string
  // 저작권 정보
  copyrightText: string
  copyrightLink: string
  // 배경 장식 효과
  decorativeGradient1: string
  decorativeGradient2: string
  dotPattern: string
  // 테두리
  borderColor: string
}

/**
 * 타입 안전성을 보장하는 Footer 테마 클래스 생성 함수
 */
const createFooterThemeClasses = (theme: Theme | undefined): FooterThemeClasses => {
  // 타입 가드 및 기본값 처리
  if (!theme || !['light', 'dark', 'brand'].includes(theme)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid theme: ${theme}, falling back to 'light'`)
    }
    theme = 'light'
  }

  const themeClassMap: Record<Theme, FooterThemeClasses> = {
    light: {
      // 푸터 배경 - 라이트 모드
      footerBackground: 'bg-gray-100 text-gray-900',

      // 회사 정보 - 라이트 모드
      companyTitle: 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
      companySubtitle: 'text-gray-600',
      companyDescription: 'text-gray-700',

      // 연락처 정보 - 라이트 모드
      contactText: 'text-gray-600 hover:text-gray-900',
      contactTextHover: 'hover:text-gray-900',
      contactIconBackground: 'bg-gradient-to-r from-emerald-500/20 to-green-400/20',

      // 링크 섹션 - 라이트 모드
      linkText: 'text-gray-600 hover:text-gray-900',
      linkTextHover: 'hover:text-gray-900',
      linkTitle: 'text-gray-900 font-semibold',

      // 소셜 미디어 - 라이트 모드
      socialIconBackground: 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900',
      socialIconHover: 'hover:bg-gray-300 hover:text-gray-900',

      // 저작권 - 라이트 모드
      copyrightText: 'text-gray-600',
      copyrightLink: 'text-gray-600 hover:text-gray-900',

      // 배경 장식 - 라이트 모드
      decorativeGradient1: 'bg-gradient-to-r from-blue-600/10 to-blue-500/10',
      decorativeGradient2: 'bg-gradient-to-r from-blue-500/10 to-blue-400/10',
      dotPattern: 'rgba(0,0,0,0.05)',
      // 테두리
      borderColor: 'border-gray-300'
    },

    dark: {
      // 푸터 배경 - 다크 모드
      footerBackground: 'bg-slate-900/80 backdrop-blur-lg text-white',

      // 회사 정보 - 다크 모드
      companyTitle: 'bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent',
      companySubtitle: 'text-slate-400',
      companyDescription: 'text-slate-300',

      // 연락처 정보 - 다크 모드
      contactText: 'text-slate-300 hover:text-slate-100',
      contactTextHover: 'hover:text-slate-100',
      contactIconBackground: 'bg-gradient-to-r from-slate-600/20 to-slate-500/20',

      // 링크 섹션 - 다크 모드
      linkText: 'text-slate-300 hover:text-slate-100',
      linkTextHover: 'hover:text-slate-100',
      linkTitle: 'text-slate-100 font-semibold',

      // 소셜 미디어 - 다크 모드
      socialIconBackground: 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-100',
      socialIconHover: 'hover:bg-slate-700 hover:text-slate-100',

      // 저작권 - 다크 모드
      copyrightText: 'text-slate-400',
      copyrightLink: 'text-slate-400 hover:text-slate-100',

      // 배경 장식 - 다크 모드
      decorativeGradient1: 'bg-gradient-to-r from-slate-600/10 to-slate-500/10',
      decorativeGradient2: 'bg-gradient-to-r from-slate-500/10 to-slate-400/10',
      dotPattern: 'rgba(255,255,255,0.15)',
      // 테두리
      borderColor: 'border-slate-700'
    },

    brand: {
      // 푸터 배경 - 브랜드 모드
      footerBackground: 'bg-custom-bg-100 text-custom-text-100',

      // 회사 정보 - 브랜드 모드
      companyTitle: 'bg-gradient-to-r from-primary-100 to-primary-200 bg-clip-text text-transparent',
      companySubtitle: 'text-custom-text-200',
      companyDescription: 'text-custom-text-200',

      // 연락처 정보 - 브랜드 모드
      contactText: 'text-custom-text-200 hover:text-custom-text-100',
      contactTextHover: 'hover:text-custom-text-100',
      contactIconBackground: 'bg-gradient-to-r from-primary-100/20 to-primary-200/20',

      // 링크 섹션 - 브랜드 모드
      linkText: 'text-custom-text-200 hover:text-custom-text-100',
      linkTextHover: 'hover:text-custom-text-100',
      linkTitle: 'text-custom-text-100 font-semibold',

      // 소셜 미디어 - 브랜드 모드
      socialIconBackground: 'bg-custom-bg-200 hover:bg-custom-bg-300 text-custom-text-200 hover:text-custom-text-100',
      socialIconHover: 'hover:bg-custom-bg-300 hover:text-custom-text-100',

      // 저작권 - 브랜드 모드
      copyrightText: 'text-custom-text-200',
      copyrightLink: 'text-custom-text-200 hover:text-custom-text-100',

      // 배경 장식 - 브랜드 모드 (시 그린 계열)
      decorativeGradient1: 'bg-gradient-to-r from-primary-100/10 to-primary-200/10',
      decorativeGradient2: 'bg-gradient-to-r from-primary-200/10 to-accent-100/10',
      dotPattern: 'rgba(46,139,87,0.15)',
      // 테두리
      borderColor: 'border-custom-bg-300'
    }
  }

  return themeClassMap[theme]
}

/**
 * Footer 컴포넌트에서 사용하는 메인 훅
 * SSR 안전성과 성능 최적화가 포함됨
 */
export const useFooterTheme = (): FooterThemeClasses => {
  const { theme, mounted } = useTheme()

  // SSR 안전성: 마운트 전에는 기본 테마 사용
  const safeTheme = mounted ? theme : 'light'

  // 성능 최적화: 테마가 변경될 때만 재계산
  const themeClasses = useMemo(() => {
    return createFooterThemeClasses(safeTheme)
  }, [safeTheme])

  return themeClasses
}

/**
 * 특정 테마의 클래스를 직접 가져오는 유틸리티 함수
 * 컴포넌트 외부에서 사용할 때
 */
export const getFooterThemeClasses = (theme: Theme): FooterThemeClasses => {
  return createFooterThemeClasses(theme)
}