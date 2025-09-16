// src/lib/home-theme-utils.ts
import { useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export interface HomeThemeClasses {
  // 메인 페이지 배경
  pageBackground: string

  // Hero Section
  heroBackground: string
  heroBadge: string
  heroTitle: string
  heroGradientText: string
  heroSubtitle: string
  heroHighlight: string
  heroPrimaryButton: string
  heroSecondaryButton: string
  heroStatsBorder: string
  heroStatsIcon: string
  heroStatsNumber: string
  heroStatsLabel: string

  // 서비스 소개 Section
  serviceBackground: string
  serviceBadge: string
  serviceTitle: string
  serviceGradientText: string
  serviceSubtitle: string
  serviceCard: string
  serviceCardTitle: string
  serviceCardText: string
  serviceCardNegative: string
  serviceCardPositive: string
  videoBadge: string
  videoDescription: string

  // 자체 제품 Section
  productsBackground: string

  // 포트폴리오 Section
  portfolioBackground: string
  portfolioBadge: string
  portfolioTitle: string
  portfolioSubtitle: string
  portfolioCard: string
  portfolioButton: string

  // WebGL Section
  webglBackground: string
  webglBadge: string
  webglTitle: string
  webglSubtitle: string
  webglButton: string

  // 도입 절차 Section
  processBackground: string
  processBadge: string
  processTitle: string
  processSubtitle: string
  processCard: string
  processNumber: string
  processCardTitle: string
  processCardText: string
  processCardBadge: string

  // 도입 효과 Section
  effectsBackground: string
  effectsBadge: string
  effectsTitle: string
  effectsHighlight: string
  effectsStatsNumber: string
  effectsStatsTitle: string
  effectsStatsText: string

  // CTA Section
  ctaBackground: string
  ctaTitle: string
  ctaSubtitle: string
  ctaPrimaryButton: string
  ctaSecondaryButton: string
}

const getHomeThemeClasses = (theme: 'light' | 'dark' | 'brand'): HomeThemeClasses => {
  switch (theme) {
    case 'light':
      return {
        pageBackground: 'bg-white',

        // Hero Section
        heroBackground: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
        heroBadge: 'bg-gray-200 text-gray-800',
        heroTitle: 'text-gray-900',
        heroGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600',
        heroSubtitle: 'text-gray-600',
        heroHighlight: 'text-green-400',
        heroPrimaryButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',
        heroSecondaryButton: 'border-gray-300 text-gray-700 hover:bg-gray-100',
        heroStatsBorder: 'border-gray-200',
        heroStatsIcon: 'text-gray-600',
        heroStatsNumber: 'text-gray-900',
        heroStatsLabel: 'text-gray-600',

        // 서비스 소개 Section
        serviceBackground: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
        serviceBadge: 'text-emerald-600 border-emerald-300',
        serviceTitle: 'text-gray-900',
        serviceGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600',
        serviceSubtitle: 'text-gray-600',
        serviceCard: 'bg-white shadow-lg border-gray-200',
        serviceCardTitle: 'text-gray-900',
        serviceCardText: 'text-gray-600',
        serviceCardNegative: 'text-red-400',
        serviceCardPositive: 'text-green-400',
        videoBadge: 'bg-white/20 backdrop-blur-sm border-white/30 text-white',
        videoDescription: 'text-gray-600',

        // 자체 제품 Section
        productsBackground: 'bg-white',

        // 포트폴리오 Section
        portfolioBackground: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
        portfolioBadge: 'text-emerald-600 border-emerald-300',
        portfolioTitle: 'text-gray-900',
        portfolioSubtitle: 'text-gray-600',
        portfolioCard: 'bg-white shadow-lg border-gray-200',
        portfolioButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',

        // WebGL Section
        webglBackground: 'bg-white',
        webglBadge: 'text-emerald-600 border-emerald-300',
        webglTitle: 'text-gray-900',
        webglSubtitle: 'text-gray-600',
        webglButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',

        // 도입 절차 Section
        processBackground: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
        processBadge: 'bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500',
        processTitle: 'text-gray-900',
        processSubtitle: 'text-gray-600',
        processCard: 'bg-white shadow-lg border-gray-200',
        processNumber: 'bg-gradient-to-r from-green-600 to-teal-600 text-white',
        processCardTitle: 'text-gray-900',
        processCardText: 'text-gray-600',
        processCardBadge: 'bg-gray-100 text-gray-700 border-gray-300',

        // 도입 효과 Section
        effectsBackground: 'bg-white',
        effectsBadge: 'bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500',
        effectsTitle: 'text-gray-900',
        effectsHighlight: 'text-green-600',
        effectsStatsNumber: 'text-gray-900',
        effectsStatsTitle: 'text-gray-900',
        effectsStatsText: 'text-gray-600',

        // CTA Section
        ctaBackground: 'bg-gray-50',
        ctaTitle: 'text-gray-900',
        ctaSubtitle: 'text-gray-600',
        ctaPrimaryButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',
        ctaSecondaryButton: 'border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700',
      }

    case 'dark':
      return {
        pageBackground: 'bg-slate-900',

        // Hero Section
        heroBackground: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        heroBadge: 'bg-slate-700 text-slate-200',
        heroTitle: 'text-slate-100',
        heroGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400',
        heroSubtitle: 'text-slate-300',
        heroHighlight: 'text-green-300',
        heroPrimaryButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',
        heroSecondaryButton: 'border-slate-600 text-slate-200 hover:bg-slate-700',
        heroStatsBorder: 'border-slate-700',
        heroStatsIcon: 'text-slate-300',
        heroStatsNumber: 'text-slate-100',
        heroStatsLabel: 'text-slate-300',

        // 서비스 소개 Section
        serviceBackground: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        serviceBadge: 'text-emerald-400 border-emerald-300',
        serviceTitle: 'text-slate-100',
        serviceGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400',
        serviceSubtitle: 'text-slate-300',
        serviceCard: 'bg-slate-800 shadow-lg border-slate-700',
        serviceCardTitle: 'text-slate-100',
        serviceCardText: 'text-slate-300',
        serviceCardNegative: 'text-red-400',
        serviceCardPositive: 'text-green-400',
        videoBadge: 'bg-white/20 backdrop-blur-sm border-white/30 text-white',
        videoDescription: 'text-slate-300',

        // 자체 제품 Section
        productsBackground: 'bg-slate-900',

        // 포트폴리오 Section
        portfolioBackground: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        portfolioBadge: 'text-emerald-400 border-emerald-300',
        portfolioTitle: 'text-slate-100',
        portfolioSubtitle: 'text-slate-300',
        portfolioCard: 'bg-slate-800 shadow-lg border-slate-700',
        portfolioButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',

        // WebGL Section
        webglBackground: 'bg-slate-800',
        webglBadge: 'text-emerald-400 border-emerald-300',
        webglTitle: 'text-slate-100',
        webglSubtitle: 'text-slate-300',
        webglButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',

        // 도입 절차 Section
        processBackground: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        processBadge: 'bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500',
        processTitle: 'text-slate-100',
        processSubtitle: 'text-slate-300',
        processCard: 'bg-slate-800 shadow-lg border-slate-700',
        processNumber: 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100',
        processCardTitle: 'text-slate-100',
        processCardText: 'text-slate-300',
        processCardBadge: 'bg-slate-700 text-slate-200 border-slate-600',

        // 도입 효과 Section
        effectsBackground: 'bg-slate-800',
        effectsBadge: 'bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500',
        effectsTitle: 'text-slate-100',
        effectsHighlight: 'text-green-400',
        effectsStatsNumber: 'text-slate-100',
        effectsStatsTitle: 'text-slate-100',
        effectsStatsText: 'text-slate-300',

        // CTA Section
        ctaBackground: 'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900',
        ctaTitle: 'text-slate-100',
        ctaSubtitle: 'text-slate-300',
        ctaPrimaryButton: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30',
        ctaSecondaryButton: 'border-2 border-green-400 text-green-400 hover:bg-green-900/20 hover:border-green-300',
      }

    case 'brand':
      return {
        pageBackground: 'bg-custom-bg-100', // #1E1E1E

        // Hero Section
        heroBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100',
        heroBadge: 'bg-primary-100/10 text-primary-200 border-primary-100/20',
        heroTitle: 'text-custom-text-100', // #FFFFFF
        heroGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-accent-200',
        heroSubtitle: 'text-custom-text-200', // #e0e0e0
        heroHighlight: 'text-primary-200', // #61bc84
        heroPrimaryButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100',
        heroSecondaryButton: 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300',
        heroStatsBorder: 'border-primary-100/20',
        heroStatsIcon: 'text-custom-text-200',
        heroStatsNumber: 'text-custom-text-100',
        heroStatsLabel: 'text-custom-text-200',

        // 서비스 소개 Section
        serviceBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100',
        serviceBadge: 'text-primary-200 border-primary-100/30',
        serviceTitle: 'text-custom-text-100',
        serviceGradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-primary-100 to-accent-200',
        serviceSubtitle: 'text-custom-text-200',
        serviceCard: 'bg-custom-bg-200 border-primary-100/20',
        serviceCardTitle: 'text-custom-text-100',
        serviceCardText: 'text-custom-text-200',
        serviceCardNegative: 'text-red-400',
        serviceCardPositive: 'text-primary-200',
        videoBadge: 'bg-custom-bg-100/20 backdrop-blur-sm border-primary-100/30 text-custom-text-100',
        videoDescription: 'text-custom-text-200',

        // 자체 제품 Section
        productsBackground: 'bg-custom-bg-100',

        // 포트폴리오 Section
        portfolioBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100',
        portfolioBadge: 'text-primary-200 border-primary-100/30',
        portfolioTitle: 'text-custom-text-100',
        portfolioSubtitle: 'text-custom-text-200',
        portfolioCard: 'bg-custom-bg-200 border-primary-100/20',
        portfolioButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100',

        // WebGL Section
        webglBackground: 'bg-custom-bg-200', // #2d2d2d
        webglBadge: 'text-primary-200 border-primary-100/30',
        webglTitle: 'text-custom-text-100',
        webglSubtitle: 'text-custom-text-200',
        webglButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100',

        // 도입 절차 Section
        processBackground: 'bg-gradient-to-br from-custom-bg-100 via-custom-bg-200 to-custom-bg-100',
        processBadge: 'bg-gradient-to-r from-primary-100 to-accent-200 text-custom-text-100 border-primary-100',
        processTitle: 'text-custom-text-100',
        processSubtitle: 'text-custom-text-200',
        processCard: 'bg-custom-bg-200 border-primary-100/20',
        processNumber: 'bg-gradient-to-r from-primary-100 to-accent-200 text-custom-text-100',
        processCardTitle: 'text-custom-text-100',
        processCardText: 'text-custom-text-200',
        processCardBadge: 'bg-custom-bg-300 text-custom-text-200 border-primary-100/20',

        // 도입 효과 Section
        effectsBackground: 'bg-custom-bg-200', // #2d2d2d
        effectsBadge: 'bg-gradient-to-r from-primary-100 to-accent-200 text-custom-text-100 border-primary-100',
        effectsTitle: 'text-custom-text-100',
        effectsHighlight: 'text-primary-200', // #61bc84
        effectsStatsNumber: 'text-custom-text-100',
        effectsStatsTitle: 'text-custom-text-100',
        effectsStatsText: 'text-custom-text-200',

        // CTA Section
        ctaBackground: 'bg-gradient-to-r from-custom-bg-200 via-custom-bg-300 to-custom-bg-100',
        ctaTitle: 'text-custom-text-100',
        ctaSubtitle: 'text-custom-text-200',
        ctaPrimaryButton: 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100',
        ctaSecondaryButton: 'border-2 border-primary-100 text-primary-200 hover:bg-primary-100/10 hover:border-primary-200',
      }

    default:
      return getHomeThemeClasses('light')
  }
}

export const useHomeTheme = (): HomeThemeClasses => {
  const { theme, mounted } = useTheme()

  return useMemo(() => {
    if (!mounted) {
      return getHomeThemeClasses('light')
    }
    return getHomeThemeClasses(theme)
  }, [theme, mounted])
}