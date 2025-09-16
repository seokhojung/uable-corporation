// src/lib/webgl-theme-utils.ts
import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export interface WebGLThemeClasses {
  // 페이지 배경
  pageBackground: string

  // 헤더 영역
  headerTitle: string
  headerDescription: string

  // 갤러리 카드
  cardBackground: string
  cardBorder: string
  cardShadow: string
  cardHover: string

  // 카드 내용
  cardTitle: string
  cardDescription: string

  // 썸네일 그라디언트
  thumbnailGradient: string
  thumbnailIcon: string
  thumbnailIconBg: string

  // 뱃지
  webglBadge: string
  tagBadge: string
  tagBadgeText: string

  // 버튼
  experienceButton: string
  experienceButtonHover: string
  experienceButtonText: string

  // 직접 링크
  directLinkText: string
  directLinkHover: string
  directLinkLabel: string
}

export const useWebGLTheme = (): WebGLThemeClasses => {
  const { theme, mounted } = useTheme()

  return useMemo(() => {
    if (!mounted) {
      return {
        pageBackground: 'bg-gray-100',
        headerTitle: 'text-gray-900',
        headerDescription: 'text-gray-600',
        cardBackground: 'bg-white',
        cardBorder: 'border-gray-200',
        cardShadow: 'shadow-lg',
        cardHover: 'hover:shadow-xl',
        cardTitle: 'text-gray-900',
        cardDescription: 'text-gray-600',
        thumbnailGradient: 'bg-gradient-to-br from-blue-400 to-purple-600',
        thumbnailIcon: 'text-white',
        thumbnailIconBg: 'bg-white bg-opacity-20',
        webglBadge: 'bg-green-500 text-white',
        tagBadge: 'bg-gray-100',
        tagBadgeText: 'text-gray-700',
        experienceButton: 'bg-emerald-600',
        experienceButtonHover: 'hover:bg-emerald-700',
        experienceButtonText: 'text-white',
        directLinkText: 'text-blue-600',
        directLinkHover: 'hover:text-blue-800',
        directLinkLabel: 'text-gray-500'
      }
    }

    switch (theme) {
      case 'light':
        return {
          pageBackground: 'bg-gray-100',
          headerTitle: 'text-gray-900',
          headerDescription: 'text-gray-600',
          cardBackground: 'bg-white',
          cardBorder: 'border-gray-200',
          cardShadow: 'shadow-lg',
          cardHover: 'hover:shadow-xl',
          cardTitle: 'text-gray-900',
          cardDescription: 'text-gray-600',
          thumbnailGradient: 'bg-gradient-to-br from-blue-400 to-purple-600',
          thumbnailIcon: 'text-white',
          thumbnailIconBg: 'bg-white bg-opacity-20',
          webglBadge: 'bg-green-500 text-white',
          tagBadge: 'bg-gray-100',
          tagBadgeText: 'text-gray-700',
          experienceButton: 'bg-emerald-600',
          experienceButtonHover: 'hover:bg-emerald-700',
          experienceButtonText: 'text-white',
          directLinkText: 'text-blue-600',
          directLinkHover: 'hover:text-blue-800',
          directLinkLabel: 'text-gray-500'
        }

      case 'dark':
        return {
          pageBackground: 'bg-slate-900',
          headerTitle: 'text-slate-100',
          headerDescription: 'text-slate-300',
          cardBackground: 'bg-slate-800',
          cardBorder: 'border-slate-700',
          cardShadow: 'shadow-lg',
          cardHover: 'hover:shadow-xl',
          cardTitle: 'text-slate-100',
          cardDescription: 'text-slate-300',
          thumbnailGradient: 'bg-gradient-to-br from-blue-400 to-purple-600',
          thumbnailIcon: 'text-white',
          thumbnailIconBg: 'bg-white bg-opacity-20',
          webglBadge: 'bg-green-500 text-white',
          tagBadge: 'bg-slate-700',
          tagBadgeText: 'text-slate-300',
          experienceButton: 'bg-emerald-600',
          experienceButtonHover: 'hover:bg-emerald-700',
          experienceButtonText: 'text-white',
          directLinkText: 'text-blue-400',
          directLinkHover: 'hover:text-blue-300',
          directLinkLabel: 'text-slate-400'
        }

      case 'brand':
        return {
          // 브랜드 테마: 정의된 색상만 사용
          // 올바른 계층: 페이지(#1E1E1E) → 카드(#2d2d2d) → 요소들
          pageBackground: 'bg-custom-bg-100', // #1E1E1E (페이지 배경)
          headerTitle: 'text-custom-text-100', // #FFFFFF (흰색)
          headerDescription: 'text-custom-text-200', // #e0e0e0 연한 회색
          cardBackground: 'bg-custom-bg-200', // #2d2d2d (카드 배경 - 페이지보다 밝음)
          cardBorder: 'border-primary-100/20', // 시 그린 테두리
          cardShadow: 'shadow-lg shadow-primary-100/10',
          cardHover: 'hover:shadow-xl hover:shadow-primary-100/20',
          cardTitle: 'text-custom-text-100', // #FFFFFF (흰색)
          cardDescription: 'text-custom-text-200', // #e0e0e0 연한 회색
          // 브랜드 색상을 활용한 그라디언트 (#2E8B57 → #61bc84)
          thumbnailGradient: 'bg-gradient-to-br from-primary-100 to-primary-200',
          thumbnailIcon: 'text-custom-text-100', // #FFFFFF
          thumbnailIconBg: 'bg-primary-300/20', // #c6ffe6 투명도
          webglBadge: 'bg-primary-100 text-custom-text-100', // #2E8B57 배경에 #FFFFFF 텍스트
          tagBadge: 'bg-primary-100/10 border border-primary-100/20',
          tagBadgeText: 'text-custom-text-100', // #FFFFFF (흰색)
          // 브랜드 그라디언트 버튼 (Primary #2E8B57 + Accent #345e37)
          experienceButton: 'bg-gradient-to-r from-primary-100 to-accent-200',
          experienceButtonHover: 'hover:from-accent-200 hover:to-primary-100',
          experienceButtonText: 'text-custom-text-100', // #FFFFFF (흰색)
          directLinkText: 'text-custom-text-100', // #FFFFFF (흰색)
          directLinkHover: 'hover:text-primary-200', // #61bc84 (호버시 시 그린)
          directLinkLabel: 'text-custom-text-100' // #FFFFFF (흰색)
        }

      default:
        return {
          pageBackground: 'bg-gray-100',
          headerTitle: 'text-gray-900',
          headerDescription: 'text-gray-600',
          cardBackground: 'bg-white',
          cardBorder: 'border-gray-200',
          cardShadow: 'shadow-lg',
          cardHover: 'hover:shadow-xl',
          cardTitle: 'text-gray-900',
          cardDescription: 'text-gray-600',
          thumbnailGradient: 'bg-gradient-to-br from-blue-400 to-purple-600',
          thumbnailIcon: 'text-white',
          thumbnailIconBg: 'bg-white bg-opacity-20',
          webglBadge: 'bg-green-500 text-white',
          tagBadge: 'bg-gray-100',
          tagBadgeText: 'text-gray-700',
          experienceButton: 'bg-emerald-600',
          experienceButtonHover: 'hover:bg-emerald-700',
          experienceButtonText: 'text-white',
          directLinkText: 'text-blue-600',
          directLinkHover: 'hover:text-blue-800',
          directLinkLabel: 'text-gray-500'
        }
    }
  }, [theme, mounted])
}