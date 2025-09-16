// src/lib/portfolio-theme-utils.ts
import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export interface PortfolioThemeClasses {
  // 페이지 배경
  pageBackground: string

  // 히어로 섹션
  heroBackground: string
  heroTitle: string
  heroSubtitle: string
  heroGradientText: string
  heroBadge: string
  heroBorder: string
  statsText: string

  // 기술 스택 스크롤
  techText: string
  techTextSecondary: string

  // 제품 섹션
  productsSectionBackground: string
  productCardBackground: string
  productBadge: string
  productTitle: string
  productDescription: string
  productButton: string
  productButtonSecondary: string

  // 프로젝트 갤러리
  galleryTitle: string
  gallerySubtext: string

  // 포트폴리오 카드
  cardBackground: string
  cardTitle: string
  cardDescription: string
  cardBorder: string
  cardThumbnailOverlay: string
  categoryBadge: string
  techBadge: string
  actionButton: string
  actionButtonSecondary: string
  metaText: string
  achievementBullet: string
}

const getPortfolioThemeClasses = (theme: 'light' | 'dark' | 'brand'): PortfolioThemeClasses => {
  switch (theme) {
    case 'light':
      return {
        pageBackground: 'bg-white',
        heroBackground: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
        heroTitle: 'text-gray-900',
        heroSubtitle: 'text-gray-600',
        heroGradientText: 'bg-gradient-to-r from-green-600 to-teal-600',
        heroBadge: 'bg-gray-200 text-gray-800',
        heroBorder: 'border-gray-200',
        statsText: 'text-gray-900',
        techText: 'text-slate-400',
        techTextSecondary: 'text-slate-300',
        productsSectionBackground: 'bg-white',
        productCardBackground: 'bg-white border-gray-100',
        productBadge: 'text-emerald-600 border-emerald-300',
        productTitle: 'text-gray-900',
        productDescription: 'text-gray-600',
        productButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        productButtonSecondary: 'border-gray-300 text-gray-700 hover:bg-gray-100',
        galleryTitle: 'text-gray-900',
        gallerySubtext: 'text-gray-600',
        cardBackground: 'bg-white border-gray-200',
        cardTitle: 'text-gray-900',
        cardDescription: 'text-gray-600',
        cardBorder: 'border-gray-200',
        cardThumbnailOverlay: 'bg-gradient-to-br from-black/30 to-black/50',
        categoryBadge: 'bg-gray-200 text-gray-800 border-gray-300',
        techBadge: 'bg-gray-100 text-gray-700',
        actionButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white',
        actionButtonSecondary: 'border-gray-300 text-gray-700 hover:bg-gray-100',
        metaText: 'text-gray-600',
        achievementBullet: 'bg-green-400'
      }

    case 'dark':
      return {
        pageBackground: 'bg-slate-900',
        heroBackground: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        heroTitle: 'text-slate-100',
        heroSubtitle: 'text-slate-300',
        heroGradientText: 'bg-gradient-to-r from-slate-300 to-slate-400',
        heroBadge: 'bg-slate-700 text-slate-200',
        heroBorder: 'border-slate-700',
        statsText: 'text-slate-100',
        techText: 'text-slate-400',
        techTextSecondary: 'text-slate-300',
        productsSectionBackground: 'bg-slate-900',
        productCardBackground: 'bg-slate-800 border-slate-700',
        productBadge: 'text-emerald-400 border-emerald-300',
        productTitle: 'text-slate-100',
        productDescription: 'text-slate-300',
        productButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        productButtonSecondary: 'border-slate-600 text-slate-300 hover:bg-slate-700',
        galleryTitle: 'text-slate-100',
        gallerySubtext: 'text-slate-400',
        cardBackground: 'bg-slate-800/80 border-slate-700/20',
        cardTitle: 'text-slate-100',
        cardDescription: 'text-slate-300',
        cardBorder: 'border-slate-700',
        cardThumbnailOverlay: 'bg-gradient-to-br from-slate-900/30 to-slate-900/50',
        categoryBadge: 'bg-slate-700 text-slate-200 border-slate-600',
        techBadge: 'bg-slate-700 text-slate-300',
        actionButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white',
        actionButtonSecondary: 'border-slate-600 text-slate-300 hover:bg-slate-700',
        metaText: 'text-slate-400',
        achievementBullet: 'bg-green-400'
      }

    case 'brand':
      return {
        // 브랜드 테마: 정의된 색상만 사용
        pageBackground: 'bg-custom-bg-100', // #1E1E1E
        heroBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100', // 브랜드 그라디언트
        heroTitle: 'text-custom-text-100', // #FFFFFF
        heroSubtitle: 'text-custom-text-200', // #e0e0e0
        heroGradientText: 'bg-gradient-to-r from-primary-100 to-primary-200', // #2E8B57 → #61bc84
        heroBadge: 'bg-primary-100 text-custom-text-100', // #2E8B57 배경, #FFFFFF 텍스트
        heroBorder: 'border-primary-100/20', // #2E8B57 테두리
        statsText: 'text-custom-text-100', // #FFFFFF
        techText: 'text-primary-200', // #61bc84
        techTextSecondary: 'text-primary-100', // #2E8B57
        productsSectionBackground: 'bg-custom-bg-100', // #1E1E1E
        productCardBackground: 'bg-custom-bg-200 border-primary-100/20', // #2d2d2d
        productBadge: 'text-primary-200 border-primary-100/30', // #61bc84
        productTitle: 'text-custom-text-100', // #FFFFFF
        productDescription: 'text-custom-text-200', // #e0e0e0
        productButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100', // 레퍼런스 그라디언트
        productButtonSecondary: 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300',
        galleryTitle: 'text-custom-text-100', // #FFFFFF
        gallerySubtext: 'text-custom-text-200', // #e0e0e0
        cardBackground: 'bg-custom-bg-200 border-primary-100/20', // #2d2d2d
        cardTitle: 'text-custom-text-100', // #FFFFFF
        cardDescription: 'text-custom-text-200', // #e0e0e0
        cardBorder: 'border-primary-100/20',
        cardThumbnailOverlay: 'bg-gradient-to-br from-custom-bg-100/30 to-custom-bg-100/50',
        categoryBadge: 'bg-primary-100/10 text-primary-200 border-primary-100/20',
        techBadge: 'bg-primary-100/10 text-custom-text-100',
        actionButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100', // 레퍼런스 그라디언트
        actionButtonSecondary: 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300',
        metaText: 'text-custom-text-200', // #e0e0e0
        achievementBullet: 'bg-primary-200' // #61bc84
      }

    default:
      return getPortfolioThemeClasses('light')
  }
}

export const usePortfolioTheme = (): PortfolioThemeClasses => {
  const { theme, mounted } = useTheme()

  return useMemo(() => {
    if (!mounted) {
      return getPortfolioThemeClasses('light')
    }
    return getPortfolioThemeClasses(theme)
  }, [theme, mounted])
}