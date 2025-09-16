import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import type { Theme } from '@/contexts/ThemeContext'

/**
 * Contact 페이지 전용 안전한 테마 클래스 유틸리티
 * 전략 1: 조건부 className 완전 분할 방식
 */

export interface ContactThemeClasses {
  // 메인 배경
  pageBackground: string
  // 카드 배경
  cardBackground: string
  // 기본 텍스트
  primaryText: string
  secondaryText: string
  // 폼 입력 필드
  inputField: string
  inputFocusRing: string
  // 체크박스 전용
  checkboxField: string
  // 버튼 스타일
  submitButton: string
  categoryButtonActive: string
  categoryButtonInactive: string
  // 뱃지 및 아이콘
  badge: string
  iconBackground: string
  // 에러 및 성공 메시지
  errorText: string
  successBackground: string
  errorBackground: string
}

/**
 * 타입 안전성을 보장하는 테마 클래스 생성 함수
 */
const createContactThemeClasses = (theme: Theme | undefined): ContactThemeClasses => {
  // 타입 가드 및 기본값 처리
  if (!theme || !['light', 'dark', 'brand'].includes(theme)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid theme: ${theme}, falling back to 'light'`)
    }
    theme = 'light'
  }

  const themeClassMap: Record<Theme, ContactThemeClasses> = {
    light: {
      // 메인 배경 - 깔끔한 흰색
      pageBackground: 'bg-white',

      // 카드 배경 - 흰색 카드
      cardBackground: 'bg-white border-gray-200',

      // 텍스트 색상
      primaryText: 'text-gray-900',
      secondaryText: 'text-gray-600',

      // 폼 입력 필드
      inputField: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
      inputFocusRing: 'focus:ring-green-500 focus:border-transparent',
      // 체크박스 전용
      checkboxField: 'border-gray-300 bg-white text-green-600 focus:ring-green-500',

      // 버튼 스타일
      submitButton: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white',
      categoryButtonActive: 'border-green-500 bg-green-50 text-green-900',
      categoryButtonInactive: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50',

      // 뱃지 및 아이콘
      badge: 'bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500',
      iconBackground: 'bg-gradient-to-r from-green-600 to-green-700',

      // 메시지
      errorText: 'text-red-500',
      successBackground: 'bg-green-500/10 border-green-500/20 text-green-600',
      errorBackground: 'bg-red-500/10 border-red-500/20 text-red-600'
    },

    dark: {
      // 메인 배경 - 어두운 슬레이트
      pageBackground: 'bg-slate-900',

      // 카드 배경 - 반투명 어두운 카드
      cardBackground: 'bg-slate-800/80 border-slate-700/20',

      // 텍스트 색상
      primaryText: 'text-slate-100',
      secondaryText: 'text-slate-300',

      // 폼 입력 필드
      inputField: 'bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-400',
      inputFocusRing: 'focus:ring-slate-500 focus:border-transparent',
      // 체크박스 전용
      checkboxField: 'border-slate-600 bg-slate-700 text-slate-100 focus:ring-slate-500',

      // 버튼 스타일
      submitButton: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white',
      categoryButtonActive: 'border-slate-500 bg-slate-700/50 text-slate-100',
      categoryButtonInactive: 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700/30',

      // 뱃지 및 아이콘
      badge: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white border-slate-500',
      iconBackground: 'bg-gradient-to-r from-slate-600 to-slate-700',

      // 메시지
      errorText: 'text-red-400',
      successBackground: 'bg-green-500/10 border-green-500/20 text-green-400',
      errorBackground: 'bg-red-500/10 border-red-500/20 text-red-400'
    },

    brand: {
      // 메인 배경 - 브랜드 어두운 배경 (#1E1E1E)
      pageBackground: 'bg-custom-bg-100',

      // 카드 배경 - 브랜드 중간 배경 (#2d2d2d)
      cardBackground: 'bg-custom-bg-200 border-custom-bg-300',

      // 텍스트 색상 - 브랜드 흰색 텍스트
      primaryText: 'text-custom-text-100',
      secondaryText: 'text-custom-text-200',

      // 폼 입력 필드 - 브랜드 색상
      inputField: 'bg-custom-bg-200 border-custom-bg-300 text-custom-text-100 placeholder-custom-text-200',
      inputFocusRing: 'focus:ring-primary-100 focus:border-transparent',
      // 체크박스 전용 - 브랜드 색상
      checkboxField: 'border-custom-bg-300 bg-custom-bg-200 text-primary-100 focus:ring-primary-100',

      // 버튼 스타일 - 브랜드 시 그린 그라데이션
      submitButton: 'bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-accent-200 text-custom-text-100',
      categoryButtonActive: 'border-primary-100 bg-primary-100/20 text-custom-text-100',
      categoryButtonInactive: 'border-custom-bg-300 bg-custom-bg-200 text-custom-text-200 hover:border-primary-100 hover:bg-custom-bg-300',

      // 뱃지 및 아이콘 - 브랜드 시 그린
      badge: 'bg-gradient-to-r from-primary-100 to-primary-200 text-custom-text-100 border-primary-100',
      iconBackground: 'bg-gradient-to-r from-primary-100 to-primary-200',

      // 메시지
      errorText: 'text-red-400',
      successBackground: 'bg-primary-100/10 border-primary-100/20 text-primary-200',
      errorBackground: 'bg-red-500/10 border-red-500/20 text-red-400'
    }
  }

  return themeClassMap[theme]
}

/**
 * Contact 페이지에서 사용하는 메인 훅
 * SSR 안전성과 성능 최적화가 포함됨
 */
export const useContactTheme = (): ContactThemeClasses => {
  const { theme, mounted } = useTheme()

  // SSR 안전성: 마운트 전에는 기본 테마 사용
  const safeTheme = mounted ? theme : 'light'

  // 성능 최적화: 테마가 변경될 때만 재계산
  const themeClasses = useMemo(() => {
    return createContactThemeClasses(safeTheme)
  }, [safeTheme])

  return themeClasses
}

/**
 * 특정 테마의 클래스를 직접 가져오는 유틸리티 함수
 * 컴포넌트 외부에서 사용할 때
 */
export const getContactThemeClasses = (theme: Theme): ContactThemeClasses => {
  return createContactThemeClasses(theme)
}