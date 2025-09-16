// src/lib/portfolio-detail-theme-utils.ts
import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export interface PortfolioDetailThemeClasses {
  // 페이지 메인 배경
  pageBackground: string

  // 상단 네비게이션
  navBackground: string
  navText: string
  navBorder: string

  // 헤더 섹션
  headerBackground: string
  projectTitle: string
  projectDescription: string
  metaText: string
  heroImageCard: string

  // 배지
  categoryBadge: string
  featuredBadge: string
  techBadge: string

  // 버튼
  primaryButton: string
  secondaryButton: string

  // 갤러리 섹션
  galleryBackground: string
  galleryTitle: string
  galleryImageCard: string

  // 영상 섹션
  videoBackground: string
  videoTitle: string

  // 성과 섹션
  achievementBackground: string
  achievementCard: string
  achievementCardBorder: string
  achievementText: string
  achievementNumber: string

  // 관련 프로젝트 섹션
  relatedBackground: string
  relatedTitle: string
  relatedCard: string
  relatedCardText: string
  relatedCardDescription: string

  // ImageGallery 컴포넌트
  emptyGalleryBackground: string
  emptyGalleryText: string
  emptyGalleryIcon: string
  modalBackground: string
  modalNavButton: string
  imageInfoBackground: string
  imageInfoText: string
  thumbnailNavBackground: string
  thumbnailButton: string
  thumbnailButtonActive: string

  // ImpactStats 컴포넌트
  statsBackground: string
  statsTitle: string
  overviewCard: string
  overviewCardBorder: string
  overviewText: string
  statCard: string
  statCardBorder: string
  statNumber: string
  statTitle: string
  statDescription: string
  statDivider: string
  impactCard: string
  impactCardBorder: string
  impactText: string
}

const getPortfolioDetailThemeClasses = (theme: 'light' | 'dark' | 'brand'): PortfolioDetailThemeClasses => {
  switch (theme) {
    case 'light':
      return {
        pageBackground: 'bg-white',
        navBackground: 'bg-gray-50',
        navText: 'text-gray-600 hover:text-gray-900',
        navBorder: 'border-gray-200',
        headerBackground: 'bg-gradient-to-br from-gray-50 to-gray-100',
        projectTitle: 'text-gray-900',
        projectDescription: 'text-gray-600',
        metaText: 'text-gray-500',
        heroImageCard: 'bg-white border-gray-200',
        categoryBadge: 'bg-green-600 text-white',
        featuredBadge: 'bg-gray-100 text-gray-800 border-gray-300',
        techBadge: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        primaryButton: 'bg-green-600 hover:bg-green-700 text-white',
        secondaryButton: 'border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700',
        galleryBackground: 'bg-gray-50',
        galleryTitle: 'text-gray-900',
        galleryImageCard: 'bg-white border-gray-200',
        videoBackground: 'bg-white',
        videoTitle: 'text-gray-900',
        achievementBackground: 'bg-white',
        achievementCard: 'bg-white border-gray-200 hover:!border-gray-300 hover:shadow-md transition-all',
        achievementCardBorder: 'border-gray-200',
        achievementText: 'text-gray-700',
        achievementNumber: 'text-white',
        relatedBackground: 'bg-gray-50',
        relatedTitle: 'text-gray-900',
        relatedCard: 'bg-white border-gray-200 hover:!border-gray-300 hover:shadow-md transition-all',
        relatedCardText: 'text-gray-900',
        relatedCardDescription: 'text-gray-600',
        emptyGalleryBackground: 'bg-gray-200',
        emptyGalleryText: 'text-gray-600',
        emptyGalleryIcon: 'bg-gray-200',
        modalBackground: 'bg-white',
        modalNavButton: 'bg-gray-900/80 hover:bg-gray-800 text-white',
        imageInfoBackground: 'bg-gray-100',
        imageInfoText: 'text-gray-900',
        thumbnailNavBackground: 'bg-gray-100 border-gray-300',
        thumbnailButton: 'border-gray-300 hover:border-gray-400',
        thumbnailButtonActive: 'border-green-500',
        statsBackground: 'bg-white',
        statsTitle: 'text-gray-900',
        overviewCard: 'bg-gray-50 border-gray-200',
        overviewCardBorder: 'border-gray-200',
        overviewText: 'text-gray-700',
        statCard: 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100',
        statCardBorder: 'border-gray-200',
        statNumber: 'text-gray-900',
        statTitle: 'text-gray-900',
        statDescription: 'text-gray-600',
        statDivider: 'bg-gray-400',
        impactCard: 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300',
        impactCardBorder: 'border-gray-300',
        impactText: 'text-gray-700'
      }

    case 'dark':
      return {
        pageBackground: 'bg-slate-900',
        navBackground: 'bg-slate-800',
        navText: 'text-slate-300 hover:text-slate-100',
        navBorder: 'border-slate-700',
        headerBackground: 'bg-gradient-to-br from-slate-900 to-slate-800',
        projectTitle: 'text-slate-100',
        projectDescription: 'text-slate-300',
        metaText: 'text-slate-400',
        heroImageCard: 'bg-slate-800 border-slate-700',
        categoryBadge: 'bg-blue-600 text-white',
        featuredBadge: 'bg-slate-700 text-slate-200 border-slate-600',
        techBadge: 'bg-slate-700 text-slate-300',
        primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondaryButton: 'border-slate-600 text-slate-300 hover:bg-slate-700',
        galleryBackground: 'bg-slate-800',
        galleryTitle: 'text-slate-100',
        galleryImageCard: 'bg-slate-800 border-slate-700',
        videoBackground: 'bg-slate-900',
        videoTitle: 'text-slate-100',
        achievementBackground: 'bg-slate-900',
        achievementCard: 'bg-slate-800 border-slate-700',
        achievementCardBorder: 'border-slate-700',
        achievementText: 'text-slate-300',
        achievementNumber: 'text-white',
        relatedBackground: 'bg-slate-800',
        relatedTitle: 'text-slate-100',
        relatedCard: 'bg-slate-800 border-slate-700',
        relatedCardText: 'text-slate-200',
        relatedCardDescription: 'text-slate-400',
        emptyGalleryBackground: 'bg-slate-700',
        emptyGalleryText: 'text-slate-400',
        emptyGalleryIcon: 'bg-slate-700',
        modalBackground: 'bg-slate-900',
        modalNavButton: 'bg-slate-900/80 hover:bg-slate-800 text-slate-100',
        imageInfoBackground: 'bg-slate-800',
        imageInfoText: 'text-slate-100',
        thumbnailNavBackground: 'bg-slate-800 border-slate-700',
        thumbnailButton: 'border-slate-600 hover:border-slate-400',
        thumbnailButtonActive: 'border-blue-500',
        statsBackground: 'bg-slate-900',
        statsTitle: 'text-slate-100',
        overviewCard: 'bg-slate-800/50 border-slate-700',
        overviewCardBorder: 'border-slate-700',
        overviewText: 'text-slate-300',
        statCard: 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800/90',
        statCardBorder: 'border-slate-700',
        statNumber: 'text-slate-100',
        statTitle: 'text-slate-100',
        statDescription: 'text-slate-400',
        statDivider: 'bg-slate-600',
        impactCard: 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600',
        impactCardBorder: 'border-slate-600',
        impactText: 'text-slate-200'
      }

    case 'brand':
      return {
        // 브랜드 테마: 정의된 색상만 사용
        pageBackground: 'bg-custom-bg-100', // #1E1E1E
        navBackground: 'bg-custom-bg-200', // #2d2d2d
        navText: 'text-custom-text-200 hover:text-custom-text-100', // #e0e0e0 → #FFFFFF
        navBorder: 'border-primary-100/20', // #2E8B57/20
        headerBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100', // 브랜드 그라디언트
        projectTitle: 'text-custom-text-100', // #FFFFFF
        projectDescription: 'text-custom-text-200', // #e0e0e0
        metaText: 'text-custom-text-200', // #e0e0e0
        heroImageCard: 'bg-custom-bg-200 border-primary-100/20', // #2d2d2d
        categoryBadge: 'bg-primary-100 text-custom-text-100', // #2E8B57 배경, #FFFFFF 텍스트
        featuredBadge: 'bg-primary-100/10 text-primary-200 border-primary-100/20', // 브랜드 색상
        techBadge: 'bg-primary-100/10 text-custom-text-100', // 브랜드 색상
        primaryButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100', // 레퍼런스 그라디언트
        secondaryButton: 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300',
        galleryBackground: 'bg-custom-bg-200', // #2d2d2d
        galleryTitle: 'text-custom-text-100', // #FFFFFF
        galleryImageCard: 'bg-custom-bg-300 border-primary-100/20', // #454545
        videoBackground: 'bg-custom-bg-100', // #1E1E1E
        videoTitle: 'text-custom-text-100', // #FFFFFF
        achievementBackground: 'bg-custom-bg-100', // #1E1E1E
        achievementCard: 'bg-custom-bg-200 border-gray-600/40 hover:!border-gray-500/60 hover:shadow-lg hover:shadow-gray-900/20 transition-all', // #2d2d2d
        achievementCardBorder: 'border-gray-600/40',
        achievementText: 'text-custom-text-200', // #e0e0e0
        achievementNumber: 'text-custom-text-100', // #FFFFFF
        relatedBackground: 'bg-custom-bg-200', // #2d2d2d
        relatedTitle: 'text-custom-text-100', // #FFFFFF
        relatedCard: 'bg-custom-bg-200 border-gray-600/40 hover:!border-gray-500/60 hover:shadow-lg hover:shadow-gray-900/20 transition-all', // #2d2d2d
        relatedCardText: 'text-custom-text-100', // #FFFFFF
        relatedCardDescription: 'text-custom-text-200', // #e0e0e0
        emptyGalleryBackground: 'bg-custom-bg-300', // #454545
        emptyGalleryText: 'text-custom-text-200', // #e0e0e0
        emptyGalleryIcon: 'bg-custom-bg-300', // #454545
        modalBackground: 'bg-custom-bg-100', // #1E1E1E
        modalNavButton: 'bg-custom-bg-100/80 hover:bg-custom-bg-200 text-custom-text-100',
        imageInfoBackground: 'bg-custom-bg-200', // #2d2d2d
        imageInfoText: 'text-custom-text-100', // #FFFFFF
        thumbnailNavBackground: 'bg-custom-bg-200 border-primary-100/20', // #2d2d2d
        thumbnailButton: 'border-primary-100/30 hover:border-primary-100/40',
        thumbnailButtonActive: 'border-primary-100', // #2E8B57
        statsBackground: 'bg-custom-bg-100', // #1E1E1E
        statsTitle: 'text-custom-text-100', // #FFFFFF
        overviewCard: 'bg-custom-bg-200 border-primary-100/20', // #2d2d2d
        overviewCardBorder: 'border-primary-100/20',
        overviewText: 'text-custom-text-200', // #e0e0e0
        statCard: 'bg-custom-bg-200 border-primary-100/20 hover:border-primary-100/30 hover:bg-custom-bg-300', // #2d2d2d
        statCardBorder: 'border-primary-100/20',
        statNumber: 'text-custom-text-100', // #FFFFFF
        statTitle: 'text-custom-text-100', // #FFFFFF
        statDescription: 'text-custom-text-200', // #e0e0e0
        statDivider: 'bg-primary-100/40', // #2E8B57 계열
        impactCard: 'bg-gradient-to-br from-custom-bg-200 to-custom-bg-300 border-primary-100/30', // 브랜드 그라디언트
        impactCardBorder: 'border-primary-100/30',
        impactText: 'text-custom-text-200' // #e0e0e0
      }

    default:
      return getPortfolioDetailThemeClasses('light')
  }
}

export const usePortfolioDetailTheme = (): PortfolioDetailThemeClasses => {
  const { theme, mounted } = useTheme()

  return useMemo(() => {
    if (!mounted) {
      return getPortfolioDetailThemeClasses('light')
    }
    return getPortfolioDetailThemeClasses(theme)
  }, [theme, mounted])
}